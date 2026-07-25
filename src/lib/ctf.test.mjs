import assert from 'node:assert/strict'
import test from 'node:test'

process.env.SESSION_SECRET = 'y'.repeat(48)

const {
  CHALLENGES,
  TOTAL,
  checkFlag,
  decodeProgress,
  encodeProgress,
  hintFor,
  publicState,
  readFile,
  listFiles,
} = await import('./ctf.js')

test('every challenge has a distinct id and flag', () => {
  assert.equal(new Set(CHALLENGES.map(c => c.id)).size, TOTAL)
  assert.equal(new Set(CHALLENGES.map(c => c.flag)).size, TOTAL)
})

test('correct flags map to their challenge', () => {
  for (const challenge of CHALLENGES) {
    assert.equal(checkFlag(challenge.flag), challenge.id)
    assert.equal(checkFlag(`  ${challenge.flag}  `), challenge.id, 'should tolerate whitespace')
  }
})

test('wrong flags are rejected without throwing', () => {
  for (const junk of ['', '   ', 'CTF{nope}', 'ctf{h1dd3n_1n_c0d3_b10ck}', undefined, null, 42, {}]) {
    assert.equal(checkFlag(junk), null)
  }
})

test('cat cannot escape the file allowlist', () => {
  for (const name of ['../package.json', '/etc/passwd', '__proto__', 'constructor', 'toString']) {
    assert.equal(readFile(name), null, `${name} must not resolve`)
  }
  assert.ok(Array.isArray(readFile('secret.txt')))
  assert.deepEqual(listFiles().includes('secret.txt'), true)
})

test('progress round-trips', () => {
  const cookie = encodeProgress(['source', 'binary'])
  assert.deepEqual(decodeProgress(cookie), ['source', 'binary'])
})

test('tampered or forged progress is discarded', () => {
  const cookie = encodeProgress(['source'])
  const [payload, signature] = cookie.split('.')
  const forged = Buffer.from(JSON.stringify(CHALLENGES.map(c => c.id))).toString('base64url')
  assert.deepEqual(decodeProgress(`${forged}.${signature}`), [], 'unsigned payload must not count')
  assert.deepEqual(decodeProgress(`${payload}.deadbeef`), [])
  for (const junk of ['', 'a', 'a.b', undefined, null, 42]) {
    assert.deepEqual(decodeProgress(junk), [])
  }
})

test('unknown ids are stripped from progress', () => {
  assert.deepEqual(decodeProgress(encodeProgress(['source', 'not-a-real-id'])), ['source'])
})

test('public state never leaks a flag value', () => {
  const serialised = JSON.stringify(publicState(['source']))
  for (const challenge of CHALLENGES) {
    assert.equal(serialised.includes(challenge.flag), false, `${challenge.id} leaked`)
  }
})

test('hints advance and run out', () => {
  assert.equal(hintFor([]), CHALLENGES[0].hint)
  assert.equal(hintFor([CHALLENGES[0].id]), CHALLENGES[1].hint)
  assert.equal(hintFor(CHALLENGES.map(c => c.id)), null)
})
