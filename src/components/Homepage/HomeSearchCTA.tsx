"use client"

import { Search as SearchIcon, Sparkles } from "lucide-react"

import Search from "@/components/Search"
import { Button } from "@/components/ui/buttons/Button"

type HomeSearchCTAProps = {
  label: string
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
const HomeSearchCTA = ({ label, ask }: HomeSearchCTAProps) => {
  const Icon = ask ? Sparkles : SearchIcon

  return (
    <Search asChild ownsShortcut={false}>
      <Button
        variant="outline"
        isSecondary
        size="lg"
        className="gap-2 ps-6 max-sm:w-full"
      >
        <Icon className="size-5" />
        {label}
      </Button>
    </Search>
  )
}

export default HomeSearchCTA
