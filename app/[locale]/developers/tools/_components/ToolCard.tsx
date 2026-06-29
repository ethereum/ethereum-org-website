import { memo } from "react"
import { AppWindowMac } from "lucide-react"

import AppCard from "@/components/AppCard"

import {
  type DeveloperToolWithCategory,
  getToolKey,
} from "@/lib/utils/developerToolsData"

/**
 * Catalog card for a single tool. Shared by the catalog grid and the
 * standalone page's related-tools grid so the card styling lives in one place.
 * Memoized so a filter/search re-render only re-renders cards whose tool changed.
 */
const ToolCard = memo(function ToolCard({
  tool,
}: {
  tool: DeveloperToolWithCategory
}) {
  return (
    // content-visibility lets the browser skip layout/paint of off-screen
    // cards while keeping them in the server HTML for crawlers
    <div className="min-h-[88px] [contain-intrinsic-size:auto_88px] [content-visibility:auto]">
      <AppCard
        name={tool.name}
        nameClassName="text-base"
        description={tool.description}
        descriptionClassName="text-sm [&>p]:text-body-medium"
        descriptionMaxLines={2}
        descriptionExpandable={false}
        thumbnail={tool.thumbnail_url ?? undefined}
        fallbackIcon={
          <AppWindowMac className="size-12 text-body-medium group-hover/appcard:text-primary-hover" />
        }
        href={`/developers/tools/${tool.categoryId}/${getToolKey(tool)}/`}
        layout="horizontal"
        imageSize="thumbnail"
        className="h-fit p-4"
      />
    </div>
  )
})

export default ToolCard
