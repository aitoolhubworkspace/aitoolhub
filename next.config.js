/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    SITE_URL: process.env.SITE_URL || 'https://aitoolhub.vercel.app',
  }
}

module.exports = nextConfig
