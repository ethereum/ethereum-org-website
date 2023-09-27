import fs from "fs"
import { extname } from "path"
import { join } from "path"
import matter from "gray-matter"

import { Frontmatter } from "../types"

import { CONTENT_DIR } from "../constants"

const contentDir = join(process.cwd(), CONTENT_DIR)

const getPostSlugs = (dir: string, files: string[] = []) => {
  // Temporal list of content pages allowed to be compiled
  // When a content page is migrated (and he components being used), should be added to this list
  const temporalAllowedPages = [
    "/about",
    "/bridges",
    "/community/code-of-conduct",
    "/community/events",
    "/community/support",
    "/energy-consumption",
    "/glossary",
    "/governance",
    "/guides/how-to-swap-tokens",
    "/history/",
    "/smart-contracts",
    "/whitepaper",
    "/defi",
    "/nft",
    "/dao",
    "/desci",
    // "/refi",
    "/social-networks",
    "/decentralized-identity",
  ]

  // Skip /translations dir for now until we set up i18n
  // Skip /developers dir for now until we set up required layout
  if (dir.includes("/translations") || dir.includes("/developers")) return []

  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)

  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`

    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getPostSlugs(name, files)
    } else {
      const fileExtension = extname(name)

      if (fileExtension === ".md") {
        // If it is a .md file (allowed content page), push the path to the files array
        for (const page of temporalAllowedPages) {
          if (name.includes(page)) {
            files.push(
              name.replace("public/content", "").replace("/index.md", "")
            )
          }
        }
      }
    }
  }

  return files
}

// Removes {#...} from .md file so content can be parsed properly
const removeAnchorLinks = (mdContent: string) =>
  mdContent.replace(/{#.*?}/g, "").trim()

export const getContentBySlug = (slug: string, fields: string[] = []) => {
  const realSlug = `${slug}/index.md`
  const fullPath = join(contentDir, realSlug)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data: frontmatter, content } = matter(fileContents)

  type Items = {
    [key: string]: string | Frontmatter
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = slug
    }

    if (field === "content") {
      items[field] = removeAnchorLinks(content)
    }

    if (field === "frontmatter") {
      items[field] = frontmatter
    }
  })

  return items
}

export const getContent = (fields: string[] = []) => {
  const slugs = getPostSlugs(CONTENT_DIR)
  const content = slugs.map((slug) => getContentBySlug(slug as string, fields))

  return content
}
