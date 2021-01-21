const fs = require(`fs`)
// const fetch = require("node-fetch")
const { buildClientSchema } = require(`graphql`)
const { ApolloLink } = require(`apollo-link`)
const { HTTPLinkDataloader } = require("http-link-dataloader")
// const { BatchHttpLink } = require("apollo-link-batch-http")
const { onError } = require("apollo-link-error")

const translations = require("./src/utils/translations")
require("dotenv").config()

const supportedLanguages = translations.supportedLanguages
const defaultLanguage = `en`
const siteUrl = `https://ethereum.org`

// Note: to run this application locally you need to:
// 1. Create a .env file in the root directory (see .env.example)
// 2. Create a Github personal access token with `read:user` scope
// https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token
// 3. Assign the token to GITHUB_TOKEN_NO_SCOPE in your .env file
const GITHUB_TOKEN_READ_ONLY =
  process.env.CONTEXT === "production"
    ? process.env.GITHUB_TOKEN_READ_ONLY_PROD
    : process.env.CONTEXT === "deploy-preview"
    ? process.env.GITHUB_TOKEN_READ_ONLY_STAGING
    : process.env.GITHUB_TOKEN_READ_ONLY_DEV

const loggerLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL Request: ${operation.operationName}`)
  operation.setContext({ start: new Date() })
  return forward(operation).map((response) => {
    const responseTime = new Date() - operation.getContext().start
    console.log(`GraphQL Response took: ${responseTime}`)
    return response
  })
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`GraphQL Error:`)
      console.log({ message, locations, path })
    })
  }
  if (networkError) {
    console.log(`Network Error: ${networkError.message}`)
  }
})

module.exports = {
  siteMetadata: {
    // `title` & `description` pulls from respective ${lang}.json files in PageMetadata.js
    title: `ethereum.org`,
    description: `Ethereum is a global, decentralized platform for money and new kinds of applications. On Ethereum, you can write code that controls money, and build applications accessible anywhere in the world.`,
    url: siteUrl,
    siteUrl,
    author: `@ethereum`,
    defaultLanguage,
    supportedLanguages,
    editContentUrl: `https://github.com/ethereum/ethereum-org-website/tree/dev/`,
  },
  plugins: [
    // i18n support
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: supportedLanguages,
        // language file path
        defaultLanguage,
        // redirect to `/${lang}/` when connecting to `/`
        // based on user's browser language preference
        redirect: true,
      },
    },
    // Web app manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ethereum.org`,
        short_name: `ethereum.org`,
        start_url: `/en/`,
        background_color: `#fff`,
        theme_color: `#1c1ce1`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    // Matomo analtyics
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "4",
        matomoUrl: "https://matomo.ethereum.org",
        siteUrl,
        matomoPhpScript: "matomo.php",
        matomoJsScript: "matomo.js",
        trackLoad: false,
        // dev: true,
      },
    },
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [
          `shorthands`,
          `currying`,
          `caching`,
          `collections`,
          `exotics`,
          `guards`,
          `metadata`,
          `deburring`,
          `unicode`,
          `chaining`,
          `momoizing`,
          `coercions`,
          `flattening`,
          `paths`,
          `placeholders`,
        ],
      },
    },
    // Sitemap generator (ethereum.org/sitemap.xml)
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes
            .filter((node) => {
              // Filter out 404 pages
              return !node.path.includes("404")
            })
            .map((node) => {
              const path = node.path
              const url = `${site.siteMetadata.siteUrl}${path}`
              const changefreq = path.includes(`/${defaultLanguage}/`)
                ? `weekly`
                : `monthly`
              const priority = path.includes(`/${defaultLanguage}/`) ? 0.7 : 0.5
              return {
                url,
                changefreq,
                priority,
              }
            }),
      },
    },
    // Ability to set custom IDs for headings (for translations)
    // i.e. https://www.markdownguide.org/extended-syntax/#heading-ids
    `gatsby-remark-autolink-headers`,
    // Image support in markdown
    `gatsby-remark-images`,
    `gatsby-remark-copy-linked-files`,
    // MDX support
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        // process all `.md` files as MDX
        extensions: [`.mdx`, `.md`],
        // Workaround to fix `backgroundColor` bug:
        // https://github.com/gatsbyjs/gatsby/issues/25272
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: `transparent`,
              maxWidth: 1200,
            },
          },
        ],
        // Note: in order for MDX to work with gatsby-remark-plugins
        // The plugin must be listed top-level & in gatsbyRemarkPlugins
        // See: https://www.gatsbyjs.org/docs/mdx/plugins/
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              enableCustomId: true,
              elements: [`h1`, `h2`, `h3`, `h4`],
              className: `header-anchor`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: `transparent`,
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
        remarkPlugins: [],
      },
    },
    // SEO tags
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl,
      },
    },
    // Needed for `gatsby-image`
    `gatsby-plugin-sharp`,
    // CSS in JS
    `gatsby-plugin-styled-components`,
    // Source assets
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    // Process files from /src/content/ (used in gatsby-node.js)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    // Source data
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    // Source GitHub API
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        createLink: () => {
          return ApolloLink.from([
            loggerLink,
            errorLink,
            new HTTPLinkDataloader({
              uri: `https://api.github.com/graphql`,
              headers: {
                Authorization: `Bearer ${GITHUB_TOKEN_READ_ONLY}`,
              },
            }),
          ])
        },
        createSchema: async () => {
          const json = JSON.parse(fs.readFileSync(`${__dirname}/github.json`))
          return buildClientSchema(json.data)
        },
      },
    },
    // Process files within /src/data/
    `gatsby-transformer-csv`,
    // Add git information on File fields from latest commit: date, author and email
    // Used for `Last updated` fields
    {
      resolve: `gatsby-transformer-gitinfo`,
      options: {
        include: /\.md$|\.csv/i, // Only .md & .csv files
      },
    },
    // Needed for `gatsby-image`
    `gatsby-transformer-sharp`,
  ],
  // https://www.gatsbyjs.com/docs/reference/release-notes/v2.28/#feature-flags-in-gatsby-configjs
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    QUERY_ON_DEMAND: true,
    // TODO test FAST_DEV
    // FAST_DEV: true, // DEV_SSR, QUERY_ON_DEMAND & LAZY_IMAGES
  },
}
