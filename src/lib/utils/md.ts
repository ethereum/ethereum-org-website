import fsp from "fs/promises"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter, ITutorial, Skill } from "@/lib/types"

import { dateToString } from "@/lib/utils/date"

import { CONTENT_DIR } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

function getContentRoot() {
  return join(process.cwd(), CONTENT_DIR)
}

export const getPostSlugs = async (dir: string, filterRegex?: RegExp) => {
  const contentRoot = getContentRoot()
  const _dir = join(contentRoot, dir)

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
}

export const getTutorialsData = async (
  locale: string
): Promise<ITutorial[]> => {
  const contentRoot = getContentRoot()
  const fullPath = join(
    contentRoot,
    locale !== "en" ? `translations/${locale!}` : "",
    "developers/tutorials"
  )
  const tutorialData: ITutorial[] = []

  const stats = await fsp.stat(fullPath)
  if (!stats.isDirectory()) {
    console.warn(`Tutorials directory not found for locale: ${locale}`)
    return tutorialData // Return empty if the directory does not exist
  }

  const languageTutorialFiles = await fsp.readdir(fullPath)

  languageTutorialFiles.forEach(async (dir) => {
    const filePath = join(
      contentRoot,
      locale !== "en" ? `translations/${locale!}` : "",
      "developers/tutorials",
      dir,
      "index.md"
    )
    const fileContents = await fsp.readFile(filePath, "utf8")
    const { data, content } = matter(fileContents)
    const frontmatter = data as Frontmatter

    tutorialData.push({
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
    })
  })

  return tutorialData
}
