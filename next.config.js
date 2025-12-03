/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const createNextIntlPlugin = require("next-intl/plugin")

const { withSentryConfig } = require("@sentry/nextjs")

const i18nConfigJson = require("./i18n.config.json")

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
          hostname: "crowdin-static.cf-downloads.crowdin.com",
        },
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "github.com",
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
    async redirects() {
      // Build a strict locale matcher from configured locales
      const LOCALE_ALTS = i18nConfigJson.map(({ code }) => code).join("|") // e.g. "en|es|fr|..."

      // Helper function to generate both English (no prefix) and locale-prefixed redirects
      const createRedirect = (from, to, permanent = true) => {
        // For external URLs, don't modify the destination
        const isExternal = to.startsWith("http")

        // English / default-locale: no prefix in source or destination
        const defaultRedirect = {
          source: `${from}`,
          destination: to,
          permanent,
        }

        // Locale-prefixed: only match allowed locales (prevents matching arbitrary segments)
        const localeRedirect = {
          source: `/:locale(${LOCALE_ALTS})${from}`,
          destination: isExternal ? to : `/:locale${to}`,
          permanent,
        }

        return [defaultRedirect, localeRedirect]
      }

      return [
        // Custom locale aliases redirects
        { source: "/no/:path*", destination: "/nb/:path*", permanent: true },
        { source: "/ph/:path*", destination: "/fil/:path*", permanent: true },

        // All redirects ([from, to, permanent? (default true)])
        ...[
          ["/discord", "https://discord.gg/ethereum-org"],
          ["/writing-cohort", "https://ethereumwriterscohort.carrd.co/"],
          ["/pdfs/:path*", "/"],
          ["/brand", "/assets/"],
          ["/ethereum.html", "/what-is-ethereum/"],
          ["/ether", "/what-is-ether/"],
          ["/eth", "/what-is-ether/"],
          ["/token", "/developers/"],
          ["/crowdsale", "/developers/"],
          ["/cli", "/developers/"],
          ["/greeter", "/developers/"],
          ["/roadmap/vision", "/roadmap/"],
          ["/search", "/"],
          ["/garden", "/roadmap/"],
          ["/download", "/wallets/find-wallet/"],
          ["/how", "/guides/"],
          ["/content/:path*", "/:path*"],
          ["/nfts", "/nft/"],
          ["/daos", "/dao/"],
          ["/layer2", "/layer-2/"],
          ["/grants", "/community/grants/"],
          ["/java", "/developers/docs/programming-languages/java/"],
          ["/python", "/developers/docs/programming-languages/python/"],
          ["/javascript", "/developers/docs/programming-languages/javascript/"],
          ["/golang", "/developers/docs/programming-languages/golang/"],
          ["/rust", "/developers/docs/programming-languages/rust/"],
          ["/dot-net", "/developers/docs/programming-languages/dot-net/"],
          ["/delphi", "/developers/docs/programming-languages/delphi/"],
          ["/dart", "/developers/docs/programming-languages/dart/"],
          ["/languages", "/community/language-resources/"],
          [
            "/developers/docs/mining",
            "/developers/docs/consensus-mechanisms/pow/mining/",
          ],
          ["/beginners", "/what-is-ethereum/"],
          ["/build", "/developers/learning-tools/"],
          ["/eth2/beacon-chain", "/roadmap/beacon-chain/"],
          ["/eth2/the-beacon-chain", "/roadmap/beacon-chain/"],
          ["/upgrades/the-beacon-chain", "/roadmap/beacon-chain/"],
          ["/eth2/merge", "/roadmap/merge/"],
          ["/eth2/the-merge", "/roadmap/merge/"],
          ["/upgrades/the-merge", "/roadmap/merge/"],
          ["/eth2/docking", "/roadmap/merge/"],
          ["/upgrades/docking", "/roadmap/merge/"],
          ["/eth2/the-docking", "/roadmap/merge/"],
          ["/upgrades/the-docking", "/roadmap/merge/"],
          ["/eth2/shard-chains", "/roadmap/danksharding/"],
          ["/upgrades/shard-chains", "/roadmap/danksharding/"],
          ["/upgrades/sharding", "/roadmap/danksharding/"],
          ["/upgrades/merge", "/roadmap/merge/"],
          ["/upgrades/merge/issuance", "/roadmap/merge/issuance"],
          ["/upgrades/beacon-chain", "/roadmap/beacon-chain"],
          ["/upgrades/vision", "/roadmap/"],
          ["/upgrades", "/roadmap"],
          ["/upgrades/get-involved", "/contributing"],
          ["/eth2/staking", "/staking/"],
          ["/eth2/vision", "/roadmap/vision/"],
          ["/eth2/get-involved", "/contributing/"],
          ["/eth2/get-involved/bug-bounty", "/bug-bounty/"],
          ["/upgrades/get-involved/bug-bounty", "/bug-bounty/"],
          ["/eth2/deposit-contract", "/staking/deposit-contract/"],
          ["/eth2", "/roadmap/"],
          [
            "/developers/docs/scaling/layer-2-rollups",
            "/developers/docs/scaling",
          ],
          ["/developers/docs/layer-2-scaling", "/layer-2/"],
          ["/about/web-developer", "/about/#open-jobs"],
          ["/about/product-designer", "/about/#open-jobs"],
          ["/use", "/apps/"],
          ["/dapps", "/apps/"],
          [
            "/contributing/translation-program/translation-guide",
            "/contributing/translation-program/faq/",
          ],
          [
            "/contributing/translation-program/content-versions",
            "/contributing/translation-program/",
          ],
          [
            "/contributing/translation-program/content-buckets",
            "/contributing/translation-program/",
          ],
          [
            "/developers/docs/smart-contracts/source-code-verification",
            "/developers/docs/smart-contracts/verifying/",
          ],
          [
            "/developers/docs/smart-contracts/upgrading-smart-contracts",
            "/developers/docs/smart-contracts/upgrading/",
          ],
          ["/staking/withdraws", "/staking/withdrawals/"],
          [
            "/guides/how-to-register-an-ethereum-account",
            "/guides/how-to-create-an-ethereum-account/",
          ],
          ["/deprecated-software", "/apps/"],
          ["/enterprise/private-ethereum", "/enterprise/"],
          ["/dashboards", "/resources"],
          ["/tds", "/trillion-dollar-security"],
          ["/10-years", "/10years"],
          ["/history", "/ethereum-forks"],
        ].flatMap(([from, to, permanent]) =>
          createRedirect(from, to, permanent)
        ),
      ]
    },
  }

  nextConfig = {
    ...nextConfig,
    experimental: {
      ...experimental,
      instrumentationHook: true,
    },
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig = {
      ...nextConfig,
      experimental: {
        ...nextConfig.experimental,
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
            "node_modules/canvas/**/*",
            "node_modules/@playwright/**/*",
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
