/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do not set `turbopack.root` to this package dir — it breaks Tailwind v4 `@import "tailwindcss"`
  // (resolved from the parent folder). See https://github.com/vercel/next.js/issues/90307
  //
  // With multiple lockfiles, `next dev` (Turbopack) can also infer the wrong app root. Use
  // `npm run dev` (Webpack) for a reliable local server; try `npm run dev:turbo` only if needed.
}

export default nextConfig
