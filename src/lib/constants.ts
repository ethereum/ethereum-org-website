import { NavSectionKey } from "@/components/Nav/types"

import i18nConfig from "../../i18n.config.json"

import type { CommunityBlog } from "./types"

export const OLD_CONTENT_DIR = "src/content" // For old git commit history -- do not remove
export const CONTENT_DIR = "public/content"
export const CONTENT_PATH = "/content"
export const TRANSLATED_IMAGES_DIR = "/content/translations"
export const PLACEHOLDER_IMAGE_DIR = "src/data/placeholders"
export const INTERNAL_TUTORIALS_JSON = "src/data/internalTutorials.json"
export const INTL_JSON_DIR = "src/intl"

export const NULL_VALUE = "—"

// i18n
export const DEFAULT_LOCALE = "en"
export const FAKE_LOCALE = "default"
// Sorted list of supported locales codes, defined in `i18n.config.json`
const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES
export const LOCALES_CODES = BUILD_LOCALES
  ? BUILD_LOCALES.split(",")
  : i18nConfig.map(({ code }) => code)

// Site URL - resolved at build time in next.config.js from Netlify deploy context
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ethereum.org"

export const IS_PRODUCTION_DEPLOY =
  process.env.NEXT_PUBLIC_CONTEXT === "production"
export const DISCORD_PATH = "https://discord.gg/ethereum-org/"
export const ENTERPRISE_ETHEREUM_URL = "https://institutions.ethereum.org/"
export const GITHUB_REPO_URL =
  "https://github.com/ethereum/ethereum-org-website/"
export const EDIT_CONTENT_URL = `https://github.com/ethereum/ethereum-org-website/tree/dev/`
export const MAIN_CONTENT_ID = "main-content"
export const WEBSITE_EMAIL = "website@ethereum.org"
export const DEFAULT_OG_IMAGE = "/images/home/hero.png"
export const SITE_TITLE = "ethereum.org"

// Config
export const CONTENT_IMAGES_MAX_WIDTH = 800
export const GITHUB_BASE_API =
  "https://api.github.com/repos/ethereum/ethereum-org-website"
export const GITHUB_COMMITS_URL = GITHUB_BASE_API + "/commits"
export const GITHUB_URL = `https://github.com/`
export const COLOR_MODE_STORAGE_KEY = "theme"

// API timing
export const BASE_TIME_UNIT = 3600 // (seconds) 1 hour
export const TIMEOUT_MS = 5000 // (milliseconds)
export const MAX_RETRIES = 1
export const RETRY_DELAY_BASE_MS = 250 // (milliseconds)

// Quiz Hub
export const PROGRESS_BAR_GAP = "4px"
export const PASSING_QUIZ_SCORE = 65
export const USER_STATS_KEY = "quizzes-stats"
export const INITIAL_QUIZ = "what-is-ethereum"

// Crowdin
export const CROWDIN_PROJECT_URL = "https://crowdin.com/project/ethereum-org"

// Metrics
export const DAYS_TO_FETCH = 1
export const BEACONCHA_IN_URL = "https://beaconcha.in/"
export const ETHERSCAN_API_URL = "https://api.etherscan.io"
export const DUNE_API_URL = "https://api.dune.com"

// Wallets
export const NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN = 5

export const WALLETS_FILTERS_DEFAULT = {
  android: false,
  ios: false,
  linux: false,
  windows: false,
  macOS: false,
  firefox: false,
  chromium: false,
  hardware: false,
  open_source: false,
  non_custodial: false,
  hardware_support: false,
  rpc_importing: false,
  nft_support: false,
  connect_to_dapps: false,
  staking: false,
  swaps: false,
  layer_2: false,
  gas_fee_customization: false,
  ens_support: false,
  erc_20_support: false,
  buy_crypto: false,
  withdraw_crypto: false,
  multisig: false,
  social_recovery: false,
  eip_4337_support: false,
  eip_7702_support: false,
  new_to_crypto: false,
}

export const NEW_TO_CRYPTO_FEATURES = ["new_to_crypto"]

