import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

const COOKIE = 'admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 12
const KEY_LENGTH = 64

// These run in the Node runtime only (server components / server actions),
// never in middleware, which has no node:crypto.
function secret() {
  const value = process.env.SESSION_SECRET
  if (!value || value.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 characters')
  }
  return value
}

export function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return `${salt}:${scryptSync(password, salt, KEY_LENGTH).toString('hex')}`
}

export function verifyPassword(password, stored) {
  if (typeof password !== 'string' || typeof stored !== 'string') return false
  const [salt, expected] = stored.split(':')
  if (!salt || !expected) return false
  let expectedBuf
  try {
    expectedBuf = Buffer.from(expected, 'hex')
  } catch {
    return false
  }
  if (expectedBuf.length !== KEY_LENGTH) return false
  return timingSafeEqual(scryptSync(password, salt, KEY_LENGTH), expectedBuf)
}

export function sign(payload) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createToken(now = Date.now()) {
  const payload = Buffer.from(
    JSON.stringify({ exp: now + MAX_AGE_SECONDS * 1000 }),
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyToken(token, now = Date.now()) {
  if (typeof token !== 'string') return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(signature)
  if (expected.length !== given.length) return false
  if (!timingSafeEqual(expected, given)) return false

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp > now
  } catch {
    return false
  }
}

// Single-process throttle. The app runs as one container; if it is ever scaled
// out this needs to move to the database.
//
// The global cap exists because the per-key limit alone is spoofable: whoever
// controls their forwarded header controls their key. It also bounds the map,
// since a refused attempt never records a failure. Every scrypt call runs on
// the one main thread, so capping failures also caps that work.
const attempts = new Map()
let globalRecord = { count: 0, first: 0 }
const MAX_ATTEMPTS = 5
const GLOBAL_MAX_ATTEMPTS = 50
const WINDOW_MS = 15 * 60 * 1000

const fresh = (record, now) => Boolean(record) && now - record.first < WINDOW_MS

export function throttle(key, now = Date.now()) {
  if (fresh(globalRecord, now) && globalRecord.count >= GLOBAL_MAX_ATTEMPTS) return false
  const record = attempts.get(key)
  if (!fresh(record, now)) {
    attempts.delete(key)
    return true
  }
  return record.count < MAX_ATTEMPTS
}

export function recordFailure(key, now = Date.now()) {
  if (!fresh(globalRecord, now)) globalRecord = { count: 0, first: now }
  globalRecord.count += 1
  for (const [k, record] of attempts) if (!fresh(record, now)) attempts.delete(k)
  const record = attempts.get(key)
  if (fresh(record, now)) record.count += 1
  else attempts.set(key, { count: 1, first: now })
}

export function clearFailures(key) {
  attempts.delete(key)
}

export const cookieName = COOKIE

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE_SECONDS,
}
