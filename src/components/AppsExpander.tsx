"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import type { MatomoEventOptions } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

type AppsExpanderProps = {
  /** A server-rendered grid. Overflow cards hide themselves off `data-expanded`. */
  children: React.ReactNode
  matomoEvent: MatomoEventOptions
}

/**
 * Reveals the overflow half of a server-rendered grid. Every card is in the HTML
 * either way -- only the toggle is client-side, and overflow cards opt into
 * hiding with `group-data-[expanded=false]/apps:hidden`.
 */
const AppsExpander = ({ children, matomoEvent }: AppsExpanderProps) => {
  const t = useTranslations("common")
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="group/apps mb-space-3x" data-expanded={expanded}>
      {children}
      <div className="flex justify-center">
        <Button
          variant="outline"
          aria-expanded={expanded}
          onClick={() => {
            if (!expanded) trackCustomEvent(matomoEvent)
            setExpanded(!expanded)
          }}
        >
          {t(expanded ? "show-less" : "show-more")}
        </Button>
      </div>
    </div>
  )
}

export default AppsExpander
