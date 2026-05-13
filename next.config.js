/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

const createNextIntlPlugin = require("next-intl/plugin")

const { withSentryConfig } = require("@sentry/nextjs")

const redirects = require("./redirects.config")

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
module.exports = (phase) => {
  let nextConfig = {
    reactStrictMode: true,
    env: {
      // Netlify build-time vars inlined so they're available at SSR runtime.
      // ref. https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
      NEXT_PUBLIC_CONTEXT: process.env.CONTEXT,
      // Resolve site URL once at build time. NEXT_PUBLIC_SITE_URL (set in
      // netlify.toml for dev/staging) takes precedence, then Netlify's
      // deploy-specific URLs, falling back to the production domain.
      NEXT_PUBLIC_SITE_URL:
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.DEPLOY_PRIME_URL ||
        process.env.DEPLOY_URL ||
        process.env.URL ||
        "https://ethereum.org",
      // Inline IS_VISUAL_TEST into the client bundle so client-side shuffles
      // (e.g. useStakingProductsCardGrid) can opt out of randomization during
      // visual test builds. Server code reads it from process.env directly.
      IS_VISUAL_TEST: process.env.IS_VISUAL_TEST,
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
    // Turbopack loader equivalents for the webpack() config above
    turbopack: {
      rules: {
        "*.yaml": { loaders: ["yaml-loader"], as: "*.js" },
        "*.yml": { loaders: ["yaml-loader"], as: "*.js" },
        "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
        "*.md": { loaders: ["raw-loader"], as: "*.js" },
        "*.mp3": { as: "*.static" },
      },
      // Suppress file-tracing warnings from the MDX pipeline. These files
      // use dynamic path.join/readFile to read markdown content at runtime.
      // outputFileTracingExcludes already prevents over-bundling.
      ignoreIssue: [
        {
          path: "**/src/lib/**",
          description: /Overly broad patterns/,
        },
        // "Encountered unexpected file in NFT list" surfaces on the project
        // root (e.g. `./next.config.js`) even though the underlying fs.*
        // calls live in src/lib/md/*. Match anywhere so it's suppressed.
        {
          path: "**",
          title: /Encountered unexpected file/,
        },
      ],
    },
    // Replaces config.externals.push("pino-pretty", "lokijs", "encoding")
    serverExternalPackages: ["pino-pretty", "lokijs", "encoding"],
    trailingSlash: true,
    images: {
      qualities: [5, 10, 20, 35, 40, 75, 90, 100],
      deviceSizes: [640, 750, 828, 1080, 1200, 1504, 1920],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "crowdin-static.cf-downloads.crowdin.com",
        },
        { protocol: "https", hostname: "pvvrtckedmrkyzfxubkk.supabase.co" },
        { protocol: "https", hostname: "avatars.githubusercontent.com" },
        { protocol: "https", hostname: "avatars0.githubusercontent.com" },
        { protocol: "https", hostname: "avatars1.githubusercontent.com" },
        { protocol: "https", hostname: "avatars2.githubusercontent.com" },
        { protocol: "https", hostname: "avatars3.githubusercontent.com" },
        { protocol: "https", hostname: "avatars4.githubusercontent.com" },
        { protocol: "https", hostname: "opengraph.githubassets.com" },
        { protocol: "https", hostname: "github.com" },
        { protocol: "https", hostname: "coin-images.coingecko.com" },
        { protocol: "https", hostname: "i.imgur.com" },
        { protocol: "https", hostname: "s3-dcl1.ethquokkaops.io" },
        { protocol: "https", hostname: "cdn.galxe.com" },
        { protocol: "https", hostname: "assets.poap.xyz" },
        { protocol: "https", hostname: "unavatar.io" },
        { protocol: "https", hostname: "secure.meetupstatic.com" },
        { protocol: "https", hostname: "pbs.twimg.com" },
        { protocol: "https", hostname: "images.lumacdn.com" },
        { protocol: "https", hostname: "framerusercontent.com" },
        { protocol: "https", hostname: "img.evbuc.com" },
        { protocol: "https", hostname: "storage.googleapis.com" },
        { protocol: "https", hostname: "cdn.charmverse.io" },
        { protocol: "https", hostname: "ethwingman.com" },
        { protocol: "https", hostname: "eth-mcp.dev" },
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
      const createRedirect = (source, destination, permanent = true) => {
        // For external URLs, don't modify the destination
        const isExternal = destination.startsWith("http")

        // English / default-locale: no prefix in source or destination
        const defaultRedirect = { source, destination, permanent }

        // Locale-prefixed: only match allowed locales (prevents matching arbitrary segments)
        const localeRedirect = {
          source: `/:locale(${LOCALE_ALTS})${source}`,
          destination: isExternal ? destination : `/:locale${destination}`,
          permanent,
        }

        return [defaultRedirect, localeRedirect]
      }

      return [
        // Whitepaper PDF redirect (no locale prefix)
        {
          source:
            "/669c9e2e2027310b6b3cdce6e1c52962/Ethereum_Whitepaper_-_Buterin_2014.pdf",
          destination:
            "/content/whitepaper/whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf",
          permanent: true,
        },
        // All primary redirects
        ...redirects.flatMap(([source, destination, permanent]) =>
          createRedirect(source, destination, permanent)
        ),
      ]
    },
  }

  nextConfig = {
    ...nextConfig,
    experimental: {
      ...experimental,
      // Restore client-side Router Cache durations to Next 14 defaults
      staleTimes: { dynamic: 30, static: 300 },
    },
  }

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    nextConfig = {
      ...nextConfig,
      outputFileTracingIncludes: {
        // Hybrid content layer: MDX bodies compile at request time, so the
        // serverless function bundle needs the raw .md/.mdx files from
        // public/content/. The manifest (.source/manifest.json) drives
        // routing + frontmatter lookups; bodies still come from disk.
        // Without these traces, ISR revalidation + on-demand renders of
        // non-prerendered locales 404 because the function can't find the
        // .md files. netlify.toml [functions].included_files is the
        // safety belt — keep both until preview-deploy verification is
        // complete on every supported locale.
        "/[locale]/[...slug]": [
          "public/content/**/*.md",
          "public/content/**/*.mdx",
          ".source/manifest.json",
        ],
        "/[locale]/videos/[slug]": ["public/content/videos/**/*.md"],
      },
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
          "public/**/*.mp3",
          "public/**/*.xlsx",
          "public/audio/**",
          "public/fonts",
          "public/images",
          // Exclude source maps generated by Sentry to reduce function bundle size
          ".next/server/**/*.map",
          // Translation manifests (canonical name in src/scripts/intl-pipeline/constants.ts)
          ".manifests",
        ],
      },
    }
  }

  return withNextIntl(nextConfig)
}

module.exports = withSentryConfig(module.exports, {
  org: "ethereumorg-ow",
  project: "ethorg",
  silent: true,
  widenClientFileUpload: true,
})
