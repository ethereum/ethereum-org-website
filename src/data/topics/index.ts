import { roadmap } from "./roadmap"
import { staking } from "./staking"
import { upgrade } from "./upgrade"
import { useCases } from "./use-cases"

export type TopicDropdownItem = {
  textKey: string
  href: string
  matomoEvent: string
  /** Nested sub-items rendered indented beneath this item in the dropdown. */
  items?: TopicDropdownItem[]
}

export type TopicConfig = {
  translationNs: string
  dropdown: {
    textKey: string
    ariaLabelKey: string
    matomoCategory: string
    items: TopicDropdownItem[]
  }
  editBanner?: { textKey: string; linkKey: string }
  /**
   * When true, the hero description gets an appended "page last updated"
   * timestamp line. Used by the Upgrade topic to surface freshness on its
   * historical event pages.
   */
  showLastUpdatedInHero?: boolean
}

export const topics: Record<string, TopicConfig> = {
  roadmap,
  staking,
  upgrade,
  "use-cases": useCases,
}
