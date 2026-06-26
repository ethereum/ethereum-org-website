import { Image } from "@/components/Image"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import type { DeveloperToolWithCategory } from "../types"
import { getCategoryTagStyle } from "../utils"

import ToolLinks from "./ToolLinks"

export type ToolDetailLabels = {
  links: string
  website: string
  social: string
}

type ToolDetailProps = {
  locale: string
  tool: DeveloperToolWithCategory
  categoryLabels: Record<string, string>
  subcategoryLabels: Record<string, string>
  tagLabels: Record<string, string>
  labels: ToolDetailLabels
}

/**
 * Compact tool detail used inside the intercepting modal. Content flows
 * naturally; the modal shell owns the height constraint and scrolling. The
 * standalone tool page uses its own wider layout (not this component).
 */
const ToolDetail = ({
  locale,
  tool,
  categoryLabels,
  subcategoryLabels,
  tagLabels,
  labels,
}: ToolDetailProps) => {
  return (
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
          <Tag
            size="small"
            status={getCategoryTagStyle(tool.categoryId)}
            className="px-1 py-0"
          >
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
  )
}

export default ToolDetail
