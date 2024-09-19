/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DOMAIN: process.env.DOMAIN,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