export const NFTS_FEATURES = ["nft_support", "layer_2", "connect_to_dapps"]

export const LONG_TERM_FEATURES = ["hardware", "non_custodial"]

export const FINANCE_FEATURES = [
  "hardware_support",
  "connect_to_dapps",
  "gas_fee_customization",
  "erc_20_support",
]

export const DEVELOPER_FEATURES = [
  "open_source",
  "rpc_importing",
  "connect_to_dapps",
  "gas_fee_customization",
  "erc_20_support",
]

// Chains
export const CHAINID_NETWORK_ENDPOINT = "https://chainid.network/chains.json"
export const BLOCKSCOUT_CHAINS_ENDPOINT =
  "https://chains.blockscout.com/api/chains"

/**
 * Networks offered when a search looks like an address or hash, in the order the rows
 * appear -- Ethereum Mainnet first, then the L2s in the same order as
 * `/layer-2/networks`. Curated rather than derived from Blockscout's 745-chain registry:
 * this is the set ethereum.org itself features, and the icons are assets we already ship.
 *
 * Absent deliberately: Zircuit is not in Blockscout's registry, and Starknet is not EVM
 * -- its addresses collide with Ethereum transaction hashes, so it needs its own handling.
 */
/**
 * Explorers for featured networks that Blockscout does not cover, each rendered as its
 * own section so the heading never claims Blockscout for a link that isn't.
 *
 * Starknet is not EVM. Its addresses and hashes are field elements below 2^251, so
 * unpadded they run to at most 63 hex digits; zero-padded to 32 bytes they reach 64 and
 * become indistinguishable from an Ethereum transaction hash. Explorers differ on
 * padding -- Starkscan displays padded but copies unpadded -- and leading zeros then
 * cascade at one in sixteen: 63 digits covers 87.5% of values, 62 covers 12.5%, 60 is
 * 1 in 2,000, and 56 is 1 in 130 million. Accepting 56 or more catches essentially every
 * real value without reaching into lengths that mean something else.
 *
 * Starkscan is closed source, which we would rather avoid. The one open-source Starknet
 * explorer, LambdaClass's Stark Compass, is archived and only supports Starknet up to
 * 0.13.2, so it is not somewhere to send people. Voyager, Viewblock and OKLink are closed
 * too. It also has no unified search route, and a felt gives no clue whether it is a
 * contract or a transaction, so both are offered. Accounts are contracts on Starknet.
 */
export const STARKNET_MIN_HEX_DIGITS = 56

export const STARKNET_EXPLORER = {
  brand: "Starkscan",
  icon: "starknet.png",
  contractUrl: "https://starkscan.co/contract",
  txUrl: "https://starkscan.co/tx",
}

/**
 * Zircuit runs neither Blockscout nor an Etherscan-family explorer and is absent from
 * Blockscout's registry, so it needs its own entry to appear at all. Being EVM, the
 * value's length says which route to use, so one row is enough.
 */
export const ZIRCUIT_EXPLORER = {
  brand: "Zircuit",
  name: "Zircuit",
  icon: "zircuit.png",
  addressUrl: "https://explorer.zircuit.com/address",
  txUrl: "https://explorer.zircuit.com/tx",
}

export const EXPLORER_NETWORKS = [
  { chainId: 1, icon: "ethereum.png" },
  { chainId: 42161, icon: "arbitrum.jpg" },
  { chainId: 8453, icon: "base.png" },
  { chainId: 10, icon: "optimism.png" },
  { chainId: 324, icon: "zksyncEra.jpg" },
  { chainId: 59144, icon: "linea.png" },
  { chainId: 534352, icon: "scroll.png" },
  { chainId: 130, icon: "unichain.png" },
  { chainId: 57073, icon: "ink.png" },
]

export const CANONICAL_STAKING_TESTNET = "Hoodi"

export const TESTNETS = [
  "hoodi",
  "goerli",
  "holesky",
  "kiln",
  "kintsugi",
  "ropsten",
  "rinkeby",
  "sepolia",
  "zhejiang",
]

