import type { ReactNode } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import Link from "@/components/ui/Link"

/** Site-wide anchor for the numbered citations at the foot of a page. */
const FURTHER_READING_ID = "further-reading"

/**
 * Matomo wiring for a long-form page: one event category for the page, the
 * section id as the action, and a stable English name for the element. Section
 * titles are translated -- ids and slugs keep a locale from splitting its own
 * row.
 */
export const createPageTracking = (
  eventCategory: string,
  furtherReadingId: string = FURTHER_READING_ID
) => {
  const track = (section: string, name: string): MatomoEventOptions => ({
    eventCategory,
    eventAction: section,
    eventName: name,
  })

  // Footnote marker for the numbered citations under Further reading. Rendered
  // outside the strings so translators never carry the numbering.
  const footnote = (n: number, section: string) => (
    <sup>
      <Link
        href={`#${furtherReadingId}`}
        customEventOptions={track(section, `Footnote ${n}`)}
      >{`[${n}]`}</Link>
    </sup>
  )

  // `t.rich` tag that leaves the claim as plain text and trails a footnote.
  const cite = (n: number, section: string) => {
    const Cited = (chunks: ReactNode) => (
      <>
        {chunks}
        {footnote(n, section)}
      </>
    )
    Cited.displayName = "Cited"
    return Cited
  }

  // `t.rich` link placeholder, pre-wired to Matomo.
  const linkTo = (href: string, section: string, name: string) => {
    const TrackedLink = (chunks: ReactNode) => (
      <Link href={href} customEventOptions={track(section, name)}>
        {chunks}
      </Link>
    )
    TrackedLink.displayName = "TrackedLink"
    return TrackedLink
  }

  return { track, footnote, cite, linkTo }
}
