import { useTranslation } from "react-i18next"

import { Button } from "../ui/buttons/Button"

const FindWalletsNoResults = ({ resetFilters }) => {
  const { t } = useTranslation("page-wallets-find-wallet")

  return (
    <div className="m-24 border-2 border-dashed border-body-light">
      <div className="p-12">
        <h3 className="mb-6 text-3xl font-normal">
          {t("page-find-wallet-empty-results-title")}
        </h3>
        <p>{t("page-find-wallet-empty-results-desc")}</p>
        <Button variant="ghost" onClick={resetFilters}>
          <p>{t("page-find-wallet-reset-filters")}</p>
        </Button>
      </div>
    </div>
  )
}

export default FindWalletsNoResults
