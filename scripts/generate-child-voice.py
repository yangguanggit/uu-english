#!/usr/bin/env python3
"""Generate static child-voice candidates via Edge; never modify installed app audio.

Requires edge-tts; afconvert (macOS) or ffmpeg converts MP3 to PCM WAV.
Generated packs remain unreviewed until their pronunciation has been checked.
"""
import argparse
import asyncio
import hashlib
import json
import math
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import wave

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_VOICES = {"en-US": "en-US-AnaNeural", "zh-CN": "zh-CN-YunxiaNeural"}
SOURCE = "Microsoft Edge Read Aloud via edge-tts; generated at native rate and pitch"


def source_text(row):
    # Edge has no macOS literal-character mode: audition all 26 names separately.
    if row.get("characterMode") == "LTRL":
        return row["text"].upper() + "."
    return re.sub(r"\bUU\b", "U U", row.get("sourceText") or row["text"])


def jobs_for(rows, voices):
    jobs = {}
    mapping = {}
    for row in rows:
        if row.get("synthesis") == "original-human-recording":
            continue
        text = source_text(row)
        voice = voices[row["locale"]]
        key = hashlib.sha256((voice + "\0" + text + "\0native-rate-pitch-v1").encode()).hexdigest()
        file = "recordings/" + key + ".wav"
        jobs[key] = {"text": text, "voice": voice, "file": file}
        mapping[row["file"]] = {"file": file, "baseRate": 1}
    return jobs, mapping


def validate_wav(file):
    with wave.open(str(file), "rb") as audio:
        if audio.getnchannels() != 1 or audio.getsampwidth() != 2 or audio.getframerate() != 24000:
            raise ValueError("Expected mono 24 kHz 16-bit PCM")
        count = audio.getnframes()
        duration = count / audio.getframerate()
        expected = count * audio.getnchannels() * audio.getsampwidth()
        frames = audio.readframes(count)
    if duration < 0.08 or not frames or len(frames) != expected:
        raise ValueError("Empty or truncated recording")
    # Reject silent outputs; this does not assess linguistic accuracy or voice style.
    from array import array
    samples = array("h", frames)
    if sys.byteorder != "little":
        samples.byteswap()
    peak = max(abs(n) for n in samples)
    rms = math.sqrt(sum(n*n for n in samples) / len(samples))
    if peak < 200 or rms < 30:
        raise ValueError("Silent or inaudible recording")
    return {"seconds": round(duration, 4), "sha256": hashlib.sha256(file.read_bytes()).hexdigest()}


def convert(source, target):
    if shutil.which("afconvert"):
        command = ["afconvert", "-f", "WAVE", "-d", "LEI16@24000", "-c", "1", str(source), str(target)]
    elif shutil.which("ffmpeg"):
        command = ["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", str(source), "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le", str(target)]
    else:
        raise RuntimeError("Install ffmpeg, or run on macOS with afconvert")
    subprocess.run(command, check=True, timeout=30, capture_output=True)


