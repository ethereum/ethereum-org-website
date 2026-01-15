"use client"

import { useState } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

interface TruncatedTextProps {
  text: string
  maxLines?: number
  showMoreText?: string
  showLessText?: string
  className?: string
  matomoEvent: MatomoEventOptions
}

const TruncatedText = ({
  text,
  maxLines = 2,
  showMoreText = "Show more",
  showLessText = "Show less",
  className = "",
  matomoEvent,
}: TruncatedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const lineClampClass = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  }

  return (
    <div className={className}>
      <p
        className={`text-body ${
          !isExpanded ? `${lineClampClass[maxLines]} overflow-hidden` : ""
        }`}
        style={
          !isExpanded
            ? {
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
            : {}
        }
        onClick={() =>
          matomoEvent && !isExpanded && trackCustomEvent(matomoEvent)
        }
      >
        {text}
      </p>
      <Button
        variant="link"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsExpanded(!isExpanded)
        }}
        className="relative z-10 mt-1 h-auto p-0 text-sm no-underline"
      >
        {isExpanded ? showLessText : showMoreText}
      </Button>
    </div>
  )
}

export default TruncatedText
