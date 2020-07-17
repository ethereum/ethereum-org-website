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
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/static.js`),
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
          redirect: true,
        },
      },
    })
  })

  // Create conditional pages (based on language version)
  // Placing these components within src/pages/ overwrites the markdown pages...
  // TODO create flexibility once we need more than just /en/what-is-ethereum/
  createPage({
    path: `/en/what-is-ethereum/`,
    component: path.resolve(`./src/pages-conditional/what-is-ethereum.js`),
    context: {
      slug: `/en/what-is-ethereum/`,
      intl: {
        language: `en`,
        languages: supportedLanguages,
        messages: getMessages("./src/intl/", "en"),
        routed: true,
        originalPath: `/en/what-is-ethereum/`,
        redirect: true,
      },
    },
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
