"""Isolated HTTP boundary regression; never writes real diagnostics or profiles."""
import functools
from contextlib import contextmanager
import http.client
import importlib.util
import json
from pathlib import Path
import queue
import socket
import subprocess
import sys
import tempfile
import threading
import time
import unittest

sys.dont_write_bytecode = True
PROJECT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('bear_serve', PROJECT / 'scripts/serve.py')
serve = importlib.util.module_from_spec(spec)
spec.loader.exec_module(serve)
OUTPUT = PROJECT.parent / 'english-learning-diagnostics' / 'server-security-20261019'


class QuietHandler(serve.Handler):
    def log_message(self, *args):
        pass


class QuietDiagnostics(serve.DiagnosticsHandler):
    def log_message(self, *args):
        pass


class ExternalDiagnostics(QuietDiagnostics):
    def do_POST(self):
        self.client_address = ('203.0.113.7', self.client_address[1])
        super().do_POST()


class ServerSecurity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        OUTPUT.mkdir(parents=True, exist_ok=True)
        cls.temp = tempfile.TemporaryDirectory(dir=OUTPUT)
        cls.root = Path(cls.temp.name) / 'public'
        cls.root.mkdir()
        for path in ('index.html', 'src/app.js', 'audio/adult/sample.wav', 'scripts/serve.py', '.env', 'extra.txt'):
            target = cls.root / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text('fixture: ' + path)
        (cls.root / 'tests').mkdir()
        outside = Path(cls.temp.name) / 'outside.txt'
        outside.write_text('not public')
        (cls.root / 'src/link.js').symlink_to(outside)
        (cls.root / 'src/inside.js').symlink_to(cls.root / 'index.html')
        manifest = {'shell': ['./', 'src/app.js?v=1.0.0', '.env', 'src/link.js', 'src/inside.js'], 'hashes': {'adult/sample.wav': 'fixture'}}
        (cls.root / 'offline-assets.json').write_text(json.dumps(manifest))
        serve.DIAGNOSTICS = Path(cls.temp.name) / 'logs'
        cls.servers = []
        for handler in (QuietHandler, QuietDiagnostics, ExternalDiagnostics):
            server = serve.BoundedHTTPServer(('127.0.0.1', 0), functools.partial(handler, directory=str(cls.root)), diagnostics_log=serve.DiagnosticsLog(serve.DIAGNOSTICS))
            thread = threading.Thread(target=server.serve_forever, daemon=True)
            thread.start()
            cls.servers.append((server, thread))

    @classmethod
    def tearDownClass(cls):
        for server, thread in cls.servers:
            server.shutdown()
            server.server_close()
            thread.join()
        cls.temp.cleanup()

    def request(self, path, method='GET', listener=0, body=None, headers=None):
        connection = http.client.HTTPConnection('127.0.0.1', self.servers[listener][0].server_port, timeout=5)
        try:
            connection.request(method, path, body=body, headers=headers or {})
            response = connection.getresponse()
            return response.status, response.read()
        finally:
            connection.close()

    @contextmanager
    def isolated(self, handler=QuietHandler, **options):
        server = serve.BoundedHTTPServer(('127.0.0.1', 0), functools.partial(handler, directory=str(self.root)), **options)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            yield server
        finally:
            server.shutdown()
            server.server_close()
            thread.join()

    def test_security_headers_on_success_head_and_error(self):
        for path, method in (('/', 'GET'), ('/', 'HEAD'), ('/.env', 'GET')):
            connection = http.client.HTTPConnection('127.0.0.1', self.servers[0][0].server_port, timeout=3)
            try:
                connection.request(method, path)
                response = connection.getresponse()
                self.assertEqual(response.getheader('Content-Security-Policy'), "frame-ancestors 'self'")
                self.assertEqual(response.getheader('X-Frame-Options'), 'SAMEORIGIN')
                response.read()
            finally:
                connection.close()

    def test_connection_limit_rejects_excess_and_recovers(self):
        started = queue.Queue()

        class Observed(QuietHandler):
            def setup(self):
                super().setup()
                started.put(True)

        with self.isolated(Observed, max_connections=2, io_timeout=0.2, deadline=1) as server:
            clients = []
            try:
                for _ in range(2):
                    client = socket.create_connection(server.server_address, timeout=2)
                    client.sendall(b'GET / HTTP/1.1\r\nHost: localhost\r\nX-Slow: ')
                    clients.append(client)
                    started.get(timeout=2)
                with socket.create_connection(server.server_address, timeout=2) as excess:
                    self.assertEqual(excess.recv(1), b'')
                for client in clients:
                    self.assertEqual(client.recv(1), b'')
                connection = http.client.HTTPConnection(*server.server_address, timeout=2)
                try:
                    connection.request('GET', '/__health')
                    response = connection.getresponse()
                    self.assertEqual(response.status, 200)
                    response.read()
                finally:
                    connection.close()
            finally:
                for client in clients:
                    client.close()

    def test_deadline_closes_headers_despite_continuous_trickle(self):
        with self.isolated(io_timeout=0.3, deadline=0.4) as server:
            with socket.create_connection(server.server_address, timeout=2) as client:
                client.sendall(b'GET / HTTP/1.1\r\nHost: localhost\r\nX-Slow: ')
                start = time.monotonic()
                while time.monotonic() - start < 0.8:
                    try:
                        client.sendall(b'x')
                    except (BrokenPipeError, ConnectionResetError):
                        break
                    time.sleep(0.04)
                try:
                    closed = client.recv(1) == b''
                except ConnectionResetError:
                    closed = True
                self.assertTrue(closed)

    def test_diagnostic_body_idle_timeout(self):
        with self.isolated(QuietDiagnostics, io_timeout=0.15, deadline=1) as server:
            with socket.create_connection(server.server_address, timeout=2) as client:
                client.sendall(b'POST /__diagnostics HTTP/1.1\r\nHost: localhost\r\nContent-Length: 100\r\n\r\n{')
                self.assertIn(b'408', client.recv(4096).split(b'\r\n')[0])

    def test_diagnostic_rate_window_and_bounded_source_tracking(self):
        now = [100]
        log = serve.DiagnosticsLog(Path(self.temp.name) / 'rate', per_source=2, total=3, clock=lambda: now[0])
        self.assertTrue(log.append('one', {'event': 'test'}))
        self.assertTrue(log.append('one', {'event': 'test'}))
        self.assertFalse(log.append('one', {'event': 'test'}))
        self.assertTrue(log.append('two', {'event': 'test'}))
        self.assertFalse(log.append('three', {'event': 'test'}))
        now[0] += 61
        self.assertTrue(log.append('three', {'event': 'test'}))

    def test_diagnostic_rotation_has_finite_total_size(self):
        directory = Path(self.temp.name) / 'rotation'
        log = serve.DiagnosticsLog(directory, max_bytes=180, backups=2)
        for number in range(8):
            self.assertTrue(log.append('peer', {'event': 'x' * 90, 'code': number}))
        files = sorted(directory.iterdir())
        self.assertEqual(len(files), 3)
        self.assertLessEqual(sum(path.stat().st_size for path in files), 180 * 3)
        self.assertEqual({json.loads(path.read_text())['code'] for path in files}, {5, 6, 7})

    def test_diagnostic_http_rate_and_disk_failure(self):
        log = serve.DiagnosticsLog(Path(self.temp.name) / 'http-rate', per_source=1)
        blocked = Path(self.temp.name) / 'not-a-directory'
        blocked.write_text('fixture')
        for logger, expected in ((log, (204, 429)), (serve.DiagnosticsLog(blocked), (503, 503))):
            with self.isolated(QuietDiagnostics, diagnostics_log=logger) as server:
                for code in expected:
                    connection = http.client.HTTPConnection(*server.server_address, timeout=2)
                    try:
                        connection.request('POST', '/__diagnostics', '{}')
                        response = connection.getresponse()
                        self.assertEqual(response.status, code)
                        if code == 429:
                            self.assertEqual(response.getheader('Retry-After'), '60')
                        response.read()
                    finally:
                        connection.close()

    def test_optional_diagnostic_port_failure_keeps_public_service(self):
        with socket.socket() as occupied:
            occupied.bind(('127.0.0.1', 0))
            occupied.listen()
            diagnostic_port = str(occupied.getsockname()[1])
            for mode in ([], ['--disable-diagnostics']):
                with socket.socket() as reservation:
                    reservation.bind(('127.0.0.1', 0))
                    public_port = reservation.getsockname()[1]
                with tempfile.TemporaryFile(dir=self.temp.name) as errors:
                    process = subprocess.Popen([sys.executable, '-B', str(PROJECT / 'scripts/serve.py'), '--port', str(public_port), '--diagnostics-port', diagnostic_port, *mode], stderr=errors, stdout=subprocess.DEVNULL)
                    try:
                        limit = time.monotonic() + 5
                        while True:
                            connection = http.client.HTTPConnection('127.0.0.1', public_port, timeout=0.2)
                            try:
                                connection.request('GET', '/__health')
                                response = connection.getresponse()
                                self.assertEqual(response.status, 200)
                                response.read()
                                break
                            except OSError:
                                if process.poll() is not None or time.monotonic() >= limit:
                                    self.fail('Public service did not start')
                                time.sleep(0.02)
                            finally:
                                connection.close()
                        errors.seek(0)
                        if not mode:
                            self.assertIn(b'continuing with the public listener only', errors.read())
                    finally:
                        process.terminate()
                        process.wait(timeout=5)
            required = subprocess.run([sys.executable, '-B', str(PROJECT / 'scripts/serve.py'), '--port', '0', '--diagnostics-port', diagnostic_port, '--require-diagnostics'], capture_output=True, timeout=5)
            self.assertNotEqual(required.returncode, 0)
            self.assertIn(b'Diagnostics unavailable', required.stderr)

    def test_runtime_get_head_and_query(self):
        for path in ('/', '/index.html', '/src/app.js?v=1.0.0', '/audio/adult/sample.wav', '/offline-assets.json', '/__health'):
            with self.subTest(path=path):
                self.assertEqual(self.request(path)[0], 200)
                status, body = self.request(path, 'HEAD')
                self.assertEqual((status, body), (200, b''))

    def test_private_paths_encoded_traversal_and_symlinks(self):
        for path in ('/scripts/serve.py', '/tests/', '/src/', '/.env', '/%2eenv', '/.git/config', '/extra.txt',
                     '/src/link.js', '/src/inside.js', '/src/%2e%2e/scripts/serve.py', '/%2e%2e/outside.txt',
                     '/%252e%252e/outside.txt', '//scripts/serve.py', '/src/../index.html'):
            for method in ('GET', 'HEAD'):
                with self.subTest(path=path, method=method):
                    self.assertEqual(self.request(path, method)[0], 404)

    def test_public_port_never_accepts_diagnostics_even_with_private_headers(self):
        for headers in ({}, {'X-Forwarded-For': '127.0.0.1'}, {'Origin': 'http://localhost'}):
            self.assertEqual(self.request('/__diagnostics', 'POST', body='{}', headers=headers)[0], 403)

    def test_internal_diagnostics_filters_payload(self):
        status, _ = self.request('/__diagnostics', 'POST', 1, json.dumps({'event': 'test', 'transcript': 'must not be stored', 'audio': 'must not be stored'}))
        self.assertEqual(status, 204)
        rows = [json.loads(line) for line in (serve.DIAGNOSTICS / 'events.jsonl').read_text().splitlines()]
        self.assertEqual(set(rows[-1]), {'event', 'time'})
        self.assertEqual(self.request('/index.html', listener=1)[0], 404)
        self.assertEqual(self.request('/__diagnostics', 'POST', 1, '{}', {'Origin': 'https://evil.example'})[0], 403)
        self.assertEqual(self.request('/__diagnostics', 'POST', 1, 'x' * 2049)[0], 413)
        self.assertEqual(self.request('/__diagnostics', 'POST', 1, '[]')[0], 400)

    def test_external_peer_cannot_spoof_internal_forwarding_header(self):
        self.assertEqual(self.request('/__diagnostics', 'POST', 2, '{}', {'X-Forwarded-For': '127.0.0.1'})[0], 403)

    def test_bind_address_validation(self):
        for address in ('127.0.0.1', '10.1.2.3', '172.16.0.1', '192.168.1.1'):
            self.assertTrue(serve.internal_address(address))
        for address in ('0.0.0.0', '8.8.8.8', '169.254.1.1', '100.64.0.1', 'localhost', '172.32.0.1'):
            self.assertFalse(serve.internal_address(address))
        result = subprocess.run([sys.executable, '-B', str(PROJECT / 'scripts/serve.py'), '--diagnostics-host', '0.0.0.0', '--port', '0'], capture_output=True)
        self.assertEqual(result.returncode, 2)
        self.assertIn(b'Diagnostics must bind', result.stderr)


if __name__ == '__main__':
    unittest.main(verbosity=2)
