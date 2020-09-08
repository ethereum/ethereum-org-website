// https://www.gatsbyjs.org/docs/node-apis/

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const gatsbyConfig = require(`./gatsby-config.js`)
const { getLangPages } = require(`./src/utils/translations`)

const supportedLanguages = gatsbyConfig.siteMetadata.supportedLanguages
const defaultLanguage = gatsbyConfig.siteMetadata.defaultLanguage

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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // only edit markdown nodes
  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode, basePath: `content` })

    // configure language paths
    if (slug.includes("/translations/")) {
      slug = slug.replace("/translations", "")
    } else {
      slug = `/en${slug}`
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
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
              slug
            }
            frontmatter {
              lang
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
    const pageComponent = `static`
    if (slug.includes(`/tutorials/`)) {
      pageComponent = `tutorial`
    } else if (slug.includes(`/edn/`)) {
      pageComponent = `edn`
    }

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${pageComponent}.js`),
      context: {
        slug,
        // create `intl` object so `gatsby-plugin-intl` will skip
        // generating language variations for this page
        intl: {
          language: node.frontmatter.lang,
          languages: supportedLanguages,
          messages: getMessages("./src/intl/", node.frontmatter.lang),
          routed: true,
          originalPath: slug.substr(3),
          redirect: false,
        },
      },
    })
  })

  // Create conditional pages
  // Necessary because placing these components within src/pages/
  // (e.g. src/pages/eth.js ) would overwrite pages generated from markdown,
  // including all translations (e.g. src/content/translations/de/eth/index.md)
  // TODO create flexibility as we add more pages
  const versionTwoPages = [
    `assets`,
    `eth`,
    `wallets/index`,
    `wallets/find-wallet`,
    `what-is-ethereum`,
  ]
  versionTwoPages.forEach((page) => {
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

// Delete page if not supported in language version
exports.onCreatePage = ({ page, actions: { deletePage } }) => {
  const lang = page.context.language

  if (lang !== defaultLanguage && page.component.includes(`/src/pages/`)) {
    const langPageComponents = getLangPages(lang)
    const component = page.component.split("/").pop() // e.g. 'build.js'

    if (!langPageComponents.includes(component)) {
      deletePage(page)
    }
  }
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
    }
  `
  createTypes(typeDefs)
}
