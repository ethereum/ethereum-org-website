// https://www.gatsbyjs.org/docs/node-apis/
import fs from "fs"
import path from "path"
import util from "util"
import child_process from "child_process"
import { createFilePath } from "gatsby-source-filesystem"
import type { GatsbyNode } from "gatsby"

import type { Context } from "./src/types"
import type { AllMdxQuery } from "./src/interfaces"

import mergeTranslations from "./src/scripts/mergeTranslations"
import copyContributors from "./src/scripts/copyContributors"

import {
  supportedLanguages,
  defaultLanguage,
  Lang,
} from "./src/utils/languages"
import getMessages from "./src/utils/getMessages"
import redirects from "./redirects.json"

const exec = util.promisify(child_process.exec)

/**
 * Markdown isOutdated check
 * Parse header ids in markdown file (both translated and english) and compare their info structure.
 * If this structure is not the same, then the file isOutdated.
 * If there is not english file, return true
 * @param {string} filePath filepath for translated mdx file
 * @returns boolean for if file is outdated or not
 */
const checkIsMdxOutdated = (filePath) => {
  const dirname = path.resolve("./")
  const splitPath = filePath.split(dirname)
  const tempSplitPath = splitPath[1]
  const tempSplit = tempSplitPath.split("/")
  tempSplit.splice(3, 2)
  const englishPath = path.resolve(`${tempSplit.join("/")}`)

  const re = /([#]+) [^\{]+\{#([^\}]+)\}/gim
  let translatedData, englishData

  try {
    translatedData = fs.readFileSync(filePath, "utf-8")
    englishData = fs.readFileSync(englishPath, "utf-8")
  } catch {
    return true
  }

  let englishMatch = ""
  let intlMatch = ""
  try {
    englishData.match(re).forEach((match) => {
      englishMatch += match.replace(re, (_, p1, p2) => p1 + p2)
    })
    translatedData.match(re).forEach((match) => {
      intlMatch += match.replace(re, (_, p1, p2) => p1 + p2)
    })
  } catch {
    console.warn(`regex error in ${englishPath}`)
    return true
  }

  return englishMatch !== intlMatch
}

/**
 * JSON isOutdated check
 * Checks if translation JSON file exists.
 * If translation file exists, checks that all translations are present (checks keys), and that all the keys are the same.
 * If translation file exists, isContentEnglish will be false
 * @param {*} urlPath url path used to derive file path from
 * @param {*} lang language abbreviation for language path
 * @returns {{isOutdated: boolean, isContentEnglish: boolean}}
 */
const checkIsPageOutdated = async (urlPath, lang) => {
  // Files that need index appended on the end. Ex page-index.json, page-developers-index.json, page-upgrades-index.json
  const indexFilePaths = ["", "developers", "upgrades"]
  const filePath = urlPath.split("/").filter((text) => text !== "")

  if (
    indexFilePaths.includes(filePath[filePath.length - 1]) ||
    filePath.length === 0
  ) {
    filePath.push("index")
  }

  const joinedFilepath = filePath.join("-")
  const srcPath = path.resolve(`src/intl/${lang}/page-${joinedFilepath}.json`)
  const englishPath = path.resolve(`src/intl/en/page-${joinedFilepath}.json`)

  // If no file exists, default to english
  if (!fs.existsSync(srcPath)) {
    return {
      isOutdated: true,
      isContentEnglish: true,
    }
  } else {
    let translatedData, englishData, translatedKeys, englishKeys
    try {
      translatedData = JSON.parse(fs.readFileSync(srcPath).toString())
      englishData = JSON.parse(fs.readFileSync(englishPath).toString())
      translatedKeys = Object.keys(translatedData)
      englishKeys = Object.keys(englishData)
    } catch (err) {
      return {
        isOutdated: true,
        isContentEnglish: true,
      }
    }
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
}

// Loops through all the files dictated by Gatsby (building pages folder), as well as
// folders flagged through the gatsby-source-filesystem plugin in gatsby-config
export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  getNode,
  actions,
}) => {
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

    const absolutePath = node.fileAbsolutePath as string
    const relativePathStart = absolutePath.lastIndexOf("src/")
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

export const createPages: GatsbyNode<any, Context>["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage, createRedirect } = actions

  redirects.forEach((redirect) => {
    createRedirect({
      ...redirect,
      isPermanent: true,
      ignoreCase: true,
      force: true,
    })
  })

  const result = await graphql<{ allMdx: { edges: Array<AllMdxQuery> } }>(`
    query getAllMdx {
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
      slug.includes(`/contributing/`) ||
      slug.includes(`/style-guide/`)
    const language = node.frontmatter.lang as Lang
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
            component: path.resolve(`src/templates/${template}.js`),
            context: {
              slug: langSlug,
              ignoreTranslationBanner: isLegal,
              isLegal: isLegal,
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

    createPage<Context>({
      path: slug,
      component: path.resolve(`src/templates/${template}.js`),
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

  // Create `/pages-conditional/` pages for each language unless a markdown page already exists.
  // This avoids overwriting markdown pages with a component page of the same name.
  // Note: once all these markdown pages have been replaced with updated JSON translation files,
  // we can remove this logic and the `/pages-conditional/` directory.
  const outdatedMarkdown = [`eth`, `dapps`, `wallets`, `what-is-ethereum`]
  outdatedMarkdown.forEach((page) => {
    supportedLanguages.forEach(async (lang) => {
      const markdownPath = path.resolve(
        `src/content/translations/${lang}/${page}/index.md`
      )
      const langHasOutdatedMarkdown = fs.existsSync(markdownPath)
      if (!langHasOutdatedMarkdown) {
        // Check if json strings exists for language, if not mark `isContentEnglish` as true
        const { isOutdated, isContentEnglish } = await checkIsPageOutdated(
          page,
          lang
        )
        createPage({
          path: `/${lang}/${page}/`,
          component: path.resolve(
            page === "wallets"
              ? `src/pages-conditional/${page}/index.js`
              : `src/pages-conditional/${page}.js`
          ),
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
            isContentEnglish,
            isOutdated,
          },
        })
      }
    })
  })
}

// Add additional context to translated pages
// Only ran when creating component pages
// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#pass-context-to-pages
export const onCreatePage: GatsbyNode<any, Context>["onCreatePage"] = async ({
  page,
  actions,
}) => {
  const { createPage, deletePage } = actions

  const isTranslated = page.context.language !== defaultLanguage
  const hasNoContext = page.context.isOutdated === undefined

  if (isTranslated && hasNoContext) {
    const { isOutdated, isContentEnglish } = await checkIsPageOutdated(
      page.context.intl.originalPath,
      page.context.language
    )
    deletePage(page)
    createPage<Context>({
      ...page,
      context: {
        ...page.context,
        isOutdated,
        //display TranslationBanner for translation-component pages that are still in English
        isContentEnglish,
      },
    })
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
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
      summaryPoint1: String!
      summaryPoint2: String!
      summaryPoint3: String!
      summaryPoint4: String!
      position: String
      compensation: String
      location: String
      type: String
      link: String
      address: String
      skill: String
      published: String
      sourceUrl: String
      source: String
      author: String
      tags: [String]
      isOutdated: Boolean
    }
    type ConsensusBountyHuntersCsv implements Node {
      username: String,
      name: String,
      score: Int
    }
     type ExecutionBountyHuntersCsv implements Node {
      username: String,
      name: String,
      score: Int
    }
  `
    createTypes(typeDefs)

    // Optimization. Ref: https://www.gatsbyjs.com/docs/scaling-issues/#switch-off-type-inference-for-sitepagecontext
    createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }
  `)
  }

export const onPreBootstrap: GatsbyNode["onPreBootstrap"] = ({ reporter }) => {
  mergeTranslations()
  reporter.info(`Merged translations saved`)
  copyContributors()
  reporter.info(`Contributors copied`)
}

// Build lambda functions when the build is complete and the `/public` folder exists
export const onPostBuild: GatsbyNode["onPostBuild"] = async (
  gatsbyNodeHelpers
) => {
  const { reporter } = gatsbyNodeHelpers

  const reportOut = (report) => {
    const { stderr, stdout } = report
    if (stderr) reporter.error(stderr)
    if (stdout) reporter.info(stdout)
  }

  reportOut(await exec("npm run build:lambda && cp netlify.toml public"))
}
