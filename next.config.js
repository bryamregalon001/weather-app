/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // This makes the environment variables available to the browser
    NEXT_PUBLIC_WEATHER_API_KEY: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
  // Enable static exports for the app directory
  output: 'export',
  // Optional: Add a trailing slash to all paths
  trailingSlash: true,
  // Optional: Change the output directory
  distDir: 'out',
};

module.exports = nextConfig;
