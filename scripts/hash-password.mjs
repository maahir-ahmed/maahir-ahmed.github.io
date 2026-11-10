// Generates the value for ADMIN_PASSWORD_HASH.
//   npm run admin:hash          (then type the password and press Enter)
// Read from stdin rather than argv, so the password never lands in shell
// history or the process list. The prompt goes to stderr so the output can
// still be piped or pasted cleanly.
import { createInterface } from 'node:readline/promises'
import { hashPassword } from '../src/lib/auth.js'

const rl = createInterface({ input: process.stdin, output: process.stderr })
const password = await rl.question('Password: ')
rl.close()

if (!password) {
  console.error('empty password')
  process.exit(1)
}

console.log(hashPassword(password))
