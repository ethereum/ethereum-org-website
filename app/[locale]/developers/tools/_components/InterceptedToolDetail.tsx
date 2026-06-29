import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import {
  buildToolLabels,
  findTool,
  normalizeDeveloperToolsData,
  withCategories,
} from "@/lib/utils/developerToolsData"

import ToolDetailModal from "./ToolDetailModal"
import ToolLinks from "./ToolLinks"

import { getDeveloperToolsData } from "@/lib/data"

/**
 * Shared body for the intercepting modal slots (index-level and category-level):
 * the compact tool detail rendered inside the client modal shell. The standalone
 * `[category]/[tool]` page has its own wider layout.
 */
const InterceptedToolDetail = async ({
  locale,
  category,
  toolKey,
}: {
  locale: string
  category: string
  toolKey: string
}) => {
  const [data, t] = await Promise.all([
    getDeveloperToolsData(),
    getTranslations({ locale, namespace: "page-developers-tools" }),
  ])

  const normalized = normalizeDeveloperToolsData(data)
  if (!normalized) notFound()

  const tool = findTool(withCategories(normalized), category, toolKey)
  if (!tool) notFound()

  const { categoryLabels, subcategoryLabels, tagLabels } = buildToolLabels(
    t,
    normalized.taxonomy
  )

  return (
    <ToolDetailModal title={tool.name}>
      <div className="flex flex-col bg-background">
        {tool.banner_url && (
          <div className="h-24 w-full shrink-0 sm:h-36">
            <Image
              src={tool.banner_url}
              alt=""
              width={23 * 16}
              height={23 * 4}
              className="size-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 p-4 sm:p-8">
          <div className="space-y-1">
            <Tag size="small" status="tag">
              {categoryLabels[tool.categoryId] || tool.categoryId}
            </Tag>
            <p className="text-sm text-body-medium">
              {subcategoryLabels[tool.subcategory_id] || tool.subcategory_id}
            </p>
            <h1 className="text-h3">{tool.name}</h1>
            <TagsInlineText
              list={tool.tags.map((tag) => tagLabels[tag] || tag)}
              variant="light"
              className="lowercase"
            />
          </div>
          <p className="whitespace-pre-line">{tool.description}</p>
          <div className="flex flex-col gap-2">
            <p>{t("page-developers-tools-modal-links")}</p>
            <ToolLinks
              locale={locale}
              tool={tool}
              labels={{
                website: t("page-developers-tools-modal-website"),
                social: t("page-developers-tools-modal-social"),
              }}
            />
          </div>
        </div>
      </div>
    </ToolDetailModal>
  )
}

export default InterceptedToolDetail
