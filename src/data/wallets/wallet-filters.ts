import type { WalletFilterData } from "@/lib/types"

const walletFilterData: { [key: string]: WalletFilterData } = {
  mobile: {
    title: "page-find-wallet-mobile",
    description: "",
    filterKey: undefined,
  },
  android: {
    title: "page-find-wallet-android",
    description: "",
    filterKey: "android",
  },
  ios: {
    title: "page-find-wallet-iOS",
    description: "",
    filterKey: "ios",
  },
  desktop: {
    title: "page-find-wallet-desktop",
    description: "",
    filterKey: undefined,
  },
  linux: {
    title: "page-find-wallet-linux",
    description: "",
    filterKey: "linux",
  },
  windows: {
    title: "page-find-wallet-windows",
    description: "",
    filterKey: "windows",
  },
  macos: {
    title: "page-find-wallet-macOS",
    description: "",
    filterKey: "macOS",
  },
  browser: {
    title: "page-find-wallet-browser",
    description: "",
    filterKey: undefined,
  },
  firefox: {
    title: "page-find-wallet-firefox",
    description: "",
    filterKey: "firefox",
  },
  chromium: {
    title: "page-find-wallet-chromium",
    description: "",
    filterKey: "chromium",
  },
  hardware: {
    title: "page-find-wallet-hardware",
    description: "",
    filterKey: "hardware",
  },
  open_source: {
    title: "page-find-wallet-open-source",
    description: "page-find-wallet-open-source-desc",
    filterKey: "open_source",
  },
  non_custodial: {
    title: "page-find-wallet-non-custodial",
    description: "page-find-wallet-non-custodial-desc",
    filterKey: "non_custodial",
  },
  hardware_support: {
    title: "page-find-wallet-hardware-wallet-support",
    description: "page-find-wallet-hardware-wallet-support-desc",
    filterKey: "hardware_support",
  },
  rpc_importing: {
    title: "page-find-wallet-rpc-importing",
    description: "page-find-wallet-rpc-importing-desc",
    filterKey: "rpc_importing",
  },
  nft_support: {
    title: "page-find-wallet-nft-support",
    description: "page-find-wallet-nft-support-desc",
    filterKey: "nft_support",
  },
  connect_to_dapps: {
    title: "page-find-wallet-connect-to-dapps",
    description: "page-find-wallet-connect-to-dapps-desc",
    filterKey: "connect_to_dapps",
  },
  staking: {
    title: "page-find-wallet-staking",
    description: "page-find-wallet-staking-desc",
    filterKey: "staking",
  },
  swaps: {
    title: "page-find-wallet-swaps",
    description: "page-find-wallet-swaps-desc",
    filterKey: "swaps",
  },
  layer_2: {
    title: "page-find-wallet-layer-2",
    description: "page-find-wallet-layer-2-desc",
    filterKey: "layer_2",
  },
  gas_fee_customization: {
    title: "page-find-wallet-gas-fee-customization",
    description: "page-find-wallet-gas-fee-customization-desc",
    filterKey: "gas_fee_customization",
  },
  ens_support: {
    title: "page-find-wallet-ens-support",
    description: "page-find-wallet-ens-support-desc",
    filterKey: "ens_support",
  },
  erc_20_support: {
    title: "page-find-wallet-token-importing",
    description: "page-find-wallet-token-importing-desc",
    filterKey: "erc_20_support",
  },
  buy_crypto: {
    title: "page-find-wallet-buy-crypto",
    description: "page-find-wallet-buy-crypto-desc",
    filterKey: "buy_crypto",
  },
  withdraw_crypto: {
    title: "page-find-wallet-sell-for-fiat",
    description: "page-find-wallet-sell-for-fiat-desc",
    filterKey: "withdraw_crypto",
  },
  multisig: {
    title: "page-find-wallet-multisig",
    description: "page-find-wallet-multisig-desc",
    filterKey: "multisig",
  },
  social_recovery: {
    title: "page-find-wallet-social-recovery",
    description: "page-find-wallet-social-recovery-desc",
    filterKey: "social_recovery",
  },
}

export default walletFilterData
