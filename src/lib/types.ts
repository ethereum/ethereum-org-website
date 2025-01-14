import type { Options } from "mdast-util-toc"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import type { StaticImageData } from "next/image"
import type { SSRConfig } from "next-i18next"
import type { ReactElement, ReactNode } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import type {
  DocsFrontmatter,
  RoadmapFrontmatter,
  StakingFrontmatter,
  StaticFrontmatter,
  TutorialFrontmatter,
  UpgradeFrontmatter,
  UseCasesFrontmatter,
} from "@/lib/interfaces"

import type { BreadcrumbsProps } from "@/components/Breadcrumbs"
import type { CallToActionProps } from "@/components/Hero/CallToAction"
import type { SimulatorNav } from "@/components/Simulator/interfaces"

import chains from "@/data/chains"
import { Rollup, Rollups } from "@/data/networks/networks"
import allQuizData from "@/data/quizzes"
import allQuestionData from "@/data/quizzes/questionBank"

import { screens } from "./utils/screen"
import { WALLETS_FILTERS_DEFAULT } from "./constants"

import { layoutMapping } from "@/pages/[...slug]"

// Credit: https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type ChildOnlyProp = { children?: ReactNode }

export type ClassNameProp = { className?: string }

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement<P>) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type Root = {
  children: ReactNode
  contentIsOutdated: boolean
  contentNotTranslated: boolean
  lastDeployLocaleTimestamp: string
}

export type BasePageProps = SSRConfig &
  Pick<Root, "contentNotTranslated" | "lastDeployLocaleTimestamp">

export type Frontmatter = RoadmapFrontmatter &
  UpgradeFrontmatter &
  StaticFrontmatter &
  UseCasesFrontmatter &
  StakingFrontmatter &
  DocsFrontmatter &
  TutorialFrontmatter

export type LayoutMappingType = typeof layoutMapping
export type Layout = keyof LayoutMappingType

export type Lang =
  | "en"
  | "am"
  | "ar"
  | "az"
  | "be"
  | "bg"
  | "bn"
  | "bs"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "es"
  | "fa"
  | "fi"
  | "fil"
  | "fr"
  | "gl"
  | "gu"
  | "ha"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "hy-am"
  | "id"
  | "ig"
  | "it"
  | "ja"
  | "ka"
  | "kk"
  | "km"
  | "kn"
  | "ko"
  | "lt"
  | "ml"
  | "mr"
  | "ms"
  | "nb"
  | "ne-np"
  | "nl"
  | "pcm"
  | "pl"
  | "pt-br"
  | "pt"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sn"
  | "sr"
  | "sw"
  | "ta"
  | "te"
  | "th"
  | "tk"
  | "tl"
  | "tr"
  | "tw"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "yo"
  | "zh-tw"
  | "zh"

export type Direction = "rtl" | "ltr" | "auto"

export type I18nLocale = {
  code: Lang
  crowdinCode: string
  name: string
  localName: string
  langDir: Direction
  dateFormat: string
}

export type Languages = {
  [lang in Lang]: I18nLocale
}

export type TranslationKey = string

export type LoadingState<T> =
  | { loading: true }
  | { loading: false; data: T }
  | { loading: false; error: unknown }

// Quiz data types

export type ChoiceLetter = "a" | "b" | "c" | "d"

type ChoiceNumber = 1 | 2 | 3 | 4
type TotalAnswers = 2 | 3 | 4

type QuestionTemplate = {
  totalAnswers: TotalAnswers
  correctAnswer: ChoiceNumber
  explanationOverrides?: (ChoiceNumber | null)[] // Tuple<ChoiceNumber, QuestionTemplate["totalAnswers"]>
}

export type QuestionBankConfig = Record<string, QuestionTemplate[]>

export type Answer = {
  id: string
  label: TranslationKey
  explanation: TranslationKey
  moreInfoLabel?: string
  moreInfoUrl?: string
}

export type RawQuestion = {
  prompt: TranslationKey
  answers: Answer[]
  correctAnswerId: string
}

