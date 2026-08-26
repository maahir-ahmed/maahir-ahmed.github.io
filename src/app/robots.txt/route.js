export const dynamic = 'force-dynamic'

// Real directives only. The CTF breadcrumb lives in /.well-known/security.txt:
// Cloudflare serves its own robots.txt for this zone, so a hint here would be
// invisible in production and duplicate the one that does work.
export async function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
