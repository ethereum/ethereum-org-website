import { useTranslation } from "next-i18next"

import { FilterOption } from "@/lib/types"

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
import LanguageSelectInput from "@/components/ProductTable/FilterInputs/LanguageSelectInput"
import SwitchFilterInput from "@/components/ProductTable/FilterInputs/SwitchFilterInput"

export const WalletFilters = (): FilterOption[] => {
  const { t } = useTranslation("page-wallets-find-wallet")
  return [
    {
      title: t("page-find-wallet-device"),
      items: [
        {
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
      items: [
        {
          inputState: "en",
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <LanguageSelectInput
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
      items: [
        {
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
      items: [
        {
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
      items: [
        {
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
      items: [
        {
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
      items: [
        {
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
  ]
}
