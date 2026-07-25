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

function sign(payload) {
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
const attempts = new Map()
const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

export function throttle(key, now = Date.now()) {
  const record = attempts.get(key)
  if (record && record.until > now) return false
  if (record && record.until <= now) attempts.delete(key)
  return true
}

export function recordFailure(key, now = Date.now()) {
  const record = attempts.get(key) ?? { count: 0, until: 0 }
  record.count += 1
  if (record.count >= MAX_ATTEMPTS) {
    record.until = now + LOCKOUT_MS
    record.count = 0
  }
  attempts.set(key, record)
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
