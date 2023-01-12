// Libraries
import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { useIntl } from "react-intl"

// Components
import Checkbox from "../Checkbox"
import Icon from "../Icon"
import { Text } from "@chakra-ui/react"

// Data
import walletFilterData from "../../data/wallets/wallet-filters"

// Icons
import Browser from "../../assets/wallets/browser.svg"
import BuyCrypto from "../../assets/wallets/buy_crypto.svg"
import Desktop from "../../assets/wallets/desktop.svg"
import ENSSupport from "../../assets/wallets/ens_support.svg"
import ERC20Support from "../../assets/wallets/erc_20_support.svg"
import GasFeeCustomization from "../../assets/wallets/gas_fee_customization.svg"
import HardwareSupport from "../../assets/wallets/hardware_support.svg"
import Hardware from "../../assets/wallets/hardware.svg"
import Layer2 from "../../assets/wallets/layer_2.svg"
import Mobile from "../../assets/wallets/mobile.svg"
import NFTSupport from "../../assets/wallets/nft_support.svg"
import NonCustodial from "../../assets/wallets/non_custodial.svg"
import OpenSource from "../../assets/wallets/open_source.svg"
import RPCImporting from "../../assets/wallets/rpc_importing.svg"
import Staking from "../../assets/wallets/staking.svg"
import WalletConnect from "../../assets/wallets/walletconnect.svg"
import ConnectDapps from "../../assets/wallets/connect_dapps.svg"
import WithdrawCrypto from "../../assets/wallets/withdraw_crypto.svg"
import Multisig from "../../assets/wallets/multisig.svg"
import SocialRecover from "../../assets/wallets/social_recover.svg"
import Swap from "../../assets/wallets/swap.svg"
import Eip1559 from "../../assets/wallets/eip1559.svg"

// Utils
import { trackCustomEvent } from "../../utils/matomo"
import { translateMessageId } from "../../utils/translations"

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 1rem 1rem;
  }
`

const FilterPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  background: ${({ theme }) =>
    theme.isDark ? theme.colors.black400 : theme.colors.primary100};
  border-radius: 4px;
`

