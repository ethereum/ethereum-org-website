const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const { i18n } = require("./next-i18next.config")

const experimental = (process.env.LIMIT_CPU || "").toLowerCase() === "true"
  ? {
    // This option could be enabled in the future when flagged as stable, to speed up builds
    // (see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-the-rust-based-mdx-compiler-experimental)
    // mdxRs: true,

    // Reduce the number of cpus and disable parallel threads in prod envs to consume less memory
    workerThreads: false,
    cpus: 2,
  }
  : {}

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  let nextConfig = {
    ...defaultConfig,
    reactStrictMode: true,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: 'yaml-loader',
      });
      config.module.rules.push({
        test: /\.svg$/,
        use: '@svgr/webpack',
      })
      config.module.rules.push({
        test: /\.mp4$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      });

      return config;
    },
    i18n,
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig = { ...nextConfig, experimental }
  }

  return nextConfig
}
