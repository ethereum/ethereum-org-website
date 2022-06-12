// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Components
import Checkbox from "../Checkbox"
import Icon from "../Icon"

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

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FilterPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  background: ${(props) => props.theme.colors.ednBackground};
  border: 1px solid #3d3d3d;
  border-radius: 4px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 12px 1rem;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

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
`

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 24px auto 34px;
  width: 100%;
  align-items: center;

  p {
    margin: 0;
    line-height: 20px;
    padding: 0 12px;
  }
`

const IconContainer = styled.div`
  svg {
    width: 24px;
    height: 24px;

    path {
      fill: white;
      stroke: white;
    }
  }
`

const OptionDescription = styled.p`
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.text200};
`

const CheckboxGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  margin-top: 14px;
  gap: 0.5rem;
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

const WalletFilterSidebar = ({ data, filters, updateFilterOption }) => {
  const [filterOptions, setFilterOptions] = useState([
    {
      title: "Device",
      open: true,
      items: [
        {
          title: "Mobile",
          icon: <Mobile />,
          description: "Phone or mobile based wallets.",
          filterKey: undefined,
          options: [
            {
              name: "Android",
              filterKey: "android",
              inputType: "checkbox",
            },
            {
              name: "iOS",
              filterKey: "ios",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Desktop",
          icon: <Desktop />,
          description: "Desktop based wallets.",
          filterKey: undefined,
          options: [
            {
              name: "Linux",
              filterKey: "linux",
              inputType: "checkbox",
            },
            {
              name: "Windows",
              filterKey: "windows",
              inputType: "checkbox",
            },
            {
              name: "macOS",
              filterKey: "macOS",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Browser",
          icon: <Browser />,
          description: "Browser extension wallets.",
          filterKey: undefined,
          options: [
            {
              name: "Firefox",
              filterKey: "firefox",
              inputType: "checkbox",
            },
            {
              name: "Chromium",
              filterKey: "chromium",
              inputType: "checkbox",
            },
          ],
        },
        {
          title: "Hardware",
          icon: <Hardware />,
          description: "Hardware baesd wallets.",
          filterKey: "hardware",
          options: [],
        },
      ],
    },
    {
      title: "Security",
      open: true,
      items: [
        {
          title: "Open source",
          icon: <OpenSource />,
          description:
            "Wallet code for the wallet is open sourced for users to inspect and edit.",
          filterKey: "open_source",
          options: [],
        },
        {
          title: "Non-custodial",
          icon: <NonCustodial />,
          description: "Who has control over the keys for your wallet.",
          filterKey: "non_custodial",
          options: [],
        },
      ],
    },
    {
      title: "Features",
      open: true,
      items: [
        {
          title: "Hardware support",
          icon: <HardwareSupport />,
          description:
            "You can connect a hardware wallet and sign transactions with it.",
          filterKey: "hardware_support",
          options: [],
        },
        {
          title: "WalletConnect",
          icon: <></>,
          description:
            "You can connect to applications that support WalletConnect.",
          filterKey: "walletconnect",
          options: [],
        },
        {
          title: "RPC importing",
          icon: <RPCImporting />,
          description:
            "You can import RPC endpoint data to connect to different nodes/networks.",
          filterKey: "rpc_importing",
          options: [],
        },
        {
          title: "NFT support",
          icon: <NFTSupport />,
          description:
            "You can view and interact with your NFTs in the wallet.",
          filterKey: "nft_support",
          options: [],
        },
        {
          title: "Connect to decentralized apps",
          icon: <></>,
          description:
            "You can connect to applications build on the Ethereum network.",
          filterKey: "connect_to_dapps",
          options: [],
        },
        {
          title: "Staking",
          icon: <Staking />,
          description:
            "You can use a simple interface to stake directly in the wallet.",
          filterKey: "staking",
          options: [],
        },
        {
          title: "Layer 2",
          icon: <Layer2 />,
          description: "You can use layer 2 networks in the wallet.",
          filterKey: "layer_2",
          options: [],
        },
        {
          title: "Gas fee customization",
          icon: <GasFeeCustomization />,
          description:
            "The user is able to customize their gas inputs (base free, priority fee, max fee).",
          filterKey: "gas_fee_customization",
          options: [],
        },
        {
          title: "ENS support",
          icon: <ENSSupport />,
          description:
            "The wallet supports sending transactions to ENS addresses.",
          filterKey: "ens_support",
          options: [],
        },
        {
          title: "Token importing",
          icon: <ERC20Support />,
          description:
            "Can import ERC-20 token contract addresses into the wallet.",
          filterKey: "erc_20_support",
          options: [],
        },
      ],
    },
    {
      title: "Onboard / offboard",
      open: true,
      items: [
        {
          title: "Buy crypto",
          icon: <BuyCrypto />,
          description:
            "User is able to buy crypto with fiat directly in the wallet.",
          filterKey: "buy_crypto",
          options: [],
        },
        {
          title: "Withdraw crypto",
          icon: <></>,
          description:
            "User is able to withdraw to fiat directly in the wallet.",
          filterKey: "withdraw_crypto",
          options: [],
        },
      ],
    },
    {
      title: "Smart contracts",
      open: true,
      items: [
        {
          title: "Multisig",
          icon: <></>,
          description:
            "Wallets that require two or more signatures from private keys for a transaction.",
          filterKey: "multisig",
          options: [],
        },
        {
          title: "Social recovery",
          icon: <></>,
          description:
            "Wallets that allow guardians to change the signing key for smart contract wallets.",
          filterKey: "social_recovery",
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

  return (
    <Container>
      {filterOptions.map((filterOption, idx) => {
        return (
          <FilterPanel>
            <Header
              onClick={() => {
                setOpen(idx)
              }}
            >
              <h3>{filterOption.title}</h3>
              <StyledIcon
                name={filterOption.open ? "chevronUp" : "chevronDown"}
                size={"36"}
              />
            </Header>
            {filterOption.open &&
              filterOption.items.map((item) => {
                return (
                  <FilterOption>
                    <OptionGrid>
                      <IconContainer>{item.icon}</IconContainer>
                      <p>{item.title}</p>
                      <div>
                        {item.filterKey && (
                          // TODO: Make actual toggle component
                          <div
                            onClick={() => {
                              updateFilterOption(item.filterKey)
                            }}
                          >
                            <ToggleIcon
                              name={
                                filters[item.filterKey]
                                  ? "toggleOn"
                                  : "toggleOff"
                              }
                              size="30"
                            />
                          </div>
                        )}
                      </div>
                    </OptionGrid>
                    <OptionGrid>
                      <div></div>
                      <OptionDescription>{item.description}</OptionDescription>
                      <div></div>
                    </OptionGrid>
                    {item.options.length > 0 && (
                      <CheckboxGrid>
                        {item.options.map((option) => {
                          return (
                            <CheckboxGridOption>
                              <Checkbox
                                callback={() => {
                                  updateFilterOption(option.filterKey)
                                }}
                                checked={filters[option.filterKey]}
                                size={1.5}
                              />
                              <p>{option.name}</p>
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
