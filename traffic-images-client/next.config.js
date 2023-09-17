/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => [
    {
      source: "/internal/server/:path*",
      destination: `${process.env.TRAFFIC_IMAGES_SERVER_HOST}/:path*`,
    },
    {
      source: "/api/proxy/http/:path*",
      destination: `${process.env.DATA_GOV_HOST}/:path*`,
    },
  ],
};

module.exports = nextConfig;
