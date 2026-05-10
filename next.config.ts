import type { NextConfig } from "next";

// @ts-ignore
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: NextConfig = {
  transpilePackages: ["next-pwa"],
  // Attempt to resolve Turbopack conflict as per user instructions
  // Note: 'turbopack' might not be a recognized property directly in NextConfig for all Next.js versions.
  // This is a direct attempt based on user's suggestion.
  turbopack: {},
};

export default withPWA(nextConfig);