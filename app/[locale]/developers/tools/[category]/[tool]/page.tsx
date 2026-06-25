import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import MainArticle from "@/components/MainArticle"
import { BaseLink } from "@/components/ui/Link"

import { normalizeDeveloperToolsData } from "@/lib/utils/developerToolsData"
import { getMetadata } from "@/lib/utils/metadata"
import { slugify } from "@/lib/utils/url"

import ToolDetail from "../../_components/ToolDetail"
import { getToolDetailData } from "../../page-data"

import { getDeveloperToolsData } from "@/lib/data"

// Re-render statically generated pages daily to pick up tools data updates
export const revalidate = 86400

type ToolPageParams = PageParams & { category: string; tool: string }

const Page = async (props: { params: Promise<ToolPageParams> }) => {
  const { locale, category, tool: toolKey } = await props.params
  setRequestLocale(locale)

  const detail = await getToolDetailData(locale, category, toolKey)
  if (!detail) notFound()

  return (
    <MainArticle className="mx-auto w-full max-w-2xl px-4 py-10 md:px-8">
      <BaseLink
        href={`/developers/tools/${category}/`}
        className="mb-4 inline-block text-sm"
      >
        ← {detail.categoryLabels[category] || category}
      </BaseLink>
      <div className="overflow-hidden rounded-lg border">
        <ToolDetail
          locale={locale}
          tool={detail.tool}
          categoryLabels={detail.categoryLabels}
          subcategoryLabels={detail.subcategoryLabels}
          tagLabels={detail.tagLabels}
          labels={detail.labels}
        />
      </div>
    </MainArticle>
  )
}

export async function generateStaticParams({
  params,
}: {
  params: { category: string }
}) {
  const data = normalizeDeveloperToolsData(await getDeveloperToolsData())
  if (!data) return []

  const subcategoryToCategory = new Map<string, string>()
  for (const category of data.taxonomy.categories.definitions) {
    for (const subcategory of category.subcategories) {
      subcategoryToCategory.set(subcategory.id, category.id)
    }
  }

  return data.resources
    .filter(
      (r) => subcategoryToCategory.get(r.subcategory_id) === params.category
    )
    .map((r) => ({ tool: slugify(r.name) }))
}

export async function generateMetadata(props: {
  params: Promise<ToolPageParams>
}) {
  const { locale, category, tool: toolKey } = await props.params

  const detail = await getToolDetailData(locale, category, toolKey)
  if (!detail) return {}

  return await getMetadata({
    locale,
    slug: ["developers", "tools", category, toolKey],
    title: detail.tool.name,
    description: detail.tool.description.slice(0, 160),
  })
}

export default Page
