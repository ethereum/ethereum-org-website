import { useTranslation } from "next-i18next"

// Types
// TODO move to types
interface Personas {
  title: string
  description: string
  presetFilters: {
    android: boolean
    ios: boolean
    linux: boolean
    windows: boolean
    macOS: boolean
    firefox: boolean
    chromium: boolean
    hardware: boolean
    open_source: boolean
    non_custodial: boolean
    hardware_support: boolean
    rpc_importing: boolean
    nft_support: boolean
    connect_to_dapps: boolean
    staking: boolean
    swaps: boolean
    layer_2: boolean
    gas_fee_customization: boolean
    ens_support: boolean
    erc_20_support: boolean
    buy_crypto: boolean
    withdraw_crypto: boolean
    multisig: boolean
    social_recovery: boolean
  }
}

export const useWalletPersonas = () => {
  const { t } = useTranslation("page-wallets-find-wallet")

  const filterLabels = {
    hardware: {
      label: t("page-find-wallet-hardware"),
    },
    open_source: {
      label: t("page-find-wallet-open-source"),
    },
    non_custodial: {
      label: t("page-find-wallet-non-custodial"),
    },
    hardware_support: {
      label: t("page-find-wallet-hardware-wallet-support"),
    },
    rpc_importing: {
      label: t("page-find-wallet-rpc-importing"),
    },
    nft_support: {
      label: t("page-find-wallet-nft-support"),
    },
    connect_to_dapps: {
      label: t("page-find-wallet-connect-to-dapps"),
    },
    staking: {
      label: t("page-find-wallet-staking"),
    },
    swaps: {
      label: t("page-find-wallet-swaps"),
    },
    layer_2: {
      label: t("page-find-wallet-layer-2"),
    },
    gas_fee_customization: {
      label: t("page-find-wallet-gas-fee-customization"),
    },
    ens_support: {
      label: t("page-find-wallet-ens-support"),
    },
    buy_crypto: {
      label: t("page-find-wallet-buy-crypto"),
    },
    withdraw_crypto: {
      label: t("page-find-wallet-sell-for-fiat"),
    },
    multisig: {
      label: t("page-find-wallet-multisig"),
    },
    social_recovery: {
      label: t("page-find-wallet-social-recovery"),
    },
    erc_20_support: {
      label: t("page-find-wallet-token-support"),
    },
  }
  const personas: Personas[] = [
    {
      title: t("page-find-wallet-new-to-crypto-title"),
      description: t("page-find-wallet-new-to-crypto-desc"),
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: false,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: false,
        ens_support: true,
        erc_20_support: true,
        buy_crypto: true,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: t("page-find-wallet-nfts-title"),
      description: t("page-find-wallet-nfts-desc"),
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: false,
        rpc_importing: false,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: false,
        ens_support: false,
        erc_20_support: false,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: t("page-find-wallet-hodler-title"),
      description: t("page-find-wallet-hodler-desc"),
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: true,
        open_source: false,
        non_custodial: true,
        hardware_support: false,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: false,
        staking: false,
        swaps: false,
        layer_2: false,
        gas_fee_customization: false,
        ens_support: false,
        erc_20_support: false,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: t("page-find-wallet-finance-title"),
      description: t("page-find-wallet-finance-desc"),
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: true,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: false,
        gas_fee_customization: true,
        ens_support: false,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: t("page-find-wallet-developer-title"),
      description: t("page-find-wallet-developer-desc"),
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: false,
        rpc_importing: true,
        nft_support: false,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: false,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
  ]

  return personas
}
