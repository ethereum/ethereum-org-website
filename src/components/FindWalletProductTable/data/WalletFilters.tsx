import { useTranslation } from "next-i18next"

import { FilterOption } from "@/lib/types"

import FindWalletLanguageSelectInput from "@/components/FindWalletProductTable/filters/FindWalletLanguageSelectInput"
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
} from "@/components/icons/wallets"
import SwitchFilterInput from "@/components/ProductTable/FilterInputs/SwitchFilterInput"

export const WalletFilters = (): FilterOption[] => {
  const { t } = useTranslation("page-wallets-find-wallet")
  return [
    {
      title: t("page-find-wallet-device"),
      showFilterOption: true,
      items: [
        {
          filterKey: "mobile",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={MobileIcon}
                label={t("page-find-wallet-mobile")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "desktop",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={DesktopIcon}
                label={t("page-find-wallet-desktop")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "browser",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={BrowserIcon}
                label={t("page-find-wallet-browser")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "hardware",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={HardwareIcon}
                label={t("page-find-wallet-hardware")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: t("page-find-wallet-languages-supported"),
      showFilterOption: true,
      items: [
        {
          filterKey: "languages",
          inputState: "en",
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <FindWalletLanguageSelectInput
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: `${t("page-find-wallet-buy-crypto")} / ${t(
        "page-find-wallet-sell-for-fiat"
      )}`,
      showFilterOption: true,
      items: [
        {
          filterKey: "buy_crypto",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={BuyCryptoIcon}
                label={t("page-find-wallet-buy-crypto")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "withdraw_crypto",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={WithdrawCryptoIcon}
                label={t("page-find-wallet-sell-for-fiat")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: t("page-find-wallet-features"),
      showFilterOption: true,
      items: [
        {
          filterKey: "connect_to_dapps",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={ConnectDappsIcon}
                label={t("page-find-wallet-connect-to-dapps")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "nft_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={NFTSupportIcon}
                label={t("page-find-wallet-nft-support")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "staking",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={StakingIcon}
                label={t("page-find-wallet-staking")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "layer_2",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={Layer2Icon}
                label={t("page-find-wallet-layer-2")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "swaps",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={SwapIcon}
                label={t("page-find-wallet-swaps")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "hardware_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={HardwareSupportIcon}
                label={t("page-find-wallet-hardware-wallet-support")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "ens_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={ENSSupportIcon}
                label={t("page-find-wallet-ens-support")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: t("page-find-wallet-security"),
      showFilterOption: true,
      items: [
        {
          filterKey: "open_source",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={OpenSourceWalletIcon}
                label={t("page-find-wallet-open-source")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "non_custodial",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={NonCustodialIcon}
                label={t("page-find-wallet-non-custodial")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: t("page-find-wallet-smart-contract"),
      showFilterOption: true,
      items: [
        {
          filterKey: "multisig",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={MultisigIcon}
                label={t("page-find-wallet-multisig")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "social_recovery",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={SocialRecoverIcon}
                label={t("page-find-wallet-social-recovery")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: t("page-find-wallet-advanced"),
      showFilterOption: true,
      items: [
        {
          filterKey: "rpc_importing",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={RPCImportingIcon}
                label={t("page-find-wallet-rpc-importing")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "erc_20_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={ERC20SupportIcon}
                label={t("page-find-wallet-token-importing")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
        {
          filterKey: "gas_fee_customization",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={GasFeeCustomizationIcon}
                label={t("page-find-wallet-gas-fee-customization")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
        },
      ],
    },
    {
      title: "Hidden filters",
      showFilterOption: false,
      items: [
        {
          filterKey: "new_to_crypto",
          inputState: false,
          input: (_) => {
            return <></>
          },
        },
      ],
    },
  ]
}
