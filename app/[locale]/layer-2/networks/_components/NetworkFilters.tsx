"use client"

import { useCallback, useMemo, useState } from "react"

import CatalogCheckboxGroup from "@/components/FilterableCatalog/CatalogCheckboxGroup"
import CatalogFilterGroup from "@/components/FilterableCatalog/CatalogFilterGroup"
import type {
  CatalogFilterState,
  CatalogSelectOption,
  CatalogSetFilter,
} from "@/components/FilterableCatalog/types"
import { asArray, toggleId } from "@/components/FilterableCatalog/utils"
import Input from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { MATURITY_KEY, WALLET_KEY } from "@/lib/utils/networkData"

export type NetworkFiltersLabels = {
  walletSupport: string
  selectWallet: string
  searchWallets: string
  noWalletFound: string
  maturity: string
}

type NetworkFiltersProps = {
  locale: string
  state: CatalogFilterState
  setFilter: CatalogSetFilter
  walletOptions: CatalogSelectOption[]
  maturityOptions: CatalogSelectOption[]
  labels: NetworkFiltersLabels
}

const track = (action: string, name: string) =>
  trackCustomEvent({
    eventCategory: "l2_networks",
    eventAction: action,
    eventName: name,
  })

export default function NetworkFilters({
  locale,
  state,
  setFilter,
  walletOptions,
  maturityOptions,
  labels,
}: NetworkFiltersProps) {
  const [walletQuery, setWalletQuery] = useState("")
  const maturityValue = state[MATURITY_KEY]
  const selectedMaturity = useMemo(
    () => asArray(maturityValue),
    [maturityValue]
  )
  const [selectedWallet] = asArray(state[WALLET_KEY])

  const onToggleMaturity = useCallback(
    (level: string) => {
      setFilter(MATURITY_KEY, toggleId(selectedMaturity, level), {
        scroll: false,
      })
      track("filter", `${level} ${!selectedMaturity.includes(level)}`)
    },
    [setFilter, selectedMaturity]
  )

  const visibleWallets = walletOptions.filter((option) =>
    option.label.toLowerCase().includes(walletQuery.toLowerCase())
  )

  return (
    <div>
      <CatalogFilterGroup label={labels.walletSupport} defaultOpen>
        <div className="px-2 py-1.5">
          <Select
            // "" shows the placeholder, which is how a reset clears it.
            value={selectedWallet ?? ""}
            onValueChange={(slug) => {
              setFilter(WALLET_KEY, slug, { scroll: false })
              setWalletQuery("")
              const name = walletOptions.find(({ id }) => id === slug)?.label
              track("wallet", name ?? slug)
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={labels.selectWallet} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              collisionPadding={8}
              className="max-h-[40vh] overflow-y-auto"
            >
              <div
                className="sticky top-0 z-10 bg-background p-2"
                onKeyDown={(event) => event.stopPropagation()}
              >
                <Input
                  type="search"
                  placeholder={labels.searchWallets}
                  value={walletQuery}
                  onChange={(event) => setWalletQuery(event.target.value)}
                  className="w-full"
                />
              </div>
              {visibleWallets.length > 0 ? (
                visibleWallets.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label} ({option.count})
                  </SelectItem>
                ))
              ) : (
                <p className="p-2 text-center text-body-medium">
                  {labels.noWalletFound}
                </p>
              )}
            </SelectContent>
          </Select>
        </div>
      </CatalogFilterGroup>

      <CatalogCheckboxGroup
        locale={locale}
        label={labels.maturity}
        defaultOpen
        options={maturityOptions}
        selectedIds={selectedMaturity}
        onToggle={onToggleMaturity}
      />
    </div>
  )
}
