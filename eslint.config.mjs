import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".open-next/", ".next/", ".wrangler/"] },
  ...nextConfig,
];

export default config;
