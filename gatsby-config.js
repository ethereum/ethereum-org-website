const translations = require("./src/utils/translations")
require("dotenv").config()

const supportedLanguages = translations.supportedLanguages
const defaultLanguage = `en`
const siteUrl = `https://ethereum.org`

const READ_ONLY_GITHUB_TOKEN = `b809cbd0bd021c349291f0425871ea981a2e290f`

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
        // redirect to `/en/` when connecting `/`
        redirect: false,
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
        icon: `src/assets/eth-home-icon.png`,
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
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `Bearer ${READ_ONLY_GITHUB_TOKEN}`,
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
}
