import { getTranslations } from "next-intl/server"

import ListingMethodology from "@/components/ListingMethodology"
import { UnorderedList } from "@/components/ui/list"

import {
  type CatalogWallet,
  toCatalogCard,
  type WalletLanguageOption,
  type WalletNetwork,
} from "@/lib/utils/walletData"

import { buildDeviceLabels } from "@/data/wallets/devices"
import {
  CROPS_PROPERTIES,
  WALLET_ADVANCED_FILTERS,
} from "@/data/wallets/features"
import {
  buildPersonaLabels,
  WALLET_PERSONAS,
  type WalletPersonaId,
} from "@/data/wallets/personas"

import WalletsCatalog, { type WalletCatalogLabels } from "./WalletsCatalog"

const METHODOLOGY_CRITERIA = [
  "security",
  "track-record",
  "maintenance",
  "honest-info",
  "contact",
  "eip1559",
  "ux",
  "ethereum-focused",
]

type WalletsPageBodyProps = {
  locale: string
  wallets: CatalogWallet[]
  networks: WalletNetwork[]
  languages: WalletLanguageOption[]
  lastUpdatedDisplay: string
  initialPersonaId?: WalletPersonaId
}

/** Shared by the index and persona pages; the persona only seeds the filter. */
const WalletsPageBody = async ({
  locale,
  wallets,
  networks,
  languages,
  lastUpdatedDisplay,
  initialPersonaId,
}: WalletsPageBodyProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const catalogLabels: WalletCatalogLabels = {
    catalog: {
      searchPlaceholder: t("page-find-wallet-search-wallets"),
      resultsLabel: t("page-find-wallet-results-label"),
      noResults: t("page-find-wallet-empty-results-title"),
      noResultsDesc: t("page-find-wallet-empty-results-desc"),
      resetLabel: t("page-find-wallet-reset-filters"),
      filtersToggle: t("page-find-wallet-filters"),
      applyLabel: t("page-find-wallet-show-results"),
      closeLabel: tCommon("close"),
    },
    filter: {
      device: t("page-find-wallet-device"),
      buySell: t("page-find-wallet-buy-sell-crypto"),
      network: t("page-find-wallet-network-support"),
      language: t("page-find-wallet-languages-supported"),
      advanced: t("page-find-wallet-advanced-filters"),
    },
    header: {
      filters: t("page-find-wallet-filters"),
      reset: t("page-find-wallet-reset-filters"),
    },
    personaCards: {
      legend: t("page-find-wallet-persona-legend"),
      countAvailable: t.raw("page-find-wallet-persona-count-available"),
    },
    modal: {
      close: tCommon("close"),
      yes: tCommon("yes"),
      no: tCommon("no"),
      networkSupport: t("page-find-wallet-network-support"),
      device: t("page-find-wallet-device"),
      languages: t("page-find-wallet-languages-supported"),
      fees: t("page-find-wallet-fee-row-label"),
      feesTooltip: t("page-find-wallet-fee-row-tooltip"),
      fullDetails: t("page-find-wallet-full-details"),
      getWallet: t.raw("page-find-wallet-get-wallet"),
      crops: CROPS_PROPERTIES.map(({ key, labelKey, descKey }) => ({
        key,
        label: t(labelKey),
        tooltip: t(descKey),
      })),
    },
    tableTitle: t("page-find-wallet-table-title"),
    buyCrypto: t("page-find-wallet-buy-crypto"),
    sellCrypto: t("page-find-wallet-sell-for-fiat"),
    devices: buildDeviceLabels(t),
    personas: buildPersonaLabels(t),
  }

  const advancedFilters = WALLET_ADVANCED_FILTERS.map(({ key, labelKey }) => ({
    id: key,
    label: t(labelKey),
    count: wallets.filter((wallet) => wallet.advancedFlags.includes(key))
      .length,
  }))

  const personas = WALLET_PERSONAS.map((persona) => ({
    id: persona.id,
    title: t(persona.titleKey),
    description: t(persona.descKey),
  }))

  return (
    <>
      <WalletsCatalog
        locale={locale}
        // Slim projection: only what the island reads crosses to the client.
        wallets={wallets.map((wallet) => toCatalogCard(wallet, { t, locale }))}
        networks={networks}
        languages={languages}
        advancedFilters={advancedFilters}
        personas={personas}
        initialPersonaId={initialPersonaId}
        labels={catalogLabels}
      />

      <ListingMethodology
        heading={t("page-find-wallet-methodology-title")}
        description={t("page-find-wallet-methodology-intro")}
        lastUpdated={lastUpdatedDisplay}
        href="/contributing/adding-wallets/"
        footers={[
          t("page-find-wallet-footnote-1"),
          t("page-find-wallet-footnote-2"),
        ]}
      >
        <p>{t("page-find-wallet-methodology-must-haves-label")}</p>
        <UnorderedList className="space-y-2">
          {METHODOLOGY_CRITERIA.map((key) => (
            <li key={key}>
              {t(`page-find-wallet-methodology-criterion-${key}`)}
            </li>
          ))}
        </UnorderedList>
        <p>{t("page-find-wallet-methodology-verification")}</p>
        <p>{t("page-find-wallet-methodology-filters")}</p>
      </ListingMethodology>
    </>
  )
}

export default WalletsPageBody
