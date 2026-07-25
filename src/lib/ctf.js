// SERVER ONLY. Never import this from a client component: it holds the flag
// answers. The client learns whether a submission was right, never what the
// answers are.
import { timingSafeEqual } from 'node:crypto'
import { sign } from './auth.js'

export const CHALLENGES = [
  {
    id: 'source',
    label: 'Source Code',
    flag: 'CTF{H1dd3n_1n_C0d3_B10ck}',
    hint: 'Look at the Python code block on the home page. Something is hiding in plain sight.',
  },
  {
    id: 'devtools',
    label: 'Developer Tools',
    flag: 'CTF{D3v3l0p3r_T00ls_4r3_C00l}',
    hint: 'View the page source and read the comments the browser does not render.',
  },
  {
    id: 'base64',
    label: 'Base64',
    flag: 'CTF{B45364_Unm45k3d}',
    hint: 'Run "ls", then "cat secret.txt". That padding at the end is a giveaway.',
  },
  {
    id: 'caesar',
    label: 'Caesar Cipher',
    flag: 'CTF{C43s4r_C1ph3r_M4st3r}',
    hint: '"cat encrypted.txt". Rot the alphabet halfway around: cipher caesar 13 <text>.',
  },
  {
    id: 'binary',
    label: 'Binary',
    flag: 'CTF{B1n4ry_D3c0d3r}',
    hint: '"cat decoder.py" has a long run of ones and zeroes. Eight bits to a character.',
  },
  {
    id: 'headers',
    label: 'Response Headers',
    flag: 'CTF{H34d3rs_T3ll_T4l3s}',
    hint: 'The terminal talks to a real server now. A response says more than its body — "curl /api/ctf" and read every header.',
  },
  {
    id: 'robots',
    label: 'Forbidden Path',
    flag: 'CTF{R0b0ts_Kn0w_B3st}',
    hint: 'Security folks always check one well-known file before anything else. "curl /.well-known/security.txt", then go exactly where it says not to.',
  },
]

export const TOTAL = CHALLENGES.length

// The header flag rides on every /api/ctf response.
export const WHISPER_HEADER = 'X-Ctf-Whisper'
export const WHISPER_FLAG = CHALLENGES.find((c) => c.id === 'headers').flag
export const VAULT_FLAG = CHALLENGES.find((c) => c.id === 'robots').flag
export const VAULT_PATH = '/api/ctf/vault'

// A fixed map, not a filesystem read: "cat" can never escape this object.
export const FILES = {
  'secret.txt': [
    'Q1RGe0I0NTM2NF9Vbm00NWszZH0=',
    '',
    'Hint: this looks like Base64...',
  ],
  'encrypted.txt': [
    'Message 1: Gur frperg vf va gur pbqr. Ybbx pybfryl ng gur Clguba oybpx.',
    'Message 2: PGS{P43f4e_P1cu3e_Z4fg3e}',
    '',
    'Hint: Caesar cipher with shift 13...',
  ],
  'decoder.py': [
    '#!/usr/bin/env python3',
    'import base64',
    'import binascii',
    '',
    '# Binary message:',
    '# 01000011010101000100011001111011010000100011000101101110001101000111001001111001010111110100010000110011011000110011000001100100001100110111001001111101',
    '',
    '# Use: decode binary <binary_string>',
  ],
  'notes.md': [
    '# TODO',
    '- the terminal can reach the server now: try "curl /api/ctf"',
    '- check /.well-known/security.txt like any decent researcher would',
  ],
}

export function listFiles() {
  return Object.keys(FILES)
}

export function readFile(name) {
  // own-property check so "constructor"/"__proto__" can't be reached
  return Object.hasOwn(FILES, name) ? FILES[name] : null
}

function normalise(value) {
  return String(value ?? '').trim()
}

export function checkFlag(input) {
  const candidate = normalise(input)
  if (!candidate) return null
  for (const challenge of CHALLENGES) {
    const a = Buffer.from(candidate)
    const b = Buffer.from(challenge.flag)
    if (a.length === b.length && timingSafeEqual(a, b)) return challenge.id
  }
  return null
}

const VALID_IDS = new Set(CHALLENGES.map((c) => c.id))

export const PROGRESS_COOKIE = 'ctf_progress'

export function encodeProgress(ids) {
  const clean = [...new Set(ids)].filter((id) => VALID_IDS.has(id))
  const payload = Buffer.from(JSON.stringify(clean)).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function decodeProgress(cookie) {
  if (typeof cookie !== 'string') return []
  const [payload, signature] = cookie.split('.')
  if (!payload || !signature) return []

  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(signature)
  if (expected.length !== given.length) return []
  if (!timingSafeEqual(expected, given)) return []

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return Array.isArray(parsed) ? parsed.filter((id) => VALID_IDS.has(id)) : []
  } catch {
    return []
  }
}

// What the client is allowed to know: labels, hints and which ids are solved.
export function publicState(solved) {
  return {
    total: TOTAL,
    solved,
    stages: CHALLENGES.map((c) => ({
      id: c.id,
      label: c.label,
      solved: solved.includes(c.id),
    })),
  }
}

export function hintFor(solved) {
  const next = CHALLENGES.find((c) => !solved.includes(c.id))
  return next ? next.hint : null
}
