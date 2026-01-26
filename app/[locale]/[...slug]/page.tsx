/**
 * Markdown Page Component
 *
 * Catch-all route that renders markdown content from public/content/
 * with full i18n support and multiple layout types.
 */

import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import type { MDXRemoteProps } from "next-mdx-remote"
import { MDXRemote } from "next-mdx-remote/rsc"
import readingTime from "reading-time"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import type { Frontmatter, Layout } from "@/lib/types"
import type {
  DocsFrontmatter,
  StakingFrontmatter,
  StaticFrontmatter,
  TutorialFrontmatter,
} from "@/lib/interfaces"

import MdComponents from "@/components/MdComponents"

import {
  extractTableOfContents,
  formatLastUpdated,
  getAllMarkdownPaths,
  getContributors,
  loadMarkdownContent,
  preprocessContent,
} from "@/lib/utils/markdown"
import { getMetadata } from "@/lib/utils/metadata"

import {
  componentsMapping,
  DocsLayout,
  StaticLayout,
  TutorialLayout,
} from "@/layouts"
import * as mdLayouts from "@/layouts/md"

interface PageParams {
  locale: string
  slug: string[]
}

interface PageProps {
  params: Promise<PageParams>
}

/**
 * Determine the layout type from slug and frontmatter
 */
function getLayoutType(slug: string, frontmatter: Frontmatter): Layout {
  // Frontmatter template takes priority
  if (frontmatter.template) {
    return frontmatter.template
  }

  // Auto-detect from slug
  if (slug.startsWith("developers/docs")) {
    return "docs"
  }
  if (slug.startsWith("developers/tutorials")) {
    return "tutorial"
  }

  // Default to static
  return "static"
}

/**
 * Generate static params for all markdown pages
 */
export async function generateStaticParams(): Promise<PageParams[]> {
  const paths = await getAllMarkdownPaths()
  return paths.map(({ locale, slug }) => ({
    locale,
    slug,
  }))
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug: slugArray } = await params
  const slugString = slugArray.join("/")

  // Load content to get frontmatter
  const loaded = await loadMarkdownContent(slugString, locale)

  if (!loaded) {
    return {}
  }

  const { frontmatter, contentNotTranslated } = loaded

  return getMetadata({
    locale,
    slug: slugArray,
    title: frontmatter.metaTitle || frontmatter.title,
    description: frontmatter.description,
    author: frontmatter.author,
    // Pass translated locales hint (only English is definitely translated)
    translatedLocales: contentNotTranslated ? ["en"] : undefined,
  })
}

/**
 * Main page component
 */
export default async function MarkdownPage({ params }: PageProps) {
  const { locale, slug: slugArray } = await params

  // Set the locale for next-intl
  setRequestLocale(locale)

  const slugString = slugArray.join("/")

  // 1. Load markdown content with locale fallback
  const loaded = await loadMarkdownContent(slugString, locale)

  if (!loaded) {
    notFound()
  }

  const { content, frontmatter, contentNotTranslated } = loaded

  // 2. Extract TOC BEFORE preprocessing (critical!)
  // This must happen before we remove {#custom-id} syntax
  const tocItems = extractTableOfContents(
    content,
    frontmatter.sidebarDepth || 3
  )

  // 3. Preprocess content for MDX v2 compatibility
  const processedContent = preprocessContent(content)

  // 4. Get contributors from pre-computed data
  const { contributors, lastUpdated } = await getContributors(
    slugString,
    locale
  )
  const lastEditLocaleTimestamp = formatLastUpdated(lastUpdated, locale)

  // 5. Determine layout type
  const layoutType = getLayoutType(slugString, frontmatter)

  // 6. Get layout-specific MDX components
  const layoutComponents = componentsMapping[layoutType] || {}
  const mergedComponents = {
    ...MdComponents,
    ...layoutComponents,
  } as MDXRemoteProps["components"]

  // 7. Create MDX content element
  const mdxContent = (
    <MDXRemote
      source={processedContent}
      components={mergedComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
        scope: {
          // Variables available in MDX content
          gfissues: [], // Mock for IssuesList component
        },
      }}
    />
  )

  // 8. Common props for all layouts
  const slug = `/${slugString}/`

  // 9. Render based on layout type
  switch (layoutType) {
    case "docs":
      return (
        <DocsLayout
          slug={slug}
          frontmatter={frontmatter as DocsFrontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
        >
          {mdxContent}
        </DocsLayout>
      )

    case "tutorial": {
      const timeToRead = Math.round(readingTime(content).minutes)
      return (
        <TutorialLayout
          slug={slug}
          frontmatter={frontmatter as TutorialFrontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
          timeToRead={timeToRead}
        >
          {mdxContent}
        </TutorialLayout>
      )
    }

    case "staking":
      return (
        <mdLayouts.StakingLayout
          slug={slug}
          frontmatter={frontmatter as StakingFrontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
        >
          {mdxContent}
        </mdLayouts.StakingLayout>
      )

    case "use-cases":
      return (
        <mdLayouts.UseCasesLayout
          slug={slug}
          frontmatter={frontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
        >
          {mdxContent}
        </mdLayouts.UseCasesLayout>
      )

    case "upgrade":
      return (
        <mdLayouts.UpgradeLayout
          slug={slug}
          frontmatter={frontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
        >
          {mdxContent}
        </mdLayouts.UpgradeLayout>
      )

    case "roadmap":
      return (
        <mdLayouts.RoadmapLayout
          slug={slug}
          frontmatter={frontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
        >
          {mdxContent}
        </mdLayouts.RoadmapLayout>
      )

    case "translatathon":
      return (
        <mdLayouts.TranslatathonLayout
          slug={slug}
          frontmatter={frontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
        >
          {mdxContent}
        </mdLayouts.TranslatathonLayout>
      )

    case "static":
    default:
      return (
        <StaticLayout
          slug={slug}
          frontmatter={frontmatter as StaticFrontmatter}
          tocItems={tocItems}
          lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          contributors={contributors}
          contentNotTranslated={contentNotTranslated}
        >
          {mdxContent}
        </StaticLayout>
      )
  }
}
