import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function* jsxFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const child = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir)
    if (entry.isDirectory()) yield* jsxFiles(child)
    else if (entry.name.endsWith('.jsx')) yield child
  }
}

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

// The two client-side stages live in components, not in this module, so guard
// against them drifting out of sync — or being written in a way that never
// reaches the browser at all.
const readSrc = (rel) => readFileSync(new URL(rel, import.meta.url), 'utf8')

test('client-side flags are shipped by the components that own them', () => {
  const flagOf = (id) => CHALLENGES.find(c => c.id === id).flag
  assert.match(readSrc('../components/main/Hero.jsx'), new RegExp(escapeRe(flagOf('source'))))
  assert.match(readSrc('../App.jsx'), new RegExp(`console\\.log\\([^)]*${escapeRe(flagOf('console'))}`))
})

test('no flag is hidden in a JSX comment', () => {
  // {/* ... */} is a JS expression comment: it compiles to nothing and never
  // appears in the served HTML, so a flag placed there is unsolvable.
  for (const file of jsxFiles(new URL('../', import.meta.url))) {
    for (const [comment] of readFileSync(file, 'utf8').matchAll(/\{\/\*[\s\S]*?\*\/\}/g)) {
      assert.equal(comment.includes('CTF{'), false, `unreachable flag in ${file.pathname}`)
    }
  }
})
