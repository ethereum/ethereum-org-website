import type { Frontmatter, Lang, TranslationKey } from "./types"

/**
 * Quiz data interfaces
 */
export interface AnswerChoice {
  answerId: string
  isCorrect: boolean
}

export interface Answer {
  id: string
  label: TranslationKey
  explanation: TranslationKey
  moreInfoLabel?: string
  moreInfoUrl?: string
}

export interface RawQuestion {
  prompt: TranslationKey
  answers: Array<Answer>
  correctAnswerId: string
}

export interface Question extends RawQuestion {
  id: string
}

export interface QuestionBank {
  [key: string]: RawQuestion
}

export interface RawQuiz {
  title: TranslationKey
  questions: Array<string> // TODO: Force to be an array of questionID's
}

export interface Quiz {
  title: string
  questions: Array<Question>
}

export interface RawQuizzes {
  [key: string]: RawQuiz
}

/**
 * Table of Contents
 */
export interface ToCItem {
  title: string
  url: string
  items?: Array<ToCItem>
}

/**
 * Layout interface
 */
export interface SharedFrontmatter {
  title: string
  description: string
  lang: Lang
  sidebarDepth?: number
  isOutdated?: boolean
  template?: string
}

export interface StaticFrontmatter extends SharedFrontmatter {
  postMergeBannerTranslation?: string
  hideEditButton?: boolean
}

/**
 * TODO: Refactor markdown content that currently uses SummaryPointsNumbered
 * to use SummaryPoints (`summaryPoints: Array<string>`) instead. Then
 * deprecate @/lib/util/getSummaryPoints.ts
 */
export interface SummaryPointsNumbered {
  summaryPoint1?: string
  summaryPoint2?: string
  summaryPoint3?: string
  summaryPoint4?: string
}

interface SummaryPoints {
  summaryPoints: Array<string>
}

interface ImageInfo {
  image: string
  alt: string
}

export interface UpgradeFrontmatter
  extends SharedFrontmatter,
    SummaryPointsNumbered,
    Omit<ImageInfo, "alt"> {}

export interface RoadmapFrontmatter extends SharedFrontmatter, ImageInfo {
  buttons: Array<{
    label: string
    toId?: string
    to?: string
    variant?: string
  }>
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
  tags: Array<string>
  author: string
  source?: string
  sourceUrl?: string
  skill: string
  published: string
  address?: string
  postMergeBannerTranslation?: string
  hideEditButton?: boolean
}

export interface Root {
  children: JSX.Element
  contentIsOutdated: boolean
  contentNotTranslated: boolean
  lastDeployDate: string
}

export interface MdPageContent {
  slug: string
  content: string
  frontmatter: Frontmatter
  tocItems: Array<ToCItem>
  lastUpdatedDate?: string
  contentNotTranslated: boolean
}

// GitHub contributors
export interface Author {
  name: string
  email: string
  avatarUrl: string
  user: {
    login: string
    url: string
  }
}
