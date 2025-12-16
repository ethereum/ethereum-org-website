import type { HumanityStory, StoryRegion } from "@/lib/types"
import { StoryCategory } from "@/lib/types"

import humanityStories from "@/data/humanityStories"

export function getAllStories(): HumanityStory[] {
  return humanityStories
}

export function getStoryBySlug(slug: string): HumanityStory | null {
  return humanityStories.find((story) => story.slug === slug) ?? null
}

export function getStoriesByCategory(category: StoryCategory): HumanityStory[] {
  return humanityStories.filter((story) => story.category === category)
}

export function getStoriesForPage(pagePath: string): HumanityStory[] {
  const normalizedPath = pagePath.endsWith("/") ? pagePath : `${pagePath}/`
  return humanityStories.filter((story) =>
    story.relatedPages.some((page) => {
      const normalizedPage = page.endsWith("/") ? page : `${page}/`
      return normalizedPage === normalizedPath
    })
  )
}

export function getFeaturedStories(): HumanityStory[] {
  return humanityStories.filter((story) => story.featured)
}

export function getStoriesByRegion(region: StoryRegion): HumanityStory[] {
  return humanityStories.filter((story) => story.location.region === region)
}

export function getAllCategories(): StoryCategory[] {
  return Object.values(StoryCategory)
}

export function getCategoryLabel(category: StoryCategory): string {
  const labels: Record<StoryCategory, string> = {
    [StoryCategory.FINANCIAL_INCLUSION]: "Financial Inclusion",
    [StoryCategory.HEALTHCARE]: "Healthcare",
    [StoryCategory.EDUCATION]: "Education",
    [StoryCategory.ENVIRONMENTAL]: "Environmental",
    [StoryCategory.GOVERNANCE_IDENTITY]: "Governance & Identity",
    [StoryCategory.HUMAN_RIGHTS]: "Human Rights",
    [StoryCategory.SUPPLY_CHAIN]: "Supply Chain",
    [StoryCategory.CREATOR_ECONOMY]: "Creator Economy",
  }
  return labels[category]
}

export function getCategoryTranslationKey(category: StoryCategory): string {
  const keys: Record<StoryCategory, string> = {
    [StoryCategory.FINANCIAL_INCLUSION]: "page-stories-filter-financial",
    [StoryCategory.HEALTHCARE]: "page-stories-filter-healthcare",
    [StoryCategory.EDUCATION]: "page-stories-filter-education",
    [StoryCategory.ENVIRONMENTAL]: "page-stories-filter-environmental",
    [StoryCategory.GOVERNANCE_IDENTITY]: "page-stories-filter-governance",
    [StoryCategory.HUMAN_RIGHTS]: "page-stories-filter-human-rights",
    [StoryCategory.SUPPLY_CHAIN]: "page-stories-filter-supply-chain",
    [StoryCategory.CREATOR_ECONOMY]: "page-stories-filter-creator",
  }
  return keys[category]
}

export function getRelatedStories(
  currentSlug: string,
  category: StoryCategory,
  limit = 3
): HumanityStory[] {
  return humanityStories
    .filter(
      (story) => story.slug !== currentSlug && story.category === category
    )
    .slice(0, limit)
}

export function formatStoryDate(dateString: string, locale: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function getStoryExcerpt(story: HumanityStory, maxLength = 200): string {
  const text = story.storyEnglish
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}
