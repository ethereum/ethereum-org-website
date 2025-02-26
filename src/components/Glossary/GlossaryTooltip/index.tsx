import React, { ReactNode } from "react"

import Tooltip, { type TooltipProps } from "@/components/Tooltip"
import Translation from "@/components/Translation"
import InlineLink from "@/components/ui/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

import { usePathname } from "@/i18n/routing"

type GlossaryTooltipProps = Omit<TooltipProps, "content"> & {
  children: ReactNode
  termKey: string
}

const GlossaryTooltip = ({
  children,
  termKey,
  ...props
}: GlossaryTooltipProps) => {
  const pathname = usePathname()

  return (
    <span className="inline-block">
      <Tooltip
        {...props}
        content={
          <div className="flex flex-col items-stretch gap-2 text-start">
            <h6>
              <Translation
                id={termKey + "-term"}
                ns="glossary-tooltip"
                // Override the default `a` tag transformation to avoid circular
                // dependency issues
                transform={{ a: InlineLink }}
              />
            </h6>
            {/**
             * `as="span"` prevents hydration warnings for strings that contain
             * elements that cannot be nested inside `p` tags, like `ul` tags
             * (found in some Glossary definition).
             * TODO: Develop a better solution to handle this case.
             */}
            <span>
              <Translation
                id={termKey + "-definition"}
                ns="glossary-tooltip"
                // Override the default `a` tag transformation to avoid circular
                // dependency issues
                transform={{ a: InlineLink }}
              />
            </span>
          </div>
        }
        onBeforeOpen={() => {
          trackCustomEvent({
            eventCategory: "Glossary Tooltip",
            eventAction: cleanPath(pathname),
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