export type QuestionBank = Record<string, RawQuestion>
export type QuestionKey = keyof typeof allQuestionData
export type AnswerKey =
  (typeof allQuestionData)[QuestionKey]["answers"][number]["id"]

export type Question = RawQuestion & {
  id: QuestionKey
}

export type Quiz = {
  title: TranslationKey
  questions: Question[]
}

export type AnswerChoice = {
  answerId: AnswerKey
  isCorrect: boolean
}

export type RawQuiz = {
  title: TranslationKey
  questions: QuestionKey[]
}

export type QuizStatus = "neutral" | "success" | "error"

type QuizLevel = "beginner" | "intermediate" | "advanced"

export type QuizzesSection = {
  id: QuizKey
  level: QuizLevel
  next?: QuizKey
}

export type RawQuizzes = Record<string, RawQuiz>
export type QuizKey = keyof typeof allQuizData

type HasScoredPerfect = boolean
type QuestionsCorrect = number

export type CompletedQuizzes = Record<
  QuizKey,
  [HasScoredPerfect, QuestionsCorrect]
>

export type UserStats = {
  score: number
  average: number[]
  completed: CompletedQuizzes
}

export type QuizShareStats = { score: number; total: number }

/**
 * Staking
 */
export type StakingPage = "solo" | "saas" | "pools"

/**
 * File contributors
 */
export type FileContributorsState = LoadingState<Author[]>

export type LastUpdatedState = LoadingState<string>

// Crowdin contributors
export type CrowdinFileId = {
  id: number
  path: string
}

export type CrowdinContributor = {
  id: number
  username: string
  avatarUrl: string
  totalCosts: number
}

type FileContributorData = {
  fileId: string
  contributors: CrowdinContributor[]
}

export type LocaleContributions = {
  lang: string
  data: FileContributorData[]
}

// Crowdin translation progress
export type ProjectProgressData = {
  languageId: string
  words: {
    total: number
    approved: number
  }
}

export type LocaleDisplayInfo = {
  localeOption: string
  sourceName: string
  targetName: string
  englishName: string
  approvalProgress: number
  wordsApproved: number
  isBrowserDefault?: boolean
}

/**
 * Translation cost report
 */
type DateRange = { from: string; to: string }
type Total = { total: number }
type Cost = {
  tmMatch: { "100": number; perfect: number }
  mtMatch: { "100": string }
  suggestionMatch: { "100": number }
  total: number
  default: { noMatch: number }
}

type CrowdinUser = {
  id: number
  username: string
  fullName: string
  avatarUrl: string
  roleTitle: string
}

type CostItem = {
  approvalCosts: Total
  preTranslated: Cost
  savings: Omit<Cost, "default">
  totalCosts: number
  translationCosts: Cost
}

type ReportLanguageItem = {
  id: string
  name: string
  roleTitle: string
}

type ReportLanguage = CostItem & {
  approvalRate: number
  approved: Total
  language: ReportLanguageItem
  targetTranslated: Cost
  translated: Cost
  translatedByMt: Cost
  translationRates: Omit<Cost, "total">
}

type DataItem = CostItem & {
  user: CrowdinUser
  languages: ReportLanguage[]
}

export type TranslationCostReport = CostItem & {
  name: string
  url: string
  unit: string
  dateRange: DateRange
  currency: string
  data: DataItem[]
}

export type CostLeaderboardData = Pick<
  CrowdinUser,
  "username" | "fullName" | "avatarUrl"
> &
  Pick<CostItem, "totalCosts"> & {
    langs: string[]
  }

// GitHub contributors

export type Commit = {
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
  }
  author: {
    avatar_url: string
    login: string
    html_url: string
  }
}

export type Author = {
  name: string
  email: string
  avatarUrl: string
  user: {
    login: string
    url: string
  }
}

export type FileContributor = {
  login: string
  avatar_url: string
  html_url: string
  date?: string
}

