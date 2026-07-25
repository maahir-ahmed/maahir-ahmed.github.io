/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-rendered: pages read content from Postgres and /admin edits it.
  // Kept from the old static export so existing URLs don't gain a redirect hop.
  trailingSlash: true,
}

export default nextConfig
