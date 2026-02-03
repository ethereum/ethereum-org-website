import { redirect } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import CategoryToolsGrid from "../_components/CategoryToolsGrid"
import HighlightsSection from "../_components/HighlightsSection"
import ToolModalContents from "../_components/ToolModalContents"
import ToolModalWrapper from "../_components/ToolModalWrapper"
import { DEV_TOOL_CATEGORIES, DEV_TOOL_CATEGORY_SLUGS } from "../constants"
import type { DeveloperToolCategorySlug, DeveloperToolTag } from "../types"

import DevelopersToolsCategoryJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

const Page = async ({
  params,
  searchParams,
}: {
  params: PageParams & { category: DeveloperToolCategorySlug }
  searchParams: { toolId?: string }
}) => {
  const { locale, category } = params
  const { toolId } = searchParams

  setRequestLocale(locale)
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const data = await getDeveloperToolsData()
  if (!data) throw Error("No developer tools data available")

  const { toolsById, selections } = data

  // Get all tools for this category (filter at runtime - trivial for few hundred tools)
  const allTools = Object.values(toolsById)
  const allCategoryData = allTools.filter(
    (tool) => DEV_TOOL_CATEGORY_SLUGS[tool.category] === category
  )

  // Extract unique tags from current category
  const uniqueTags = Array.from(
    new Set(allCategoryData.flatMap((tool) => tool.tags))
  ).sort()

  const activeTool = toolId ? toolsById[toolId] : undefined

  // Clean up invalid toolId by redirecting
  if (toolId && !activeTool) {
    redirect(`/developers/tools/${category}`)
  }

  // Prepare tag labels for client component
  const tagLabels = Object.fromEntries(
    uniqueTags.map((tag) => [tag, t(`page-developers-tools-tag-${tag}`)])
  ) as Record<DeveloperToolTag, string>

  // Resolve category highlight IDs to full tool objects
  const highlights = (selections.categoryHighlights[category] || [])
    .map((id) => toolsById[id])
    .filter(Boolean)

  // Get contributor info for JSON-LD
  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    `developers/tools/${category}`,
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <DevelopersToolsCategoryJsonLD
        locale={locale}
        category={category}
        categoryTools={allCategoryData}
        contributors={contributors}
      />
      <ContentHero
        breadcrumbs={{
          slug: `/developers/tools/${t(`page-developers-tools-category-${category}-breadcrumb`)}`,
        }}
        title={t(`page-developers-tools-category-${category}-title`)}
        description={t(
          `page-developers-tools-category-${category}-description`
        )}
        className="border-none pb-0"
      />
      <MainArticle className="space-y-20 px-4 py-10 md:px-8">
        <HighlightsSection tools={highlights} />

        <Section id="tools" className="space-y-4">
          <h2 className="sr-only">
            {t("page-developers-tools-applications-title")}
          </h2>

          <CategoryToolsGrid
            tools={allCategoryData}
            uniqueTags={uniqueTags}
            tagLabels={tagLabels}
          />
        </Section>

        <Section id="categories" className="space-y-4">
          <h2>{t("page-developers-tools-categories-title-other")}</h2>
          <div className="grid grid-cols-fill-4 gap-8">
            {DEV_TOOL_CATEGORIES.filter(({ slug }) => slug !== category).map(
              ({ slug, Icon }) => (
                <SubpageCard
                  key={slug}
                  title={t(`page-developers-tools-category-${slug}-title`)}
                  description={t(
                    `page-developers-tools-category-${slug}-description`
                  )}
                  icon={<Icon className="size-8" />}
                  href={`/developers/tools/${slug}`}
                />
              )
            )}
          </div>
        </Section>
      </MainArticle>

      <ToolModalWrapper variant="unstyled" open={!!activeTool}>
        {activeTool && <ToolModalContents tool={activeTool} />}
      </ToolModalWrapper>
    </>
  )
}

export async function generateStaticParams() {
  return DEV_TOOL_CATEGORIES.map(({ slug }) => ({ category: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; category: string }
}) {
  const { locale, category } = params
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "tools", category],
    title: t(`page-developers-tools-category-${category}-title`),
    description: t(
      `page-developers-tools-category-${category}-meta-description`
    ),
  })
}

export default Page
