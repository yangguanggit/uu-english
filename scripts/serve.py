"""Serve public runtime assets and diagnostics on separate listeners."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from collections import deque
from io import BytesIO
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import ipaddress
import json
import socket
import sys
import threading
import time

PROJECT = Path(__file__).resolve().parents[1]
DIAGNOSTICS = PROJECT.parent / 'english-learning-diagnostics' / 'runtime'
BUILD = '1.0.0'
INTERNAL_NETWORKS = tuple(ipaddress.ip_network(value) for value in (
    '127.0.0.0/8', '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16',
))


class BoundedHTTPServer(ThreadingHTTPServer):
    """Bound worker count, idle IO, and the full connection lifetime."""
    request_queue_size = 64

    def __init__(self, *args, max_connections=64, io_timeout=10, deadline=60,
                 diagnostics_log=None, **kwargs):
        self.slots = threading.BoundedSemaphore(max_connections)
        self.io_timeout = io_timeout
        self.deadline = deadline
        self.diagnostics_log = diagnostics_log
        super().__init__(*args, **kwargs)

    def process_request(self, request, client_address):
        if not self.slots.acquire(blocking=False):
            self.shutdown_request(request)
            return
        try:
            request.settimeout(self.io_timeout)
            super().process_request(request, client_address)
        except BaseException:
            self.slots.release()
            raise

    @staticmethod
    def expire(request):
        try:
            request.shutdown(socket.SHUT_RDWR)
        except OSError:
            pass

    def process_request_thread(self, request, client_address):
        timer = threading.Timer(self.deadline, self.expire, (request,))
        timer.daemon = True
        try:
            timer.start()
            super().process_request_thread(request, client_address)
        finally:
            timer.cancel()
            self.slots.release()

    def handle_error(self, request, client_address):
        if not isinstance(sys.exc_info()[1], (ConnectionError, TimeoutError, socket.timeout)):
            super().handle_error(request, client_address)


class DiagnosticsLog:
    """One bounded collector per listening address; never stores raw speech."""
    def __init__(self, directory, max_bytes=1024 * 1024, backups=3,
                 per_source=30, total=300, window=60, clock=time.monotonic):
        self.directory = Path(directory)
        self.max_bytes, self.backups = max_bytes, backups
        self.per_source, self.total, self.window = per_source, total, window
        self.clock = clock
        self.sources, self.recent = {}, deque()
        self.lock = threading.Lock()

    def append(self, source, record):
        payload = (json.dumps(record, ensure_ascii=False, allow_nan=False) + '\n').encode('utf-8')
        if len(payload) > self.max_bytes:
            raise ValueError('Diagnostic record exceeds log capacity')
        with self.lock:
            cutoff = self.clock() - self.window
            while self.recent and self.recent[0] <= cutoff:
                self.recent.popleft()
            for peer, times in list(self.sources.items()):
                while times and times[0] <= cutoff:
                    times.popleft()
                if not times:
                    del self.sources[peer]
            times = self.sources.get(source, deque())
            if len(times) >= self.per_source or len(self.recent) >= self.total:
                return False
            now = self.clock()
            times.append(now)
            self.sources[source] = times
            self.recent.append(now)
            self.directory.mkdir(parents=True, exist_ok=True)
            current = self.directory / 'events.jsonl'
            if current.exists() and current.stat().st_size + len(payload) > self.max_bytes:
                for number in range(self.backups, 0, -1):
                    previous = current if number == 1 else self.directory / ('events.jsonl.' + str(number - 1))
                    if previous.exists():
                        previous.replace(self.directory / ('events.jsonl.' + str(number)))
            with current.open('ab') as output:
                output.write(payload)
        return True


def internal_address(value):
    try:
        address = ipaddress.ip_address(value)
        return any(address in network for network in INTERNAL_NETWORKS)
    except ValueError:
        return False


def public_assets(root):
    """Only the generated runtime catalog is public; fail closed if it is absent."""
    catalog = json.loads((root / 'offline-assets.json').read_text())
    assets = {'index.html', 'sw.js', 'offline-assets.json',
              'docs/WORD-IPA-CREDITS.txt', 'docs/PHONICS-CREDITS.md'}
    assets.update(urlsplit(path).path.removeprefix('./') for path in catalog['shell'])
    assets.update('audio/' + path for path in catalog['hashes'])
    return frozenset(assets)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, assets=None, **kwargs):
        self.assets = assets if assets is not None else public_assets(Path(kwargs['directory']))
        super().__init__(*args, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, max-age=0')
        self.send_header('X-Little-Bear-Build', BUILD)
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Content-Security-Policy', "frame-ancestors 'self'")
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        super().end_headers()

    def send_head(self):
        path = unquote(urlsplit(self.path).path)
        if path == '/__health':
            payload = json.dumps({'build': BUILD, 'service': 'little-bear-english'}).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(payload)))
            self.end_headers()
            return BytesIO(payload)
        relative = 'index.html' if path == '/' else path.lstrip('/')
        parts = relative.split('/')
        root = Path(self.directory).resolve()
        target = root / relative
        try:
            target.resolve().relative_to(root)
        except (ValueError, OSError, RuntimeError):
            self.send_error(404)
            return None
        if (relative not in self.assets or any(part.startswith('.') for part in parts)
                or not target.is_file()
                or any((root.joinpath(*parts[:i])).is_symlink() for i in range(1, len(parts) + 1))):
            self.send_error(404)
            return None
        return super().send_head()

    def list_directory(self, path):
        self.send_error(404)
        return None

    def do_POST(self):
        self.send_error(403 if urlsplit(self.path).path == '/__diagnostics' else 404)


class DiagnosticsHandler(Handler):
    def log_message(self, *args):
        # Avoid duplicating every diagnostic request into an unbounded stderr log.
        pass

    def send_head(self):
        self.send_error(404)
        return None

    def do_POST(self):
        if urlsplit(self.path).path != '/__diagnostics':
            self.send_error(404)
            return
        # Use the actual peer, never an untrusted forwarding header.
        if not internal_address(self.client_address[0]):
            self.send_error(403)
            return
        origin = self.headers.get('Origin')
        if origin and origin not in ('http://' + self.headers.get('Host', ''), 'https://' + self.headers.get('Host', '')):
            self.send_error(403)
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= 2048:
                self.send_error(413)
                return
            data = json.loads(self.rfile.read(length))
            allowed = ('build', 'event', 'state', 'code', 'source', 'seconds', 'capture', 'recognition')
            safe = {key: value for key, value in data.items() if key in allowed and isinstance(value, (str, bool, int, float))}
            safe['time'] = time.time()
            if not self.server.diagnostics_log.append(self.client_address[0], safe):
                self.send_response(429)
                self.send_header('Retry-After', '60')
                self.send_header('Content-Length', '0')
                self.end_headers()
                return
            self.send_response(204)
            self.end_headers()
        except (ValueError, AttributeError, RecursionError):
            self.send_error(400)
        except (TimeoutError, socket.timeout):
            self.send_error(408)
        except OSError:
            self.send_error(503, 'Diagnostic storage unavailable')


def main():
    parser = argparse.ArgumentParser(description='Serve runtime assets with an isolated internal diagnostics listener')
    parser.add_argument('--root', default='.', help='Directory relative to project root')
    parser.add_argument('--port', type=int, default=8080)
    parser.add_argument('--diagnostics-host', default='127.0.0.1', help='Loopback or RFC1918 IPv4 bind address; never expose via public proxy')
    parser.add_argument('--diagnostics-port', type=int, default=8081)
    diagnostics_mode = parser.add_mutually_exclusive_group()
    diagnostics_mode.add_argument('--disable-diagnostics', action='store_true')
    diagnostics_mode.add_argument('--require-diagnostics', action='store_true', help='Fail startup if the internal collector cannot bind')
    args = parser.parse_args()
    root = (PROJECT / args.root).resolve()
    if not (root / 'index.html').is_file():
        parser.error('Preview root must contain index.html')
    if not args.disable_diagnostics and not internal_address(args.diagnostics_host):
        parser.error('Diagnostics must bind a loopback or RFC1918 IPv4 address')
    assets = public_assets(root)
    public = BoundedHTTPServer(('0.0.0.0', args.port), partial(Handler, directory=str(root), assets=assets))
    diagnostics = None
    try:
        if not args.disable_diagnostics:
            try:
                diagnostics = BoundedHTTPServer((args.diagnostics_host, args.diagnostics_port), partial(DiagnosticsHandler, directory=str(root), assets=frozenset()), max_connections=8)
            except OSError as error:
                message = 'Diagnostics unavailable at {}:{}: {}'.format(args.diagnostics_host, args.diagnostics_port, error)
                if args.require_diagnostics:
                    raise SystemExit(message)
                print('WARNING: ' + message + '; continuing with the public listener only.', file=sys.stderr, flush=True)
            if diagnostics:
                address, port = diagnostics.server_address
                diagnostics.diagnostics_log = DiagnosticsLog(DIAGNOSTICS / '{}-{}'.format(address, port))
                threading.Thread(target=diagnostics.serve_forever, daemon=True).start()
        public.serve_forever()
    finally:
        public.server_close()
        if diagnostics:
            diagnostics.shutdown()
            diagnostics.server_close()


if __name__ == '__main__':
    main()
