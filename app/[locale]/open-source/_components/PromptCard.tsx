"use client"

import type { MatomoEventOptions } from "@/lib/types"

import CopyToClipboard, { CopyIcon } from "@/components/CopyToClipboard"
import { Tag } from "@/components/ui/tag"

type PromptCardProps = {
  /** Copied to the clipboard verbatim, and the card's visible label. */
  prompt: string
  /** One-word purpose, e.g. "Discover". */
  tag: string
  /** Screen-reader-only hint; the card itself carries no other affordance. */
  copyLabel: string
  matomoEvent: MatomoEventOptions
}

/**
 * A client component because `CopyToClipboard` takes a render-prop child, which
 * cannot be passed from a server component.
 */
const PromptCard = ({
  prompt,
  tag,
  copyLabel,
  matomoEvent,
}: PromptCardProps) => (
  <CopyToClipboard
    text={prompt}
    matomoEvent={matomoEvent}
    className="group/link flex h-full flex-col gap-3 rounded-base border p-6 text-start transition-colors hover:border-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover"
  >
    {(isCopied) => (
      <>
        <span className="sr-only">{copyLabel}</span>
        <span className="flex items-center justify-between gap-3">
          {/* asChild: Tag renders a <div>, and a <button> only admits
              phrasing content. */}
          <Tag asChild status="tag">
            <span>{tag}</span>
          </Tag>
          <CopyIcon
            copied={isCopied}
            className="text-primary hover-link:text-primary-hover"
          />
        </span>
        <span>{prompt}</span>
      </>
    )}
  </CopyToClipboard>
)

export default PromptCard