type FilePath = string
export type CommitHistory = Record<FilePath, FileContributor[]>

/**
 * Table of contents
 */
export type SourceHeadingItem = { depth: number; id: string; label: string }

export type ToCNodeEntry = {
  url?: string
  title?: string
}

export type TocNodeType =
  | ToCNodeEntry
  | {
      items: TocNodeType[]
    }

export type ToCItem = {
  title: string
  url: string
  items?: ToCItem[]
}

export type IRemarkTocOptions = {
  maxDepth?: Options["maxDepth"]
  callback: (toc: TocNodeType) => void
}

type HeroButtonProps = Omit<CallToActionProps, "index">

/**
 * General props to be picked or omitted for any of the hero components
 *
 * The generic prop type `HeroImg` is assigned to the `heroImg` prop
 * to be able to declare either defining the prop as a static image object
 * or a string. (defaults to `StaticImageData`)
 */
export type CommonHeroProps<
  HeroImg extends StaticImageData | string = StaticImageData,
> = {
  /**
   * Decorative image displayed as the full background or an aside to
   * the text content
   *
   * Note: It is either required as a static image data object or the
   * relative path of the image file, depending on the setup of the image component
   * for the given hero component.
   */
  heroImg: HeroImg
  /**
   * File path for the image to show on prerender.
   */
  blurDataURL: string
  /**
   * Object of props to render the `Breadcrumbs` component.
   */
  breadcrumbs: BreadcrumbsProps
  /**
   * An array of content to render call-to-action buttons that leads the user to a section or sections of the
   * given page from the hero.
   *
   * The hero can render no buttons or up to and no more than two.
   */
  buttons?: [HeroButtonProps, HeroButtonProps?]
  /**
   * The primary title of the page
   */
  title: string
  /**
   * A tag name for the page
   */
  header: string
  /**
   * Preface text about the content in the given page
   */
  description: ReactNode
}

// Learning Tools

export interface LearningTool {
  name: string
  description: string
  url: string
  image: StaticImageData
  alt: string
  background: string
  subjects: Array<string>
  locales?: Array<Lang>
}

export interface LearningToolsCardGridProps {
  category: Array<LearningTool>
}

// Staking stats data fetching
type Data<T> = {
  data: T
}

export type EthStoreResponse = Data<{
  apr: number
  day: number
  effective_balances_sum_wei: number
}>

export type EthStakedResponse = {
  result: {
    rows?: {
      cum_deposited_eth: number
      time: string
    }[]
  }
}

export type EpochResponse = Data<{
  validatorscount: number
}>

export type StakingStatsData = {
  totalEthStaked: number
  validatorscount: number
  apr: number
}

export type ValueOrError<T> =
  | { value: T; timestamp?: number }
  | { error: string }

export type EtherscanNodeResponse = {
  result: {
    UTCDate: number
    TotalNodeCount: number
  }[]
}

type EtherscanTxCountItem = {
  unixTimeStamp: string
  transactionCount: number
}

export type EtherscanTxCountResponse = {
  status: string
  message: string
  result: EtherscanTxCountItem[]
}

export type DefiLlamaTVLResponse = {
  date: string
  totalLiquidityUSD: number
}[]

export type MetricReturnData = ValueOrError<number>

export type StatsBoxState = ValueOrError<string>

export type GrowThePieMetricKey = "txCount" | "txCostsMedianUsd"

export type GrowThePieData = Record<GrowThePieMetricKey, MetricReturnData> & {
  dailyTxCosts: Record<string, number>
  activeAddresses: Record<string, number>
}

export type MetricName =
  | "ethPrice" // Use with `totalEthStaked` to convert ETH to USD
  | "totalEthStaked"
  | "totalValueLocked"
  | GrowThePieMetricKey

export type AllMetricData = Record<MetricName, MetricReturnData>

export type StatsBoxMetric = {
  label: string
  description?: string
  state: StatsBoxState
  apiUrl: string
  apiProvider: string
}

export type SimulatorNavProps = {
  nav: SimulatorNav
}

