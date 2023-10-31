/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants")
const i18nConfig = require("./i18n.config.json")

const BUILD_LOCALES = (process.env.BUILD_LOCALES || "").replaceAll(/\s/g, "").split(",").filter(item => item.length > 1)
// Supported locales defined in `i18n.config.json`
const locales = BUILD_LOCALES.length > 0 ? BUILD_LOCALES.sort() : i18nConfig.map((lang) => lang.code).sort()
const experimental = (process.env.LIMIT_CPU || "").toLowerCase() === "true" ? {
  // This option could be enabled in the future when flagged as stable, to speed up builds
  // (see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-the-rust-based-mdx-compiler-experimental)
  // mdxRs: true,

  // Reduce the number of cpus and disable parallel threads in prod envs to consume less memory
  workerThreads: false,
  cpus: 2,
} : {}

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
