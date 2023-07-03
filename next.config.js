/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./src/i18n.ts");

const nextConfig = {
    reactStrictMode: false
}

module.exports = withNextIntl(nextConfig);
