import fs from "fs"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter } from "@/lib/types"
import type { MdPageContent } from "@/lib/interfaces"

import { Skill } from "@/components/TutorialMetadata"

import { dateToString } from "@/lib/utils/date"
import { getFallbackEnglishPath, removeEnglishPrefix } from "@/lib/utils/i18n"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

import { ITutorial } from "@/pages/[locale]/developers/tutorials"

function getContentRoot() {
  return join(process.cwd(), CONTENT_DIR)
}

const getPostSlugs = (dir: string, files: string[] = []) => {
  const contentRoot = getContentRoot()
  const _dir = join(contentRoot, dir)

  // Get an array of all files and directories in the passed directory using `fs.readdirSync`
  const dirContents = fs.readdirSync(_dir)

  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const fileOrDir of dirContents) {
    // file = "about", "bridges".... "translations" (<-- skip that one)...
    const path = join(_dir, fileOrDir)

    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(path).isDirectory()) {
      // Skip nested translations directory
      if (fileOrDir === "translations") continue
      // If it is a directory, recursively call the `getPostSlugs` function with the
      // directory path and the files array
      const nestedDir = join(dir, fileOrDir)

      getPostSlugs(nestedDir, files)
      continue
    }

    // If the current file is not a markdown file, skip it
    if (extname(path) !== ".md") continue

    const sanitizedPath = toPosixPath(
      path.replace(contentRoot, "").replace("/index.md", "")
    )

    files.push(sanitizedPath)
  }

  return files
}

export const getContentBySlug = (slug: string) => {
  // If content is in english, remove en/ prefix so filepath can be read correctly
  let realSlug = removeEnglishPrefix(slug)

  for (const code of LOCALES_CODES) {
    // Adds `translations/` prefix for translated content so file path can be read correctly
    if (code !== DEFAULT_LOCALE && slug.split("/").includes(code)) {
      realSlug = join("translations", slug, "index.md")
    }
  }

  const contentRoot = getContentRoot()
  let fullPath = toPosixPath(join(contentRoot, realSlug))
  let contentNotTranslated = false

  // If content is not translated, use english content fallback
  if (!fs.existsSync(fullPath)) {
    fullPath = getFallbackEnglishPath(fullPath)
    contentNotTranslated = true
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = data as Frontmatter
  const items: Omit<
    MdPageContent,
    | "tocItems"
    | "contributors"
    | "lastEditLocaleTimestamp"
    | "lastDeployLocaleTimestamp"
  > = {
    slug,
    content,
    frontmatter,
    contentNotTranslated,
  }

  return items
}

export const getContent = (dir: string) => {
  const slugs = getPostSlugs(dir)
  const content = slugs.map(getContentBySlug)

  return content
}

export const getTutorialsData = (locale: string): ITutorial[] => {
  const contentRoot = getContentRoot()
  const fullPath = join(
    contentRoot,
    locale !== "en" ? `translations/${locale!}` : "",
    "developers/tutorials"
  )
  let tutorialData: ITutorial[] = []

  if (fs.existsSync(fullPath)) {
    const languageTutorialFiles = fs.readdirSync(fullPath)

    tutorialData = languageTutorialFiles.map((dir) => {
      const filePath = join(
        contentRoot,
        locale !== "en" ? `translations/${locale!}` : "",
        "developers/tutorials",
        dir,
        "index.md"
      )
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as Frontmatter

      return {
        href: join(`/${locale}/developers/tutorials`, dir),
        title: frontmatter.title,
        description: frontmatter.description,
        author: frontmatter.author || "",
        tags: frontmatter.tags,
        skill: frontmatter.skill as Skill,
        timeToRead: Math.round(readingTime(content).minutes),
        published: dateToString(frontmatter.published),
        lang: frontmatter.lang,
        isExternal: false,
      }
    })
  }

  return tutorialData
}
