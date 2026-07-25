import { NextResponse } from 'next/server'
import { listFiles, readFile } from '../../../../lib/ctf'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const name = request.nextUrl.searchParams.get('file')
  if (!name) return NextResponse.json({ files: listFiles() })

  const lines = readFile(name)
  if (!lines) {
    return NextResponse.json(
      { error: `cat: ${name}: No such file or directory` },
      { status: 404 },
    )
  }
  return NextResponse.json({ name, lines })
}
