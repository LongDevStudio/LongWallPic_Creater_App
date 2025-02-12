import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false,
    dirs: [
      "app",
      "components",
      "config",
      "contexts",
      "i18n",
      "lib",
      "messages",
      "middleware",
      "models",
      "service",
      "type",
      "utils",
    ],
  },
};

export default withNextIntl(nextConfig);
