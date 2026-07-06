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

import FilterPanel from "./FilterPanel"
import MobileFilterSheet from "./MobileFilterSheet"
import PresetCards from "./PresetCards"
import ResultsBar from "./ResultsBar"
import { chainTooltipId, featureTooltipId } from "./tooltip-ids"
import TooltipLayer from "./TooltipLayer"
import type {
  FindWalletsStrings,
  WalletFilterGroupConfig,
  WalletPersonaConfig,
} from "./types"
import WalletFilterProvider from "./WalletFilterProvider"
import WalletListController from "./WalletListController"
import WalletRowDetails from "./WalletRowDetails"
import WalletRowSummary from "./WalletRowSummary"

const DETAIL_GROUP_ORDER = [
  "features",
  "security",
  "buy-sell",
  "smart-contract",
  "advanced",
]

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

  const groups: WalletFilterGroupConfig[] = [
    {
      id: "device",
      title: t("page-find-wallet-device"),
      items: [
        {
          key: "mobile",
          label: t("page-find-wallet-mobile"),
          kind: "switch",
          optionsLegend: tTable("table-mobile-platforms"),
          options: [
            { key: "android", label: t("page-find-wallet-android") },
            { key: "ios", label: t("page-find-wallet-iOS") },
          ],
        },
        {
          key: "desktop",
          label: t("page-find-wallet-desktop"),
          kind: "switch",
          optionsLegend: tTable("table-desktop-platforms"),
          options: [
            { key: "linux", label: t("page-find-wallet-linux") },
            { key: "windows", label: t("page-find-wallet-windows") },
            { key: "macOS", label: t("page-find-wallet-macOS") },
          ],
        },
        {
          key: "browser",
          label: t("page-find-wallet-browser"),
          kind: "switch",
          optionsLegend: tTable("table-browser-engines"),
          options: [
            { key: "chromium", label: t("page-find-wallet-chromium") },
            { key: "firefox", label: t("page-find-wallet-firefox") },
          ],
        },
        {
          key: "hardware",
          label: t("page-find-wallet-hardware"),
          kind: "switch",
        },
      ],
    },
    {
      id: "network",
      title: "Network support",
      items: [
        { key: "layer_2_support", label: "layer_2_support", kind: "layer2" },
      ],
    },
    {
      id: "languages",
      title: t("page-find-wallet-languages-supported"),
      items: [
        {
          key: "languages",
          label: t("page-find-wallet-languages-supported"),
          kind: "language",
        },
      ],
    },
    {
      id: "buy-sell",
      title: `${t("page-find-wallet-buy-crypto")} / ${t(
        "page-find-wallet-sell-for-fiat"
      )}`,
      items: [
        {
          key: "buy_crypto",
          label: t("page-find-wallet-buy-crypto"),
          description: t("page-find-wallet-buy-crypto-desc"),
          kind: "switch",
        },
        {
          key: "withdraw_crypto",
          label: t("page-find-wallet-sell-for-fiat"),
          description: t("page-find-wallet-sell-for-fiat-desc"),
          kind: "switch",
        },
      ],
    },
    {
      id: "features",
      title: t("page-find-wallet-features"),
      items: [
        {
          key: "connect_to_dapps",
          label: t("page-find-wallet-connect-to-dapps"),
          description: t("page-find-wallet-connect-to-dapps-desc"),
          kind: "switch",
        },
        {
          key: "nft_support",
          label: t("page-find-wallet-nft-support"),
          description: t("page-find-wallet-nft-support-desc"),
          kind: "switch",
        },
        {
          key: "staking",
          label: t("page-find-wallet-staking"),
          description: t("page-find-wallet-staking-desc"),
          kind: "switch",
        },
        {
          key: "layer_2",
          label: t("page-find-wallet-layer-2"),
          description: t("page-find-wallet-layer-2-desc"),
          kind: "switch",
        },
        {
          key: "swaps",
          label: t("page-find-wallet-swaps"),
          description: t("page-find-wallet-swaps-desc"),
          kind: "switch",
        },
        {
          key: "hardware_support",
          label: t("page-find-wallet-hardware-wallet-support"),
          description: t("page-find-wallet-hardware-wallet-support-desc"),
          kind: "switch",
        },
        {
          key: "ens_support",
          label: t("page-find-wallet-ens-support"),
          description: t("page-find-wallet-ens-support-desc"),
          kind: "switch",
        },
      ],
    },
    {
      id: "security",
      title: t("page-find-wallet-security"),
      items: [
        {
          key: "open_source",
          label: t("page-find-wallet-open-source"),
          description: t("page-find-wallet-open-source-desc"),
          kind: "switch",
        },
        {
          key: "non_custodial",
          label: t("page-find-wallet-non-custodial"),
          description: t("page-find-wallet-non-custodial-desc"),
          kind: "switch",
        },
      ],
    },
    {
      id: "smart-contract",
      title: t("page-find-wallet-smart-contract"),
      items: [
        {
          key: "multisig",
          label: t("page-find-wallet-multisig"),
          description: t("page-find-wallet-multisig-desc"),
          kind: "switch",
        },
        {
          key: "social_recovery",
          label: t("page-find-wallet-social-recovery"),
          description: t("page-find-wallet-social-recovery-desc"),
          kind: "switch",
        },
        {
          key: "privacy",
          label: t("page-find-wallet-privacy"),
          description: t("page-find-wallet-privacy-desc"),
          kind: "switch",
        },
        {
          key: "eip_4337_support",
          label: t("page-find-wallet-smart-accounts"),
          description: t("page-find-wallet-smart-accounts-desc"),
          kind: "switch",
        },
        {
          key: "eip_7702_support",
          label: t("page-find-wallet-account-upgrades"),
          description: t("page-find-wallet-account-upgrades-desc"),
          kind: "switch",
        },
      ],
    },
    {
      id: "advanced",
      title: t("page-find-wallet-advanced"),
      items: [
        {
          key: "rpc_importing",
          label: t("page-find-wallet-rpc-importing"),
          description: t("page-find-wallet-rpc-importing-desc"),
          kind: "switch",
        },
        {
          key: "erc_20_support",
          label: t("page-find-wallet-token-importing"),
          description: t("page-find-wallet-token-importing-desc"),
          kind: "switch",
        },
        {
          key: "gas_fee_customization",
          label: t("page-find-wallet-gas-fee-customization"),
          description: t("page-find-wallet-gas-fee-customization-desc"),
          kind: "switch",
        },
      ],
    },
  ]

  const featureGroups = DETAIL_GROUP_ORDER.map(
    (id) => groups.find((group) => group.id === id)!
  )

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

  const featureItemsWithDescription = featureGroups
    .flatMap((group) => group.items)
    .filter((item) => item.description)

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
            <div className="hidden lg:block">
              <FilterPanel
                groups={groups}
                languages={languages}
                networks={networks}
                strings={strings}
              />
            </div>
            <div className="flex-1">
              <ResultsBar strings={strings} />
              {/* Rows are pure server HTML: expansion is the native <details>
                  toggle and visibility is synced by WalletListController, so
                  none of this subtree hydrates. */}
              <div data-testid="wallet-list">
                {wallets.map((wallet, index) => (
                  <details
                    key={wallet.id}
                    data-wallet-id={wallet.id}
                    data-index={index}
                    className={cn(
                      "group/collapsible flex w-full flex-col border-b open:bg-background-highlight hover:bg-background-highlight",
                      // Skip style/layout for offscreen rows: initial layout of
                      // all 49 was a ~1s main-thread task on throttled mobile
                      "[contain-intrinsic-size:auto_240px] [content-visibility:auto]",
                      !initialVisibleIds.has(wallet.id) && "hidden"
                    )}
                  >
                    <summary className="cursor-pointer list-none p-4 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-primary-hover [&::-webkit-details-marker]:hidden">
                      <WalletRowSummary wallet={wallet} index={index} />
                    </summary>
                    <div className="p-4">
                      <WalletRowDetails
                        wallet={wallet}
                        featureGroups={featureGroups}
                        locale={locale}
                      />
                    </div>
                  </details>
                ))}
              </div>
              <WalletListController />
            </div>
          </div>
        </div>

        {/* Icons repeated across every wallet's detail panel, defined once
            and referenced via <use> to keep the server-rendered HTML small */}
        <svg className="hidden" aria-hidden="true">
          <defs>
            <symbol id="fw-icon-check" viewBox="0 0 24 24">
              <path
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                fill="#109E62"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.9268 7.32059C18.5782 7.83241 18.6913 8.77539 18.1795 9.4268L12.6795 16.4268C12.4021 16.7799 11.981 16.9901 11.532 16.9997C11.083 17.0093 10.6534 16.8172 10.3611 16.4763L7.36114 12.9763C6.82201 12.3473 6.89485 11.4003 7.52384 10.8612C8.15283 10.322 9.09978 10.3949 9.63891 11.0239L11.4496 13.1364L15.8205 7.57333C16.3324 6.92192 17.2754 6.80877 17.9268 7.32059Z"
                fill="white"
              />
            </symbol>
            <symbol id="fw-icon-warning" viewBox="0 0 24 24">
              <path
                d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
                fill="#B80000"
              />
              <path
                d="M17.0607 9.06066C17.6464 8.47487 17.6464 7.52513 17.0607 6.93934C16.4749 6.35355 15.5251 6.35355 14.9393 6.93934L12 9.87868L9.06066 6.93934C8.47487 6.35355 7.52513 6.35355 6.93934 6.93934C6.35355 7.52513 6.35355 8.47487 6.93934 9.06066L9.87868 12L6.93934 14.9393C6.35355 15.5251 6.35355 16.4749 6.93934 17.0607C7.52513 17.6464 8.47487 17.6464 9.06066 17.0607L12 14.1213L14.9393 17.0607C15.5251 17.6464 16.4749 17.6464 17.0607 17.0607C17.6464 16.4749 17.6464 15.5251 17.0607 14.9393L14.1213 12L17.0607 9.06066Z"
                fill="white"
              />
            </symbol>
            <symbol
              id="fw-icon-info"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </symbol>
          </defs>
        </svg>

        {/* Hidden contents referenced by data-tooltip-ref / aria-describedby */}
        <div hidden>
          {featureItemsWithDescription.map((item) => (
            <div id={featureTooltipId(item.key)} key={item.key}>
              <p className="text-body">{item.description}</p>
            </div>
          ))}
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
