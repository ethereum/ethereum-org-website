import React, { ReactNode } from "react"
import { useRouter } from "next/router"

import Tooltip, { type TooltipProps } from "@/components/Tooltip"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

type GlossaryTooltipProps = Omit<TooltipProps, "content"> & {
  children: ReactNode
  termKey: string
  renderContent: (termKey: string) => ReactNode
}

const GlossaryTooltip = ({
  children,
  termKey,
  renderContent,
  ...props
}: GlossaryTooltipProps) => {
  const { asPath } = useRouter()

  return (
    <span className="inline-block">
      <Tooltip
        {...props}
        content={renderContent(termKey)}
        onBeforeOpen={() => {
          trackCustomEvent({
            eventCategory: "Glossary Tooltip",
            eventAction: cleanPath(asPath),
            eventName: termKey,
          })
        }}
      >
        <u className="cursor-help decoration-dotted underline-offset-3 hover:text-primary-hover hover:decoration-primary-hover">
          {children}
        </u>
      </Tooltip>
    </span>
  )
}

export default GlossaryTooltip
