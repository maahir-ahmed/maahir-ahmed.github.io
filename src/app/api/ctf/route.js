import { NextResponse } from 'next/server'
import {
  PROGRESS_COOKIE,
  WHISPER_FLAG,
  WHISPER_HEADER,
  checkFlag,
  decodeProgress,
  encodeProgress,
  hintFor,
  publicState,
} from '../../../lib/ctf'

export const dynamic = 'force-dynamic'

const COOKIE_OPTIONS = {
  httpOnly: false, // the point of the game is that players can poke at it
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
}

// Flag guessing is cheap for us but should not be free: one submission per
// second per address, bursting to 10.
const buckets = new Map()
const BURST = 10
const REFILL_MS = 1000

function allow(key, now = Date.now()) {
  const bucket = buckets.get(key) ?? { tokens: BURST, at: now }
  const gained = Math.floor((now - bucket.at) / REFILL_MS)
  bucket.tokens = Math.min(BURST, bucket.tokens + gained)
  if (gained > 0) bucket.at = now
  if (bucket.tokens <= 0) {
    buckets.set(key, bucket)
    return false
  }
  bucket.tokens -= 1
  buckets.set(key, bucket)
  return true
}

function clientKey(request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? ''
  return forwarded.split(',')[0].trim() || 'unknown'
}

function withWhisper(response) {
  response.headers.set(WHISPER_HEADER, WHISPER_FLAG)
  return response
}

function solvedFrom(request) {
  return decodeProgress(request.cookies.get(PROGRESS_COOKIE)?.value)
}

export async function GET(request) {
  const solved = solvedFrom(request)
  return withWhisper(
    NextResponse.json({ ...publicState(solved), hint: hintFor(solved) }),
  )
}

export async function POST(request) {
  if (!allow(clientKey(request))) {
    return withWhisper(
      NextResponse.json({ error: 'Slow down — too many attempts.' }, { status: 429 }),
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return withWhisper(NextResponse.json({ error: 'Expected JSON.' }, { status: 400 }))
  }

  const solved = solvedFrom(request)
  const id = checkFlag(body?.flag)

  if (!id) {
    return withWhisper(
      NextResponse.json({ correct: false, ...publicState(solved) }),
    )
  }

  const already = solved.includes(id)
  const next = already ? solved : [...solved, id]

  const response = withWhisper(
    NextResponse.json({
      correct: true,
      already,
      id,
      ...publicState(next),
      hint: hintFor(next),
    }),
  )
  response.cookies.set(PROGRESS_COOKIE, encodeProgress(next), COOKIE_OPTIONS)
  return response
}
