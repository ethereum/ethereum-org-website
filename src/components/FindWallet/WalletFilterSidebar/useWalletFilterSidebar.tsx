// Libraries
import React, { useEffect, useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"

// Data
import walletFilterData from "../../../data/wallets/wallet-filters"

// Icons
import Browser from "../../../assets/wallets/browser.svg"
import BuyCrypto from "../../../assets/wallets/buy_crypto.svg"
import Desktop from "../../../assets/wallets/desktop.svg"
import ENSSupport from "../../../assets/wallets/ens_support.svg"
import ERC20Support from "../../../assets/wallets/erc_20_support.svg"
import GasFeeCustomization from "../../../assets/wallets/gas_fee_customization.svg"
import HardwareSupport from "../../../assets/wallets/hardware_support.svg"
import Hardware from "../../../assets/wallets/hardware.svg"
import Layer2 from "../../../assets/wallets/layer_2.svg"
import Mobile from "../../../assets/wallets/mobile.svg"
import NFTSupport from "../../../assets/wallets/nft_support.svg"
import NonCustodial from "../../../assets/wallets/non_custodial.svg"
import OpenSource from "../../../assets/wallets/open_source.svg"
import RPCImporting from "../../../assets/wallets/rpc_importing.svg"
import Staking from "../../../assets/wallets/staking.svg"
import WalletConnect from "../../../assets/wallets/walletconnect.svg"
import ConnectDapps from "../../../assets/wallets/connect_dapps.svg"
import WithdrawCrypto from "../../../assets/wallets/withdraw_crypto.svg"
import Multisig from "../../../assets/wallets/multisig.svg"
import SocialRecover from "../../../assets/wallets/social_recover.svg"
import Swap from "../../../assets/wallets/swap.svg"
import Eip1559 from "../../../assets/wallets/eip1559.svg"
import { WalletFilterSidebarProps } from "."

export const useWalletFilterSidebar = ({
  resetWalletFilter,
  filters,
  updateFilterOptions,
}: Omit<WalletFilterSidebarProps, "updateFilterOption">) => {
  const { t } = useTranslation()
  const [filterOptions, setFilterOptions] = useState([
    {
      title: t("page-find-wallet-device"),
      items: [
        {
          title: t(walletFilterData.mobile.title),
          icon: <Mobile />,
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
          icon: <Desktop />,
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
          icon: <Browser />,
          description: t(walletFilterData.browser.description),
          filterKey: walletFilterData.browser.filterKey,
          showOptions: filters.firefox || filters.chrome ? true : false,
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
          icon: <Hardware />,
          description: t(walletFilterData.hardware.description),
          filterKey: walletFilterData.hardware.filterKey,
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
          icon: <OpenSource />,
          description: t(walletFilterData.open_source.description),
          filterKey: walletFilterData.open_source.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.non_custodial.title),
          icon: <NonCustodial />,
          description: t(walletFilterData.non_custodial.description),
          filterKey: walletFilterData.non_custodial.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: t("page-find-wallet-features"),
      items: [
        {
          title: t(walletFilterData.hardware_support.title),
          icon: <HardwareSupport />,
          description: t(walletFilterData.hardware_support.description),
          filterKey: walletFilterData.hardware_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.walletconnect.title),
          icon: <WalletConnect />,
          description: t(walletFilterData.walletconnect.description),
          filterKey: walletFilterData.walletconnect.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.rpc_importing.title),
          icon: <RPCImporting />,
          description: t(walletFilterData.rpc_importing.description),
          filterKey: walletFilterData.rpc_importing.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.nft_support.title),
          icon: <NFTSupport />,
          description: t(walletFilterData.nft_support.description),
          filterKey: walletFilterData.nft_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.connect_to_dapps.title),
          icon: <ConnectDapps />,
          description: t(walletFilterData.connect_to_dapps.description),
          filterKey: walletFilterData.connect_to_dapps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.staking.title),
          icon: <Staking />,
          description: t(walletFilterData.staking.description),
          filterKey: walletFilterData.staking.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.swaps.title),
          icon: <Swap />,
          description: t(walletFilterData.swaps.description),
          filterKey: walletFilterData.swaps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.layer_2.title),
          icon: <Layer2 />,
          description: t(walletFilterData.layer_2.description),
          filterKey: walletFilterData.layer_2.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.gas_fee_customization.title),
          icon: <GasFeeCustomization />,
          description: t(walletFilterData.gas_fee_customization.description),
          filterKey: walletFilterData.gas_fee_customization.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.ens_support.title),
          icon: <ENSSupport />,
          description: t(walletFilterData.ens_support.description),
          filterKey: walletFilterData.ens_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.erc_20_support.title),
          icon: <ERC20Support />,
          description: t(walletFilterData.erc_20_support.description),
          filterKey: walletFilterData.erc_20_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.eip_1559_support.title),
          icon: <Eip1559 />,
          description: t(walletFilterData.eip_1559_support.description),
          filterKey: walletFilterData.eip_1559_support.filterKey,
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
          icon: <BuyCrypto />,
          description: t(walletFilterData.buy_crypto.description),
          filterKey: walletFilterData.buy_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.withdraw_crypto.title),
          icon: <WithdrawCrypto />,
          description: t(walletFilterData.withdraw_crypto.description),
          filterKey: walletFilterData.withdraw_crypto.filterKey,
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
          icon: <Multisig />,
          description: t(walletFilterData.multisig.description),
          filterKey: walletFilterData.multisig.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: t(walletFilterData.social_recovery.title),
          icon: <SocialRecover />,
          description: t(walletFilterData.social_recovery.description),
          filterKey: walletFilterData.social_recovery.filterKey,
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

  const resetFilters = () => {
    for (let filterItem of filterOptions) {
      for (let item of filterItem.items) {
        if (item.options.length > 0) {
          item.showOptions = false
        } else {
          item.showOptions = undefined
        }
      }
    }
  }

  useEffect(() => {
    resetWalletFilter.current = resetFilters
  }, [])

  return {
    setShowOptions,
    filterOptions,
  }
}
