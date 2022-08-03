// Libraries
import React, { useState } from "react"
import styled from "styled-components"

// Components
import Checkbox from "../Checkbox"
import Icon from "../Icon"

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

const CheckboxGridOption = styled.div`
  display: flex;
  gap: 0.5rem;

  p {
    margin: 0;
  }
`

const ToggleIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

// Types

const WalletFilterSidebar = ({
  filters,
  updateFilterOption,
  updateFilterOptions,
}) => {
  const [filterOptions, setFilterOptions] = useState([
    {
      title: "Device",
      open: true,
      items: [
        {
          title: walletFilterData.mobile.title,
          icon: <Mobile />,
          description: walletFilterData.mobile.description,
          filterKey: walletFilterData.mobile.filterKey,
          showOptions: filters.android || filters.ios ? true : false,
          options: [
            {
              name: walletFilterData.android.title,
              filterKey: walletFilterData.android.filterKey,
              inputType: "checkbox",
            },
            {
              name: walletFilterData.ios.title,
              filterKey: walletFilterData.ios.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: walletFilterData.desktop.title,
          icon: <Desktop />,
          description: walletFilterData.desktop.description,
          filterKey: walletFilterData.desktop.filterKey,
          showOptions:
            filters.linux || filters.windows || filters.macOS ? true : false,
          options: [
            {
              name: walletFilterData.linux.title,
              filterKey: walletFilterData.linux.filterKey,
              inputType: "checkbox",
            },
            {
              name: walletFilterData.windows.title,
              filterKey: walletFilterData.windows.filterKey,
              inputType: "checkbox",
            },
            {
              name: walletFilterData.macos.title,
              filterKey: walletFilterData.macos.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: walletFilterData.browser.title,
          icon: <Browser />,
          description: walletFilterData.browser.description,
          filterKey: walletFilterData.browser.filterKey,
          showOptions: filters.firefox || filters.chrome ? true : false,
          options: [
            {
              name: walletFilterData.firefox.title,
              filterKey: walletFilterData.firefox.filterKey,
              inputType: "checkbox",
            },
            {
              name: walletFilterData.chromium.title,
              filterKey: walletFilterData.chromium.filterKey,
              inputType: "checkbox",
            },
          ],
        },
        {
          title: walletFilterData.hardware.title,
          icon: <Hardware />,
          description: walletFilterData.hardware.description,
          filterKey: walletFilterData.hardware.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: "Security",
      open: true,
      items: [
        {
          title: walletFilterData.open_source.title,
          icon: <OpenSource />,
          description: walletFilterData.open_source.description,
          filterKey: walletFilterData.open_source.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.non_custodial.title,
          icon: <NonCustodial />,
          description: walletFilterData.non_custodial.description,
          filterKey: walletFilterData.non_custodial.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: "Features",
      open: true,
      items: [
        {
          title: walletFilterData.hardware_support.title,
          icon: <HardwareSupport />,
          description: walletFilterData.hardware_support.description,
          filterKey: walletFilterData.hardware_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.walletconnect.title,
          icon: <WalletConnect />,
          description: walletFilterData.walletconnect.description,
          filterKey: walletFilterData.walletconnect.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.rpc_importing.title,
          icon: <RPCImporting />,
          description: walletFilterData.rpc_importing.description,
          filterKey: walletFilterData.rpc_importing.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.nft_support.title,
          icon: <NFTSupport />,
          description: walletFilterData.nft_support.description,
          filterKey: walletFilterData.nft_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.connect_to_dapps.title,
          icon: <ConnectDapps />,
          description: walletFilterData.connect_to_dapps.description,
          filterKey: walletFilterData.connect_to_dapps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.staking.title,
          icon: <Staking />,
          description: walletFilterData.staking.description,
          filterKey: walletFilterData.staking.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.swaps.title,
          icon: <Swap />,
          description: walletFilterData.swaps.description,
          filterKey: walletFilterData.swaps.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.layer_2.title,
          icon: <Layer2 />,
          description: walletFilterData.layer_2.description,
          filterKey: walletFilterData.layer_2.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.gas_fee_customization.title,
          icon: <GasFeeCustomization />,
          description: walletFilterData.gas_fee_customization.description,
          filterKey: walletFilterData.gas_fee_customization.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.ens_support.title,
          icon: <ENSSupport />,
          description: walletFilterData.ens_support.description,
          filterKey: walletFilterData.ens_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.erc_20_support.title,
          icon: <ERC20Support />,
          description: walletFilterData.erc_20_support.description,
          filterKey: walletFilterData.erc_20_support.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.eip_1559_support.title,
          icon: <Eip1559 />,
          description: walletFilterData.eip_1559_support.description,
          filterKey: walletFilterData.eip_1559_support.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: "Onboard / offboard",
      open: true,
      items: [
        {
          title: walletFilterData.buy_crypto.title,
          icon: <BuyCrypto />,
          description: walletFilterData.buy_crypto.description,
          filterKey: walletFilterData.buy_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.withdraw_crypto.title,
          icon: <WithdrawCrypto />,
          description: walletFilterData.withdraw_crypto.description,
          filterKey: walletFilterData.withdraw_crypto.filterKey,
          showOptions: undefined,
          options: [],
        },
      ],
    },
    {
      title: "Smart contracts",
      open: true,
      items: [
        {
          title: walletFilterData.multisig.title,
          icon: <Multisig />,
          description: walletFilterData.multisig.description,
          filterKey: walletFilterData.multisig.filterKey,
          showOptions: undefined,
          options: [],
        },
        {
          title: walletFilterData.social_recovery.title,
          icon: <SocialRecover />,
          description: walletFilterData.social_recovery.description,
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
                          return (
                            <CheckboxGridOption
                              onClick={() => {
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
                                  setShowOptions(
                                    idx,
                                    itemidx,
                                    !item.showOptions
                                  )
                                }

                                console.log({
                                  eventCategory: "WalletFilterSidebar",
                                  eventAction: `${filterOption.title}`,
                                  eventName: `${option.filterKey} ${!filters[
                                    option.filterKey!
                                  ]}`,
                                })
                                trackCustomEvent({
                                  eventCategory: "WalletFilterSidebar",
                                  eventAction: `${filterOption.title}`,
                                  eventName: `${option.filterKey} ${!filters[
                                    option.filterKey!
                                  ]}`,
                                })
                                updateFilterOption(option.filterKey)
                              }}
                            >
                              <Checkbox
                                aria-label={option.name}
                                checked={filters[option.filterKey!]}
                                size={1.5}
                              />
                              <p aria-hidden="true">{option.name}</p>
                            </CheckboxGridOption>
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
