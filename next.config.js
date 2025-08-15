/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const createNextIntlPlugin = require("next-intl/plugin")

const { withSentryConfig } = require("@sentry/nextjs")

const withNextIntl = createNextIntlPlugin()

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
    env: {
      // Context is used to determine the environment for Sentry
      // ref. https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
      NEXT_PUBLIC_CONTEXT: process.env.CONTEXT,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: "yaml-loader",
      })

      // SVG loader
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      )

      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ["@svgr/webpack"],
        },
        {
          test: /\.md$/,
          use: ["raw-loader"],
        }
      )

      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i

      config.module.rules.push({
        test: /\.(mp3)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      })

      // WalletConnect related packages are not needed for the bundle
      // https://docs.reown.com/appkit/next/core/installation#extra-configuration
      config.externals.push("pino-pretty", "lokijs", "encoding")

      return config
    },
    trailingSlash: true,
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1504, 1920],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "crowdin-static.downloads.crowdin.com",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "coin-images.coingecko.com",
        },
        {
          protocol: "https",
          hostname: "i.imgur.com",
        },
        {
          protocol: "https",
          hostname: "cdn.galxe.com",
        },
        {
          protocol: "https",
          hostname: "assets.poap.xyz",
        },
        {
          protocol: "https",
          hostname: "unavatar.io",
        },
      ],
    },
    async headers() {
      return [
        {
          source: "/(.*)", // Apply to all routes
          headers: [
            {
              key: "X-Frame-Options",
              value: "DENY",
            },
          ],
        },
      ]
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
            "node_modules/@sentry/cli/**/*",
            "node_modules/sharp/**/*",
            "node_modules/three/**/*",
            "node_modules/canvas/**/*",
            "node_modules/@playwright/**/*",
            "node_modules/chromium-bidi/**/*",
            "src/data",
            "public/**/*.jpg",
            "public/**/*.png",
            "public/**/*.webp",
            "public/**/*.svg",
            "public/**/*.gif",
            "public/**/*.json",
            "public/**/*.txt",
            "public/**/*.xml",
            "public/**/*.pdf",
            "public/fonts",
            "public/images",
            "public/content",
            // Exclude source maps generated by Sentry to reduce function bundle size
            ".next/server/**/*.map",
          ],
        },
      },
    }
  }

  return withBundleAnalyzer(withNextIntl(nextConfig))
}

module.exports = withSentryConfig(module.exports, {
  org: "ethereumorg-ow",
  project: "ethorg",
  silent: true,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
})
