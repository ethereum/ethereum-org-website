import { MDXRemoteProps } from "next-mdx-remote"
import readingTime, { ReadTimeResults } from "reading-time"

import type { Layout } from "@/lib/types"
import {
  CommitHistory,
  FileContributor,
  Frontmatter,
  Lang,
  ToCItem,
} from "@/lib/types"

import { getMarkdownFileContributorInfo } from "@/lib/utils/contributors"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { getLayoutFromSlug } from "../utils/layout"

import { compile, extractLayoutFromMarkdown } from "./compile"
import { importMd } from "./import"

const commitHistoryCache: CommitHistory = {}

interface GetPageDataParams {
  locale: string
  slug: string
  baseComponents: MDXRemoteProps["components"]
  componentsMapping: Record<Layout, MDXRemoteProps["components"]>
  layout?: Layout
  scope?: Record<string, unknown>
}

interface PageData {
  content: React.ReactNode
  frontmatter: Frontmatter
  tocItems: ToCItem[]
  lastEditLocaleTimestamp: string
  contributors: FileContributor[]
  isTranslated: boolean
  timeToRead: ReadTimeResults
}

export async function getPageData({
  locale,
  slug,
  baseComponents,
  componentsMapping,
  layout: layoutFromProps,
  scope,
}: GetPageDataParams): Promise<PageData> {
  const slugArray = slug.split("/")

  // Import and compile markdown
  const { markdown, isTranslated } = await importMd(locale, slug)
  // Determine layout first to finalize list of components
  const layout =
    layoutFromProps ||
    (await extractLayoutFromMarkdown(markdown)) ||
    getLayoutFromSlug(slug)

  const components: MDXRemoteProps["components"] = {
    ...baseComponents,
    ...(layout ? componentsMapping[layout] : {}),
  }

  const { content, frontmatter, tocNodeItems } = await compile({
    markdown,
    slugArray,
    locale,
    components,
    scope,
  })

  // Process TOC items
  const tocItems =
    tocNodeItems.length === 1 && "items" in tocNodeItems[0]
      ? tocNodeItems[0].items
      : tocNodeItems

  // Get contributor information
  const { contributors, lastUpdatedDate } =
    await getMarkdownFileContributorInfo(
      slug,
      locale,
      frontmatter.lang as string,
      commitHistoryCache
    )

  // Format timestamp
  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastUpdatedDate
  )

  const timeToRead = readingTime(markdown)

  return {
    content,
    frontmatter,
    tocItems: tocItems as ToCItem[],
    lastEditLocaleTimestamp,
    contributors,
    isTranslated,
    timeToRead,
  }
}
