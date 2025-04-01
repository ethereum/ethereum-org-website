import fs from "fs"
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

export const getMdSlugs = async (dir: string) => {
  const contentRoot = getContentRoot()
  const _dir = join(contentRoot, dir)

  const dirContents = await fsp.readdir(_dir)

  const files: string[] = []

  for (const fileOrDir of dirContents) {
    const path = join(_dir, fileOrDir)
    const stats = await fsp.stat(path)

    if (stats.isDirectory()) {
      const nestedDir = join(dir, fileOrDir)
      const nestedFiles = await getMdSlugs(nestedDir)
      files.push(...nestedFiles)
      continue
    }

    if (extname(path) !== ".md") continue

    const sanitizedPath = toPosixPath(
      path.replace(contentRoot, "").replace("/index.md", "")
    )

    files.push(sanitizedPath)
  }

  return files
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
