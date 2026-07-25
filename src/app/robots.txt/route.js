export const dynamic = 'force-dynamic'

// Real directives for crawlers, and a deliberate breadcrumb for the CTF.
export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /api/ctf/vault',
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
