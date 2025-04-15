import { MDXRemoteProps } from "next-mdx-remote"

import {
  FileContributor,
  Frontmatter,
  Lang,
  Layout,
  ToCItem,
} from "@/lib/types"

import { getLocaleTimestamp } from "@/lib/utils/time"

import { compile } from "./compile"
import { importMd } from "./import"

// const commitHistoryCache: CommitHistory = {}

interface GetPageDataParams {
  locale: string
  slug: string
  components: MDXRemoteProps["components"]
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
}

export async function getPageData({
  locale,
  slug,
  components,
  // layout: layoutFromProps,
  scope,
}: GetPageDataParams): Promise<PageData> {
  const slugArray = slug.split("/")

  // Import and compile markdown
  const { markdown, isTranslated } = await importMd(locale, slug)
  const { content, frontmatter, tocNodeItems } = await compile({
    markdown,
    slugArray,
    locale,
    components,
    scope,
  })

  // const layout = layoutFromProps || frontmatter.template || "static"

  // Process TOC items
  const tocItems =
    tocNodeItems.length === 1 && "items" in tocNodeItems[0]
      ? tocNodeItems[0].items
      : tocNodeItems

  // Get contributor information
  const contributors = []
  const lastUpdatedDate = new Date().toISOString()
  // const { contributors, lastUpdatedDate } = await getFileContributorInfo(
  //   slug,
  //   locale,
  //   frontmatter.lang as string,
  //   layout,
  //   commitHistoryCache
  // )

  // Format timestamp
  const lastEditLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastUpdatedDate
  )

  return {
    content,
    frontmatter,
    tocItems: tocItems as ToCItem[],
    lastEditLocaleTimestamp,
    contributors,
    isTranslated,
  }
}
