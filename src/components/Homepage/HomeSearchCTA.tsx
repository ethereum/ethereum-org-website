"use client"

import { Search as SearchIcon, Sparkles } from "lucide-react"

import Search from "@/components/Search"
import { Button } from "@/components/ui/buttons/Button"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { HOME_SEARCH_HASH } from "@/lib/constants"

type HomeSearchCTAProps = {
  label: string
  eventCategory: string
  /** Asking is English-only, so elsewhere this is the search box it has always been. */
  ask: boolean
}

/**
 * The hero's second call to action: open search from the page rather than the nav.
 *
 * Client only because the modal is. The label arrives resolved from the hero, which is a
 * server component, so nothing here needs a translation lookup.
 *
 * The nav's search owns the keyboard shortcut; this one opens on click alone, or the
 * same keypress would open two modals.
 */
const HomeSearchCTA = ({ label, ask, eventCategory }: HomeSearchCTAProps) => {
  const Icon = ask ? Sparkles : SearchIcon

  return (
    <Search asChild ownsShortcut={false} openOnHash={HOME_SEARCH_HASH}>
      <Button
        variant="outline"
        isSecondary
        size="lg"
        className="gap-2 ps-6 max-sm:w-full"
        onClick={() =>
          trackCustomEvent({
            eventCategory,
            eventAction: "cta_click",
            eventName: "search_button",
          })
        }
      >
        <Icon className="size-5" />
        {label}
      </Button>
    </Search>
  )
}

export default HomeSearchCTA
