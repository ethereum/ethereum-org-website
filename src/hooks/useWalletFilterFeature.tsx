// Libraries
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

import { FilterOption } from "@/lib/types"

import { WalletFilterFeatureProps } from "@/components/FindWallet/WalletFilterFeature"

// Data
import walletFilterData from "@/data/wallets/wallet-filters"

import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  ENSSupportIcon,
  ERC20SupportIcon,
  GasFeeCustomizationIcon,
  HardwareIcon,
  HardwareSupportIcon,
  Layer2Icon,
  MobileIcon,
  MultisigIcon,
  NFTSupportIcon,
  NonCustodialIcon,
  OpenSourceWalletIcon,
  RPCImportingIcon,
  SocialRecoverIcon,
  StakingIcon,
  SwapIcon,
  WithdrawCryptoIcon,
} from "../components/icons/wallets"

type UseWalletFilterFeatureProps = Omit<
  WalletFilterFeatureProps,
  "updateFilterOption"
>

export const useWalletFilterFeature = ({
  resetWalletFilter,
  filters,
  updateFilterOptions,
}: UseWalletFilterFeatureProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([
    {
      title: t("page-find-wallet-device"),
      items: [
        {
          title: t(walletFilterData.mobile.title),
          icon: MobileIcon,
          description: t(walletFilterData.mobile.description),
          filterKey: walletFilterData.mobile.filterKey,
          showOptions: filters.android || filters.ios ? true : false,
          options: [
            {
              name: t(walletFilterData.android.title),
              filterKey: walletFilterData.android.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(walletFilterData.ios.title),
              filterKey: walletFilterData.ios.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: t(walletFilterData.desktop.title),
          icon: DesktopIcon,
          description: t(walletFilterData.desktop.description),
          filterKey: walletFilterData.desktop.filterKey,
          showOptions:
            filters.linux || filters.windows || filters.macOS ? true : false,
          options: [
            {
              name: t(walletFilterData.linux.title),
              filterKey: walletFilterData.linux.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(walletFilterData.windows.title),
              filterKey: walletFilterData.windows.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(walletFilterData.macos.title),
              filterKey: walletFilterData.macos.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: t(walletFilterData.browser.title),
          icon: BrowserIcon,
          description: t(walletFilterData.browser.description),
          filterKey: walletFilterData.browser.filterKey,
          showOptions: filters.firefox || filters.chromium ? true : false,
          options: [
            {
              name: t(walletFilterData.firefox.title),
              filterKey: walletFilterData.firefox.filterKey,
              inputType: "checkbox",
            },
            {
              name: t(walletFilterData.chromium.title),
              filterKey: walletFilterData.chromium.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: t(walletFilterData.hardware.title),
          icon: HardwareIcon,
          description: t(walletFilterData.hardware.description),
          filterKey: walletFilterData.hardware.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: `${t("page-find-wallet-buy-crypto")} / ${t(
        "page-find-wallet-sell-for-fiat"
      )}`,
      items: [
        {
          title: t(walletFilterData.buy_crypto.title),
          icon: BuyCryptoIcon,
          description: t(walletFilterData.buy_crypto.description),
          filterKey: walletFilterData.buy_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.withdraw_crypto.title),
          icon: WithdrawCryptoIcon,
          description: t(walletFilterData.withdraw_crypto.description),
          filterKey: walletFilterData.withdraw_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-wallet-features"),
      items: [
        {
          title: t(walletFilterData.connect_to_dapps.title),
          icon: ConnectDappsIcon,
          description: t(walletFilterData.connect_to_dapps.description),
          filterKey: walletFilterData.connect_to_dapps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.nft_support.title),
          icon: NFTSupportIcon,
          description: t(walletFilterData.nft_support.description),
          filterKey: walletFilterData.nft_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.staking.title),
          icon: StakingIcon,
          description: t(walletFilterData.staking.description),
          filterKey: walletFilterData.staking.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.layer_2.title),
          icon: Layer2Icon,
          description: t(walletFilterData.layer_2.description),
          filterKey: walletFilterData.layer_2.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.swaps.title),
          icon: SwapIcon,
          description: t(walletFilterData.swaps.description),
          filterKey: walletFilterData.swaps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.hardware_support.title),
          icon: HardwareSupportIcon,
          description: t(walletFilterData.hardware_support.description),
          filterKey: walletFilterData.hardware_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.ens_support.title),
          icon: ENSSupportIcon,
          description: t(walletFilterData.ens_support.description),
          filterKey: walletFilterData.ens_support.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-wallet-security"),
      items: [
        {
          title: t(walletFilterData.open_source.title),
          icon: OpenSourceWalletIcon,
          description: t(walletFilterData.open_source.description),
          filterKey: walletFilterData.open_source.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.non_custodial.title),
          icon: NonCustodialIcon,
          description: t(walletFilterData.non_custodial.description),
          filterKey: walletFilterData.non_custodial.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-wallet-smart-contract"),
      items: [
        {
          title: t(walletFilterData.multisig.title),
          icon: MultisigIcon,
          description: t(walletFilterData.multisig.description),
          filterKey: walletFilterData.multisig.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.social_recovery.title),
          icon: SocialRecoverIcon,
          description: t(walletFilterData.social_recovery.description),
          filterKey: walletFilterData.social_recovery.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-wallet-advanced"),
      items: [
        {
          title: t(walletFilterData.rpc_importing.title),
          icon: RPCImportingIcon,
          description: t(walletFilterData.rpc_importing.description),
          filterKey: walletFilterData.rpc_importing.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.erc_20_support.title),
          icon: ERC20SupportIcon,
          description: t(walletFilterData.erc_20_support.description),
          filterKey: walletFilterData.erc_20_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.gas_fee_customization.title),
          icon: GasFeeCustomizationIcon,
          description: t(walletFilterData.gas_fee_customization.description),
          filterKey: walletFilterData.gas_fee_customization.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
  ])

  const setShowOptions = (idx, itemidx, value) => {
    const updatedFilterOptions = [...filterOptions]
    updatedFilterOptions[idx].items[itemidx].showOptions =
      !updatedFilterOptions[idx].items[itemidx].showOptions
    setFilterOptions(updatedFilterOptions)

    const keys = updatedFilterOptions[idx].items[itemidx].options.map(
      (item) => item.filterKey
    )
    updateFilterOptions(keys, value)
  }

  useEffect(() => {
    const resetFilters = () => {
      for (const filterItem of filterOptions) {
        for (const item of filterItem.items) {
          if (item.options.length > 0) {
            item.showOptions = false
          } else {
            item.showOptions = undefined
          }
        }
      }
    }
    resetWalletFilter.current = resetFilters
  }, [filterOptions, resetWalletFilter])

  return {
    setShowOptions,
    filterOptions,
  }
}
