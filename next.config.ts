import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/catalog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
