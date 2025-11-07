// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // LOCALHOST (for development)
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8001',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
        pathname: '/media/**',
      },
      // PRODUCTION (PythonAnywhere)
      {
        protocol: 'https',
        hostname: 'justpythonindia.pythonanywhere.com',
        pathname: '/media/**',
      },
    ],
  },
}

module.exports = nextConfig