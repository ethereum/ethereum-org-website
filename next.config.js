/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants")
const i18nConfig = require("./i18n.config.json")

const BUILD_LANGS = (process.env.BUILD_LANGS || "").replaceAll(/\s/g, "").split(",").filter(item => item.length > 1)

module.exports = (phase, { defaultConfig }) => {
  let nextConfig = {
    ...defaultConfig,
    reactStrictMode: true,
    i18n: {
      defaultLocale: "en",
      // supported locales defined in `i18n.config.json`
      locales: BUILD_LANGS.length > 0 ? BUILD_LANGS.sort() : i18nConfig.map((lang) => lang.code).sort(),
    },
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig = {
      ...nextConfig,
      experimental: {
        // This option could be enabled in the future when flagged as stable, to speed up builds
        // (see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-the-rust-based-mdx-compiler-experimental)
        //   mdxRs: true,

        // Reduce the number of cpus and disable parallel threads in prod envs
        // to consume less memory
        workerThreads: false,
        cpus: 2,
      },
    }
  }

  return nextConfig
}
