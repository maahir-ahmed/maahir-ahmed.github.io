import { NextResponse } from 'next/server'
import { ADMIN_FLAG, ROLE_COOKIE, VAULT_FLAG } from '../../../../lib/ctf'

export const dynamic = 'force-dynamic'

// Trusting a client-set cookie for authorisation is the whole point: this is
// the bug the 'cookie' stage wants players to find and abuse.
export async function GET(request) {
  const role = request.cookies.get(ROLE_COOKIE)?.value ?? 'guest'

  if (role !== 'admin') {
    return NextResponse.json({
      message: 'You were told not to come here. Submit this with: flag <value>',
      flag: VAULT_FLAG,
      role,
      staff_only: 'Redacted. Your session says role=guest, and the vault believes it.',
    })
  }

  return NextResponse.json({
    message: 'Welcome back, admin. The vault never checked whether you really were one.',
    flag: VAULT_FLAG,
    role,
    staff_only: ADMIN_FLAG,
  })
}
