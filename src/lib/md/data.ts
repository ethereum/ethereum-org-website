import { MDXRemoteProps } from "next-mdx-remote"
import readingTime, { ReadTimeResults } from "reading-time"

import type { Layout } from "@/lib/types"
import { FileContributor, Frontmatter, Lang, ToCItem } from "@/lib/types"

import { getMarkdownFileContributorInfo } from "@/lib/utils/contributors"
import { getLocaleTimestamp } from "@/lib/utils/time"

import type { ContentManifestEntry } from "../content/types"
import { getLayoutFromSlug } from "../utils/layout"

import {
  attachBlurDataURL,
  compile,
  extractLayoutFromMarkdown,
} from "./compile"
import { importMd } from "./import"

interface GetPageDataParams {
  locale: string
  slug: string
  baseComponents: MDXRemoteProps["components"]
  componentsMapping: Record<Layout, MDXRemoteProps["components"]>
  layout?: Layout
  scope?: Record<string, unknown>
  manifestEntry?: ContentManifestEntry
}

interface PageData {
  content: React.ReactNode
  frontmatter: Frontmatter
  tocItems: ToCItem[]
  lastEditLocaleTimestamp?: string
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
  manifestEntry,
}: GetPageDataParams): Promise<PageData> {
  const slugArray = slug.split("/")

  // Import and compile markdown
  const { markdown, isTranslated } = await importMd(locale, slug)
  // Determine layout first to finalize list of components.
  // When a manifest entry is available, trust it — it already encodes
  // `frontmatter.template ?? getLayoutFromSlug(slug)` from build time.
  const layout =
    layoutFromProps ||
    manifestEntry?.layout ||
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
    parseFrontmatter: !manifestEntry,
  })

  // When the manifest provided the frontmatter, compile() skipped parsing.
  // Hydrate the result with the manifest's frontmatter and attach the
  // (request-time) blur placeholder for hero images.
  if (manifestEntry) {
    Object.assign(frontmatter, manifestEntry.frontmatter)
    await attachBlurDataURL(frontmatter)
  }

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
      frontmatter.lang as string
    )

  // Format timestamp (undefined when contributor data is missing)
  const lastEditLocaleTimestamp = lastUpdatedDate
    ? getLocaleTimestamp(locale as Lang, lastUpdatedDate)
    : undefined

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
