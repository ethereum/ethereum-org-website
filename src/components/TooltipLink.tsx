import React, { ReactNode } from "react"

import GlossaryTooltip from "./Glossary/GlossaryTooltip"
import InlineLink from "./Link"
import Translation from "./Translation"

interface Props {
  href?: string
  children?: ReactNode
  renderTooltipContent?: (termKey: string) => ReactNode
}

export const renderGlossaryTooltipContent = (termKey: string) => (
  <div className="flex flex-col items-stretch gap-2 text-start">
    <h6>
      <Translation
        id={termKey + "-term"}
        options={{ ns: "glossary-tooltip" }}
        transform={{ a: InlineLink }}
      />
    </h6>
    <span>
      <Translation
        id={termKey + "-definition"}
        options={{ ns: "glossary-tooltip" }}
        transform={{ a: InlineLink }}
      />
    </span>
  </div>
)

/**
 * Link component to use in markdown templates.
 *
 * In case the `href` for the given link points to the glossary page, it
 * displays the GlossaryTooltip component instead of a Link.
 *
 * NOTE: This component exists because we want to keep using the link syntax
 * inside of our MD files. The native link syntax has a better UX with Crowdin
 * translations.
 */

function TooltipLink({
  href,
  children,
  renderTooltipContent = renderGlossaryTooltipContent,
  ...props
}: Props) {
  if (!href) {
    return <InlineLink {...props}>{children}</InlineLink>
  }

  const regex = new RegExp(/\/glossary\/#(.+)/)
  const matches = href.match(regex)

  if (matches?.length) {
    const termKey = matches[1]
    return (
      <GlossaryTooltip termKey={termKey} renderContent={renderTooltipContent}>
        {children}
      </GlossaryTooltip>
    )
  }

  return (
    <InlineLink href={href} {...props}>
      {children}
    </InlineLink>
  )
}

export default TooltipLink
