import type { Options } from "mdast-util-toc"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { StaticImageData } from "next/image"
import { SSRConfig } from "next-i18next"
import type { ReactElement, ReactNode } from "react"
import { Icon } from "@chakra-ui/react"

import type {
  DocsFrontmatter,
  RoadmapFrontmatter,
  StakingFrontmatter,
  StaticFrontmatter,
  TutorialFrontmatter,
  UpgradeFrontmatter,
  UseCasesFrontmatter,
} from "@/lib/interfaces"

import type { CallToActionProps } from "@/components/Hero/CallToAction"
import { SimulatorNav } from "@/components/Simulator/interfaces"

import allQuizData from "@/data/quizzes"
import allQuestionData from "@/data/quizzes/questionBank"

import { WALLETS_FILTERS_DEFAULT } from "./constants"

import { layoutMapping } from "@/pages/[...slug]"

// Credit: https://stackoverflow.com/a/52331580
export type Unpacked<T> = T extends (infer U)[] ? U : T

export type ChildOnlyProp = { children?: ReactNode }

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement<P>) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export type Root = {
  children: ReactNode
  contentIsOutdated: boolean
  contentNotTranslated: boolean
  lastDeployDate: string
}

export type BasePageProps = SSRConfig &
  Pick<Root, "contentNotTranslated" | "lastDeployDate">

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
  | "ph"
  | "pl"
  | "pt"
  | "pt-br"
  | "ro"
  | "ru"
  | "se"
  | "sk"
  | "sl"
  | "sr"
  | "sw"
  | "ta"
  | "th"
  | "tk"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "zh"
  | "zh-tw"

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

/**
 * Quiz data types
 */
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

type TranslatedStats = {
  tmMatch: number
  default: number
  total: number
}

export type AllTimeData = {
  name: string
  url: string
  unit: string
  dateRange: {
    from: string
    to: string
  }
  currency: string
  mode: string
  totalCosts: number
  totalTMSavings: number
  totalPreTranslated: number
  data: Array<{
    user: {
      id: number
      username: string
      fullName: string
      userRole: string
      avatarUrl: string
      preTranslated: number
      totalCosts: number
    }
    languages: Array<{
      language: {
        id: string
        name: string
        userRole: string
        tmSavings: number
        preTranslate: number
        totalCosts: number
      }
      translated: TranslatedStats
      targetTranslated: TranslatedStats
      translatedByMt: TranslatedStats
      approved: TranslatedStats
      translationCosts: TranslatedStats
      approvalCosts: TranslatedStats
    }>
  }>
}

// GitHub contributors
export type Commit = {
  commit: {
    author: {
      name: string
      email: string
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

export type CommonHeroProps = {
  heroImg: StaticImageData
  header: string
  title: string
  description: string
  buttons?: [CallToActionProps, CallToActionProps?]
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

export type EpochResponse = Data<{
  validatorscount: number
}>

export type StakingStatsData = {
  totalEthStaked: number
  validatorscount: number
  apr: number
}

export type TimestampedData<T> = {
  timestamp: number
  value: T
}

export type MetricDataValue<Data, Value> =
  | {
      error: string
    }
  | {
      data: Data
      value: Value
    }

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

export type MetricReturnData = MetricDataValue<
  TimestampedData<number>[],
  number
>

export type StatsBoxState = MetricDataValue<TimestampedData<number>[], string>

export type MetricSection =
  | "totalEthStaked"
  | "nodeCount"
  | "totalValueLocked"
  | "txCount"

export type AllMetricData = Record<MetricSection, MetricReturnData>

export type StatsBoxMetric = {
  title: string
  description: string
  state: StatsBoxState
  buttonContainer: JSX.Element
  range: string
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
  to: string
  location: string
  description: string
  startDate: string
  endDate: string
  imageUrl: string
}

// Wallets
export interface WalletData {
  last_updated: string
  name: string
  image: StaticImageData
  brand_color: string
  url: string
  active_development_team: boolean
  languages_supported: string[]
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

export type WalletFilter = typeof WALLETS_FILTERS_DEFAULT

export interface WalletFilterData {
  title: TranslationKey
  filterKey?: string
  description: TranslationKey | ""
}

export type FilterOption = {
  title: string
  items: Array<{
    title: string
    icon: typeof Icon
    description: string
    filterKey: string | undefined
    showOptions: boolean | undefined
    options:
      | Array<{
          name: string
          filterKey?: string
          inputType: "checkbox"
        }>
      | []
  }>
}

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
  to: string
  text: TranslationKey
  isPartiallyActive?: boolean
}

export type FooterLinkSection = {
  title: TranslationKey
  links: FooterLink[]
}
