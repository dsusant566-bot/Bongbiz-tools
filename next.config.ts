import type { NextConfig } from "next";

// @ts-ignore
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig: NextConfig = {
  // এই লাইনটি যোগ করুন যাতে Turbopack এরর না দেয়
  transpilePackages: ["next-pwa"], 
};

export default withPWA(nextConfig);