async def generate(args):
    try:
        import edge_tts
    except ImportError:
        raise RuntimeError("Install scripts/requirements-voice.txt in a separate Python environment")
    output = args.output.resolve()
    # Generated data belongs outside the source/deployment trees.
    if output == ROOT or ROOT in output.parents:
        raise ValueError("Choose an output directory outside the project")
    voices = {"en-US": args.english, "zh-CN": args.chinese}
    rows = json.loads((ROOT / "audio/metadata/learning-manifest.json").read_text())
    jobs, mapping = jobs_for(rows, voices)
    if args.samples:
        samples = [
            {"file": "english-dialogue", "locale": "en-US", "text": "Hello! My name is U U. An apple, please. Thank you!"},
            {"file": "chinese-meaning", "locale": "zh-CN", "text": "你好，我是优优。苹果，牛奶。我们一起去公园吧。"},
            {"file": "english-story", "locale": "en-US", "text": "It is a sunny day. U U takes a little red bag. A cat is under the tree. Let us play together!"},
        ]
        samples += [{**r, "file": "letter-" + r["text"]} for r in rows if r.get("characterMode") == "LTRL"]
        jobs, mapping = jobs_for(samples, voices)
    available = await asyncio.wait_for(edge_tts.list_voices(), 30)
    names = {v["ShortName"] for v in available}
    for voice in voices.values():
        if voice not in names:
            raise ValueError("Voice is unavailable from this channel: " + voice)
    (output / "recordings").mkdir(parents=True, exist_ok=True)
    # Save recoverable metadata before starting; partial packs remain explicitly disabled.
    pack = {"id": "child", "label": "儿童", "source": SOURCE, "speakers": {"en": voices["en-US"], "zh": voices["zh-CN"]}, "reviewed": False, "clips": mapping}
    plan = output / ("sample-pack.json" if args.samples else "child-pack.json")
    if plan.exists():
        previous = json.loads(plan.read_text())
        if previous.get("speakers") != pack["speakers"]:
            raise ValueError("Output already belongs to different voices; choose a new directory")
        if previous.get("reviewed"):
            raise ValueError("Output was already reviewed; choose a new directory to preserve that review")
    plan.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n")
    semaphore = asyncio.Semaphore(args.concurrency)
    results = {}
    failures = []
    completed = 0
    consecutive_failures = 0
    stopped = asyncio.Event()

    async def one(key, job):
        nonlocal completed, consecutive_failures
        async with semaphore:
            if stopped.is_set():
                failures.append({"key": key, "type": "SkippedAfterServiceFailure"})
                return
            file = output / job["file"]
            try:
                if file.exists():
                    results[key] = {**job, **validate_wav(file), "cached": True}
                else:
                    # Unique temporary files are cleaned on cancellation or conversion errors.
                    with tempfile.TemporaryDirectory(prefix="voice-", dir=str(output)) as work:
                        mp3, wav_file = Path(work) / "source.mp3", Path(work) / "output.wav"
                        communicate = edge_tts.Communicate(job["text"], job["voice"], rate="+0%", pitch="+0Hz")
                        await asyncio.wait_for(communicate.save(str(mp3)), 40)
                        await asyncio.to_thread(convert, mp3, wav_file)
                        info = await asyncio.to_thread(validate_wav, wav_file)
                        os.replace(wav_file, file)
                        results[key] = {**job, **info, "cached": False}
                consecutive_failures = 0
            except Exception as error:
                failures.append({"key": key, "type": type(error).__name__})
                consecutive_failures += 1
                if getattr(error, "status", None) in (401, 403, 429) or consecutive_failures >= 3:
                    stopped.set()
            completed += 1
            if completed % 20 == 0 or completed == len(jobs):
                print(f"{completed}/{len(jobs)} completed; {len(failures)} failed", flush=True)

    await asyncio.gather(*(one(key, job) for key, job in jobs.items()))
    report = {"source": SOURCE, "voices": voices, "sampleOnly": args.samples, "logicalClips": len(mapping), "uniqueRecordings": len(jobs), "readyForReview": not failures, "reviewed": False, "failures": failures, "recordings": results}
    (output / "generation-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(f"Plan: {plan}; reviewed remains false. Generation checks do not prove pronunciation accuracy.")
    if failures:
        raise RuntimeError(f"{len(failures)} recordings failed; rerun to resume successful files")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--samples", action="store_true", help="Only produce dialogue, Chinese, story and all letter auditions")
    parser.add_argument("--english", default=DEFAULT_VOICES["en-US"])
    parser.add_argument("--chinese", default=DEFAULT_VOICES["zh-CN"])
    parser.add_argument("--concurrency", type=int, choices=[1, 2, 4, 8], default=2)
    args = parser.parse_args()
    try:
        asyncio.run(generate(args))
    except (Exception, KeyboardInterrupt) as error:
        print(f"Generation stopped: {type(error).__name__}: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
