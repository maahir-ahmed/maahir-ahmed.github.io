/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-rendered: pages read content from Postgres and /admin edits it.
  //
  // trailingSlash is deliberately off. It was on to match the old static
  // export, but it redirects /api/ctf to /api/ctf/, which route handlers do
  // not match — every API route 404s. Old links just take one 308 hop.
  async rewrites() {
    return [
      // Cloudflare serves its own managed robots.txt for this zone, so the
      // CTF breadcrumb lives at a path the origin still controls.
      { source: '/.well-known/security.txt', destination: '/api/ctf/security-txt' },
    ]
  },
}

export default nextConfig
