import fs from "fs"
import { join, extname } from "path"
import matter from "gray-matter"

import { generateTableOfContents } from "@/lib/utils/toc"
import type { MdPageContent } from "@/lib/interfaces"
import type { Frontmatter } from "@/lib/types"
import { getFallbackEnglishPath, removeEnglishPrefix } from "@/lib/utils/i18n"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

const CURRENT_CONTENT_DIR = join(process.cwd(), CONTENT_DIR)

const getPostSlugs = (dir: string, files: string[] = []) => {
  const contentDir = join(CURRENT_CONTENT_DIR, dir)
  // Temporal list of content pages allowed to be compiled
  // When a content page is migrated (and he components being used), should be added to this list
  const temporalAllowedPages = [
    // Use cases (7/7) ✅
    "/dao",
    "/decentralized-identity",
    "/defi",
    "/desci",
    "/nft",
    "/refi",
    "/social-networks",
    // Staking (4/4) ✅
    "/staking/pools",
    "/staking/saas",
    "/staking/solo",
    "/staking/withdrawals",
    // Roadmap (5/5) ✅
    "/roadmap",
    "/roadmap/future-proofing",
    "/roadmap/scaling",
    "/roadmap/security",
    "/roadmap/user-experience",
    // Upgrade (2/2) ✅
    "/roadmap/beacon-chain",
    "/roadmap/merge",
    // Developer docs (0/95)
    // Developer tutorials (1/53)
    "/developers/tutorials/all-you-can-cache",
    // Static (66/68)
    "/about",
    "/bridges",
    "/community/code-of-conduct",
    "/community/events",
    "/community/get-involved",
    "/community/grants",
    "/community/language-resources",
    "/community/online",
    "/community/research",
    "/community/support",
    "/contributing",
    "/contributing/adding-desci-projects",
    "/contributing/adding-developer-tools",
    "/contributing/adding-exchanges",
    "/contributing/adding-glossary-terms",
    "/contributing/adding-layer-2s",
    "/contributing/adding-products",
    "/contributing/adding-staking-products",
    "/contributing/adding-wallets",
    "/contributing/content-resources",
    "/contributing/design",
    "/contributing/design/adding-design-resources",
    "/contributing/design-principles",
    "/contributing/quizzes",
    "/contributing/style-guide",
    "/contributing/style-guide/content-standardization",
    // "/contributing/translation-program", // TODO: Fix image reference bug
    "/contributing/translation-program/content-buckets",
    // "/contributing/translation-program/faq", // TODO: Fix image reference bug
    "/contributing/translation-program/how-to-translate",
    "/contributing/translation-program/mission-and-vision",
    "/contributing/translation-program/playbook",
    "/contributing/translation-program/resources",
    "/contributing/translation-program/translatathon",
    "/contributing/translation-program/translators-guide",
    "/cookie-policy",
    "/deprecated-software",
    "/eips",
    "/energy-consumption",
    "/enterprise",
    "/enterprise/private-ethereum",
    "/foundation",
    "/glossary",
    "/governance",
    "/guides",
    "/guides/how-to-create-an-ethereum-account",
    "/guides/how-to-id-scam-tokens",
    "/guides/how-to-revoke-token-access",
    "/guides/how-to-swap-tokens",
    "/guides/how-to-use-a-bridge",
    "/guides/how-to-use-a-wallet",
    "/history/",
    "/privacy-policy",
    "/roadmap/account-abstraction",
    "/roadmap/danksharding",
    "/roadmap/merge/issuance",
    "/roadmap/pbs",
    "/roadmap/secret-leader-election",
    "/roadmap/single-slot-finality",
    "/roadmap/statelessness",
    "/roadmap/verkle-trees",
    "/security",
    "/smart-contracts",
    "/staking/dvt",
    "/terms-of-use",
    "/web3",
    "/whitepaper",
    "/zero-knowledge-proofs",
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
  let contentNotTranslated = false

  // If content is not translated, use english content fallback
  if (!fs.existsSync(fullPath)) {
    fullPath = getFallbackEnglishPath(fullPath)
    contentNotTranslated = true
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = data as Frontmatter
  const items: MdPageContent = {
    slug,
    content,
    frontmatter,
    tocItems: generateTableOfContents(content),
    contentNotTranslated,
  }

  return items
}

export const getContent = (dir: string) => {
  const slugs = getPostSlugs(dir)
  const content = slugs.map(getContentBySlug)

  return content
}
