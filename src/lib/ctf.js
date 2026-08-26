// SERVER ONLY. Never import this from a client component: it holds the flag
// answers. The client learns whether a submission was right, never what the
// answers are.
import { timingSafeEqual } from 'node:crypto'
import { sign } from './auth.js'

// The chain is deliberately ordered: every hint ends by pointing at the
// mechanism the next stage needs. `hintFor` walks it top to bottom.
export const CHALLENGES = [
  {
    id: 'source',
    label: 'Hidden in Plain Sight',
    flag: 'CTF{H1dd3n_1n_C0d3_B10ck}',
    hint: 'The about_me.py block on the home page renders more text than it shows you. Drag-select the whole block, or just read the page source.',
  },
  {
    id: 'console',
    label: 'Developer Tools',
    flag: 'CTF{C0ns0l3_S4ys_H3ll0}',
    hint: 'The site greets anyone who opens developer tools. The greeting is not on the page — check the Console tab.',
  },
  {
    id: 'base64',
    label: 'Base64',
    flag: 'CTF{B45364_Unm45k3d}',
    hint: 'Back in this terminal: run "ls", then "cat secret.txt". The trailing "=" is the giveaway. Finish it with "decode base64 <text>".',
  },
  {
    id: 'caesar',
    label: 'Caesar Cipher',
    flag: 'CTF{C43s4r_C1ph3r_M4st3r}',
    hint: '"cat encrypted.txt". Rotate the alphabet halfway around: "cipher caesar 13 <text>".',
  },
  {
    id: 'binary',
    label: 'Binary',
    flag: 'CTF{B1n4ry_D3c0d3r}',
    hint: '"cat decoder.py" holds a long run of ones and zeroes. Eight bits to a character: "decode binary <bits>".',
  },
  {
    id: 'headers',
    label: 'Response Headers',
    flag: 'CTF{H34d3rs_T3ll_T4l3s}',
    hint: '"cat notes.md". This terminal talks to a real server, and a response is more than its body — run "curl /api/ctf" and read every header it prints.',
  },
  {
    id: 'robots',
    label: 'Forbidden Path',
    flag: 'CTF{R0b0ts_Kn0w_B3st}',
    hint: 'Any researcher checks one well-known file first: "curl /.well-known/security.txt". Then go exactly where it says not to.',
  },
  {
    id: 'cookie',
    label: 'Privilege Escalation',
    flag: 'CTF{C00k135_4r3_N0t_4uth}',
    hint: 'The vault knew you were only a guest — something in your browser told it so. Dev tools, Application, Cookies: promote yourself, then "curl /api/ctf/vault" again.',
  },
]

export const TOTAL = CHALLENGES.length

const flagFor = (id) => CHALLENGES.find((c) => c.id === id).flag

// The header flag rides on every /api/ctf response.
export const WHISPER_HEADER = 'X-Ctf-Whisper'
export const WHISPER_FLAG = flagFor('headers')
export const VAULT_FLAG = flagFor('robots')
export const ADMIN_FLAG = flagFor('cookie')
export const VAULT_PATH = '/api/ctf/vault'

// Deliberately unsigned and client-readable, unlike PROGRESS_COOKIE below.
// Trusting it is the vulnerability the 'cookie' stage teaches.
export const ROLE_COOKIE = 'ctf_role'

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
    '- this terminal reaches the real backend now: try "curl /api/ctf"',
    '- remember a response is more than its body; read the headers too',
    '- publish /.well-known/security.txt before a researcher asks for it',
    '- stop trusting the role cookie in /api/ctf/vault (nobody has done this)',
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
