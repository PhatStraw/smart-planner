/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    OPENAI_API: process.env.OPENAI_API
  }
}

module.exports = nextConfig
