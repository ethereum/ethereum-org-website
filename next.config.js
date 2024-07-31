/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")
const { withSentryConfig } = require("@sentry/nextjs")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const { i18n } = require("./next-i18next.config")

const LIMIT_CPUS = Number(process.env.LIMIT_CPUS ?? 2)

const experimental = LIMIT_CPUS
  ? {
      // This option could be enabled in the future when flagged as stable, to speed up builds
      // (see https://nextjs.org/docs/pages/building-your-application/configuring/mdx#using-the-rust-based-mdx-compiler-experimental)
      // mdxRs: true,

      // Reduce the number of cpus and disable parallel threads in prod envs to consume less memory
      workerThreads: false,
      cpus: LIMIT_CPUS,
    }
  : {}

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  let nextConfig = {
    ...defaultConfig,
    reactStrictMode: true,
    webpack: (config, { webpack }) => {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: "yaml-loader",
      })
      config.module.rules.push({
        test: /\.svg$/,
        use: "@svgr/webpack",
      })

      // Tree shake Sentry debug code
      // ref. https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/#tree-shaking-with-nextjs
      config.plugins.push(
        new webpack.DefinePlugin({
          __SENTRY_DEBUG__: false,
          __RRWEB_EXCLUDE_IFRAME__: true,
          __RRWEB_EXCLUDE_SHADOW_DOM__: true,
          __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
        })
      )

      return config
    },
    i18n,
    trailingSlash: true,
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1504, 1920],
    },
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig = {
      ...nextConfig,
      experimental: {
        ...experimental,
        outputFileTracingExcludes: {
          "*": [
            /**
             * Exclude these paths from the trace output to avoid bloating the
             * Netlify functions bundle.
             *
             * @see https://github.com/orgs/vercel/discussions/103#discussioncomment-5427097
             * @see https://nextjs.org/docs/app/api-reference/next-config-js/output#automatically-copying-traced-files
             */
            "node_modules/@swc/core-linux-x64-gnu",
            "node_modules/@swc/core-linux-x64-musl",
            "node_modules/@esbuild/linux-x64",
            "public/**/*.png",
            "public/**/*.gif",
            "src/data",
          ],
        },
      },
    }
  }

  return withBundleAnalyzer(
    withSentryConfig(nextConfig, {
      // TODO: temp config, update this to the correct org & project
      org: "ethereumorg-ow",
      project: "javascript-nextjs",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      disableLogger: true,
      release: `${process.env.BUILD_ID}_${process.env.REVIEW_ID}`,
    })
  )
}
