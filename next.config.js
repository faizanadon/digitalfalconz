/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
