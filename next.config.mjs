/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages deployment
  // Build output goes to `out/` — deploy that folder via gh-pages or GitHub Actions
  output: 'export',
  trailingSlash: true,
}

export default nextConfig