export type PhoneScreenProps = SimulatorNavProps & {
  ctaLabel: string
}
export type CommunityConference = {
  title: string
  href: string
  location: string
  description: string
  startDate: string
  endDate: string
  imageUrl: string
}

// Chains
export type ChainIdNetworkResponse = {
  name: string
  chain: string
  title?: string
  icon?: string
  rpc: string[]
  features?: { name: string }[]
  faucets?: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  infoURL: string
  shortName: string
  chainId: number
  networkId: number
  redFlags?: string[]
  slip44?: number
  ens?: { registry: string }
  explorers?: {
    name: string
    url: string
    icon?: string
    standard: string
  }[]
  status?: "deprecated" | "active" | "incubating"
  parent?: {
    type: "L2" | "shard"
    chain: string
    bridges?: { url: string }[]
  }
}

export type Chain = Pick<
  ChainIdNetworkResponse,
  "name" | "infoURL" | "chainId" | "nativeCurrency" | "chain"
>

export type ChainName = (typeof chains)[number]["name"]

export type NonEVMChainName = "Starknet"

export type ExtendedRollup = Rollup & {
  networkMaturity: MaturityLevel
  txCosts: number
  tvl: number
  walletsSupported: string[]
}

// Wallets
export type WalletData = {
  last_updated: string
  name: string
  image: StaticImageData
  twBackgroundColor: string
  twGradiantBrandColor: string
  url: string
  active_development_team: boolean
  languages_supported: Lang[]
  twitter: string
  discord: string
  reddit: string
  telegram: string
  ios: boolean
  android: boolean
  linux: boolean
  windows: boolean
  macOS: boolean
  firefox: boolean
  chromium: boolean
  hardware: boolean
  open_source: boolean
  repo_url: string
  non_custodial: boolean
  security_audit: string[]
  scam_protection: boolean
  hardware_support: boolean
  rpc_importing: boolean
  nft_support: boolean
  connect_to_dapps: boolean
  staking: boolean
  swaps: boolean
  multichain?: boolean
  layer_2: boolean
  supported_chains: (ChainName | NonEVMChainName)[]
  gas_fee_customization: boolean
  ens_support: boolean
  erc_20_support: boolean
  buy_crypto: boolean
  withdraw_crypto: boolean
  multisig: boolean
  social_recovery: boolean
  onboard_documentation: string
  documentation: string
  mpc?: boolean
  new_to_crypto?: boolean
}

export type Wallet = WalletData & {
  supportedLanguages: string[]
}

export type WalletFilter = typeof WALLETS_FILTERS_DEFAULT

export interface WalletFilterData {
  title: TranslationKey
  filterKey?: string
  description: TranslationKey | ""
}

export type FilterInputState = boolean | Lang | string | string[] | null

export type FilterOption = {
  title: string
  showFilterOption: boolean
  items: Array<FilterItem>
}

type FilterItem = {
  filterKey: string
  filterLabel: string
  description: string
  inputState: FilterInputState
  ignoreFilterReset?: boolean
  input: FilterInput
  options: Array<FilterOptionItem>
}

type FilterInput = (
  filterIndex: number,
  itemIndex: number,
  state: FilterInputState,
  updateFilterState: UpdateFilterState
) => ReactElement

type FilterOptionItem = {
  filterKey: string
  filterLabel: string
  description: string
  ignoreFilterReset?: boolean
  inputState: FilterInputState
  input: FilterOptionInput
}

type FilterOptionInput = (
  filterIndex: number,
  itemIndex: number,
  optionIndex: number,
  state: FilterInputState,
  updateFilterState: UpdateFilterState
) => ReactElement

type UpdateFilterState = (
  filterIndex: number,
  itemIndex: number,
  inputState: FilterInputState,
  optionIndex?: number
) => void