export const EXCLUDED_NAMES = ["deprecated", "testnet"]

export const ETH = "ETH"

/**
 * Navigation
 */

export const MAIN_NAV_ID = "main-navigation"
export const NAV_BAR_PX_HEIGHT = "75px"
export const FROM_QUERY = "from"
export const NAV_PY = 4

// Determines the order of sections in the menu
export const SECTION_LABELS: NavSectionKey[] = [
  "learn",
  "use",
  "build",
  "participate",
  "research",
]

// Glossary Definition Component
export const DEFAULT_GLOSSARY_NS = "glossary"

export const HAMBURGER_BUTTON_ID = "mobile-menu-button"
export const MOBILE_LANGUAGE_BUTTON_NAME = "mobile-language-button"
export const DESKTOP_LANGUAGE_BUTTON_NAME = "desktop-language-button"

// Codeblock
export const LINES_BEFORE_COLLAPSABLE = 8

// Ethereum.org community
export const CALENDAR_DISPLAY_COUNT = 4

// RSS Feeds
export const RSS_DISPLAY_COUNT = 6

export const VITALIK_FEED = "https://vitalik.eth.limo/feed.xml"
export const SOLIDITY_FEED = "https://soliditylang.org/feed.xml"
export const ATTESTANT_BLOG = "https://www.attestant.io/posts/"

export const COMMUNITY_BLOGS: CommunityBlog[] = [
  {
    href: "https://vitalik.eth.limo/",
    feed: VITALIK_FEED,
  },
  {
    href: "https://blog.ethereum.org/",
    feed: "https://blog.ethereum.org/en/feed.xml",
  },
  {
    href: "https://ethpandaops.io/posts/",
    feed: "https://ethpandaops.io/posts/rss.xml",
  },
  {
    href: "https://ethstaker.cc/blog",
    feed: "https://raw.githubusercontent.com/eth-educators/github-actions/refs/heads/main/_data/blog_data.xml",
  },
  {
    name: "0xPARC",
    href: "https://0xparc.org/blog",
  },
  { href: ATTESTANT_BLOG, feed: ATTESTANT_BLOG },
  { name: "Devcon", href: "https://devcon.org/en/blogs/" },
  {
    href: "https://soliditylang.org/blog/",
    feed: SOLIDITY_FEED,
  },
  {
    href: "https://paragraph.com/@privacy-scaling-explorations",
    feed: "https://api.paragraph.com/blogs/rss/@privacy-scaling-explorations",
  },
  {
    href: "https://paragraph.com/@josh-stark",
    feed: "https://api.paragraph.com/blogs/rss/@josh-stark",
  },
  {
    href: "https://medium.com/ethereum-cat-herders/newsletter",
    feed: "https://medium.com/feed/ethereum-cat-herders",
  },
  {
    href: "https://geodework.com/blog",
    feed: "https://geodework.com/feed.xml",
  },
  {
    href: "https://ethereal.news",
    feed: "https://ethereal.news/rss.xml",
  },
]

export const BLOG_FEEDS = COMMUNITY_BLOGS.map(({ feed }) => feed).filter(
  Boolean
) as string[]

export const BLOGS_WITHOUT_FEED = COMMUNITY_BLOGS.filter((item) => !item.feed)

export const SIZE_CLASS_MAPPING = {
  10: "size-10",
  12: "size-12",
  14: "size-14",
  16: "size-16",
  24: "size-24",
} as const

export const LINE_CLAMP_CLASS_MAPPING = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
} as const

export const DEVCON_INDIA_START_DATE = new Date(Date.UTC(2026, 10, 3, 6, 0, 0))
export const DEVCON_INDIA_END_DATE = new Date(Date.UTC(2026, 10, 6, 18, 0, 0))
// Voucher redemption is English-only; mtm_* params attribute the referral in Matomo
export const DEVCON_INDIA_TICKET_URL =
  "https://tickets.devcon.org/redeem?voucher=ETHORG10&mtm_campaign=ethorg10&mtm_source=ethereum.org&mtm_medium=referral"
