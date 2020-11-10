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

    // Get relative path for Github API queries (file commit history)
    const absolutePath = node.fileAbsolutePath
    const relativePathStart = absolutePath.indexOf("src/")
    const relativePath = absolutePath.substring(relativePathStart)

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
    const relativePath = node.fields.relativePath

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
        relativePath,
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
  // TODO create flexibility as we add more pages,
  // currently `versionTwoPages` are just English
  const versionTwoPages = [
    `assets`,
    `community`,
    `eth`,
    `developers/index`,
    `developers/learning-tools`,
    `developers/local-environment`,
    `developers/tutorials`,
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

exports.onCreatePage = ({ page, actions: { deletePage } }) => {
  const lang = page.context.language

  // Delete `/build/` page from English (it's now `/developers/learning-tools/`)
  if (lang === defaultLanguage && page.component.includes(`/pages/build.js`)) {
    deletePage(page)
  }

  // Delete page if not supported in language version
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
      incomplete: Boolean
      template: String
    }
    type Eth2BountyHuntersCsv implements Node {
      username: String,
      name: String,
      score: Int
    }
  `
  createTypes(typeDefs)
}
