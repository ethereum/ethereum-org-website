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
    "/about",
    "/bridges",
    "/community/code-of-conduct",
    "/community/events",
    "/community/support",
    "/dao",
    "/decentralized-identity",
    "/defi",
    "/desci",
    "/developers/docs/",
    "/developers/docs/accounts",
    "/developers/docs/apis/backend",
    "/developers/docs/apis/javascript",
    "/developers/docs/apis/json-rpc",
    "/developers/docs/blocks",
    "/developers/docs/bridges",
    "/developers/docs/consensus-mechanisms",
    "/developers/docs/consensus-mechanisms/pos",
    "/developers/docs/consensus-mechanisms/pos/attack-and-defense",
    "/developers/docs/consensus-mechanisms/pos/attestations",
    "/developers/docs/consensus-mechanisms/pos/block-proposal",
    "/developers/docs/consensus-mechanisms/pos/faqs",
    "/developers/docs/consensus-mechanisms/pos/gasper",
    "/developers/docs/consensus-mechanisms/pos/keys",
    "/developers/docs/consensus-mechanisms/pos/pos-vs-pow",
    "/developers/docs/consensus-mechanisms/pos/rewards-and-penalties",
    "/developers/docs/consensus-mechanisms/pos/weak-subjectivity",
    "/developers/docs/consensus-mechanisms/pow/",
    "/developers/docs/consensus-mechanisms/pow/mining",
    "/developers/docs/consensus-mechanisms/pow/mining-algorithms",
    "/developers/docs/consensus-mechanisms/pow/mining-algorithms/dagger-hashimoto",
    "/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash",
    "/developers/docs/dapps",
    "/developers/docs/data-and-analytics",
    "/developers/docs/data-and-analytics/block-explorers",
    "/developers/docs/data-availability",
    "/developers/docs/data-structures-and-encoding",
    "/developers/docs/data-structures-and-encoding/patricia-merkle-trie",
    "/developers/docs/data-structures-and-encoding/rlp",
    "/developers/docs/data-structures-and-encoding/ssz",
    "/developers/docs/data-structures-and-encoding/web3-secret-storage",
    "/developers/docs/design-and-ux",
    "/developers/docs/development-networks",
    "/developers/docs/ethereum-stack",
    "/developers/docs/evm",
    "/developers/docs/evm/opcodes",
    "/developers/docs/frameworks",
    "/developers/docs/gas",
    "/developers/docs/ides",
    "/developers/docs/intro-to-ether",
    "/developers/docs/intro-to-ethereum",
    "/developers/docs/mev",
    "/developers/docs/networking-layer",
    "/developers/docs/networking-layer/network-addresses",
    "/developers/docs/networking-layer/portal-network",
    "/developers/docs/networks",
    "/developers/docs/nodes-and-clients",
    "/developers/docs/nodes-and-clients/archive-nodes",
    "/developers/docs/nodes-and-clients/bootnodes",
    "/developers/docs/nodes-and-clients/client-diversity",
    "/developers/docs/nodes-and-clients/light-clients",
    "/developers/docs/nodes-and-clients/node-architecture",
    "/developers/docs/nodes-and-clients/nodes-as-a-service",
    "/developers/docs/nodes-and-clients/run-a-node",
    "/developers/docs/oracles",
    "/developers/docs/programming-languages",
    "/developers/docs/programming-languages/dart",
    "/developers/docs/programming-languages/delphi",
    "/developers/docs/programming-languages/dot-net",
    "/developers/docs/programming-languages/golang",
    "/developers/docs/programming-languages/java",
    "/developers/docs/programming-languages/javascript",
    "/developers/docs/programming-languages/python",
    "/developers/docs/programming-languages/ruby",
    "/developers/docs/programming-languages/rust",
    "/developers/docs/scaling",
    "/developers/docs/scaling/optimistic-rollups",
    "/developers/docs/scaling/plasma",
    "/developers/docs/scaling/sidechains",
    "/developers/docs/scaling/state-channels",
    "/developers/docs/scaling/validium",
    "/developers/docs/scaling/zk-rollups",
    "/developers/docs/smart-contracts",
    "/developers/docs/smart-contracts/anatomy",
    "/developers/docs/smart-contracts/compiling",
    "/developers/docs/smart-contracts/composability",
    "/developers/docs/smart-contracts/deploying",
    "/developers/docs/smart-contracts/formal-verification",
    "/developers/docs/smart-contracts/languages",
    "/developers/docs/smart-contracts/libraries",
    "/developers/docs/smart-contracts/security",
    "/developers/docs/smart-contracts/testing",
    "/developers/docs/smart-contracts/upgrading",
    "/developers/docs/smart-contracts/verifying",
    "/developers/docs/standards",
    "/developers/docs/standards/tokens",
    "/developers/docs/standards/tokens/erc-20",
    "/developers/docs/standards/tokens/erc-721",
    "/developers/docs/standards/tokens/erc-777",
    "/developers/docs/standards/tokens/erc-1155",
    "/developers/docs/standards/tokens/erc-4626",
    "/developers/docs/storage",
    "/developers/docs/transactions",
    "/developers/docs/web2-vs-web3",
    "/developers/tutorials/all-you-can-cache",
    "/energy-consumption",
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
    "/staking/pools",
    "/staking/saas",
    "/staking/solo",
    "/staking/withdrawals",
    "/web3",
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
