/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      JWT_SECRET: "MZ(j:&~3TF)XkYzGkk:vg.a)^3v(^8sdd23223",
    },
    images: {
      domains: ["res.cloudinary.com", "m.media-amazon.com"],
    },
    experimental: {
      serverComponentsExternalPackages: ['pdf-parse'],
      serverActions: true,
      
    },
  };
  
  module.exports = nextConfig;
  