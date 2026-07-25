// Generates the value for ADMIN_PASSWORD_HASH.
//   node scripts/hash-password.mjs 'your password'
import { hashPassword } from '../src/lib/auth.js'

const password = process.argv[2]
if (!password) {
  console.error("usage: node scripts/hash-password.mjs 'your password'")
  process.exit(1)
}

console.log(hashPassword(password))
