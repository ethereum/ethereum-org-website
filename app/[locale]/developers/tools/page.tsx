import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { PageHero } from "@/components/Hero"

import { getMetadata } from "@/lib/utils/metadata"

import ToolsPageBody from "./_components/ToolsPageBody"
import { getToolsPageData } from "./page-data"
import DevelopersToolsJsonLD from "./page-jsonld"

// Re-render statically generated page daily to pick up tools data updates
// (no `searchParams` read here — that would opt the page into dynamic
// rendering and forfeit static/edge caching).
export const revalidate = 86400

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params

  setRequestLocale(locale)
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  const {
    categories,
    allTools,
    countByCategory,
    categoryLabels,
    subcategoryLabels,
    contributors,
  } = await getToolsPageData(locale)

  return (
    <>
      <DevelopersToolsJsonLD
        locale={locale}
        contributors={contributors}
        categories={categories}
        categoryLabels={categoryLabels}
      />
      <PageHero
        breadcrumbs={{ slug: "/developers/tools" }}
        title={t("page-developers-tools-title")}
        description={t("page-developers-tools-subtitle")}
        variant="no-divider"
      />
      <ToolsPageBody
        locale={locale}
        tools={allTools}
        categories={categories}
        categoryLabels={categoryLabels}
        subcategoryLabels={subcategoryLabels}
        countByCategory={countByCategory}
        totalCount={allTools.length}
      />
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "tools"],
    title: t("page-developers-tools-meta-title"),
    description: t("page-developers-tools-meta-description"),
  })
}

export default Page
