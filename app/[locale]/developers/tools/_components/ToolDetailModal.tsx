"use client"

import { AppWindowMac } from "lucide-react"

import CatalogDetailModal from "@/components/CatalogDetailModal"
import DetailRow from "@/components/CatalogDetailModal/DetailRow"
import CatalogItemLinkButtons from "@/components/CatalogItem/Links"
import { LinkWithArrow } from "@/components/ui/Link"
import { Tag, TagsInlineText } from "@/components/ui/tag"

import type { CatalogToolCard } from "@/lib/utils/developerToolsData"
import { getToolKey } from "@/lib/utils/getToolKey"

import ToolLinkRows, { type ToolLinkRowsLabels } from "./ToolLinkRows"

/** Built on the server so no i18n runtime ships to the browser. */
export type ToolModalLabels = ToolLinkRowsLabels & {
  close: string
  category: string
  tags: string
  fullDetails: string
  sourceCode: string
  /** Raw message with `{name}` and `{platform}` placeholders. */
  linkLabel: string
}

/**
 * Client-side detail modal fed from the card payload; the standalone `[tool]`
 * page stays the linkable, crawlable version with the full markdown description.
 */
const ToolDetailModal = ({
  tool,
  labels,
  onClose,
}: {
  tool: CatalogToolCard
  labels: ToolModalLabels
  onClose: () => void
}) => {
  const { detail } = tool
  const detailHref = `/developers/tools/${getToolKey(tool)}/`

  return (
    <CatalogDetailModal
      title={tool.name}
      image={tool.thumbnail_url}
      fallbackIcon={
        <AppWindowMac className="size-14 shrink-0 text-body-medium" />
      }
      description={tool.descriptionStripped}
      closeLabel={labels.close}
      onClose={onClose}
      // Radix aims focus at whatever was focused when the dialog mounted,
      // which lands on the body here; put the visitor back on the card.
      onCloseAutoFocus={(event) => {
        const card = document.querySelector<HTMLElement>(
          `a[href$="${detailHref}"]`
        )
        if (!card) return
        event.preventDefault()
        card.focus()
      }}
    >
      <div className="flex flex-col gap-6">
        {detail.archived && (
          <Tag status="warning" className="w-fit">
            {detail.archived}
          </Tag>
        )}
        {tool.descriptionStripped && (
          <p className="text-body-medium">{tool.descriptionStripped}</p>
        )}

        <div className="flex flex-col gap-2">
          <DetailRow label={labels.category}>
            <Tag size="small" status="tag">
              {detail.category}
            </Tag>
          </DetailRow>

          {detail.infoRows.map(({ label, value }) => (
            <DetailRow key={label} label={label} roomyLabel>
              <span className="font-bold text-body">{value}</span>
            </DetailRow>
          ))}

          {detail.tags.length > 0 && (
            <DetailRow label={labels.tags} roomyLabel>
              <TagsInlineText
                list={detail.tags}
                variant="light"
                className="font-bold text-body lowercase"
              />
            </DetailRow>
          )}

          <ToolLinkRows
            links={detail.links}
            detailHref={detailHref}
            labels={labels}
          />

          <LinkWithArrow href={detailHref} className="mt-1 self-end text-sm">
            {labels.fullDetails}
          </LinkWithArrow>
        </div>

        <CatalogItemLinkButtons
          item={{ kind: "tool", name: tool.name, ...detail }}
          sourceCodeLabel={labels.sourceCode}
          linkLabel={(platform) =>
            labels.linkLabel
              .replace("{name}", tool.name)
              .replace("{platform}", platform)
          }
        />
      </div>
    </CatalogDetailModal>
  )
}

export default ToolDetailModal
