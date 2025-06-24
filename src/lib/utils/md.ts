import fsp from "fs/promises"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter, ITutorial, Skill, SlugPageParams } from "@/lib/types"

import { dateToString } from "@/lib/utils/date"

import { INTERNAL_TUTORIALS_JSON } from "@/lib/constants"
import { CONTENT_DIR, SITE_URL } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

function getContentRoot() {
  return join(process.cwd(), CONTENT_DIR)
}

export const getPostSlugs = async (dir: string, filterRegex?: RegExp) => {
  const contentRoot = getContentRoot()
  const _dir = join(contentRoot, dir)

  try {
    // Get an array of all files and directories in the passed directory using `fs.readdirSync`
    const dirContents = await fsp.readdir(_dir)

    const files: string[] = []

    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const fileOrDir of dirContents) {
      // file = "about", "bridges".... "translations" (<-- skip that one)...
      const path = join(_dir, fileOrDir)

      const stats = await fsp.stat(path)
      if (stats.isDirectory()) {
        // Skip nested translations directory
        if (fileOrDir === "translations") continue
        // If it is a directory, recursively call the `getPostSlugs` function with the
        // directory path and the files array
        const nestedDir = join(dir, fileOrDir)

        const nestedFiles = await getPostSlugs(nestedDir, filterRegex)
        files.push(...nestedFiles)
        continue
      }

      if (filterRegex?.test(path)) continue

      // If the current file is not a markdown file, skip it
      if (extname(path) !== ".md") continue

      const sanitizedPath = toPosixPath(
        path.replace(contentRoot, "").replace("/index.md", "")
      )

      files.push(sanitizedPath)
    }

    return files
  } catch (error) {
    // If directory doesn't exist (e.g., in Netlify serverless environment), return empty array
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.warn(
        `Content directory ${_dir} not found, returning empty slug list`
      )
      return []
    }
    // Re-throw other errors
    throw error
  }
}

export const getTutorialsData = async (
  locale: string
): Promise<ITutorial[]> => {
  const tutorialData: ITutorial[] = []

  const internalTutorialSlugs = await fsp
    .readFile(INTERNAL_TUTORIALS_JSON, "utf-8")
    .then((data) => JSON.parse(data) as string[])

  // Fetch tutorials from public URLs in parallel
  const tutorialPromises = internalTutorialSlugs.map(async (slug) => {
    try {
      const path =
        locale !== "en"
          ? `/content/translations/${locale}/developers/tutorials/${slug}/index.md`
          : `/content/developers/tutorials/${slug}/index.md`

      const url = new URL(path, SITE_URL).toString()

      const response = await fetch(url)
      if (!response.ok) {
        console.warn(
          `Failed to fetch tutorial ${slug} for locale ${locale}: ${response.status}`
        )
        return null
      }

      const fileContents = await response.text()
      const { data, content } = matter(fileContents)
      const frontmatter = data as Frontmatter

      return {
        href: `/${locale}/developers/tutorials/${slug}`,
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
    } catch (error) {
      console.warn(
        `Error fetching tutorial ${slug} for locale ${locale}:`,
        error
      )
      return null
    }
  })

  const results = await Promise.all(tutorialPromises)

  // Filter out null results (failed fetches)
  results.forEach((tutorial) => {
    if (tutorial) {
      tutorialData.push(tutorial)
    }
  })

  return tutorialData
}

export const checkPathValidity = (
  validPaths: SlugPageParams[],
  { locale, slug: slugArray }: SlugPageParams
): boolean =>
  validPaths.some(
    (path) =>
      path.locale === locale && path.slug.join("/") === slugArray.join("/")
  )
