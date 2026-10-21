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
import ToolDetailHardNav from "../_components/ToolDetailHardNav"
import { ToolLinkSections } from "../_components/ToolLinkRows"

import PageJsonLD from "./page-jsonld"

import { getDeveloperToolsData } from "@/lib/data"

// Rendered on demand and revalidated daily to pick up tools data updates
export const revalidate = 86400
export const dynamicParams = true

type ToolPageParams = PageParams & { tool: string }

const Page = async (props: { params: Promise<ToolPageParams> }) => {
  const { locale, tool: toolKey } = await props.params
  setRequestLocale(locale)

  const [data, { contributors }, t, tItem, toolDescriptions] =
    await Promise.all([
      getDeveloperToolsData(),
      getAppPageContributorInfo("developers/tools", locale as Lang),
      getTranslations({ locale, namespace: "page-developers-tools" }),
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
      <ToolDetailHardNav>
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
            <section className="flex max-w-3xl flex-col gap-3">
              <h3 className="text-md">
                {t("page-developers-tools-modal-tags")}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <li key={tag} className="m-0">
                    <Tag size="small" variant="outline" status="normal">
                      {labels.tagLabels[tag] || tag}
                    </Tag>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <ToolLinkSections
            locale={locale}
            tool={tool}
            labels={{
              repository: t("page-developers-tools-modal-repository"),
              repositories: t("page-developers-tools-modal-repositories"),
              package: t("page-developers-tools-modal-package"),
              packages: t("page-developers-tools-modal-packages"),
            }}
          />
        </CatalogItemLayout>
      </ToolDetailHardNav>
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
