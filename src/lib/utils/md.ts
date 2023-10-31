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
    "/developers/tutorials/a-developers-guide-to-ethereum-part-one",
    "/developers/tutorials/all-you-can-cache",
    "/developers/tutorials/calling-a-smart-contract-from-javascript",
    "/developers/tutorials/create-and-deploy-a-defi-app",
    "/developers/tutorials/deploying-your-first-smart-contract",
    "/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet",
    "/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit",
    "/developers/tutorials/eip-1271-smart-contract-signatures",
    "/developers/tutorials/erc-721-vyper-annotated-code",
    "/developers/tutorials/erc20-annotated-code",
    "/developers/tutorials/erc20-with-safety-rails",
    "/developers/tutorials/getting-started-with-ethereum-development-using-alchemy",
    "/developers/tutorials/guide-to-smart-contract-security-tools",
    "/developers/tutorials/hello-world-smart-contract",
    "/developers/tutorials/hello-world-smart-contract-fullstack",
    "/developers/tutorials/how-to-implement-an-erc721-market",
    "/developers/tutorials/how-to-mind-an-nft",
    "/developers/tutorials/how-to-mock-solidity-contracts-for-testing",
    "/developers/tutorials/how-to-use-echidna-to-test-smart-contracts",
    "/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs",
    "/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs",
    "/developers/tutorials/how-to-use-tellor-as-your-oracle",
    "/developers/tutorials/how-to-view-nft-in-metamask",
    "/developers/tutorials/how-to-write-and-deploy-an-nft",
    "/developers/tutorials/interact-with-other-contracts-from-solidity",
    "/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app",
    "/developers/tutorials/learn-foundational-ethereum-topics-with-sql",
    "/developers/tutorials/logging-events-smart-contracts",
    "/developers/tutorials/merkle-proofs-for-offline-data-integrity",
    "/developers/tutorials/monitoring-geth-with-influxdb-and-grafana",
    "/developers/tutorials/nft-minter",
    "/developers/tutorials/optimism-std-bridge-annotated-code",
    "/developers/tutorials/reverse-engineering-a-contract",
    "/developers/tutorials/run-node-raspberry-pi",
    "/developers/tutorials/scam-token-tricks",
    "/developers/tutorials/secure-development-workflow",
    "/developers/tutorials/send-token-ethersjs",
    "/developers/tutorials/sending-transactions-using-web3-and-alchemy",
    "/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript",
    "/developers/tutorials/short-abi",
    "/developers/tutorials/smart-contract-security-guidelines",
    "/developers/tutorials/solidity-and-truffle-continuous-integration-setup",
    "/developers/tutorials/testing-erc-20-tokens-with-waffle",
    "/developers/tutorials/the-graph-fixing-web3-data-querying",
    "/developers/tutorials/token-integration-checklist",
    "/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract",
    "/developers/tutorials/understand-the-erc-20-token-smart-contract",
    "/developers/tutorials/uniswap-v2-annotated-code",
    "/developers/tutorials/using-websockets",
    "/developers/tutorials/waffle-dynamic-mocking-and-testing-calls",
    "/developers/tutorials/waffle-say-hello-world-with-hardhat-and-ethers",
    "/developers/tutorials/waffle-test-simple-smart-contract",
    "/developers/tutorials/yellow-paper-evm",
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
