/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ["page.tsx", "endpoint.ts"],
};

module.exports = nextConfig;
