// Libraries
import React, { useEffect, useState } from "react"
import { useIntl } from "react-intl"

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

// Utils
import { translateMessageId } from "../../../utils/translations"

export const useWalletFilterSidebar = ({
  resetWalletFilter,
  filters,
  updateFilterOptions,
}: Omit<WalletFilterSidebarProps, "updateFilterOption">) => {
  const intl = useIntl()
  const [filterOptions, setFilterOptions] = useState([
    {
      title: translateMessageId("page-find-wallet-device", intl),
      items: [
        {
          title: translateMessageId(walletFilterData.mobile.title, intl),
          icon: <Mobile />,
          description: translateMessageId(
            walletFilterData.mobile.description,
            intl
          ),
          filterKey: walletFilterData.mobile.filterKey,
          showOptions: filters.android || filters.ios ? true : false,
          options: [
            {
              name: translateMessageId(walletFilterData.android.title, intl),
              filterKey: walletFilterData.android.filterKey,
              inputType: "checkbox",
            },
            {
              name: translateMessageId(walletFilterData.ios.title, intl),
              filterKey: walletFilterData.ios.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: translateMessageId(walletFilterData.desktop.title, intl),
          icon: <Desktop />,
          description: translateMessageId(
            walletFilterData.desktop.description,
            intl
          ),
          filterKey: walletFilterData.desktop.filterKey,
          showOptions:
            filters.linux || filters.windows || filters.macOS ? true : false,
          options: [
            {
              name: translateMessageId(walletFilterData.linux.title, intl),
              filterKey: walletFilterData.linux.filterKey,
              inputType: "checkbox",
            },
            {
              name: translateMessageId(walletFilterData.windows.title, intl),
              filterKey: walletFilterData.windows.filterKey,
              inputType: "checkbox",
            },
            {
              name: translateMessageId(walletFilterData.macos.title, intl),
              filterKey: walletFilterData.macos.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: translateMessageId(walletFilterData.browser.title, intl),
          icon: <Browser />,
          description: translateMessageId(
            walletFilterData.browser.description,
            intl
          ),
          filterKey: walletFilterData.browser.filterKey,
          showOptions: filters.firefox || filters.chrome ? true : false,
          options: [
            {
              name: translateMessageId(walletFilterData.firefox.title, intl),
              filterKey: walletFilterData.firefox.filterKey,
              inputType: "checkbox",
            },
            {
              name: translateMessageId(walletFilterData.chromium.title, intl),
              filterKey: walletFilterData.chromium.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: translateMessageId(walletFilterData.hardware.title, intl),
          icon: <Hardware />,
          description: translateMessageId(
            walletFilterData.hardware.description,
            intl
          ),
          filterKey: walletFilterData.hardware.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: translateMessageId("page-find-wallet-security", intl),
      items: [
        {
          title: translateMessageId(walletFilterData.open_source.title, intl),
          icon: <OpenSource />,
          description: translateMessageId(
            walletFilterData.open_source.description,
            intl
          ),
          filterKey: walletFilterData.open_source.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.non_custodial.title, intl),
          icon: <NonCustodial />,
          description: translateMessageId(
            walletFilterData.non_custodial.description,
            intl
          ),
          filterKey: walletFilterData.non_custodial.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: translateMessageId("page-find-wallet-features", intl),
      items: [
        {
          title: translateMessageId(
            walletFilterData.hardware_support.title,
            intl
          ),
          icon: <HardwareSupport />,
          description: translateMessageId(
            walletFilterData.hardware_support.description,
            intl
          ),
          filterKey: walletFilterData.hardware_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.walletconnect.title, intl),
          icon: <WalletConnect />,
          description: translateMessageId(
            walletFilterData.walletconnect.description,
            intl
          ),
          filterKey: walletFilterData.walletconnect.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.rpc_importing.title, intl),
          icon: <RPCImporting />,
          description: translateMessageId(
            walletFilterData.rpc_importing.description,
            intl
          ),
          filterKey: walletFilterData.rpc_importing.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.nft_support.title, intl),
          icon: <NFTSupport />,
          description: translateMessageId(
            walletFilterData.nft_support.description,
            intl
          ),
          filterKey: walletFilterData.nft_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(
            walletFilterData.connect_to_dapps.title,
            intl
          ),
          icon: <ConnectDapps />,
          description: translateMessageId(
            walletFilterData.connect_to_dapps.description,
            intl
          ),
          filterKey: walletFilterData.connect_to_dapps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.staking.title, intl),
          icon: <Staking />,
          description: translateMessageId(
            walletFilterData.staking.description,
            intl
          ),
          filterKey: walletFilterData.staking.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.swaps.title, intl),
          icon: <Swap />,
          description: translateMessageId(
            walletFilterData.swaps.description,
            intl
          ),
          filterKey: walletFilterData.swaps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.layer_2.title, intl),
          icon: <Layer2 />,
          description: translateMessageId(
            walletFilterData.layer_2.description,
            intl
          ),
          filterKey: walletFilterData.layer_2.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(
            walletFilterData.gas_fee_customization.title,
            intl
          ),
          icon: <GasFeeCustomization />,
          description: translateMessageId(
            walletFilterData.gas_fee_customization.description,
            intl
          ),
          filterKey: walletFilterData.gas_fee_customization.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(walletFilterData.ens_support.title, intl),
          icon: <ENSSupport />,
          description: translateMessageId(
            walletFilterData.ens_support.description,
            intl
          ),
          filterKey: walletFilterData.ens_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(
            walletFilterData.erc_20_support.title,
            intl
          ),
          icon: <ERC20Support />,
          description: translateMessageId(
            walletFilterData.erc_20_support.description,
            intl
          ),
          filterKey: walletFilterData.erc_20_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(
            walletFilterData.eip_1559_support.title,
            intl
          ),
          icon: <Eip1559 />,
          description: translateMessageId(
            walletFilterData.eip_1559_support.description,
            intl
          ),
          filterKey: walletFilterData.eip_1559_support.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: `${translateMessageId(
        "page-find-wallet-buy-crypto",
        intl
      )} / ${translateMessageId("page-find-wallet-sell-for-fiat", intl)}`,
      items: [
        {
          title: translateMessageId(walletFilterData.buy_crypto.title, intl),
          icon: <BuyCrypto />,
          description: translateMessageId(
            walletFilterData.buy_crypto.description,
            intl
          ),
          filterKey: walletFilterData.buy_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(
            walletFilterData.withdraw_crypto.title,
            intl
          ),
          icon: <WithdrawCrypto />,
          description: translateMessageId(
            walletFilterData.withdraw_crypto.description,
            intl
          ),
          filterKey: walletFilterData.withdraw_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: translateMessageId("page-find-wallet-smart-contract", intl),
      items: [
        {
          title: translateMessageId(walletFilterData.multisig.title, intl),
          icon: <Multisig />,
          description: translateMessageId(
            walletFilterData.multisig.description,
            intl
          ),
          filterKey: walletFilterData.multisig.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: translateMessageId(
            walletFilterData.social_recovery.title,
            intl
          ),
          icon: <SocialRecover />,
          description: translateMessageId(
            walletFilterData.social_recovery.description,
            intl
          ),
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
