/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirects for URLs users are actually hitting that would otherwise 404.
  // /services/bGFuZGluZy is base64 for "landing" — a bad/encoded link that
  // real visitors are landing on. The real service page is
  // /services/landing-page-design. A 301 sends them (and search engines)
  // to the right page instead of the 404.
  async redirects() {
    return [
      {
        source: "/services/bGFuZGluZy",
        destination: "/services/landing-page-design",
        permanent: true,
      },
    ];
  },
  images: {
    // Templates use real photography hotlinked from Unsplash (verified live
    // URLs). Only images.unsplash.com is allowed, so no other remote host
    // can be pulled in through next/image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
};
module.exports = nextConfig;
