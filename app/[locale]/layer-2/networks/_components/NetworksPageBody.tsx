import { getTranslations } from "next-intl/server"

import type { CatalogNetwork } from "@/lib/types"

import type { CatalogSelectOption } from "@/components/FilterableCatalog/types"

import { MATURITY_LEVELS, type NetworkCardData } from "@/lib/utils/networkData"
import { getWalletSlug } from "@/lib/utils/walletData"

import walletsData from "@/data/wallets/wallet-data"

import NetworksCatalog, { type NetworksCatalogLabels } from "./NetworksCatalog"

type NetworksPageBodyProps = {
  locale: string
  networks: CatalogNetwork[]
  /** Card payloads, index-aligned with `networks` */
  cards: NetworkCardData[]
  mainnetCard: NetworkCardData
}

const NetworksPageBody = async ({
  locale,
  networks,
  cards,
  mainnetCard,
}: NetworksPageBodyProps) => {
  const t = await getTranslations({
    locale,
    namespace: "page-layer-2-networks",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const maturity = Object.fromEntries(
    MATURITY_LEVELS.map((level) => [
      level,
      t(`page-layer-2-networks-${level}-label`),
    ])
  )

  const labels: NetworksCatalogLabels = {
    catalog: {
      searchPlaceholder: t("page-layer-2-networks-search-networks"),
      resultsLabel: t("page-layer-2-networks-networks-showing"),
      filtersToggle: t("page-layer-2-networks-filters"),
      applyLabel: t("page-layer-2-networks-transaction-see-networks"),
      closeLabel: tCommon("close"),
    },
    header: {
      filters: t("page-layer-2-networks-filters"),
      reset: t("page-layer-2-networks-reset-filters"),
    },
    filter: {
      walletSupport: t("page-layer-2-networks-wallet-support"),
      selectWallet: t("page-layer-2-networks-select-wallet"),
      searchWallets: t("page-layer-2-networks-search-wallets"),
      noWalletFound: t("page-layer-2-networks-no-wallet-found"),
      maturity: t("page-layer-2-networks-network-maturity"),
    },
    modal: {
      close: tCommon("close"),
      maturity: t("page-layer-2-networks-network-maturity"),
      age: t("page-layer-2-networks-age"),
      walletSupport: t("page-layer-2-networks-wallet-support"),
      marketShare: t("page-layer-2-networks-market-share"),
      marketShareTooltip: t("page-layer-2-networks-market-share-description"),
      activeAddresses: t("page-layer-2-networks-active-address"),
      activeAddressesTooltip: t("page-layer-2-networks-active-address-number"),
      feeToken: t("page-layer-2-networks-fee-token"),
      feeTokenTooltip: t("page-layer-2-networks-token-used-to-pay"),
      txFee: t("page-layer-2-networks-avg-transaction-fee"),
      txFeeTooltip: t("page-layer-2-networks-transaction-fee-description"),
      bridgeTo: t("page-layer-2-networks-bridge-to"),
      viewApps: t("page-layer-2-networks-view-apps"),
    },
    maturity,
    mainNetwork: t("page-layer-2-networks-main-network"),
    walletsCount: t.raw("page-layer-2-networks-wallets-count"),
  }

  // Wallets that support no listed network would only lead to an empty result.
  const walletOptions: CatalogSelectOption[] = walletsData
    .map((wallet) => {
      const slug = getWalletSlug(wallet)
      return {
        id: slug,
        label: wallet.name,
        count: networks.filter((network) => network.walletSlugs.includes(slug))
          .length,
      }
    })
    .filter((option) => option.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label, locale))

  const maturityOptions: CatalogSelectOption[] = MATURITY_LEVELS.map(
    (level) => ({
      id: level,
      label: maturity[level],
      description: t(`page-layer-2-networks-${level}-description`),
      count: networks.filter((network) => network.networkMaturity === level)
        .length,
    })
  )

  return (
    <NetworksCatalog
      locale={locale}
      mainnet={mainnetCard}
      networks={cards}
      walletOptions={walletOptions}
      maturityOptions={maturityOptions}
      labels={labels}
    />
  )
}

export default NetworksPageBody
