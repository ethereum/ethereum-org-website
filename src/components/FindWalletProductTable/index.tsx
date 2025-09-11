"use client"

import { ChainName, FilterOption, Lang, Wallet } from "@/lib/types"

import { useWalletFilters } from "@/components/FindWalletProductTable/hooks/useWalletFilters"
import { useWalletPersonaPresets } from "@/components/FindWalletProductTable/hooks/useWalletPersonaPresets"
import ProductTable from "@/components/ProductTable"

import { trackCustomEvent } from "@/lib/utils/matomo"

import List from "../ProductTable/List"

import FindWalletsNoResults from "./FindWalletsNoResults"
import WalletSubComponent from "./WalletSubComponent"

import { useTranslation } from "@/hooks/useTranslation"

function getActiveFilterKeys(filters: FilterOption[]): string[] {
  const keys: string[] = []
  filters.forEach((filter) => {
    filter.items.forEach((item) => {
      if (item.inputState === true && item.options.length === 0) {
        keys.push(item.filterKey)
      }
      if (item.options?.length > 0) {
        item.options.forEach((option) => {
          if (option.inputState === true) {
            keys.push(option.filterKey)
          }
        })
      }
    })
  })
  return keys
}

const filterFn = (data: WalletRow[], filters: FilterOption[]) => {
  let selectedLanguage: string = ""
  let selectedLayer2: ChainName[] = []

  const activeFilterKeys = getActiveFilterKeys(filters)

  filters.forEach((filter) => {
    filter.items.forEach((item) => {
      if (item.filterKey === "languages") {
        selectedLanguage = item.inputState as string
      } else if (item.filterKey === "layer_2_support") {
        selectedLayer2 = (item.inputState as ChainName[]) || []
      }
    })
  })

  return data
    .filter((item) => {
      return item.languages_supported.includes(selectedLanguage as Lang)
    })
    .filter((item) => {
      return (
        selectedLayer2.length === 0 ||
        selectedLayer2.every((chain) => item.supported_chains.includes(chain))
      )
    })
    .filter((item) => {
      return activeFilterKeys.every((key) => item[key])
    })
}

type WalletRow = Wallet & { id: string }

const FindWalletProductTable = ({ wallets }: { wallets: WalletRow[] }) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const walletPersonas = useWalletPersonaPresets()
  const walletFilterOptions = useWalletFilters()

  if (!Array.isArray(wallets)) {
    return <div>Error loading wallets</div>
  }

  return (
    <ProductTable<WalletRow>
      data={wallets}
      filters={walletFilterOptions}
      filterFn={filterFn}
      presetFilters={walletPersonas}
      mobileFiltersLabel={t("page-find-wallet-see-wallets")}
    >
      {({ filteredData, filters, resetFilters }) => (
        <>
          <div className="sticky top-[76px] z-10 w-full border-b-background-highlight bg-background lg:border-b">
            <div className="flex w-full flex-row items-center justify-between border-none px-4 py-2">
              <p className="text-body-medium">
                {t("page-find-wallet-showing-all-wallets")}{" "}
                <span className="text-body">({filteredData.length})</span>
              </p>
            </div>
          </div>

          {filteredData.length === 0 && (
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
            data={filteredData}
            subComponent={(wallet, filters, listIdx) => (
              <WalletSubComponent
                wallet={wallet}
                filters={filters}
                listIdx={listIdx}
              />
            )}
            filters={filters}
            matomoEventCategory="find-wallet"
          />
        </>
      )}
    </ProductTable>
  )
}

export default FindWalletProductTable
