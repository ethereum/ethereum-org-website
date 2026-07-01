import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { PageHero } from "@/components/Hero"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import {
  buildToolLabels,
  countToolsByCategory,
  normalizeDeveloperToolsData,
  withCategories,
} from "@/lib/utils/developerToolsData"
import { getMetadata } from "@/lib/utils/metadata"

import ToolsPageBody from "../../_components/ToolsPageBody"

import DevelopersToolsCategoryJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

// Re-render statically generated pages daily to pick up tools data updates
export const revalidate = 86400

// Legacy category slugs (e.g. /developers/tools/security) are permanently
// redirected to their new canonical slugs via redirects.config.js

const Page = async (props: {
  params: Promise<{ locale: string; category: string }>
}) => {
  const params = await props.params
  const { locale, category } = params

  setRequestLocale(locale)

  const [data, { contributors }, t, tCommon] = await Promise.all([
    getDeveloperToolsData(),
    getAppPageContributorInfo("developers/tools", locale as Lang),
    getTranslations({ locale, namespace: "page-developers-tools" }),
    getTranslations({ locale, namespace: "common" }),
  ])

  const normalized = normalizeDeveloperToolsData(data)
  if (!normalized) throw Error("No developer tools data available")

  const categories = normalized.taxonomy.categories.definitions
  const allTools = withCategories(normalized)
  const countByCategory = countToolsByCategory(allTools)
  const { categoryLabels, subcategoryLabels } = buildToolLabels(
    t,
    normalized.taxonomy
  )

  const currentCategory = categories.find(({ id }) => id === category)
  if (!currentCategory) notFound()

  const categoryTools = allTools.filter((tool) => tool.categoryId === category)

  // Hand-built breadcrumb: the `/categories/` URL segment has no page of its
  // own, so a slug-derived crumb would link to a 404. Skip it and link the
  // real ancestors instead.
  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">ethereum.org</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/developers/">
            {tCommon("developers")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/developers/tools/">
            {tCommon("tools")}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{categoryLabels[category]}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

  return (
    <>
      <DevelopersToolsCategoryJsonLD
        locale={locale}
        category={category}
        categoryLabel={categoryLabels[category]}
        categoryDescription={currentCategory.description}
        categoryTools={categoryTools}
        contributors={contributors}
      />
      <PageHero
        breadcrumbs={breadcrumb}
        title={categoryLabels[category]}
        description={currentCategory.description}
        variant="no-divider"
      />
      <ToolsPageBody
        locale={locale}
        tools={categoryTools}
        categories={categories}
        categoryLabels={categoryLabels}
        subcategoryLabels={subcategoryLabels}
        countByCategory={countByCategory}
        totalCount={allTools.length}
        currentCategoryId={category}
      />
    </>
  )
}

export async function generateStaticParams() {
  const data = await getDeveloperToolsData()
  const normalizedData = normalizeDeveloperToolsData(data)
  if (!normalizedData) return []

  return normalizedData.taxonomy.categories.definitions.map(({ id }) => ({
    category: id,
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; category: string }>
}) {
  const params = await props.params
  const { locale, category } = params

  // Guard against legacy/invalid slugs: the page itself redirects or 404s,
  // so skip building metadata from a nonexistent translation key
  const data = await getDeveloperToolsData()
  const normalizedData = normalizeDeveloperToolsData(data)
  const isValidCategory = normalizedData?.taxonomy.categories.definitions.some(
    ({ id }) => id === category
  )
  if (!isValidCategory) return {}

  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  return await getMetadata({
    locale,
    slug: ["developers", "tools", "categories", category],
    title: `${t(`page-developers-tools-category-${category}-title`)} | ${t("page-developers-tools-meta-title")}`,
    description: t("page-developers-tools-meta-description"),
  })
}

export default Page
