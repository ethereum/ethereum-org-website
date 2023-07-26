// https://www.gatsbyjs.org/docs/node-apis/
import fs from "fs"
import path from "path"
import util from "util"
import child_process from "child_process"
import { createFilePath } from "gatsby-source-filesystem"
import type { GatsbyNode } from "gatsby"

import type { Context } from "./src/types"

import * as Schema from "./src/schema"

import createLocales from "./src/scripts/createLocales"
import copyContributors from "./src/scripts/copyContributors"

import {
  supportedLanguages,
  defaultLanguage,
  Lang,
} from "./src/utils/languages"
import { IS_DEV } from "./src/utils/env"
import redirects from "./redirects.json"

const exec = util.promisify(child_process.exec)

const commonRedirectProps = {
  isPermanent: true,
  ignoreCase: true,
  force: true,
}

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
  const englishPath = path.resolve(
    `src/intl/${defaultLanguage}/page-${joinedFilepath}.json`
  )

  // If no file exists, default to english
  if (!fs.existsSync(srcPath)) {
    return {
      // Consider always defaultLanguage paths as updated
      isOutdated: lang !== defaultLanguage,
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

  // custom redirects defined in `redirects.json`
  redirects.forEach((redirect) => {
    createRedirect({
      ...commonRedirectProps,
      ...redirect,
    })
  })

  const { data, errors } = await graphql<Queries.AllMdxQuery>(`
    query AllMdx {
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
              isOutdated
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
      createRedirect({
        ...commonRedirectProps,
        fromPath: slug.slice(3),
        toPath: slug,
      })

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
              languagesToFetch: [lang],
              slug: langSlug,
              ignoreTranslationBanner: isLegal,
              isLegal: isLegal,
              isOutdated: false,
              isContentEnglish: true,
              relativePath, // Use English path for template MDX query
              isDefaultLang: lang === defaultLanguage,
              // gatsby i18n plugin
              i18n: {
                language: lang,
                languages: supportedLanguages,
                defaultLanguage: defaultLanguage,
                generateDefaultLanguagePage: false,
                routed: true,
                originalPath: langSlug.slice(3),
                path: langSlug,
              },
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
        languagesToFetch: [language],
        slug,
        isOutdated: !!node.frontmatter?.isOutdated,
        isDefaultLang: language === defaultLanguage,
        relativePath,
        // gatsby i18n plugin
        i18n: {
          language,
          languages: supportedLanguages,
          defaultLanguage,
          generateDefaultLanguagePage: false,
          routed: true,
          originalPath: slug.slice(3),
          path: slug,
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
    const originalPath = `/${page}/`

    createRedirect({
      ...commonRedirectProps,
      fromPath: originalPath,
      toPath: `/${defaultLanguage}${originalPath}`,
    })

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
        const slug = `/${lang}${originalPath}`
        createPage<Context>({
          path: slug,
          component: path.resolve(`src/pages-conditional/${page}.tsx`),
          context: {
            language: lang,
            languagesToFetch: [lang],
            slug,
            isContentEnglish,
            isOutdated,
            isDefaultLang: lang === defaultLanguage,
            // gatsby i18n plugin
            i18n: {
              language: lang,
              languages: supportedLanguages,
              defaultLanguage,
              generateDefaultLanguagePage: false,
              routed: true,
              originalPath,
              path: slug,
            },
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
  const { createPage, deletePage, createRedirect } = actions
  const rootPath = page.path.slice(3)
  const is404Page = rootPath.match(/^\/404(\/|.html)$/)

  if (!page.context) {
    return
  }

  // these are the native Gatsby pages (those living under `/pages`)
  // which do not pass through the `createPages` hook thus they don't have our
  // custom context in them
  const isPageWithoutCustomContext = page.context.isOutdated === undefined

  if (isPageWithoutCustomContext) {
    const { language, i18n } = page.context
    const isDefaultLang = language === defaultLanguage

    // as we don't have our custom context for this page, we calculate & add it
    // later to them
    const { isOutdated, isContentEnglish } = await checkIsPageOutdated(
      i18n.originalPath,
      language
    )

    let newPage = {
      ...page,
      context: {
        ...page.context,
        languagesToFetch: [language],
        // hide the outdated content banner for 404 pages
        isOutdated: is404Page ? false : isOutdated,
        // display TranslationBanner for translation-component pages that are still in English
        isContentEnglish,
        isDefaultLang,
      },
    }

    // there seems to be a bug in the i18n plugin where 404 pages get a
    // duplicated `/lang` in their `matchPath`s
    if (newPage.matchPath?.includes(`/${language}/${language}/*`)) {
      newPage = { ...newPage, matchPath: `/${language}/*` }
    }

    // on dev, we will have 2 pages for the default lang
    // - 1 for the ones with the prefix `/{defaultLang}/learn/`
    // - 1 for the ones without the prefix `/learn/`
    //   we do this to avoid having a 404 on those without the prefix since in
    //   dev we don't have the redirects from the server
    deletePage(page)

    if (IS_DEV) {
      createPage<Context>(newPage)
    }

    // `routed` means that the page have the lang prefix on the url
    // e.g. `/en/learn` or `/en`
    if (!IS_DEV && i18n.routed) {
      createPage<Context>(newPage)

      if (isDefaultLang && !is404Page) {
        createRedirect({
          ...commonRedirectProps,
          fromPath: rootPath,
          toPath: page.path,
        })
      }
    }
  }
}

export const onPostBootstrap: GatsbyNode["onPostBootstrap"] = ({ actions }) => {
  const { createRedirect } = actions

  supportedLanguages.forEach((lang) => {
    createRedirect({
      ...commonRedirectProps,
      fromPath: `/${lang}/*`,
      toPath: `/${lang}/404`,
      statusCode: 404,
      force: false,
    })
  })
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions
    const { sdls } = Schema

    createTypes([...Object.keys(sdls).map((sdlKey) => sdls[sdlKey])])
  }

export const onPreBootstrap: GatsbyNode["onPreBootstrap"] = async ({
  reporter,
}) => {
  await createLocales()
  reporter.info(`Created locales`)
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
