/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // CMS-uploaded media (Supabase Storage public bucket) — without this,
      // next/image fails to optimize/serve any admin-uploaded image.
      {
        protocol: "https",
        hostname: "qsxtivgcxikyamkmegwo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // The old static site served the homepage from home.html, so "/home"
      // is muscle memory / a bookmarked habit — send it to the real route.
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Deliberately just the standard, low-risk headers — no CSP here. A
    // real Content-Security-Policy would need to enumerate every third
    // party this site actually loads (Google Fonts, GA/GTM, Meta Pixel,
    // YouTube embeds, Google Maps embed) and is easy to get subtly wrong in
    // a way that silently breaks one of them; better done as a deliberate,
    // separately-tested follow-up than bundled into an SEO/audit pass.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
