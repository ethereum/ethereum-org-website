import fs from "fs"
import { join, extname } from "path"
import matter from "gray-matter"

import { generateTableOfContents } from "@/lib/utils/toc"
import { getFallbackEnglishPath, removeEnglishPrefix } from "@/lib/utils/i18n"

import type { PageContent } from "@/lib/interfaces"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

const CURRENT_CONTENT_DIR = join(process.cwd(), CONTENT_DIR)

const getPostSlugs = (dir: string, files: string[] = []) => {
  const contentDir = join(CURRENT_CONTENT_DIR, dir)
  // Temporal list of content pages allowed to be compiled
  // When a content page is migrated (and he components being used), should be added to this list
  const temporalAllowedPages = [
    "/about",
    "/bridges",
    "/community/code-of-conduct",
    "/community/events",
    "/community/support",
    "/dao",
    "/decentralized-identity",
    "/defi",
    "/desci",
    "/developers/tutorials/all-you-can-cache",
    // "/energy-consumption",
    "/glossary",
    "/governance",
    "/guides/how-to-swap-tokens",
    "/history/",
    "/nft",
    "/refi",
    "/roadmap",
    "/roadmap/account-abstraction",
    "/roadmap/beacon-chain",
    "/roadmap/danksharding",
    "/roadmap/future-proofing",
    "/roadmap/merge",
    "/roadmap/pbs",
    "/roadmap/scaling",
    "/roadmap/secret-leader-election",
    "/roadmap/security",
    "/roadmap/single-slot-finality",
    "/roadmap/statelessness",
    "/roadmap/user-experience",
    "/roadmap/verkle-trees",
    "/smart-contracts",
    "/social-networks",
    "/whitepaper",
  ]

  // Get an array of all files and directories in the passed directory using `fs.readdirSync`
  const fileList = fs.readdirSync(contentDir)

  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = join(contentDir, file)

    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the `getPostSlugs` function with the
      // directory path and the files array
      const nestedDir = join(dir, file)

      getPostSlugs(nestedDir, files)
    } else {
      const fileExtension = extname(name)

      if (fileExtension === ".md") {
        // If it is a .md file (allowed content page), push the path to the files array
        for (const page of temporalAllowedPages) {
          const fullPagePath = join(CURRENT_CONTENT_DIR, page)

          if (name.includes(fullPagePath)) {
            files.push(
              fullPagePath
                .replace(CURRENT_CONTENT_DIR, "")
                .replace("/index.md", "")
            )
          }
        }
      }
    }
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

  let fullPath = join(CURRENT_CONTENT_DIR, realSlug)

  // If content is not translated, use english content fallback
  if (!fs.existsSync(fullPath)) {
    fullPath = getFallbackEnglishPath(fullPath)
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data: frontmatter, content } = matter(fileContents)

  const items: PageContent = {
    slug,
    content,
    frontmatter,
    tocItems: generateTableOfContents(content),
  }

  return items
}

export const getContent = (dir: string) => {
  const slugs = getPostSlugs(dir)
  const content = slugs.map(getContentBySlug)

  return content
}
