"use client"

import { type ReactNode, useId, useState } from "react"

import { ChevronNext } from "@/components/Chevron"

import { cn } from "@/lib/utils/cn"

type CollapsibleCardProps = {
  title: string
  preview?: string
  moreLabel: string
  lessLabel: string
  children: ReactNode
}

// SEO-safe collapsible. The content is always rendered in the DOM; only its
// `hidden` state is toggled. Crawlers (Googlebot, GPTBot, ClaudeBot, Perplexity)
// read every word on the first HTTP response regardless of collapse state.
const CollapsibleCard = ({
  title,
  preview,
  moreLabel,
  lessLabel,
  children,
}: CollapsibleCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()

  return (
    <div className="rounded-xs border">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="hover:bg-background-highlight flex w-full items-center gap-4 p-6 text-left transition-colors"
      >
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-xl font-semibold">{title}</h3>
          {preview && <p className="text-body-medium text-sm">{preview}</p>}
        </div>
        <span className="text-md text-primary flex shrink-0 items-center gap-1">
          {isOpen ? lessLabel : moreLabel}
          <ChevronNext
            className={cn(
              "size-[1em] shrink-0 text-lg transition-transform duration-200",
              isOpen ? "rotate-90" : "-rotate-90"
            )}
          />
        </span>
      </button>
      <div id={contentId} hidden={!isOpen} className="border-t p-6">
        {children}
      </div>
    </div>
  )
}

export default CollapsibleCard
