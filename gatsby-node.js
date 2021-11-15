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

/**
 * Markdown isOutdated check
 * Parse headers in markdown file (both translated and english) and compare their info structure.
 * If this structure is not the same, then the file isOutdated.
 * If there is not english file, return true
 * @param {string} path filepath for translated mdx file
 * @returns boolean for if file is outdated or not
 */
const checkIsMdxOutdated = (path) => {
  try {
    const splitPath = path.split("/")
    splitPath.splice(7, 2)
    const englishPath = splitPath.join("/")

    const re = /([#]+) [^\{]+\{#([^\}]+)\}/gim

    const translatedData = fs.readFileSync(path, "utf-8")
    const englishData = fs.readFileSync(englishPath, "utf-8")

    let englishMatch = ""
    let intlMatch = ""
    englishData.match(re).forEach((match) => {
      englishMatch += match.replace(re, (_, p1, p2) => p1 + p2)
    })
    translatedData.match(re).forEach((match) => {
      intlMatch += match.replace(re, (_, p1, p2) => p1 + p2)
    })

    return englishMatch !== intlMatch
  } catch (err) {
    return true
  }
}

/**
 * JSON isOutdated check
 * Checks if translated JSON file exists.
 * If translated file exists, checks that all translations are present (checks keys), and that all the keys are the same.
 * If translation file exists, isContentEnglish will be false
 * @param {*} path url path used to derive file path from
 * @param {*} lang language abbreviation for language path
 * @returns {{isOutdated: boolean, isContentEnglish: boolean}}
 */
const checkIsPageOutdated = async (path, lang) => {
  try {
    // Files that need index appended on the end. Ex page-index.json, page-developers-index.json, page-eth2-index.json
    const indexFilePaths = ["", "developers", "eth2"]
    const filePath = path.split("/").filter((text) => text !== "")

    if (
      indexFilePaths.includes(filePath[filePath.length - 1]) ||
      filePath.length === 0
    ) {
      filePath.push("index")
    }

    const joinedFilepath = filePath.join("-")
    const srcPath = `${__dirname}/src/intl/${lang}/page-${joinedFilepath}.json`
    const englishPath = `${__dirname}/src/intl/en/page-${joinedFilepath}.json`

    // If no file exists, default to english
    if (!fs.existsSync(srcPath)) {
      return {
        isOutdated: true,
        isContentEnglish: true,
      }
    } else {
      const translatedData = JSON.parse(fs.readFileSync(srcPath))
      const englishData = JSON.parse(fs.readFileSync(englishPath))
      const translatedKeys = Object.keys(translatedData)
      const englishKeys = Object.keys(englishData)

      // Check if same amount of keys
      if (translatedKeys.length !== englishKeys.length) {
        return {
          isOutdated: true,
          isContentEnglish: false,
        }
      }

      // Check if all the keys are the same
      if (
        JSON.stringify(translatedKeys.sort()) !==
        JSON.stringify(englishKeys.sort())
      ) {
        return {
          isOutdated: true,
          isContentEnglish: false,
        }
      }

      return {
        isOutdated: false,
        isContentEnglish: false,
      }
    }
  } catch {
    return true
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

// Loops through all the files dictated by Gatsby (building pages folder), as well as
// folders flagged through the gatsby-source-filesystem plugin in gatsby-config
// This seems to be where the source and transform holdup is?
exports.onCreateNode = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // Edit markdown nodes
  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode, basePath: `content` })
    let isOutdated = false

    if (slug.includes("/translations/")) {
      slug = slug.replace("/translations", "")
      const split = slug.split("/")
      split.splice(1, 1)

      isOutdated = await checkIsMdxOutdated(node.fileAbsolutePath)
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

  // For all markdown nodes, create a page
  result.data.allMdx.edges.filter(({ node }) => {
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
    if (!language) {
      throw `Missing 'lang' frontmatter property. All markdown pages must have a lang property. Page slug: ${slug}`
    }
    const relativePath = node.fields.relativePath

    // If markdown file is English, check for corresponding file in each language.
    // e.g. English file: "src/content/community/index.md"
    // e.g. corresponding German file: "src/content/translations/de/community/index.md"
    if (language === defaultLanguage) {
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
              ignoreTranslationBanner: isLegal,
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

// Only ran when creating component pages
// Add additional context to translated pages
// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#pass-context-to-pages
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  const isTranslated = page.context.language !== defaultLanguage
  const hasNoContext = page.context.isOutdated === undefined
  const langVersion = getLangContentVersion(page.context.language)

  // Can we add this context in onCreateNode? Have to look into Gatsby to figure out lifecycle of this
  if (isTranslated && hasNoContext) {
    const { isOutdated, isContentEnglish } = await checkIsPageOutdated(
      page.context.intl.originalPath,
      page.context.language
    )
    deletePage(page)
    createPage({
      ...page,
      context: {
        ...page.context,
        isOutdated,
        //display TranslationBanner for translation-component pages that are still in English
        isContentEnglish,
        // // We can check if isContentEnglish through our crawling
        // langVersion < 2 && !page.component.includes("/index.js"),
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
