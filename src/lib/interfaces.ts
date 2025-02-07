import type { StaticImageData } from "next/image"

import type {
  CommonHeroProps,
  FileContributor,
  Frontmatter,
  Lang,
  Layout,
  ToCItem,
  TranslationKey,
} from "@/lib/types"

export interface DeveloperDocsLink {
  id: TranslationKey
  href: string
  path: string
  description: TranslationKey
  items: DeveloperDocsLink[]
}

/**
 * Layout interface
 */
export interface SharedFrontmatter {
  title: string
  metaTitle?: string
  description: string
  lang: Lang
  sidebarDepth?: number
  isOutdated?: boolean
  template?: Layout
}

export interface StaticFrontmatter extends SharedFrontmatter {
  hideEditButton?: boolean
}

/**
 * TODO: Refactor markdown content that currently uses SummaryPointsNumbered
 * to use SummaryPoints (`summaryPoints: string[]`) instead. Then
 * deprecate @/lib/util/getSummaryPoints.ts
 */
export interface SummaryPointsNumbered {
  summaryPoint1?: string
  summaryPoint2?: string
  summaryPoint3?: string
  summaryPoint4?: string
}

interface SummaryPoints {
  summaryPoints: string[]
}

interface ImageInfo {
  image: string
  alt: string
  blurDataURL: string
}

export interface UpgradeFrontmatter
  extends SharedFrontmatter,
    SummaryPointsNumbered,
    ImageInfo {}

export interface RoadmapFrontmatter extends SharedFrontmatter, ImageInfo {
  buttons: CommonHeroProps["buttons"]
}

export interface UseCasesFrontmatter
  extends SharedFrontmatter,
    SummaryPointsNumbered,
    ImageInfo {
  emoji: string
}

export interface StakingFrontmatter
  extends SharedFrontmatter,
    SummaryPoints,
    ImageInfo {
  emoji: string
}

export interface DocsFrontmatter extends SharedFrontmatter {
  incomplete?: boolean
  hideEditButton?: boolean
}

export interface TutorialFrontmatter extends SharedFrontmatter {
  tags: string[]
  author: string
  source?: string
  sourceUrl?: string
  skill: string
  published: string
  address?: string
  hideEditButton?: boolean
}

export interface MdPageContent {
  slug: string
  content: string
  frontmatter: Frontmatter
  tocItems: ToCItem[]
  lastEditLocaleTimestamp: string
  lastDeployLocaleTimestamp: string
  contentNotTranslated: boolean
  contributors: FileContributor[]
}

// Local environment framework
export interface Framework {
  id: string
  url: string
  githubUrl: string
  background: string
  name: string
  description: string
  alt: string
  image: StaticImageData
  starCount?: number
  languages?: string[]
}

/**
 * Community events
 */

export interface CommunityEventsReturnType {
  pastEventData: CommunityEvent[]
  upcomingEventData: CommunityEvent[]
}

export interface CommunityEvent {
  date: string
  title: string
  calendarLink: string
}

export interface ReqCommunityEvent {
  start: { dateTime: string }
  summary: string
  htmlLink: string
  location: string
}

/**
 * Community page
 */

export interface ICard {
  image: StaticImageData
  title: string
  description: string
  alt: string
  href: string
}

export interface IGetInvolvedCard {
  emoji: string
  title: string
  description: string
}

/**
 * Codeblock
 */

export interface CodeExample {
  title: string
  description: string
  caption?: string
  link?: string
  image?: string
  alt?: string
  id?: number
  codeLanguage: string
  code: string
  eventName: string
}
