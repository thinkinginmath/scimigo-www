/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    // Enable CSS processing for Tailwind v4
    turbo: {
      rules: {
        '*.css': {
          loaders: ['postcss-loader'],
        },
      },
    },
  },
}

module.exports = nextConfig