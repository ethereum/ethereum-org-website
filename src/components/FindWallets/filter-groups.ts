import { getTranslations } from "next-intl/server"

import type { WalletFilterGroupConfig } from "./types"

// Order of the feature groups shown inside a wallet's detail matrix.
export const DETAIL_GROUP_ORDER = [
  "features",
  "security",
  "buy-sell",
  "smart-contract",
  "advanced",
]

// Builds the full filter-group config (labels resolved server-side). Shared by
// the list page (filter panels + tooltip descriptions) and the wallet detail
// route (feature matrix), so both stay in sync from one source.
export const buildWalletFilterGroups = async (
  locale: string
): Promise<{
  groups: WalletFilterGroupConfig[]
  featureGroups: WalletFilterGroupConfig[]
}> => {
  const t = await getTranslations({
    locale,
    namespace: "page-wallets-find-wallet",
  })
  const tTable = await getTranslations({ locale, namespace: "table" })

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

  return { groups, featureGroups }
}