const Header = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => (props.isOpen ? `0 1rem 12px 1rem` : "0 1rem")};
  cursor: pointer;
  width: 100%;
  border-bottom: ${(props) =>
    props.isOpen ? `1px solid ${props.theme.colors.primary}` : "none"};

  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const FilterOption = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  width: 100%;
  padding: 18.5px 12px 12px 12px;
  :last-child {
    border: none;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 28px auto 34px;
  width: 100%;
  align-items: center;
  cursor: pointer;

  p {
    margin: 0;
    line-height: 1.1rem;
    padding: 0 10px;
  }
`

const IconContainer = styled.div`
  svg {
    width: 28px;
    height: 28px;
    margin-top: 8px;

    path {
      fill: ${(props) => props.theme.colors.text};
    }
  }
`

const OptionDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.1rem;
  color: ${(props) => props.theme.colors.text200};
`

const CheckboxGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  margin-top: 14px;
  gap: 0.5rem;
  cursor: pointer;
`

const ToggleIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

// Types

const WalletFilterSidebar = ({
  resetWalletFilter,
  filters,
  updateFilterOption,
  updateFilterOptions,
}) => {
  const intl = useIntl()
  const [filterOptions, setFilterOptions] = useState([
    {
      title: translateMessageId("page-find-wallet-device", intl),
      open: true,
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
      open: true,
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
      open: true,
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
      open: true,
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
      open: true,
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

  const setOpen = (idx) => {
    const updatedFilterOptions = [...filterOptions]
    updatedFilterOptions[idx].open = !updatedFilterOptions[idx].open
    setFilterOptions(updatedFilterOptions)
  }

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

  return (
    <Container>
      {filterOptions.map((filterOption, idx) => {
        return (
          <FilterPanel>
            <Header
              onClick={() => {
                setOpen(idx)
              }}
              isOpen={filterOption.open}
              role="button"
              aria-expanded={filterOption.open ? "true" : "false"}
            >
              <h3>{filterOption.title}</h3>
              <StyledIcon
                name={filterOption.open ? "chevronUp" : "chevronDown"}
                size={"36"}
              />
            </Header>
            {filterOption.open &&
              filterOption.items.map((item, itemidx) => {
                return (
                  <FilterOption>
                    <OptionGrid
                      onClick={
                        item.filterKey
                          ? () => {
                              trackCustomEvent({
                                eventCategory: "WalletFilterSidebar",
                                eventAction: `${filterOption.title}`,
                                eventName: `${item.filterKey} ${!filters[
                                  item.filterKey!
                                ]}`,
                              })
                              updateFilterOption(item.filterKey)
                            }
                          : () => {
                              setShowOptions(idx, itemidx, !item.showOptions)
                              trackCustomEvent({
                                eventCategory: "WalletFilterSidebar",
                                eventAction: `${filterOption.title}`,
                                eventName: `Toggle ${
                                  item.title
                                } ${!item.showOptions}`,
                              })
                            }
                      }
                    >
                      <IconContainer aria-hidden="true">
                        {item.icon}
                      </IconContainer>
                      <p>{item.title}</p>
                      <div>
                        {item.filterKey && (
                          <span
                            aria-label={item.title}
                            role="checkbox"
                            aria-checked={
                              filters[item.filterKey] ? "true" : "false"
                            }
                          >
                            <ToggleIcon
                              name={
                                filters[item.filterKey]
                                  ? "toggleOn"
                                  : "toggleOff"
                              }
                              size="30"
                            />
                          </span>
                        )}
                        {item.showOptions !== undefined && (
                          <span
                            aria-label={item.title}
                            role="checkbox"
                            aria-checked={item.showOptions ? "true" : "false"}
                          >
                            <ToggleIcon
                              name={item.showOptions ? "toggleOn" : "toggleOff"}
                              size="30"
                            />
                          </span>
                        )}
                      </div>
                    </OptionGrid>
                    <OptionGrid
                      onClick={
                        item.filterKey
                          ? () => {
                              updateFilterOption(item.filterKey)
                              trackCustomEvent({
                                eventCategory: "WalletFilterSidebar",
                                eventAction: `${filterOption.title}`,
                                eventName: `${item.filterKey} ${!filters[
                                  item.filterKey!
                                ]}`,
                              })
                            }
                          : () => {
                              setShowOptions(idx, itemidx, !item.showOptions)
                              trackCustomEvent({
                                eventCategory: "WalletFilterSidebar",
                                eventAction: `${filterOption.title}`,
                                eventName: `Toggle ${
                                  item.title
                                } ${!item.showOptions}`,
                              })
                            }
                      }
                    >
                      <div></div>
                      <OptionDescription>{item.description}</OptionDescription>
                      <div></div>
                    </OptionGrid>
                    {item.options.length > 0 && item.showOptions && (
                      <CheckboxGrid>
                        {item.options.map((option) => {
                          const handleClick = () => {
                            let closeShowOptions = true

                            for (let filterOption of item.options) {
                              if (filterOption.name === option.name) {
                                if (!filters[filterOption.filterKey!]) {
                                  closeShowOptions = false
                                  break
                                }
                              } else {
                                if (filters[filterOption.filterKey!]) {
                                  closeShowOptions = false
                                  break
                                }
                              }
                            }

                            if (closeShowOptions) {
                              setShowOptions(idx, itemidx, !item.showOptions)
                            }

                            trackCustomEvent({
                              eventCategory: "WalletFilterSidebar",
                              eventAction: `${filterOption.title}`,
                              eventName: `${option.filterKey} ${!filters[
                                option.filterKey!
                              ]}`,
                            })
                            updateFilterOption(option.filterKey)
                          }

                          return (
                            <Checkbox
                              aria-label={option.name}
                              isChecked={filters[option.filterKey!]}
                              size="md"
                              onChange={handleClick}
                            >
                              <Text as="p" aria-hidden="true" m={0}>
                                {option.name}
                              </Text>
                            </Checkbox>
                          )
                        })}
                      </CheckboxGrid>
                    )}
                  </FilterOption>
                )
              })}
          </FilterPanel>
        )
      })}
    </Container>
  )
}

export default WalletFilterSidebar
