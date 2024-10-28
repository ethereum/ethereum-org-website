import { useTranslation } from "next-i18next"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "../ui/buttons/Button"

const FindWalletsNoResults = ({ resetFilters }) => {
  const { t } = useTranslation("page-wallets-find-wallet")

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
          {t("page-find-wallet-empty-results-title")}
        </h3>
        <p>{t("page-find-wallet-empty-results-desc")}</p>
        <Button variant="ghost" onClick={handleClick}>
          <p>{t("page-find-wallet-reset-filters")}</p>
        </Button>
      </div>
    </div>
  )
}

export default FindWalletsNoResults
