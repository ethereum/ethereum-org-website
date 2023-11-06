const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants")
const i18nConfig = require("./i18n.config.json")

const BUILD_LOCALES = process.env.BUILD_LOCALES
// Supported locales defined in `i18n.config.json`
const locales = BUILD_LOCALES
  ? BUILD_LOCALES.split(",")
  : i18nConfig.map(({ code }) => code)
const experimental =
  (process.env.LIMIT_CPU || "").toLowerCase() === "true"
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
    i18n: { defaultLocale: "en", locales },
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig = { ...nextConfig, experimental }
  }

  return nextConfig
}
