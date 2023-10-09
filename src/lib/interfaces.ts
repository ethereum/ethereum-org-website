import { Frontmatter, Lang, TranslationKey } from "./types"

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
export interface PageContent {
  slug: string
  content: string
  frontmatter: Frontmatter
  tocItems: Array<ToCItem>
  lastUpdatedDate?: string
}

export interface RequiredFrontmatter {
  title: string
  lang: Lang
}

export interface UpgradeFrontmatter extends RequiredFrontmatter {
  description?: string
  sidebarDepth?: number
  summaryPoint1?: string
  summaryPoint2?: string
  summaryPoint3?: string
  summaryPoint4?: string
  image?: string
  isOutdated?: boolean
}
