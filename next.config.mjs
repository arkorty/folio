/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*webark.in",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "v1.screenshot.11ty.dev",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