export interface WalletPersonas {
  title: string
  description: string
  presetFilters: {
    android: boolean
    ios: boolean
    linux: boolean
    windows: boolean
    macOS: boolean
    firefox: boolean
    chromium: boolean
    hardware: boolean
    open_source: boolean
    non_custodial: boolean
    hardware_support: boolean
    rpc_importing: boolean
    nft_support: boolean
    connect_to_dapps: boolean
    staking: boolean
    swaps: boolean
    layer_2: boolean
    gas_fee_customization: boolean
    ens_support: boolean
    erc_20_support: boolean
    buy_crypto: boolean
    withdraw_crypto: boolean
    multisig: boolean
    social_recovery: boolean
    new_to_crypto?: boolean
  }
}

export type TPresetFilters = WalletPersonas[]

export type ProductTablePresetFilters = WalletPersonas[]

export type ProductTableColumnDefs = ColumnDef<Wallet | Rollups>

export type ProductTableRow = Wallet | Rollup

export interface DropdownOption {
  label: string
  value: string
  filterKey: string
  category: string
}

export type WalletSupportedLanguageContextType = {
  supportedLanguage: string
  setSupportedLanguage: (language: string) => void
}

// Historical upgrades
type NetworkUpgradeDetails = {
  blockNumber?: number
  epochNumber?: number
  slotNumber?: number
} & (
  | {
      isPending: true
      dateTimeAsString?: string
      ethPriceInUSD?: never
      waybackLink?: never
    }
  | {
      ethPriceInUSD: number
      waybackLink: string
      dateTimeAsString: string
      isPending?: never
    }
)

export type NetworkUpgradeData = Record<string, NetworkUpgradeDetails>

// Footer
export type FooterLink = {
  href: string
  text: TranslationKey
  isPartiallyActive?: boolean
}

export type FooterLinkSection = {
  title: TranslationKey
  links: FooterLink[]
}

// GitHub API
export type GHIssue = {
  title: string
  html_url: string
  created_at: string
  user: {
    login: string
    html_url: string
    avatar_url: string
  }
  labels: GHLabel[]
}

export type GHLabel = {
  id: number
  name: string
  color: string
}

/**
 * RSS Feed handling
 */
export type RSSItem = {
  pubDate: string
  title: string
  source: string
  link: string
  sourceFeedUrl: string
  sourceUrl: string
  imgSrc?: string
}

export type RSSChannel = {
  title: string[]
  link: string[]
  description: string[]
  lastBuildDate: string[]
  docs: string[]
  generator: string[]
  image: {
    url: string[]
    title: string[]
    link: string[]
  }[]
  copyright: string[]
  item: {
    title: string[]
    link: string[]
    guid: string[]
    pubDate: string[]
    description: string[]
    category: string[]
    enclosure: {
      $: {
        url: string[]
        length: string[]
        type: string[]
      }
    }[]
    "media:content": { $: { url: string } }[]
  }[]
}

export type RSSResult = {
  rss: {
    channel: RSSChannel[]
  }
}

export type AtomElement =
  | string
  | {
      _?: string // children
      $: {
        href?: string
      }
    }
export type AtomEntry = {
  id: string[]
  title: AtomElement[]
  updated: string[]
  content?: AtomElement[]
  link?: AtomElement[]
  summary?: AtomElement[]
}

export type AtomResult = {
  feed: {
    id: string[]
    title: string[]
    updated: string[]
    generator: string[]
    link: string[]
    subtitle: string[]
    icon?: string[]
    entry: AtomEntry[]
  }
}

export type CommunityBlog = {
  href: string
} & ({ name: string; feed?: string } | { name?: string; feed: string })

type NestedDivs = {
  div: NestedDivs[]
}

export type HTMLResult = {
  html: {
    body: Record<string, NestedDivs>[]
  }
}

export type EventCardProps = {
  title: string
  href: string
  startDate: string
  endDate: string
  description: string
  className?: string
  location: string
  imageUrl?: string
}

export type BreakpointKey = keyof typeof screens

export type MaturityLevel =
  | "N/A"
  | "robust"
  | "maturing"
  | "developing"
  | "emerging"
