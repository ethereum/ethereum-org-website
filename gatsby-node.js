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

// const moveArrItem = (arr, fromIndex, toIndex) => {
//   const element = arr[fromIndex]
//   arr.splice(fromIndex, 1)
//   arr.splice(toIndex, 0, element)
// }

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // only edit markdown nodes
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({ node, getNode, basePath: `pages` })

    // Remove from translated page slugs
    slug = slug.replace("/translations", "")

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
      allMarkdownRemark {
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

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/static.js`),
      context: {
        slug: node.fields.slug,
        // create `intl` object so `gatsby-plugin-intl` will skip
        // generating language variations for this page
        intl: {
          language: node.frontmatter.lang,
          languages: supportedLanguages,
          messages: getMessages("./src/intl/", node.frontmatter.lang),
          routed: true,
          originalPath: node.fields.slug.substr(3),
          redirect: true,
        },
      },
    })
  })
}
