"use client"

import type { WalletRow } from "@/lib/types"

import { useWalletFilters } from "@/components/FindWalletProductTable/hooks/useWalletFilters"
import { useWalletPersonaPresets } from "@/components/FindWalletProductTable/hooks/useWalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { filterFn } from "@/lib/utils/wallets"

import List from "../ProductTable/List"

import FindWalletsNoResults from "./FindWalletsNoResults"
import WalletSubComponent from "./WalletSubComponent"

import { useTranslation } from "@/hooks/useTranslation"

const FindWalletProductTable = ({ wallets }: { wallets: WalletRow[] }) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletPersonas = useWalletPersonaPresets()
  const walletFilterOptions = useWalletFilters()

  return (
    <ProductTable<WalletRow>
      data={wallets}
      filters={walletFilterOptions}
      filterFn={filterFn}
      presetFilters={walletPersonas}
      mobileFiltersLabel={t("page-find-wallet-see-wallets")}
    >
      {({ data, matchedIds, filters, resetFilters }) => (
        <>
          <div className="sticky top-[76px] z-10 w-full border-b-background-highlight bg-background lg:border-b">
            <div className="flex w-full flex-row items-center justify-between border-none px-4 py-2">
              <p className="text-body-medium">
                {t("page-find-wallet-showing-all-wallets")}{" "}
                <span className="text-body">({matchedIds.size})</span>
              </p>
            </div>
          </div>

          {matchedIds.size === 0 && (
            <FindWalletsNoResults
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

          <List
            data={data}
            matchedIds={matchedIds}
            renderSubComponent={(wallet, listIdx) => (
              <WalletSubComponent
                wallet={wallet}
                filters={filters}
                listIdx={listIdx}
              />
            )}
            matomoEventCategory="find-wallet"
            data-testid="wallet-list"
          />
        </>
      )}
    </ProductTable>
  )
}

export default FindWalletProductTable
