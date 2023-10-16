/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    OPENAI_API: process.env.OPENAI_API,
    NEXT_UNSPLASH_ACCESS: process.env.NEXT_UNSPLASH_ACCESS
  }
}

module.exports = nextConfig
