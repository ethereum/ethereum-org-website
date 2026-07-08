import Link from "next/link"
import { getTranslations } from "next-intl/server"

import type { ChainName, Lang, WalletRow } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import {
  createDefaultWalletFilterState,
  getVisibleWalletIds,
  WALLET_PERSONA_PRESETS,
  type WalletFilterEntry,
} from "@/lib/utils/findWalletFilters"
import { getLanguageCountWalletsData } from "@/lib/utils/wallets"

import { appOnlyNetworks } from "@/data/networks/app-networks"
import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"

import { WALLETS_FILTERS_DEFAULT } from "@/lib/constants"

import { walletSlug } from "./data"
import DesktopFilterPanel from "./DesktopFilterPanel"
import { buildWalletFilterGroups } from "./filter-groups"
import IconSprite from "./IconSprite"
import MobileFilterSheet from "./MobileFilterSheet"
import PresetCards from "./PresetCards"
import ResultsBar from "./ResultsBar"
import { chainTooltipId } from "./tooltip-ids"
import TooltipLayer from "./TooltipLayer"
import type { FindWalletsStrings, WalletPersonaConfig } from "./types"
import WalletFilterProvider from "./WalletFilterProvider"
import WalletListController from "./WalletListController"
import WalletRowSummary from "./WalletRowSummary"

const buildEntries = (wallets: WalletRow[]): WalletFilterEntry[] =>
  wallets.map((wallet) => {
    const entry = {
      id: wallet.id,
      languages_supported: wallet.languages_supported,
      supported_chains: wallet.supported_chains,
    } as WalletFilterEntry
    for (const key of Object.keys(WALLETS_FILTERS_DEFAULT)) {
      entry[key] = !!wallet[key]
    }
    return entry
  })

const FindWallets = async ({
  wallets,
  locale,
}: {
  wallets: WalletRow[]
  locale: Lang
}) => {
  const t = await getTranslations("page-wallets-find-wallet")
  const tTable = await getTranslations("table")

  const { groups } = await buildWalletFilterGroups(locale)

  const personas: WalletPersonaConfig[] = WALLET_PERSONA_PRESETS.map(
    (preset) => ({
      title: t(preset.titleKey),
      description: t(preset.descriptionKey),
      countLabelTemplate: t.raw("page-find-wallet-persona-count-available"),
    })
  )

  const strings: FindWalletsStrings = {
    filters: tTable("table-filters"),
    active: tTable("table-active"),
    resetFilters: tTable("table-reset-filters"),
    personaLegend: t("page-find-wallet-persona-legend"),
    searchLanguages: t("page-find-wallet-search-languages"),
    popularLanguages: t("page-find-wallet-popular-languages"),
    mobileFiltersLabel: t("page-find-wallet-see-wallets"),
    emptyTitle: t("page-find-wallet-empty-results-title"),
    emptyDescription: t("page-find-wallet-empty-results-desc"),
    emptyResetLabel: t("page-find-wallet-reset-filters"),
    showingCountLabel: t("page-find-wallet-showing-all-wallets"),
  }

  const languages = getLanguageCountWalletsData(locale).map((language) => ({
    langCode: language.langCode,
    name: language.name ?? language.langCode,
    count: language.count,
  }))

  const networks = [...layer2Data]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((network) => ({ name: network.name, chainName: network.chainName }))

  const entries = buildEntries(wallets)
  // SSR renders the same visibility the client computes for the default
  // filter state, so hydration doesn't flash rows
  const initialVisibleIds = getVisibleWalletIds(
    entries,
    createDefaultWalletFilterState()
  )

  // Unique chains across all wallets, for the shared tooltip contents
  const networkData = [ethereumNetworkData, ...layer2Data, ...appOnlyNetworks]
  const uniqueChains = [
    ...new Set(wallets.flatMap((wallet) => wallet.supported_chains)),
  ].filter((chain) =>
    networkData.some((network) => network.chainName === chain)
  ) as ChainName[]

  return (
    <WalletFilterProvider locale={locale} entries={entries}>
      <div>
        <PresetCards personas={personas} legend={strings.personaLegend} />
        <div className="px-4">
          <div className="flex flex-col gap-4 pt-4 pb-6 lg:flex-row lg:gap-6 2xl:px-0">
            <div className="block lg:hidden">
              <MobileFilterSheet
                groups={groups}
                personas={personas}
                languages={languages}
                networks={networks}
                strings={strings}
              />
            </div>
            {/* Reserve the sidebar width so DesktopFilterPanel's deferred
                mount (it skips hydration on mobile) causes no layout shift */}
            <div className="hidden lg:block lg:w-80">
              <DesktopFilterPanel
                groups={groups}
                languages={languages}
                networks={networks}
                strings={strings}
              />
            </div>
            <div className="flex-1">
              <ResultsBar strings={strings} />
              {/* Rows are pure server HTML: the detail panel is no longer
                  rendered inline — each row links to its dedicated
                  `[wallet]` route, which opens as an intercepted modal.
                  Visibility is synced by WalletListController; none of this
                  subtree hydrates. */}
              <ul data-testid="wallet-list" className="m-0 list-none">
                {wallets.map((wallet, index) => (
                  <li
                    key={wallet.id}
                    data-wallet-id={wallet.id}
                    data-index={index}
                    className={cn(
                      "group/collapsible relative flex w-full flex-col border-b hover:bg-background-highlight",
                      // Skip style/layout for offscreen rows
                      "[contain-intrinsic-size:auto_112px] [content-visibility:auto]",
                      !initialVisibleIds.has(wallet.id) && "hidden"
                    )}
                  >
                    {/* Stretched-link pattern: the row-covering <Link> sits at
                        z-1; the summary's own links/buttons are lifted above it
                        (scoped to this wrapper so the overlay link is excluded)
                        so they stay independently clickable */}
                    <div className="p-4 [&_a]:relative [&_a]:z-[2] [&_button]:relative [&_button]:z-[2]">
                      <WalletRowSummary wallet={wallet} index={index} />
                    </div>
                    <Link
                      href={`/wallets/find-wallet/${walletSlug(wallet.name)}/`}
                      aria-label={wallet.name}
                      prefetch={false}
                      className="absolute inset-0 z-[1]"
                    />
                  </li>
                ))}
              </ul>
              <WalletListController />
            </div>
          </div>
        </div>

        <IconSprite />

        {/* Hidden contents referenced by data-tooltip-ref / aria-describedby
            for the chain icons shown in each row summary */}
        <div hidden>
          {uniqueChains.map((chain) => {
            const chainData = networkData.find(
              (network) => network.chainName === chain
            )
            return (
              <div id={chainTooltipId(chain)} key={chain}>
                {chainData?.name || chain}
              </div>
            )
          })}
        </div>
        <TooltipLayer />
      </div>
    </WalletFilterProvider>
  )
}

export default FindWallets
