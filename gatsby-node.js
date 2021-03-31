// https://www.gatsbyjs.org/docs/node-apis/
const fs = require("fs")
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const gatsbyConfig = require(`./gatsby-config.js`)
const { getLangContentVersion } = require(`./src/utils/translations`)

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

const outdatedMarkdownPages = [
  "/dapps/",
  "/enterprise/",
  "/eth/",
  "/learn/",
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
      if (outdatedMarkdownPages.includes(originalPath)) {
        isOutdated = true
      }
    } else {
      slug = `/${defaultLanguage}${slug}`
    }

    const absolutePath = node.fileAbsolutePath
    const relativePathStart = absolutePath.indexOf("src/")
    const relativePath = absolutePath.substring(relativePathStart)

    // Boolean if page is outdated (most translated files are)
    createNodeField({
      node,
      name: `isOutdated`,
      value: isOutdated,
    })
    // Page URI
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    // Relative path of file (for GitHub API commit history)
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

    // Set template of markdown files
    const nodeTemplate = node.frontmatter.template
    let template = nodeTemplate ? nodeTemplate : `static`
    if (slug.includes(`/tutorials/`)) {
      template = `tutorial`
    } else if (slug.includes(`/docs/`)) {
      template = `docs`
    }

    const isLegal =
      slug.includes(`/cookie-policy/`) ||
      slug.includes(`/privacy-policy/`) ||
      slug.includes(`/terms-of-use/`) ||
      slug.includes(`/contributing/`)
    const language = node.frontmatter.lang
    const relativePath = node.fields.relativePath

    // If markdown file is English, check for corresponding file in each language.
    // e.g. English file: "src/content/community/index.md"
    // e.g. corresponding German file: "src/content/translations/de/community/index.md"
    if (language === defaultLanguage && !isLegal) {
      for (const lang of supportedLanguages) {
        const splitPath = relativePath.split("/")
        splitPath.splice(2, 0, `translations/${lang}`)
        const langPath = splitPath.join("/")
        // If corresponding file doesn't exist, create a page for it.
        if (!fs.existsSync(langPath)) {
          const splitSlug = slug.split("/")
          splitSlug.splice(1, 1, lang)
          const langSlug = splitSlug.join("/")
          createPage({
            path: langSlug,
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
              slug: langSlug,
              isOutdated: false,
              isContentEnglish: true,
              relativePath: relativePath, // Use English path for template MDX query
              // Create `intl` object so `gatsby-plugin-intl` will skip
              // generating language variations for this page
              intl: {
                language: lang,
                defaultLanguage,
                languages: supportedLanguages,
                messages: getMessages("./src/intl/", lang),
                routed: true,
                originalPath: slug.substr(3),
                redirect: false,
              },
            },
          })
        }
      }
    }

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${template}.js`),
      context: {
        slug,
        isOutdated: node.fields.isOutdated,
        relativePath: relativePath,
        // Create `intl` object so `gatsby-plugin-intl` will skip
        // generating language variations for this page
        intl: {
          language,
          defaultLanguage,
          languages: supportedLanguages,
          messages: getMessages("./src/intl/", language),
          routed: true,
          originalPath: slug.substr(3),
          redirect: false,
        },
      },
    })
  })

  // Create contentVersion v2.0 pages
  const contentV2Pages = [`eth`, `dapps`, `wallets/index`, `what-is-ethereum`]
  const contentV2Languages = supportedLanguages.filter(
    (lang) => getLangContentVersion(lang) >= 2.0
  )
  contentV2Pages.forEach((page) => {
    const component = page
    // Account for nested pages
    if (page.includes("/index")) {
      page = page.replace("/index", "")
    }
    contentV2Languages.forEach((lang) => {
      createPage({
        path: `/${lang}/${page}/`,
        component: path.resolve(`./src/pages-conditional/${component}.js`),
        context: {
          slug: `/${lang}/${page}/`,
          intl: {
            language: lang,
            languages: supportedLanguages,
            defaultLanguage,
            messages: getMessages("./src/intl/", lang),
            routed: true,
            originalPath: `/${page}/`,
            redirect: false,
          },
        },
      })
    })
  })

  // Create contentVersion v1.0 pages
  // v1.0 doesn't have existing markdown files for these pages
  const contentV1Pages = [`eth`, `dapps`, `wallets/index`]
  const contentV1Languages = supportedLanguages.filter(
    (lang) => getLangContentVersion(lang) === 1.0
  )
  contentV1Pages.forEach((page) => {
    const component = page
    // Account for nested pages
    if (page.includes("/index")) {
      page = page.replace("/index", "")
    }
    contentV1Languages.forEach((lang) => {
      createPage({
        path: `/${lang}/${page}/`,
        component: path.resolve(`./src/pages-conditional/${component}.js`),
        context: {
          slug: `/${lang}/${page}/`,
          isContentEnglish: true,
          intl: {
            language: lang,
            languages: supportedLanguages,
            defaultLanguage,
            messages: getMessages("./src/intl/", lang),
            routed: true,
            originalPath: `/${page}/`,
            redirect: false,
          },
        },
      })
    })
  })
}

// Add additional context to translated pages
// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#pass-context-to-pages
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

// Actually we might be able to fix this in the onCreatePage hook... if content version is <2, for most pages (I think anything other than /developers/index.js we should set page.context.isContentEnglish to true.

  const isTranslated = page.context.language !== defaultLanguage
  const hasNoContext = page.context.isOutdated === undefined
  const langVersion = getLangContentVersion(page.context.language)
  console.log(langVersion)

  if (isTranslated && hasNoContext) {
    let isOutdated = false
    if (page.component.includes("src/pages/index.js")) {
      isOutdated = true
    }
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        isOutdated,
        isContentEnglish: langVersion < 2
      },
    })
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
