/** @type {import('next').NextConfig} */

const i18nConfig = require("./i18n.config.json")

module.exports = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    // supported locales defined in `i18n.config.json`
    locales: i18nConfig.map((lang) => lang.code).sort(),
  },
  // This option could be enabled in the future when flagged as stable, to speed up builds
  // (see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-the-rust-based-mdx-compiler-experimental)
  // experimental: {
  //   mdxRs: true,
  // },
}
