/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirects for URLs users are actually hitting that would otherwise 404.
  // /services/bGFuZGluZy is base64 for "landing" — a bad/encoded link that
  // real visitors are landing on. The real service page is
  // /services/landing-page-design. A 301 sends them (and search engines)
  // to the right page instead of the 404.
  //
  // /services/video-and-animation (added 2026-11-23): no service uses this
  // slug — the video service is /services/video-editing-motion-graphics.
  // Visitors typing the shorter name got a 404; this sends them to the
  // real page instead.
  //
  // NOTE: the .ca → .com redirect is deliberately NOT in this file.
  // Faizan deferred it 2026-11-23 ("Not yet") until the .ca DNS is fixed
  // at GoDaddy — see MEMORY.md. Do not re-add it until then.
  async redirects() {
    return [
      {
        source: "/services/video-and-animation",
        destination: "/services/video-editing-motion-graphics",
        permanent: true,
      },
      {
        source: "/services/bGFuZGluZy",
        destination: "/services/landing-page-design",
        permanent: true,
      },
      {
        source: "/services/d2Vic2l0ZS",
        destination: "/services/website-design-development",
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
