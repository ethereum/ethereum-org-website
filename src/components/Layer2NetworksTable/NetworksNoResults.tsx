import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "../ui/buttons/Button"

import useTranslation from "@/hooks/useTranslation"

const FindWalletsNoResults = ({ resetFilters }) => {
  const { t } = useTranslation("page-layer-2-networks")

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
        <h3 className="mb-6 text-3xl font-normal">
          {t("page-layer-2-networks-no-results-title")}
        </h3>
        <p>{t("page-layer-2-networks-no-results-description")}</p>
        <Button variant="ghost" onClick={handleClick}>
          {t("page-layer-2-networks-reset-filters")}
        </Button>
      </div>
    </div>
  )
}

export default FindWalletsNoResults
