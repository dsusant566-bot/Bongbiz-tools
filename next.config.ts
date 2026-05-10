import type { NextConfig } from "next";

// @ts-ignore
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: any = {
  transpilePackages: ["next-pwa"],
  turbopack: {},
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default withPWA(nextConfig);