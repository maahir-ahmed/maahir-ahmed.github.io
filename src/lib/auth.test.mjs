import assert from 'node:assert/strict'
import test from 'node:test'

process.env.SESSION_SECRET = 'x'.repeat(48)

const {
  createToken,
  hashPassword,
  recordFailure,
  throttle,
  verifyPassword,
  verifyToken,
} = await import('./auth.js')

test('password round-trips and rejects the wrong one', () => {
  const stored = hashPassword('correct horse battery staple')
  assert.equal(verifyPassword('correct horse battery staple', stored), true)
  assert.equal(verifyPassword('wrong', stored), false)
})

test('password verification rejects junk instead of throwing', () => {
  for (const junk of ['', 'nosalt', 'salt:notpaddedhex', 'a:b', undefined, null, 42]) {
    assert.equal(verifyPassword('x', junk), false)
  }
})

test('a salt is generated per hash', () => {
  assert.notEqual(hashPassword('same'), hashPassword('same'))
})

test('a valid token verifies', () => {
  assert.equal(verifyToken(createToken()), true)
})

test('a tampered payload is rejected', () => {
  const [payload, signature] = createToken().split('.')
  const forged = Buffer.from(JSON.stringify({ exp: Date.now() + 1e10 })).toString('base64url')
  assert.notEqual(forged, payload)
  assert.equal(verifyToken(`${forged}.${signature}`), false)
})

test('an expired token is rejected', () => {
  const token = createToken(Date.now() - 24 * 60 * 60 * 1000)
  assert.equal(verifyToken(token), false)
})

test('malformed tokens are rejected instead of throwing', () => {
  for (const junk of ['', 'a', 'a.b', '.', undefined, null, 42, 'a.b.c']) {
    assert.equal(verifyToken(junk), false)
  }
})

test('throttle locks out after repeated failures and expires', () => {
  const key = 'test-key'
  assert.equal(throttle(key), true)
  for (let i = 0; i < 5; i += 1) recordFailure(key)
  assert.equal(throttle(key), false, 'should be locked out')
  assert.equal(throttle(key, Date.now() + 16 * 60 * 1000), true, 'lockout should expire')
})
