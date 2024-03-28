import { ReportsModel } from "@crowdin/crowdin-api-client"

import { NavSectionKey } from "@/components/Nav/types"

import i18nConfig from "../../i18n.config.json"

export const OLD_CONTENT_DIR = "src/content"
export const CONTENT_DIR = "public/content"
export const TRANSLATIONS_DIR = "public/content/translations"
export const TRANSLATED_IMAGES_DIR = "/content/translations"
export const PLACEHOLDER_IMAGE_DIR = "src/data/placeholders"
export const INTL_JSON_DIR = "src/intl"

// i18n
export const DEFAULT_LOCALE = "en"
export const FAKE_LOCALE = "default"
// Sorted list of supported locales codes, defined in `i18n.config.json`
const BUILD_LOCALES = process.env.BUILD_LOCALES
export const LOCALES_CODES = BUILD_LOCALES
  ? BUILD_LOCALES.split(",")
  : i18nConfig.map(({ code }) => code)

// Site urls
export const SITE_URL = "https://ethereum.org"
export const DISCORD_PATH = "/discord/"
export const EDIT_CONTENT_URL = `https://github.com/ethereum/ethereum-org-website/tree/dev/`
export const MAIN_CONTENT_ID = "main-content"
export const WEBSITE_EMAIL = "website@ethereum.org"
export const DEFAULT_OG_IMAGE = "/home/hero.png"

// Config
export const CONTENT_IMAGES_MAX_WIDTH = 800
export const GITHUB_BASE_API =
  "https://api.github.com/repos/ethereum/ethereum-org-website"
export const GITHUB_COMMITS_URL = GITHUB_BASE_API + "/commits"
export const GITHUB_URL = `https://github.com/`
export const COINGECKO_API_BASE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category="
export const COINGECKO_API_URL_PARAMS =
  "&order=market_cap_desc&per_page=100&page=1&sparkline=false"
export const BASE_TIME_UNIT = 3600 // 1 hour

// Quiz Hub
export const PROGRESS_BAR_GAP = "4px"
export const PASSING_QUIZ_SCORE = 65
export const USER_STATS_KEY = "quizzes-stats"
export const INITIAL_QUIZ = "what-is-ethereum"
export const TOTAL_QUIZ_QUESTIONS_ANSWERED = 100000
export const TOTAL_QUIZ_AVERAGE_SCORE = 67.4
export const TOTAL_QUIZ_RETRY_RATE = 15.6

// Crowdin
export const CROWDIN_PROJECT_ID = 363359
export const CROWDIN_API_MAX_LIMIT = 500
export const FIRST_CROWDIN_CONTRIBUTION_DATE = "2019-07-01T00:00:00+00:00"
export const REGULAR_RATES: ReportsModel.RegularRate[] = [
  {
    mode: "tm_match",
    value: 1.01,
  },
  {
    mode: "no_match",
    value: 1.01,
  },
]

export const languagePathRootRegExp = /^.+\/content\/translations\/[a-z\-]*\//

// Metrics
export const DAYS_TO_FETCH = 90
export const RANGES = ["30d", "90d"] as const
export const BEACONCHA_IN_URL = "https://beaconcha.in/"
export const ETHERSCAN_API_URL = "https://api.etherscan.io"

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
