// https://www.gatsbyjs.org/docs/node-apis/
import fs from "fs"
import path from "path"
import util from "util"
import child_process from "child_process"
import { createFilePath } from "gatsby-source-filesystem"
import type { GatsbyNode } from "gatsby"

import type { Context } from "./src/types"

import * as Schema from "./src/schema"

import mergeTranslations from "./src/scripts/mergeTranslations"
import copyContributors from "./src/scripts/copyContributors"

import {
  supportedLanguages,
  defaultLanguage,
  Lang,
} from "./src/utils/languages"
import { IS_DEV } from "./src/utils/env"
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
const checkIsMdxOutdated = (filePath: string): boolean => {
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
const checkIsPageOutdated = async (
  urlPath: string,
  lang: Lang
): Promise<{ isOutdated: boolean; isContentEnglish: boolean }> => {
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
export const onCreateNode: GatsbyNode<{
  fileAbsolutePath: string
}>["onCreateNode"] = async ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // Edit markdown nodes
  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode, basePath: `content` })
    let isOutdated = false

    if (slug.includes("/translations/")) {
      slug = slug.replace("/translations", "")
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

  // server side redirects
  redirects.forEach((redirect) => {
    createRedirect({
      ...redirect,
      isPermanent: true,
      ignoreCase: true,
      force: true,
    })
  })

  const { data, errors } = await graphql<Queries.AllMdxQuery>(`
    query AllMdx {
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

  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  // For all markdown nodes, create a page
  data?.allMdx.edges.filter(({ node }) => {
    const slug = node.fields?.slug

    if (!slug) {
      throw new Error(`Missing 'slug' node property.`)
    }

    // Set template of markdown files
    const nodeTemplate = node.frontmatter?.template
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
    const language = node.frontmatter?.lang as Lang
    if (!language) {
      throw `Missing 'lang' frontmatter property. All markdown pages must have a lang property. Page slug: ${slug}`
    }
    const relativePath = node.fields.relativePath
    if (!relativePath) {
      throw new Error(`Missing 'relativePath' node property.`)
    }

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
          createPage<Context>({
            path: langSlug,
            component: path.resolve(`src/templates/${template}.tsx`),
            context: {
              language: lang,
              slug: langSlug,
              ignoreTranslationBanner: isLegal,
              isLegal: isLegal,
              isOutdated: false,
              isContentEnglish: true,
              relativePath, // Use English path for template MDX query
              // gatsby i18n theme context
              locale: lang,
              hrefLang: lang,
              originalPath: langSlug.slice(3),
              dateFormat: "MM/DD/YYYY",
            },
          })
        }
      }
    }

    createPage<Context>({
      path: slug,
      component: path.resolve(`src/templates/${template}.tsx`),
      context: {
        language,
        slug,
        isOutdated: !!node.fields.isOutdated,
        isDefaultLang: language === defaultLanguage,
        relativePath,
        // gatsby i18n theme context
        locale: language,
        hrefLang: language,
        originalPath: slug.slice(3),
        dateFormat: "MM/DD/YYYY",
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
        const originalPath = `/${page}/`
        const slug = `/${lang}${originalPath}`

        createPage<Context>({
          path: slug,
          component: path.resolve(`src/pages-conditional/${page}.tsx`),
          context: {
            language: lang,
            slug,
            isContentEnglish,
            isOutdated,
            // gatsby i18n theme context
            locale: lang,
            hrefLang: lang,
            originalPath,
            dateFormat: "MM/DD/YYYY",
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

  // create routes without the lang prefix e.g. `/{path}` as our i18n plugin
  // only creates `/{lang}/{path}` routes. This is useful on dev env to avoid
  // getting a 404 since we don't have server side redirects
  if (IS_DEV && page.path.startsWith(`/${defaultLanguage}`)) {
    const path = page.path.slice(3)
    createPage({ ...page, path })
  }

  const isTranslated = page.context.locale !== defaultLanguage
  const hasNoContext = page.context.isOutdated === undefined

  if (isTranslated && hasNoContext) {
    const { isOutdated, isContentEnglish } = await checkIsPageOutdated(
      page.context.originalPath,
      page.context.locale
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
  ({ actions, schema }) => {
    const { createTypes } = actions
    const { sdls, builders } = Schema

    createTypes([
      ...Object.keys(sdls).map((sdlKey) => sdls[sdlKey]),
      schema.buildObjectType(builders.WalletsCsv),
    ])
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

  const reportOut = (report: { stderr: string; stdout: string }) => {
    const { stderr, stdout } = report
    if (stderr) reporter.error(stderr)
    if (stdout) reporter.info(stdout)
  }

  reportOut(await exec("npm run build:lambda && cp netlify.toml public"))
}
