/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const { i18n } = require("./next-i18next.config")

module.exports = {
  reactStrictMode: true,
  i18n,
  // This option could be enabled in the future when flagged as stable, to speed up builds
  // (see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-the-rust-based-mdx-compiler-experimental)
  // experimental: {
  //   mdxRs: true,
  // },
}
