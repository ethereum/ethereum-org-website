import { notFound } from "next/navigation"

import { Image } from "@/components/Image"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import { getToolDetailData } from "../page-data"
import { getCategoryTagStyle } from "../utils"

import ToolDetailModal from "./ToolDetailModal"
import ToolLinks from "./ToolLinks"

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
  const detail = await getToolDetailData(locale, category, toolKey)
  if (!detail) notFound()

  const { tool, categoryLabels, subcategoryLabels, tagLabels, labels } = detail

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
            <Tag size="small" status={getCategoryTagStyle(tool.categoryId)}>
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
            <p>{labels.links}</p>
            <ToolLinks
              locale={locale}
              tool={tool}
              labels={{ website: labels.website, social: labels.social }}
            />
          </div>
        </div>
      </div>
    </ToolDetailModal>
  )
}

export default InterceptedToolDetail
