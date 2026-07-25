import { NextResponse } from 'next/server'
import { VAULT_FLAG } from '../../../../lib/ctf'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    message: 'You were told not to come here. Submit this with: flag <value>',
    flag: VAULT_FLAG,
  })
}
