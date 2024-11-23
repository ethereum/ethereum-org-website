import { useTranslation } from "next-i18next"

import { FilterOption } from "@/lib/types"

import FindWalletLanguageSelectInput from "@/components/FindWalletProductTable/FindWalletLanguageSelectInput"
import Layer2SelectInput from "@/components/FindWalletProductTable/Layer2SelectInput"
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

import { trackCustomEvent } from "@/lib/utils/matomo"

import { DEFAULT_LOCALE } from "@/lib/constants"

export const useWalletFilters = (): FilterOption[] => {
  const { t } = useTranslation("page-wallets-find-wallet")
  return [
    {
      title: t("page-find-wallet-device"),
      showFilterOption: true,
      items: [
        {
          filterKey: "mobile",
          filterLabel: t("page-find-wallet-mobile"),
          description: "",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={MobileIcon}
                label={t("page-find-wallet-mobile")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: "mobile",
                    eventName: `mobile ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [
            {
              filterKey: "android",
              filterLabel: t("page-find-wallet-android"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-android")}`,
                        eventName: `android ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
            {
              filterKey: "ios",
              filterLabel: t("page-find-wallet-iOS"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-iOS")}`,
                        eventName: `iOS ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
          ],
        },
        {
          filterKey: "desktop",
          filterLabel: t("page-find-wallet-desktop"),
          description: "",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={DesktopIcon}
                label={t("page-find-wallet-desktop")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-desktop")}`,
                    eventName: `desktop ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [
            {
              filterKey: "linux",
              filterLabel: t("page-find-wallet-linux"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-linux")}`,
                        eventName: `linux ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
            {
              filterKey: "windows",
              filterLabel: t("page-find-wallet-windows"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-windows")}`,
                        eventName: `windows ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
            {
              filterKey: "macOS",
              filterLabel: t("page-find-wallet-macOS"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-macOS")}`,
                        eventName: `macOS ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
          ],
        },
        {
          filterKey: "browser",
          filterLabel: t("page-find-wallet-browser"),
          description: "",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={BrowserIcon}
                label={t("page-find-wallet-browser")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-browser")}`,
                    eventName: `browser ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [
            {
              filterKey: "chromium",
              filterLabel: t("page-find-wallet-chromium"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-chromium")}`,
                        eventName: `chromium ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
            {
              filterKey: "firefox",
              filterLabel: t("page-find-wallet-firefox"),
              description: "",
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
                    updateFilterState={(
                      filterIndex,
                      itemIndex,
                      newInputState,
                      optionIndex
                    ) => {
                      trackCustomEvent({
                        eventCategory: "WalletFilterSidebar",
                        eventAction: `${t("page-find-wallet-firefox")}`,
                        eventName: `firefox ${newInputState}`,
                      })
                      updateFilterState(
                        filterIndex,
                        itemIndex,
                        newInputState,
                        optionIndex
                      )
                    }}
                  />
                )
              },
            },
          ],
        },
        {
          filterKey: "hardware",
          filterLabel: t("page-find-wallet-hardware"),
          description: "",
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={HardwareIcon}
                label={t("page-find-wallet-hardware")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-hardware")}`,
                    eventName: `hardware ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
      ],
    },
    {
      title: "Network support",
      showFilterOption: true,
      items: [
        {
          filterKey: "layer_2_support",
          filterLabel: "layer_2_support",
          description: "",
          inputState: [],
          ignoreFilterReset: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <Layer2SelectInput
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
          filterLabel: t("page-find-wallet-languages-supported"),
          description: "",
          inputState: DEFAULT_LOCALE,
          ignoreFilterReset: true,
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
          filterLabel: t("page-find-wallet-buy-crypto"),
          description: t("page-find-wallet-buy-crypto-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={BuyCryptoIcon}
                label={t("page-find-wallet-buy-crypto")}
                description={t("page-find-wallet-buy-crypto-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-buy-crypto")}`,
                    eventName: `buy_crypto ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "withdraw_crypto",
          filterLabel: t("page-find-wallet-sell-for-fiat"),
          description: t("page-find-wallet-sell-for-fiat-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={WithdrawCryptoIcon}
                label={t("page-find-wallet-sell-for-fiat")}
                description={t("page-find-wallet-sell-for-fiat-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-sell-for-fiat")}`,
                    eventName: `withdraw_crypto ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
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
          filterLabel: t("page-find-wallet-connect-to-dapps"),
          description: t("page-find-wallet-connect-to-dapps-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={ConnectDappsIcon}
                label={t("page-find-wallet-connect-to-dapps")}
                description={t("page-find-wallet-connect-to-dapps-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-connect-to-dapps")}`,
                    eventName: `connect_to_dapps ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "nft_support",
          filterLabel: t("page-find-wallet-nft-support"),
          description: t("page-find-wallet-nft-support-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={NFTSupportIcon}
                label={t("page-find-wallet-nft-support")}
                description={t("page-find-wallet-nft-support-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-nft-support")}`,
                    eventName: `nft_support ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "staking",
          filterLabel: t("page-find-wallet-staking"),
          description: t("page-find-wallet-staking-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={StakingIcon}
                label={t("page-find-wallet-staking")}
                description={t("page-find-wallet-staking-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-staking")}`,
                    eventName: `staking ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "layer_2",
          filterLabel: t("page-find-wallet-layer-2"),
          description: t("page-find-wallet-layer-2-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={Layer2Icon}
                label={t("page-find-wallet-layer-2")}
                description={t("page-find-wallet-layer-2-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-layer-2")}`,
                    eventName: `layer_2 ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "swaps",
          filterLabel: t("page-find-wallet-swaps"),
          description: t("page-find-wallet-swaps-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={SwapIcon}
                label={t("page-find-wallet-swaps")}
                description={t("page-find-wallet-swaps-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-swaps")}`,
                    eventName: `swaps ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "hardware_support",
          filterLabel: t("page-find-wallet-hardware-wallet-support"),
          description: t("page-find-wallet-hardware-wallet-support-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={HardwareSupportIcon}
                label={t("page-find-wallet-hardware-wallet-support")}
                description={t("page-find-wallet-hardware-wallet-support-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-hardware-wallet-support")}`,
                    eventName: `hardware_support ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "ens_support",
          filterLabel: t("page-find-wallet-ens-support"),
          description: t("page-find-wallet-ens-support-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={ENSSupportIcon}
                label={t("page-find-wallet-ens-support")}
                description={t("page-find-wallet-ens-support-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-ens-support")}`,
                    eventName: `ens_support ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
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
          filterLabel: t("page-find-wallet-open-source"),
          description: t("page-find-wallet-open-source-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={OpenSourceWalletIcon}
                label={t("page-find-wallet-open-source")}
                description={t("page-find-wallet-open-source-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-open-source")}`,
                    eventName: `open_source ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "non_custodial",
          filterLabel: t("page-find-wallet-non-custodial"),
          description: t("page-find-wallet-non-custodial-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={NonCustodialIcon}
                label={t("page-find-wallet-non-custodial")}
                description={t("page-find-wallet-non-custodial-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-non-custodial")}`,
                    eventName: `non_custodial ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
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
          filterLabel: t("page-find-wallet-multisig"),
          description: t("page-find-wallet-multisig-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={MultisigIcon}
                label={t("page-find-wallet-multisig")}
                description={t("page-find-wallet-multisig-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-multisig")}`,
                    eventName: `multisig ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "social_recovery",
          filterLabel: t("page-find-wallet-social-recovery"),
          description: t("page-find-wallet-social-recovery-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={SocialRecoverIcon}
                label={t("page-find-wallet-social-recovery")}
                description={t("page-find-wallet-social-recovery-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-social-recovery")}`,
                    eventName: `social_recovery ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
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
          filterLabel: t("page-find-wallet-rpc-importing"),
          description: t("page-find-wallet-rpc-importing-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={RPCImportingIcon}
                label={t("page-find-wallet-rpc-importing")}
                description={t("page-find-wallet-rpc-importing-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-rpc-importing")}`,
                    eventName: `rpc_importing ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "erc_20_support",
          filterLabel: t("page-find-wallet-token-importing"),
          description: t("page-find-wallet-token-importing-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={ERC20SupportIcon}
                label={t("page-find-wallet-token-importing")}
                description={t("page-find-wallet-token-importing-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `${t("page-find-wallet-token-importing")}`,
                    eventName: `erc_20_support ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "gas_fee_customization",
          filterLabel: t("page-find-wallet-gas-fee-customization"),
          description: t("page-find-wallet-gas-fee-customization-desc"),
          inputState: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={GasFeeCustomizationIcon}
                label={t("page-find-wallet-gas-fee-customization")}
                description={t("page-find-wallet-gas-fee-customization-desc")}
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  trackCustomEvent({
                    eventCategory: "WalletFilterSidebar",
                    eventAction: `advanced_features`,
                    eventName: `gas_fee_customization ${newInputState}`,
                  })
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
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
          filterLabel: "New to crypto",
          description: "",
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
