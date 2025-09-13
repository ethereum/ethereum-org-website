import React, { ReactNode } from "react"

import GlossaryTooltip from "./Glossary/GlossaryTooltip"
import InlineLink from "./ui/Link"

interface Props {
  href?: string
  children?: ReactNode
}

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
function TooltipLink(props: Props) {
  const { href } = props
  if (!href) {
    return <InlineLink {...props} />
  }

  const regex = new RegExp(/\/glossary\/#(.+)/)
  const matches = href.match(regex)

  // get the `termKey` from the `href`
  // e.g. in `/glossary/#new-term` => "new-term" is the `termKey`
  if (matches?.length) {
    const termKey = matches[1]

    return <GlossaryTooltip termKey={termKey}>{props.children}</GlossaryTooltip>
  }

  return <InlineLink {...props} />
}

export default TooltipLink
