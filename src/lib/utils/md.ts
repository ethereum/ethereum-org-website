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

import { ITutorial } from "@/pages/developers/tutorials"

function getCurrentDir() {
  return join(process.cwd(), CONTENT_DIR)
}

const getPostSlugs = (dir: string, files: string[] = []) => {
  const currentDir = getCurrentDir()
  const contentDir = join(currentDir, dir)
  // Temporal list of content pages allowed to be compiled
  // When a content page is migrated (and he components being used), should be added to this list
  const temporalAllowedPages = [
    // Use cases (8/8) ✅
    "/dao",
    "/decentralized-identity",
    "/defi",
    "/desci",
    "/nft",
    "/payments",
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
    "/developers/docs/",
    "/developers/docs/accounts",
    "/developers/docs/apis/backend",
    "/developers/docs/apis/javascript",
    "/developers/docs/apis/json-rpc",
    "/developers/docs/blocks",
    "/developers/docs/bridges",
    "/developers/docs/consensus-mechanisms",
    "/developers/docs/consensus-mechanisms/poa",
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
    "/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms",
    "/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto",
    "/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash",
    "/developers/docs/dapps",
    "/developers/docs/data-and-analytics",
    "/developers/docs/data-and-analytics/block-explorers",
    "/developers/docs/data-availability",
    "/developers/docs/data-availability/blockchain-data-storage-strategies",
    "/developers/docs/data-structures-and-encoding",
    "/developers/docs/data-structures-and-encoding/patricia-merkle-trie",
    "/developers/docs/data-structures-and-encoding/rlp",
    "/developers/docs/data-structures-and-encoding/ssz",
    "/developers/docs/data-structures-and-encoding/web3-secret-storage",
    "/developers/docs/design-and-ux",
    "/developers/docs/design-and-ux/heuristics-for-web3",
    "/developers/docs/design-and-ux/dex-design-best-practice",
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
    "/developers/docs/programming-languages/elixir",
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
    "/developers/docs/standards/tokens/erc-223",
    "/developers/docs/standards/tokens/erc-721",
    "/developers/docs/standards/tokens/erc-777",
    "/developers/docs/standards/tokens/erc-1155",
    "/developers/docs/standards/tokens/erc-4626",
    "/developers/docs/storage",
    "/developers/docs/transactions",
    "/developers/docs/web2-vs-web3",
    // Developer tutorials (53/53) ✅
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
    "/developers/tutorials/how-to-mint-an-nft",
    "/developers/tutorials/how-to-mock-solidity-contracts-for-testing",
    "/developers/tutorials/how-to-use-echidna-to-test-smart-contracts",
    "/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs",
    "/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs",
    "/developers/tutorials/how-to-use-tellor-as-your-oracle",
    "/developers/tutorials/how-to-view-nft-in-metamask",
    "/developers/tutorials/how-to-write-and-deploy-an-nft",
    "/developers/tutorials/interact-with-other-contracts-from-solidity",
    "/developers/tutorials/ipfs-decentralized-ui",
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
    "/developers/tutorials/server-components",
    "/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript",
    "/developers/tutorials/short-abi",
    "/developers/tutorials/smart-contract-security-guidelines",
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
    "/developers/tutorials/creating-a-wagmi-ui-for-your-contract",
    // Static (68/68) ✅
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
    "/contributing/translation-program",
    "/contributing/translation-program/content-buckets",
    "/contributing/translation-program/faq",
    "/contributing/translation-program/how-to-translate",
    "/contributing/translation-program/mission-and-vision",
    "/contributing/translation-program/playbook",
    "/contributing/translation-program/resources",
    "/contributing/translation-program/translatathon",
    "/contributing/translation-program/translatathon/details",
    "/contributing/translation-program/translatathon/translatathon-hubs",
    "/contributing/translation-program/translatathon/terms-and-conditions",
    "/contributing/translation-program/translators-guide",
    "/cookie-policy",
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
    "/roadmap/dencun",
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
    "/wrapped-eth",
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
          const fullPagePath = join(currentDir, page)

          if (name.includes(fullPagePath)) {
            files.push(
              toPosixPath(
                fullPagePath.replace(currentDir, "").replace("/index.md", "")
              )
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

  const currentDir = getCurrentDir()
  let fullPath = toPosixPath(join(currentDir, realSlug))
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
  const currentDir = getCurrentDir()
  const fullPath = join(
    currentDir,
    locale !== "en" ? `translations/${locale!}` : "",
    "developers/tutorials"
  )
  let tutorialData: ITutorial[] = []

  if (fs.existsSync(fullPath)) {
    const languageTutorialFiles = fs.readdirSync(fullPath)

    tutorialData = languageTutorialFiles.map((dir) => {
      const filePath = join(
        currentDir,
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
