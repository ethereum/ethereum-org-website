"use client"

import { useState } from "react"

import { Button } from "@/components/ui/buttons/Button"

interface TruncatedTextProps {
  text: string
  maxLines?: number
  showMoreText?: string
  showLessText?: string
  className?: string
}

const TruncatedText = ({
  text,
  maxLines = 2,
  showMoreText = "Show more",
  showLessText = "Show less",
  className = "",
}: TruncatedTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={className}>
      <p
        className={`text-body ${
          !isExpanded ? `line-clamp-${maxLines} overflow-hidden` : ""
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
