// @ts-check

import NextIntlPlugin from "next-intl/plugin";

const withNextIntl = NextIntlPlugin("./src/i18n.tsx");

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
