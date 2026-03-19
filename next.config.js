/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/OASIS-EXOTIC-MANGO",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
