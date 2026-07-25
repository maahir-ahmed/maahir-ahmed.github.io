import { VAULT_PATH } from '../../../../lib/ctf'

export const dynamic = 'force-dynamic'

// Served at /.well-known/security.txt via a rewrite in next.config.mjs.
export async function GET() {
  const body = [
    'Contact: https://maahirahmed.com/#contact',
    'Preferred-Languages: en',
    'Canonical: https://maahirahmed.com/.well-known/security.txt',
    '',
    '# Nothing here is in scope, but since you looked:',
    `# Disallow: ${VAULT_PATH}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
