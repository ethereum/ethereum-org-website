import type { WalletData } from "@/lib/types"

export type WalletFeatureKey = keyof WalletData

export type WalletFeature = {
  key: WalletFeatureKey
  labelKey: string
  descKey: string
}

export type WalletFeatureGroup = {
  titleKey: string
  features: WalletFeature[]
}

/**
 * Ethereum's CROPS properties (https://ethereum.org/foundation/mandate/),
 * highlighted on the wallet modal. Censorship-resistance and security have no
 * dedicated flag, so each uses the closest proxy: custom-RPC support and
 * non-custodial keys.
 */
export const CROPS_PROPERTIES: WalletFeature[] = [
  {
    key: "rpc_importing",
    labelKey: "page-find-wallet-crops-censorship-resistant",
    descKey: "page-find-wallet-crops-censorship-resistant-desc",
  },
  {
    key: "open_source",
    labelKey: "page-find-wallet-open-source",
    descKey: "page-find-wallet-open-source-desc",
  },
  {
    key: "privacy",
    labelKey: "page-find-wallet-crops-private",
    descKey: "page-find-wallet-privacy-desc",
  },
  {
    key: "non_custodial",
    labelKey: "page-find-wallet-crops-secure",
    descKey: "page-find-wallet-non-custodial-desc",
  },
]

export const WALLET_FEATURE_GROUPS: WalletFeatureGroup[] = [
  {
    titleKey: "page-find-wallet-features",
    features: [
      {
        key: "connect_to_dapps",
        labelKey: "page-find-wallet-connect-to-dapps",
        descKey: "page-find-wallet-connect-to-dapps-desc",
      },
      {
        key: "nft_support",
        labelKey: "page-find-wallet-nft-support",
        descKey: "page-find-wallet-nft-support-desc",
      },
      {
        key: "staking",
        labelKey: "page-find-wallet-staking",
        descKey: "page-find-wallet-staking-desc",
      },
      {
        key: "layer_2",
        labelKey: "page-find-wallet-layer-2",
        descKey: "page-find-wallet-layer-2-desc",
      },
      {
        key: "swaps",
        labelKey: "page-find-wallet-swaps",
        descKey: "page-find-wallet-swaps-desc",
      },
      {
        key: "hardware_support",
        labelKey: "page-find-wallet-hardware-wallet-support",
        descKey: "page-find-wallet-hardware-wallet-support-desc",
      },
      {
        key: "ens_support",
        labelKey: "page-find-wallet-ens-support",
        descKey: "page-find-wallet-ens-support-desc",
      },
    ],
  },
  {
    titleKey: "page-find-wallet-security",
    features: [
      {
        key: "open_source",
        labelKey: "page-find-wallet-open-source",
        descKey: "page-find-wallet-open-source-desc",
      },
      {
        key: "non_custodial",
        labelKey: "page-find-wallet-non-custodial",
        descKey: "page-find-wallet-non-custodial-desc",
      },
    ],
  },
  {
    titleKey: "page-find-wallet-buy-sell-crypto",
    features: [
      {
        key: "buy_crypto",
        labelKey: "page-find-wallet-buy-crypto",
        descKey: "page-find-wallet-buy-crypto-desc",
      },
      {
        key: "withdraw_crypto",
        labelKey: "page-find-wallet-sell-for-fiat",
        descKey: "page-find-wallet-sell-for-fiat-desc",
      },
    ],
  },
  {
    titleKey: "page-find-wallet-smart-contract",
    features: [
      {
        key: "multisig",
        labelKey: "page-find-wallet-multisig",
        descKey: "page-find-wallet-multisig-desc",
      },
      {
        key: "social_recovery",
        labelKey: "page-find-wallet-social-recovery",
        descKey: "page-find-wallet-social-recovery-desc",
      },
      {
        key: "privacy",
        labelKey: "page-find-wallet-privacy",
        descKey: "page-find-wallet-privacy-desc",
      },
      {
        key: "eip_4337_support",
        labelKey: "page-find-wallet-smart-accounts",
        descKey: "page-find-wallet-smart-accounts-desc",
      },
      {
        key: "eip_7702_support",
        labelKey: "page-find-wallet-account-upgrades",
        descKey: "page-find-wallet-account-upgrades-desc",
      },
    ],
  },
  {
    titleKey: "page-find-wallet-advanced",
    features: [
      {
        key: "rpc_importing",
        labelKey: "page-find-wallet-rpc-importing",
        descKey: "page-find-wallet-rpc-importing-desc",
      },
      {
        key: "erc_20_support",
        labelKey: "page-find-wallet-token-importing",
        descKey: "page-find-wallet-token-importing-desc",
      },
      {
        key: "gas_fee_customization",
        labelKey: "page-find-wallet-gas-fee-customization",
        descKey: "page-find-wallet-gas-fee-customization-desc",
      },
    ],
  },
]

/**
 * The sidebar's "Advanced filters" set: every detail-page feature except the
 * buy/sell pair, which already has its own sidebar group.
 */
export const WALLET_ADVANCED_FILTERS: WalletFeature[] =
  WALLET_FEATURE_GROUPS.filter(
    (group) => group.titleKey !== "page-find-wallet-buy-sell-crypto"
  ).flatMap((group) => group.features)

export function getWalletAdvancedFlags(wallet: WalletData): WalletFeatureKey[] {
  return WALLET_ADVANCED_FILTERS.filter(({ key }) => wallet[key]).map(
    ({ key }) => key
  )
}
