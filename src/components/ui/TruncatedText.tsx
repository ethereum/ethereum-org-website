"use client"

import { useState } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { LINE_CLAMP_CLASS_MAPPING } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"

interface TruncatedTextProps
  extends Pick<
    React.HTMLAttributes<HTMLParagraphElement>,
    "children" | "className"
  > {
  maxLines?: number
  matomoEvent?: MatomoEventOptions
}

const TruncatedText = ({
  maxLines = 2,
  className,
  children,
  matomoEvent,
}: TruncatedTextProps) => {
  const { t } = useTranslation("common")
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={className}>
      <p
        className={cn(
          "text-body",
          !isExpanded && `${LINE_CLAMP_CLASS_MAPPING[maxLines]} overflow-hidden`
        )}
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
        {children}
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
        {t(`show-${isExpanded ? "less" : "more"}`)}
      </Button>
    </div>
  )
}

export default TruncatedText
