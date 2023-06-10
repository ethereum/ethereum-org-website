// Libraries
import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

// Icons
import {
  BuyCryptoIcon,
  ConnectDappsIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  GasFeeCustomizationIcon,
  HardwareIcon,
  HardwareSupportIcon,
  Layer2Icon,
  MultisigIcon,
  NFTSupportIcon,
  NonCustodialIcon,
  OpenSourceWalletIcon,
  RPCImportingIcon,
  SocialRecoverIcon,
  StakingIcon,
  SwapIcon,
  WalletConnectIcon,
  WithdrawCryptoIcon,
} from "../../../icons/wallets"

// Types
interface Personas {
  title: string
  description: string
  featureHighlight: { label: string; icon: JSX.Element }[]
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
    walletconnect: boolean
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
    eip_1559_support: boolean
  }
}

export const useWalletFilterProfile = () => {
  const { t } = useTranslation()

  const filterLabels = {
    hardware: {
      label: t("page-find-wallet-hardware"),
      icon: <HardwareIcon />,
    },
    open_source: {
      label: t("page-find-wallet-open-source"),
      icon: <OpenSourceWalletIcon />,
    },
    non_custodial: {
      label: t("page-find-wallet-non-custodial"),
      icon: <NonCustodialIcon />,
    },
    hardware_support: {
      label: t("page-find-wallet-hardware-wallet-support"),
      icon: <HardwareSupportIcon />,
    },
    walletconnect: {
      label: t("page-find-wallet-walletconnect"),
      icon: <WalletConnectIcon />,
    },
    rpc_importing: {
      label: t("page-find-wallet-rpc-importing"),
      icon: <RPCImportingIcon />,
    },
    nft_support: {
      label: t("page-find-wallet-nft-support"),
      icon: <NFTSupportIcon />,
    },
    connect_to_dapps: {
      label: t("page-find-wallet-connect-to-dapps"),
      icon: <ConnectDappsIcon />,
    },
    staking: {
      label: t("page-find-wallet-staking"),
      icon: <StakingIcon />,
    },
    swaps: {
      label: t("page-find-wallet-swaps"),
      icon: <SwapIcon />,
    },
    layer_2: {
      label: t("page-find-wallet-layer-2"),
      icon: <Layer2Icon />,
    },
    gas_fee_customization: {
      label: t("page-find-wallet-gas-fee-customization"),
      icon: <GasFeeCustomizationIcon />,
    },
    ens_support: {
      label: t("page-find-wallet-ens-support"),
      icon: <ENSSupportIcon />,
    },
    buy_crypto: {
      label: t("page-find-wallet-buy-crypto"),
      icon: <BuyCryptoIcon />,
    },
    withdraw_crypto: {
      label: t("page-find-wallet-sell-for-fiat"),
      icon: <WithdrawCryptoIcon />,
    },
    multisig: {
      label: t("page-find-wallet-multisig"),
      icon: <MultisigIcon />,
    },
    social_recovery: {
      label: t("page-find-wallet-social-recovery"),
      icon: <SocialRecoverIcon />,
    },
    erc_20_support: {
      label: t("page-find-wallet-token-support"),
      icon: <ERC20SupportIcon />,
    },
    eip_1559_support: {
      label: t("page-find-wallet-fee-optimization"),
      icon: <EIP1559Icon />,
    },
  }
  const personas: Personas[] = [
    {
      title: t("page-find-wallet-new-to-crypto-title"),
      description: t("page-find-wallet-new-to-crypto-desc"),
      featureHighlight: [
        filterLabels.connect_to_dapps,
        filterLabels.layer_2,
        filterLabels.ens_support,
        filterLabels.erc_20_support,
        filterLabels.buy_crypto,
        filterLabels.eip_1559_support,
      ],
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
        walletconnect: false,
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
        eip_1559_support: true,
      },
    },
    {
      title: t("page-find-wallet-nfts-title"),
      description: t("page-find-wallet-nfts-desc"),
      featureHighlight: [
        filterLabels.nft_support,
        filterLabels.layer_2,
        filterLabels.connect_to_dapps,
      ],
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
        walletconnect: false,
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
        eip_1559_support: false,
      },
    },
    {
      title: t("page-find-wallet-hodler-title"),
      description: t("page-find-wallet-hodler-desc"),
      featureHighlight: [filterLabels.hardware, filterLabels.non_custodial],
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
        walletconnect: false,
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
        eip_1559_support: false,
      },
    },
    {
      title: t("page-find-wallet-finance-title"),
      description: t("page-find-wallet-finance-desc"),
      featureHighlight: [
        filterLabels.hardware_support,
        filterLabels.connect_to_dapps,
        filterLabels.gas_fee_customization,
        filterLabels.erc_20_support,
        filterLabels.eip_1559_support,
      ],
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
        walletconnect: false,
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
        eip_1559_support: true,
      },
    },
    {
      title: t("page-find-wallet-developer-title"),
      description: t("page-find-wallet-developer-desc"),
      featureHighlight: [
        filterLabels.open_source,
        filterLabels.walletconnect,
        filterLabels.rpc_importing,
        filterLabels.connect_to_dapps,
        filterLabels.gas_fee_customization,
        filterLabels.erc_20_support,
      ],
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
        walletconnect: true,
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
        eip_1559_support: false,
      },
    },
  ]

  return {
    personas,
  }
}
