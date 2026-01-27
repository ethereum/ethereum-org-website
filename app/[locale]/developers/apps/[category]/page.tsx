import { redirect } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import { ContentHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import SubpageCard from "@/components/SubpageCard"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import AppModalContents from "../_components/AppModalContents"
import AppModalWrapper from "../_components/AppModalWrapper"
import CategoryAppsGrid from "../_components/CategoryAppsGrid"
import HighlightsSection from "../_components/HighlightsSection"
import { DEV_APP_CATEGORIES } from "../constants"
import type { DeveloperAppCategorySlug } from "../types"
import {
  getCachedHighlightsByCategory,
  getCategoryPageHighlights,
  transformDeveloperAppsData,
} from "../utils"

import DevelopersAppsCategoryJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

const Page = async ({
  params,
  searchParams,
}: {
  params: PageParams & { category: DeveloperAppCategorySlug }
  searchParams: { appId?: string }
}) => {
  const { locale, category } = params
  const { appId } = searchParams

  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "page-developers-apps" })

  const enrichedData = await getDeveloperToolsData()
  if (!enrichedData) throw Error("No developer apps data available")
  const dataByCategory = transformDeveloperAppsData(enrichedData)
  const allCategoryData = dataByCategory[category]

  // Extract unique tags from current category
  const uniqueTags = Array.from(
    new Set(allCategoryData.flatMap((app) => app.tags))
  ).sort()

  const activeApp = enrichedData.find((app) => app.id === appId)

  // Clean up invalid appId by redirecting
  if (appId && !activeApp) {
    redirect(`/developers/apps/${category}`)
  }

  // Prepare tag labels for client component
  const tagLabels = Object.fromEntries(
    uniqueTags.map((tag) => [tag, t(`page-developers-apps-tag-${tag}`)])
  )

  // Get dynamic highlights based on stars and recent activity (cached weekly)
  const highlightsByCategory = await getCachedHighlightsByCategory(enrichedData)
  const highlights = getCategoryPageHighlights(highlightsByCategory, category)

  // Get contributor info for JSON-LD
  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    `developers/apps/${category}`,
    locale as Lang,
    commitHistoryCache
  )

  return (
    <>
      <DevelopersAppsCategoryJsonLD
        locale={locale}
        category={category}
        categoryApps={allCategoryData}
        contributors={contributors}
      />
      <ContentHero
        breadcrumbs={{
          slug: `/developers/apps/${t(`page-developers-apps-category-${category}-breadcrumb`)}`,
        }}
        title={t(`page-developers-apps-category-${category}-title`)}
        description={t(`page-developers-apps-category-${category}-description`)}
        className="border-none pb-0"
      />
      <MainArticle className="space-y-20 px-4 py-10 md:px-8">
        <HighlightsSection apps={highlights} />

        <Section id="apps" className="space-y-4">
          <h2 className="sr-only">
            {t("page-developers-apps-applications-title")}
          </h2>

          <CategoryAppsGrid
            apps={allCategoryData}
            uniqueTags={uniqueTags}
            tagLabels={tagLabels}
          />
        </Section>

        <Section id="categories" className="space-y-4">
          <h2>{t("page-developers-apps-categories-title-other")}</h2>
          <div className="grid grid-cols-fill-4 gap-8">
            {DEV_APP_CATEGORIES.filter(({ slug }) => slug !== category).map(
              ({ slug, Icon }) => (
                <SubpageCard
                  key={slug}
                  title={t(`page-developers-apps-category-${slug}-title`)}
                  description={t(
                    `page-developers-apps-category-${slug}-description`
                  )}
                  icon={<Icon className="size-8" />}
                  href={`/developers/apps/${slug}`}
                />
              )
            )}
          </div>
        </Section>
      </MainArticle>

      <AppModalWrapper variant="unstyled" open={!!activeApp}>
        {activeApp && <AppModalContents app={activeApp} />}
      </AppModalWrapper>
    </>
  )
}

export async function generateStaticParams() {
  return DEV_APP_CATEGORIES.map(({ slug }) => ({ category: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; category: string }
}) {
  const { locale, category } = params
  const t = await getTranslations({ locale, namespace: "page-developers-apps" })

  return await getMetadata({
    locale,
    slug: ["developers", "apps", category],
    title: t(`page-developers-apps-category-${category}-title`),
    description: t(
      `page-developers-apps-category-${category}-meta-description`
    ),
  })
}

export default Page
