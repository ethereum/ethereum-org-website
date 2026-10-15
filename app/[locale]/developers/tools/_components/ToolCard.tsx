import { memo } from "react"
import { AppWindowMac } from "lucide-react"

import AppCard from "@/components/AppCard"

import type { ToolCardData } from "@/lib/utils/developerToolsData"
import { getToolKey } from "@/lib/utils/getToolKey"
import { isModified } from "@/lib/utils/keyboard"

/**
 * Catalog card for a single tool. Shared by the catalog grid and the
 * standalone page's related-tools grid so the card styling lives in one place.
 * Memoized so a filter/search re-render only re-renders cards whose tool changed.
 */
const ToolCard = memo(function ToolCard({
  tool,
  onOpen,
}: {
  tool: ToolCardData
  /** When set, a plain click opens the modal instead of following the link. */
  onOpen?: (key: string) => void
}) {
  const key = getToolKey(tool)
  return (
    // content-visibility lets the browser skip layout/paint of off-screen
    // cards while keeping them in the server HTML for crawlers
    <div className="min-h-[88px] [contain-intrinsic-size:auto_88px] [content-visibility:auto]">
      <AppCard
        name={tool.name}
        nameClassName="text-base"
        description={tool.descriptionStripped ?? tool.description}
        descriptionClassName="text-sm [&>p]:text-body-medium"
        descriptionMaxLines={2}
        descriptionExpandable={false}
        thumbnail={tool.thumbnail_url ?? undefined}
        fallbackIcon={
          <AppWindowMac className="size-12 text-body-medium group-hover/appcard:text-primary-hover" />
        }
        href={`/developers/tools/${key}/`}
        imageSize="thumbnail"
        className="h-fit p-4"
        {...(onOpen && {
          customEventOptions: {
            eventCategory: "developer-tools",
            eventAction: "open_tool_modal",
            eventName: tool.name,
          },
          // Capture phase, so the link sees defaultPrevented and skips navigating.
          onClickCapture: (event) => {
            if (event.button !== 0 || isModified(event)) return
            event.preventDefault()
            onOpen(key)
          },
        })}
      />
    </div>
  )
})

export default ToolCard
