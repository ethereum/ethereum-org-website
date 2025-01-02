import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "../ui/buttons/Button"

const FindWalletsNoResults = ({ resetFilters }) => {
  // Track empty state
  trackCustomEvent({
    eventCategory: "Wallet_empty_state",
    eventAction: "reset",
    eventName: "triggered",
  })

  const handleClick = () => {
    resetFilters()
    trackCustomEvent({
      eventCategory: "Wallet_empty_state",
      eventAction: "reset",
      eventName: "reset_button_clicked",
    })
  }

  return (
    <div className="m-24 border-2 border-dashed border-body-light">
      <div className="p-12">
        <h3 className="mb-6 text-3xl font-normal">No results</h3>
        <p>
          There are no networks matching your criteria, try adding some filters
        </p>
        <Button variant="ghost" onClick={handleClick}>
          Reset filters
        </Button>
      </div>
    </div>
  )
}

export default FindWalletsNoResults
