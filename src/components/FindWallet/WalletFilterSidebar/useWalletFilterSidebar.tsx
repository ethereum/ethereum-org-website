// Libraries
import { useEffect, useState } from "react"
import { Icon } from "@chakra-ui/react"
import { useIntl } from "react-intl"

// Data
import walletFilterData from "../../../data/wallets/wallet-filters"

import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  EIP1559Icon,
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
  WalletConnectIcon,
  WithdrawCryptoIcon,
} from "../../icons/wallets"

import { WalletFilterSidebarProps } from "."

// Utils
import { translateMessageId } from "../../../utils/translations"

type FilterOptionType = {
  title: string
  items: Array<{
    title: string
    icon: typeof Icon
    description: string
    filterKey: string | undefined
    showOptions: boolean | undefined
    options:
      | Array<{
          name: string
          filterKey?: string
          inputType: "checkbox"
        }>
      | []
  }>
}

export const useWalletFilterSidebar = ({
  resetWalletFilter,
  filters,
  updateFilterOptions,
}: Omit<WalletFilterSidebarProps, "updateFilterOption">) => {
  const intl = useIntl()
  const [filterOptions, setFilterOptions] = useState<FilterOptionType[]>([
    {
      title: translateMessageId("page-find-wallet-device", intl),
      items: [
        {
          title: translateMessageId(walletFilterData.mobile.title, intl),
          icon: MobileIcon,
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
          icon: DesktopIcon,
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
          icon: BrowserIcon,
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
          icon: HardwareIcon,
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
          icon: OpenSourceWalletIcon,
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
          icon: NonCustodialIcon,
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
          icon: HardwareSupportIcon,
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
          icon: WalletConnectIcon,
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
          icon: RPCImportingIcon,
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
          icon: NFTSupportIcon,
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
          icon: ConnectDappsIcon,
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
          icon: StakingIcon,
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
          icon: SwapIcon,
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
          icon: Layer2Icon,
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
          icon: GasFeeCustomizationIcon,
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
          icon: ENSSupportIcon,
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
          icon: ERC20SupportIcon,
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
          icon: EIP1559Icon,
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
          icon: BuyCryptoIcon,
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
          icon: WithdrawCryptoIcon,
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
          icon: MultisigIcon,
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
          icon: SocialRecoverIcon,
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
