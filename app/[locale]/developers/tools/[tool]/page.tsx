import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import CatalogItemLayout, {
  RelatedCatalogItems,
} from "@/components/CatalogItem"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import {
  buildToolLabels,
  findToolBySlug,
  getToolKey,
  getToolNeighbours,
  localizeToolDescriptions,
  normalizeDeveloperToolsData,
  toolToCatalogItem,
  toToolCard,
  withCategories,
} from "@/lib/utils/developerToolsData"
import { getMetadata } from "@/lib/utils/metadata"

import ToolCard from "../_components/ToolCard"
import ToolLinkRows from "../_components/ToolLinkRows"

import PageJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

// Rendered on demand and revalidated daily to pick up tools data updates
export const revalidate = 86400
export const dynamicParams = true

type ToolPageParams = PageParams & { tool: string }

const Page = async (props: { params: Promise<ToolPageParams> }) => {
  const { locale, tool: toolKey } = await props.params
  setRequestLocale(locale)

  const [data, { contributors }, t, tCommon, tItem, toolDescriptions] =
    await Promise.all([
      getDeveloperToolsData(),
      getAppPageContributorInfo("developers/tools", locale as Lang),
      getTranslations({ locale, namespace: "page-developers-tools" }),
      getTranslations({ locale, namespace: "common" }),
      getTranslations({ locale, namespace: "component-catalog-item" }),
      getTranslations({
        locale,
        namespace: "page-developers-tools-descriptions",
      }),
    ])

  const normalized = normalizeDeveloperToolsData(data)
  if (!normalized) notFound()

  const allTools = localizeToolDescriptions(
    withCategories(normalized),
    toolDescriptions
  )
  const tool = findToolBySlug(allTools, toolKey)
  if (!tool) notFound()

  const labels = buildToolLabels(t, normalized.taxonomy)
  const { next, related } = getToolNeighbours(allTools, tool)
  const item = toolToCatalogItem(tool, {
    locale,
    t,
    tCommon,
    tItem,
    labels,
    next,
  })

  return (
    <>
      <PageJsonLD
        locale={locale}
        tool={tool}
        categoryLabel={
          labels.categoryLabels[tool.categoryId] || tool.categoryId
        }
        contributors={contributors}
      />
      <CatalogItemLayout
        item={item}
        related={
          related.length > 0 && (
            <RelatedCatalogItems
              title={t("page-developers-tools-related-title")}
            >
              {related.map((relatedTool) => (
                <ToolCard
                  key={getToolKey(relatedTool)}
                  tool={toToolCard(relatedTool)}
                />
              ))}
            </RelatedCatalogItems>
          )
        }
      >
        {tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Tag key={tag} size="small" status="normal">
                {labels.tagLabels[tag] || tag}
              </Tag>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 empty:hidden [&>div]:bg-background">
          <ToolLinkRows
            locale={locale}
            tool={tool}
            detailHref={`/developers/tools/${toolKey}/`}
            shown={Infinity}
            labels={{
              repository: t("page-developers-tools-modal-repository"),
              repositories: t("page-developers-tools-modal-repositories"),
              package: t("page-developers-tools-modal-package"),
              packages: t("page-developers-tools-modal-packages"),
              more: (count) => t("page-developers-tools-modal-more", { count }),
            }}
          />
        </div>
      </CatalogItemLayout>
    </>
  )
}

export function generateStaticParams() {
  return []
}

export async function generateMetadata(props: {
  params: Promise<ToolPageParams>
}) {
  const { locale, tool: toolKey } = await props.params

  setRequestLocale(locale)

  const [normalized, toolDescriptions] = await Promise.all([
    normalizeDeveloperToolsData(await getDeveloperToolsData()),
    getTranslations({
      locale,
      namespace: "page-developers-tools-descriptions",
    }),
  ])
  const tool =
    normalized &&
    findToolBySlug(
      localizeToolDescriptions(withCategories(normalized), toolDescriptions),
      toolKey
    )
  if (!tool) return {}

  return await getMetadata({
    locale,
    slug: ["developers", "tools", toolKey],
    title: tool.name,
    description: (tool.descriptionStripped ?? "").slice(0, 160),
  })
}

export default Page
