/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "unsplash.com",
      "plus.unsplash.com",
      "image-us.samsung.com",
      // Add other domains here if needed
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
