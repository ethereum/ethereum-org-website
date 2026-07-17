import type {
  CommonHeroProps,
  FileContributor,
  Frontmatter,
  Lang,
  Layout,
  ToCItem,
  TranslationKey,
  VideoFormat,
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
  authors?: string | string[]
}

export interface StaticFrontmatter extends SharedFrontmatter {
  hideEditButton?: boolean
}

interface ImageInfo {
  image: string
  alt: string
  blurDataURL: string
  imageWidth?: number
  imageHeight?: number
}

/**
 * Canonical frontmatter shape for any page rendered through `TopicLayout`.
 * Used for staking, use-cases, roadmap, upgrade, and ai-agents.
 * See `docs/topic-layout-refactor.md`.
 */
export interface TopicFrontmatter extends SharedFrontmatter, ImageInfo {
  summaryPoints?: string[]
  summary?: string
  buttons?: CommonHeroProps["buttons"]
  showDropdown?: boolean
  hideEditBanner?: boolean
}

export interface DocsFrontmatter extends SharedFrontmatter {
  incomplete?: boolean
  hideEditButton?: boolean
}

export interface VideoFrontmatter extends SharedFrontmatter {
  youtubeId: string
  uploadDate: string
  duration: string
  educationLevel: "beginner" | "intermediate" | "advanced"
  topic: string[]
  format: VideoFormat
  author: string
  customThumbnailUrl?: string
  breadcrumb?: string
}

export interface TutorialFrontmatter extends SharedFrontmatter {
  tags?: string[]
  author: string
  source?: string
  sourceUrl?: string
  skill?: string
  published: string
  address?: string
  team?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  blurDataURL?: string
  hideEditButton?: boolean
  breadcrumb?: string
}

export interface BlogFrontmatter extends SharedFrontmatter {
  tags?: string[]
  author: string
  published: string
  image?: string
  team?: string
  sourceUrl?: string
  hideEditButton?: boolean
  breadcrumb?: string
}

export interface MdPageContent {
  slug: string
  content: string
  frontmatter: Frontmatter
  tocItems: ToCItem[]
  lastEditLocaleTimestamp?: string
  lastDeployLocaleTimestamp: string
  contentNotTranslated: boolean
  contributors: FileContributor[]
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
  codeUrl: string
  eventName: string
}
