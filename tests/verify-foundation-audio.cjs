const {root}=require('./helpers/paths.cjs');
// Source/mapping and playback-integrity checks; these do not grade pronunciation.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(root + '/data/foundation/foundation-data.js', 'utf8'), context);
const data = context.window.BEAR_FOUNDATIONS;
const manifest = JSON.parse(fs.readFileSync(root + '/audio/metadata/learning-manifest.json'));
const provenance = JSON.parse(fs.readFileSync(root + '/audio/metadata/foundation-voice.json'));
assert.equal(data.letters.length, 26);
assert.equal(data.phonemes.length, 24);
assert.equal(provenance.length, 50);
assert.equal(new Set(provenance.map(row => row.file)).size, 50);
for (const unit of [...data.letters, ...data.phonemes]) {
  const filename = unit.audio + '.' + (unit.extension || 'wav');
  const clip = manifest.find(row => row.file === filename);
  assert.ok(clip, unit.id + ' must resolve to an audio file');
  assert.deepEqual(clip, provenance.find(row => row.file === filename));
  const bytes = fs.readFileSync(root + '/audio/' + clip.asset);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), clip.sha256);
  assert.equal(clip.gain, 1, 'Do not amplify synthetic stop-consonant noise');
  assert.equal(clip.pitchChanged, false);
  if (unit.kind === 'letters') {
    assert.equal(unit.text, unit.label);
    assert.equal(clip.sourceText, unit.label.toLowerCase(), 'Uppercase literal input adds an audible capital prefix');
    assert.equal(clip.characterMode, 'LTRL', 'Force alphabet spelling instead of interpreting isolated A/I as words');
    assert.equal(clip.synthesis, 'NSSpeechSynthesizer.characterMode.literal');
    assert.equal(clip.voiceIdentifier, 'com.apple.voice.compact.en-US.Samantha');
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.readUInt32LE(24), 24000);
    assert.equal(bytes.readUInt16LE(34), 16);
    assert.ok(clip.seconds > .3 && clip.seconds < 3);
  } else {
    const code = unit.symbol.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    assert.equal(filename, `osu-english-${code}-v1.wav`);
    assert.equal(clip.symbol, unit.symbol);
    assert.equal(clip.publisher, 'The Ohio State University');
    assert.equal(clip.speaker, 'Philip Neal Whitman');
    assert.equal(clip.sourceDocument, 'https://ielp.ehe.osu.edu/files/2025/09/IPA_English.pdf');
    assert.ok(clip.sourceField && clip.sourcePcmSha256 && clip.sourceDocumentSha256);
    assert.match(clip.license, /Attribution-NonCommercial/);
    assert.equal(clip.modified, false);
    assert.equal(clip.synthesis, 'original-human-recording');
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.readUInt32LE(24), 44100);
    assert.equal(bytes.readUInt16LE(34), 16);
    assert.ok(clip.seconds > .3 && clip.seconds < 2);
    assert.ok(clip.peakDbfs < 0 && clip.rmsDbfs > -35);
    assert.ok(bytes.length > 1000);
  }
}
console.log('PASS: 26 literal letter-name mappings, 24 OSU English-teaching source mappings and lossless WAV assets, asset hashes, no amplification or pitch changes. Pronunciation requires listening review.');
