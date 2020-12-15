// https://www.gatsbyjs.org/docs/node-apis/

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const gatsbyConfig = require(`./gatsby-config.js`)

const supportedLanguages = gatsbyConfig.siteMetadata.supportedLanguages

// same function from 'gatsby-plugin-intl'
const flattenMessages = (nestedMessages, prefix = "") => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key]
    let prefixedKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      messages[prefixedKey] = value
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey))
    }

    return messages
  }, {})
}

// same function from 'gatsby-plugin-intl'
const getMessages = (path, language) => {
  try {
    const messages = require(`${path}/${language}.json`)

    return flattenMessages(messages)
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      process.env.NODE_ENV !== "test" &&
        console.error(
          `[gatsby-plugin-intl] couldn't find file "${path}/${language}.json"`
        )
    }

    throw error
  }
}

// Markdown pages that are now components
const outdatedPages = [
  "/eth/",
  "/dapps/",
  "/developers/",
  "/wallets/",
  "/what-is-ethereum/",
]
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // Edit markdown nodes
  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode, basePath: `content` })
    let isOutdated = false

    if (slug.includes("/translations/")) {
      slug = slug.replace("/translations", "")
      const split = slug.split("/")
      split.splice(1, 1)
      const originalPath = split.join("/")
      if (outdatedPages.includes(originalPath)) {
        isOutdated = true
      }
    } else {
      slug = `/en${slug}`
    }

    // Get relative path for Github API queries (file commit history)
    const absolutePath = node.fileAbsolutePath
    const relativePathStart = absolutePath.indexOf("src/")
    const relativePath = absolutePath.substring(relativePathStart)

    createNodeField({
      node,
      name: `isOutdated`,
      value: isOutdated,
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `relativePath`,
      value: relativePath,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              isOutdated
              slug
              relativePath
            }
            frontmatter {
              lang
              template
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    const slug = node.fields.slug
    const language = node.frontmatter.lang

    // Set template of markdown files
    const nodeTemplate = node.frontmatter.template
    let template = nodeTemplate ? nodeTemplate : `static`
    if (slug.includes(`/tutorials/`)) {
      template = `tutorial`
    } else if (slug.includes(`/docs/`)) {
      template = `docs`
    }

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${template}.js`),
      context: {
        slug,
        isOutdated: node.fields.isOutdated,
        relativePath: node.fields.relativePath,
        // Create `intl` object so `gatsby-plugin-intl` will skip
        // generating language variations for this page
        intl: {
          language,
          languages: supportedLanguages,
          messages: getMessages("./src/intl/", language),
          routed: true,
          originalPath: slug.substr(3),
          redirect: false,
        },
      },
    })
  })

  // Create English-only pages
  // Necessary because placing these components within src/pages/
  // (e.g. src/pages/eth.js ) would overwrite pages generated from markdown,
  // including all translations (e.g. src/content/translations/de/eth/index.md)
  const englishOnlyPages = [
    `eth`,
    `dapps`,
    `developers/index`,
    `wallets/index`,
    `what-is-ethereum`,
  ]
  englishOnlyPages.forEach((page) => {
    const component = page
    // Account for nested pages
    if (page.includes("/index")) {
      page = page.replace("/index", "")
    }
    createPage({
      path: `/en/${page}/`,
      component: path.resolve(`./src/pages-conditional/${component}.js`),
      context: {
        slug: `/en/${page}/`,
        intl: {
          language: `en`,
          languages: supportedLanguages,
          messages: getMessages("./src/intl/", "en"),
          routed: true,
          originalPath: `/en/${page}/`,
          redirect: false,
        },
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      sidebar: Boolean
      sidebarDepth: Int
      incomplete: Boolean
      template: String
      summaryPoints: [String!]!
    }
    type Eth2BountyHuntersCsv implements Node {
      username: String,
      name: String,
      score: Int
    }
  `
  createTypes(typeDefs)
}
