/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/scimigo-www',
  assetPrefix: '/scimigo-www/',
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