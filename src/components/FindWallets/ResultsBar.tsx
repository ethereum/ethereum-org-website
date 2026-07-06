"use client"

import { trackCustomEvent } from "@/lib/utils/matomo"

import NoResults from "./NoResults"
import type { FindWalletsStrings } from "./types"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

/**
 * Sticky "Showing all wallets (N)" bar plus the empty state. The only parts
 * of the results column that re-render on filter changes.
 */
const ResultsBar = ({ strings }: { strings: FindWalletsStrings }) => {
  const { visibleCount } = useWalletFilters()
  const { resetFilters } = useWalletFilterActions()

  return (
    <>
      <div className="sticky top-[76px] z-10 w-full border-b-background-highlight bg-background lg:border-b">
        <div className="flex w-full flex-row items-center justify-between border-none px-4 py-2">
          <p className="text-body-medium">
            {strings.showingCountLabel}{" "}
            <span className="text-body">({visibleCount})</span>
          </p>
        </div>
      </div>

      {visibleCount === 0 && (
        <NoResults
          title={strings.emptyTitle}
          description={strings.emptyDescription}
          resetLabel={strings.emptyResetLabel}
          resetFilters={() => {
            resetFilters()
            trackCustomEvent({
              eventCategory: "WalletFilterSidebar",
              eventAction: "Reset button",
              eventName: "reset_click",
            })
          }}
        />
      )}
    </>
  )
}

export default ResultsBar
