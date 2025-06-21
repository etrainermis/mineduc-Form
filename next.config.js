/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // <-- here at root
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;