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
import CheckboxFilterInput from "@/components/ProductTable/FilterInputs/CheckboxFilterInput"
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
          options: [
            {
              filterKey: "android",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-android")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
            {
              filterKey: "ios",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-iOS")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
          ],
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
          options: [
            {
              filterKey: "linux",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-linux")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
            {
              filterKey: "windows",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-windows")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
            {
              filterKey: "macOS",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-macOS")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
          ],
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
          options: [
            {
              filterKey: "chromium",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-chromium")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
            {
              filterKey: "firefox",
              inputState: false,
              input: (
                filterIndex,
                itemIndex,
                optionIndex,
                inputState,
                updateFilterState
              ) => {
                return (
                  <CheckboxFilterInput
                    label={t("page-find-wallet-firefox")}
                    filterIndex={filterIndex}
                    itemIndex={itemIndex}
                    optionIndex={optionIndex}
                    inputState={inputState}
                    updateFilterState={updateFilterState}
                  />
                )
              },
            },
          ],
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
          options: [],
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
          options: [],
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
                description={t("page-find-wallet-buy-crypto-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "withdraw_crypto",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={WithdrawCryptoIcon}
                label={t("page-find-wallet-sell-for-fiat")}
                description={t("page-find-wallet-sell-for-fiat-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
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
                description={t("page-find-wallet-connect-to-dapps-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "nft_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={NFTSupportIcon}
                label={t("page-find-wallet-nft-support")}
                description={t("page-find-wallet-nft-support-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "staking",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={StakingIcon}
                label={t("page-find-wallet-staking")}
                description={t("page-find-wallet-staking-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "layer_2",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={Layer2Icon}
                label={t("page-find-wallet-layer-2")}
                description={t("page-find-wallet-layer-2-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "swaps",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={SwapIcon}
                label={t("page-find-wallet-swaps")}
                description={t("page-find-wallet-swaps-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "hardware_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={HardwareSupportIcon}
                label={t("page-find-wallet-hardware-wallet-support")}
                description={t("page-find-wallet-hardware-wallet-support-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "ens_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={ENSSupportIcon}
                label={t("page-find-wallet-ens-support")}
                description={t("page-find-wallet-ens-support-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
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
                description={t("page-find-wallet-open-source-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "non_custodial",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={NonCustodialIcon}
                label={t("page-find-wallet-non-custodial")}
                description={t("page-find-wallet-non-custodial-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
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
                description={t("page-find-wallet-multisig-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "social_recovery",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={SocialRecoverIcon}
                label={t("page-find-wallet-social-recovery")}
                description={t("page-find-wallet-social-recovery-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
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
                description={t("page-find-wallet-rpc-importing-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "erc_20_support",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={ERC20SupportIcon}
                label={t("page-find-wallet-token-importing")}
                description={t("page-find-wallet-token-importing-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "gas_fee_customization",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                icon={GasFeeCustomizationIcon}
                label={t("page-find-wallet-gas-fee-customization")}
                description={t("page-find-wallet-gas-fee-customization-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
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
          options: [],
        },
      ],
    },
  ]
}
