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
import WalletConnect from "../../assets/wallets/walletconnect.svg"
import ConnectDapps from "../../assets/wallets/connect_dapps.svg"


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
  grid-template-columns: 28px auto 34px;
  width: 100%;
  align-items: center;

  p {
    margin: 0;
    line-height: 20px;
    padding: 0 10px;
  }
`

const IconContainer = styled.div`
  svg {
    width: 28px;
    height: 28px;
    margin-top: 8px;

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
          title: "Mobile",
          icon: <Mobile />,
          description: "Phone or mobile based wallets.",
          filterKey: undefined,
          showOptions: false,
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
          showOptions: false,
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
          showOptions: false,
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
          title: "Open source",
          icon: <OpenSource />,
          description:
            "Wallet code for the wallet is open sourced for users to inspect and edit.",
          filterKey: "open_source",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Non-custodial",
          icon: <NonCustodial />,
          description: "Who has control over the keys for your wallet.",
          filterKey: "non_custodial",
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
          title: "Hardware support",
          icon: <HardwareSupport />,
          description:
            "You can connect a hardware wallet and sign transactions with it.",
          filterKey: "hardware_support",
          showOptions: undefined,
          options: [],
        },
        {
          title: "WalletConnect",
          icon: <WalletConnect />,
          description:
            "You can connect to applications that support WalletConnect.",
          filterKey: "walletconnect",
          showOptions: undefined,
          options: [],
        },
        {
          title: "RPC importing",
          icon: <RPCImporting />,
          description:
            "You can import RPC endpoint data to connect to different nodes/networks.",
          filterKey: "rpc_importing",
          showOptions: undefined,
          options: [],
        },
        {
          title: "NFT support",
          icon: <NFTSupport />,
          description:
            "You can view and interact with your NFTs in the wallet.",
          filterKey: "nft_support",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Connect to decentralized apps",
          icon: <ConnectDapps />,
          description:
            "You can connect to applications build on the Ethereum network.",
          filterKey: "connect_to_dapps",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Staking",
          icon: <Staking />,
          description:
            "You can use a simple interface to stake directly in the wallet.",
          filterKey: "staking",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Layer 2",
          icon: <Layer2 />,
          description: "You can use layer 2 networks in the wallet.",
          filterKey: "layer_2",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Gas fee customization",
          icon: <GasFeeCustomization />,
          description:
            "The user is able to customize their gas inputs (base free, priority fee, max fee).",
          filterKey: "gas_fee_customization",
          showOptions: undefined,
          options: [],
        },
        {
          title: "ENS support",
          icon: <ENSSupport />,
          description:
            "The wallet supports sending transactions to ENS addresses.",
          filterKey: "ens_support",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Token importing",
          icon: <ERC20Support />,
          description:
            "Can import ERC-20 token contract addresses into the wallet.",
          filterKey: "erc_20_support",
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
          title: "Buy crypto",
          icon: <BuyCrypto />,
          description:
            "User is able to buy crypto with fiat directly in the wallet.",
          filterKey: "buy_crypto",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Withdraw crypto",
          icon: <></>,
          description:
            "User is able to withdraw to fiat directly in the wallet.",
          filterKey: "withdraw_crypto",
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
          title: "Multisig",
          icon: <></>,
          description:
            "Wallets that require two or more signatures from private keys for a transaction.",
          filterKey: "multisig",
          showOptions: undefined,
          options: [],
        },
        {
          title: "Social recovery",
          icon: <></>,
          description:
            "Wallets that allow guardians to change the signing key for smart contract wallets.",
          filterKey: "social_recovery",
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
                    <OptionGrid>
                      <IconContainer>{item.icon}</IconContainer>
                      <p>{item.title}</p>
                      <div>
                        {item.filterKey && (
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
                        {item.showOptions !== undefined && (
                          <div
                            onClick={() => {
                              setShowOptions(idx, itemidx, !item.showOptions)
                            }}
                          >
                            <ToggleIcon
                              name={item.showOptions ? "toggleOn" : "toggleOff"}
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
                    {item.options.length > 0 && item.showOptions && (
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
