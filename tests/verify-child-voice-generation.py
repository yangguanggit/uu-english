"""Offline checks for the optional audio-production script; no synthesis requests."""
import importlib.util
from array import array
import json
from pathlib import Path
import tempfile
import unittest
import wave

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("child_voice", ROOT / "scripts/generate-child-voice.py")
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)


class GenerationTests(unittest.TestCase):
    def test_truncated_cached_recordings_are_not_accepted(self):
        with tempfile.TemporaryDirectory() as work:
            file = Path(work) / 'cached.wav'
            with wave.open(str(file), 'wb') as audio:
                audio.setnchannels(1)
                audio.setsampwidth(2)
                audio.setframerate(24000)
                audio.writeframes(array('h', [1000, -1000] * 2400).tobytes())
            self.assertAlmostEqual(generator.validate_wav(file)['seconds'], .2)
            # Leave audible PCM, but fewer frames than the WAV header promises.
            file.write_bytes(file.read_bytes()[:-100])
            with self.assertRaisesRegex(ValueError, 'truncated'):
                generator.validate_wav(file)

    def test_full_catalog_deduplicates_without_replacing_phonemes(self):
        rows = json.loads((ROOT / "audio/metadata/learning-manifest.json").read_text())
        jobs, mapping = generator.jobs_for(rows, generator.DEFAULT_VOICES)
        self.assertEqual(set(mapping), {row["file"] for row in rows if row.get("synthesis") != "original-human-recording"})
        self.assertLess(len(jobs), len(mapping))
        self.assertTrue(all(not key.startswith("osu-english-") for key in mapping))
        self.assertTrue(all(clip["baseRate"] == 1 for clip in mapping.values()))
        self.assertEqual(mapping["milk-please.wav"], mapping["milk-please-slow.wav"])

    def test_letter_names_and_uu_are_preserved(self):
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            self.assertEqual(generator.source_text({"text": letter, "sourceText": letter.lower(), "characterMode": "LTRL"}), letter + ".")
        self.assertEqual(generator.source_text({"text": "My name is UU."}), "My name is U U.")
        self.assertEqual(generator.source_text({"text": "牛奶", "sourceText": "牛奶"}), "牛奶")

    def test_voice_change_uses_distinct_cache_keys(self):
        rows = [{"file": "word.wav", "text": "apple", "locale": "en-US"}]
        _, original = generator.jobs_for(rows, generator.DEFAULT_VOICES)
        _, changed = generator.jobs_for(rows, {**generator.DEFAULT_VOICES, "en-US": "test-other-voice"})
        self.assertNotEqual(original, changed)

    def test_empty_and_silent_files_are_not_accepted(self):
        with tempfile.TemporaryDirectory() as work:
            file = Path(work) / "silent.wav"
            with wave.open(str(file), "wb") as audio:
                audio.setnchannels(1)
                audio.setsampwidth(2)
                audio.setframerate(24000)
                audio.writeframes(bytes(24000))
            with self.assertRaisesRegex(ValueError, "Silent"):
                generator.validate_wav(file)
            file.write_bytes(b"invalid")
            with self.assertRaises((EOFError, wave.Error)):
                generator.validate_wav(file)


if __name__ == "__main__":
    unittest.main()
