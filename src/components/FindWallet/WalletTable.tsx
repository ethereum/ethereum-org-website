// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { components } from "react-select"
const { Control, Option } = components

// Components
import Icon from "../Icon"
import Link from "../Link"
import { StyledSelect as Select } from "../SharedStyledComponents"

// Icons
import BuyCrypto from "../../assets/wallets/buy_crypto.svg"
import ENSSupport from "../../assets/wallets/ens_support.svg"
import ERC20Support from "../../assets/wallets/erc_20_support.svg"
import GasFeeCustomization from "../../assets/wallets/gas_fee_customization.svg"
import HardwareSupport from "../../assets/wallets/hardware_support.svg"
import Layer2 from "../../assets/wallets/layer_2.svg"
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

// Styles
const Container = styled.div`
  width: 100%;
`

const WalletContainer = styled(Container)`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% auto auto auto 5%;
  width: 100%;
  column-gap: 0.5rem;
  align-items: center;
  

  p {
    margin: 0;
  }

  :hover{
    background: ${(props) => props.theme.colors.boxShadow};
    transition: 0.5s all;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 40% auto auto 0% 5%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-template-columns: 40% auto 0% 0% 5%;
  }
`

const WalletContentHeader = styled(Grid)`
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  position: sticky;
  top: 76px;
  padding: 8px;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;

  span {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    gap: 0.5rem;
    align-items: center;
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  .react-select__control {
    border: none;
    background: none;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;

      path {
        fill: ${(props) => props.theme.colors.primary};
        stroke: ${(props) => props.theme.colors.primary};
      }
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.primary};
      }
    }

    .react-select__indicators {
      .react-select__indicator-separator {
        background: none;
      }
      .react-select__indicator {
        color: ${(props) => props.theme.colors.text};
      }
    }

    &:hover {
      background: ${(props) => props.theme.colors.primary};

      svg {
        width: 24px;
        height: 24px;

        path {
          fill: ${(props) => props.theme.colors.text};
          stroke: ${(props) => props.theme.colors.text};
        }
      }
      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.text};
        }
      }

      .react-select__indicators {
        .react-select__indicator-separator {
          background: none;
        }
        .react-select__indicator {
          color: ${(props) => props.theme.colors.text};
        }
      }
    }
  }

  .react-select__control--is-focused {
    border: none;
    background: ${(props) => props.theme.colors.primary};

    svg {
      width: 24px;
      height: 24px;

      path {
        fill: ${(props) => props.theme.colors.text};
        stroke: ${(props) => props.theme.colors.text};
      }
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.text};
      }
    }

    .react-select__indicators {
      background: ${(props) => props.theme.colors.primary};
      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.text};
        }
      }

      .react-select__indicators {
        .react-select__indicator {
          color: ${(props) => props.theme.colors.text};
        }
      }
    }
  }

  .react-select__menu {
    .react-select__menu-list {
      .react-select__option {
        display: flex;
        gap: 0.5rem;
        svg {
          width: 24px;
          height: 24px;

          path {
            fill: ${(props) => props.theme.colors.text};
            stroke: ${(props) => props.theme.colors.text};
          }
        }
      }
      .react-select__option--is-selected {
        svg {
          width: 24px;
          height: 24px;

          path {
            fill: ${(props) => props.theme.colors.buttonColor};
            stroke: ${(props) => props.theme.colors.buttonColor};
          }
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 14px 0;
    }
  }
`

const SecondStyledSelect = styled(StyledSelect)`
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
    height: 0;
    width: 0;
  }
`

const ThirdStyledSelect = styled(StyledSelect)`
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
    height: 0;
    width: 0;
  }
`

const Wallet = styled(Grid)`
  padding: 25px 4px;
`

const FlexInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  p {
    padding: 0;
    font-size: 1.2rem;
  }
  p + p {
    margin: 0.1rem 0 0.3rem;
    font-size: 0.9rem;
  }
  p + a {
    font-size: 0.9rem;
    
  }
`

const FlexInfoCenter = styled(FlexInfo)`
  justify-content: center;
  cursor: pointer;
`

const Image = styled(GatsbyImage)`
  height: 56px;
  width: 56px;
`

const SecondaryText = styled.p`
  font-size: 0.7rem;
  line-height: 0.85rem;
  color: ${(props) => props.theme.colors.text200};
`

const WalletFeatureCircle = styled(Icon)<{ hasFeature: boolean }>`
  fill: ${(props) =>
    props.hasFeature ? props.theme.colors.primary : props.theme.colors.text200};
`

const WalletMoreInfoArrow = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const WalletMoreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 65px auto;
  width: 100%;
`

const WalletMoreInfo = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: auto auto;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-template-columns: auto;
  }
`

const ColoredLine = styled.div<{ color: string }>`
  --color: ${(props) => props.color};
  margin: auto;
  width: 0.25rem;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--color) 0%,
    rgba(217, 217, 217, 0) 97.4%
  );
`

const FeatureLabel = styled.div<{ hasFeature: boolean }>`
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.75rem;
  svg {
    width: 1.75rem;
    height: 1.75rem;

    path {
      fill: ${(props) =>
        props.hasFeature
          ? props.theme.colors.primary
          : props.theme.colors.tableItemBoxShadow};
    }
  }
  p {
    margin-bottom: 0.75rem;
    color: ${(props) =>
      props.hasFeature
        ? props.theme.colors.primary
        : props.theme.colors.tableItemBoxShadow};
  }
`

const SocialsContainer = styled.div`
  text-align: center;
  padding-bottom: 1rem;
  p{
    margin: 0;
  }
  a{
    height: 32px;
  }
  
`

const Socials = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem:

`

// Constants
const featureDropdownItems = [
  {
    label: "Open source",
    value: "Open source",
    filterKey: "open_source",
    category: "security",
    icon: <OpenSource />,
  },
  {
    label: "Self custody",
    value: "Self custody",
    filterKey: "non_custodial",
    category: "security",
    icon: <NonCustodial />,
  },
  {
    label: "Hardware wallet support",
    value: "Hardware wallet support",
    filterKey: "hardware_support",
    category: "feature",
    icon: <HardwareSupport />,
  },
  {
    label: "WalletConnect",
    value: "WalletConnect",
    filterKey: "walletconnect",
    category: "feature",
    icon: <WalletConnect />,
  },
  {
    label: "RPC importing",
    value: "RPC importing",
    filterKey: "rpc_importing",
    category: "feature",
    icon: <RPCImporting />,
  },
  {
    label: "NFT support",
    value: "NFT support",
    filterKey: "nft_support",
    category: "feature",
    icon: <NFTSupport />,
  },
  {
    label: "Connect to dapps",
    value: "Connect to dapps",
    filterKey: "connect_to_dapps",
    category: "feature",
    icon: <ConnectDapps />,
  },
  {
    label: "Staking",
    value: "Staking",
    filterKey: "staking",
    category: "feature",
    icon: <Staking />,
  },
  {
    label: "Swaps",
    value: "Swaps",
    filterKey: "swaps",
    category: "feature",
    icon: <Swap />,
  },
  {
    label: "Layer 2",
    value: "Layer 2",
    filterKey: "layer_2",
    category: "feature",
    icon: <Layer2 />,
  },
  {
    label: "Gas fee customization",
    value: "Gas fee customization",
    filterKey: "gas_fee_customization",
    category: "feature",
    icon: <GasFeeCustomization />,
  },
  {
    label: "ENS support",
    value: "ENS support",
    filterKey: "ens_support",
    category: "feature",
    icon: <ENSSupport />,
  },
  {
    label: "Token importing",
    value: "Token importing",
    filterKey: "erc_20_support",
    category: "feature",
    icon: <ERC20Support />,
  },
  {
    label: "Buy crypto",
    value: "Buy crypto",
    filterKey: "buy_crypto",
    category: "trade_and_buy",
    icon: <BuyCrypto />,
  },
  {
    label: "Withdraw crypto",
    value: "Withdraw crypto",
    filterKey: "withdraw_crypto",
    category: "trade_and_buy",
    icon: <WithdrawCrypto />,
  },
  {
    label: "Multisig",
    value: "Multisig",
    filterKey: "multisig",
    category: "smart_contract",
    icon: <Multisig />,
  },
  {
    label: "Social recovery",
    value: "Social recovery",
    filterKey: "social_recovery",
    category: "smart_contract",
    icon: <SocialRecover />,
  },
]

const WalletTable = ({ data, filters, walletData }) => {
  const [walletCardData, setWalletData] = useState(
    walletData.map((wallet) => {
      return { ...wallet, moreInfo: false }
    })
  )
  const [firstFeatureSelect, setFirstFeatureSelect] = useState(
    featureDropdownItems[0]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    featureDropdownItems[1]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    featureDropdownItems[2]
  )

  const updateMoreInfo = (idx) => {
    const temp = [...walletCardData]
    temp[idx].moreInfo = !temp[idx].moreInfo
    setWalletData(temp)
  }

  const filteredWallets = walletCardData.filter((wallet) => {
    let showWallet = true

    Object.keys(filters).forEach((filter) => {
      if (filters[filter] && showWallet === true) {
        showWallet = filters[filter] === wallet[filter]
      }
    })

    return showWallet
  })

  const IconOption = (props) => (
    <Option {...props}>
      {props.data.icon}
      {props.data.label}
    </Option>
  )

  const IconControl = ({ children, ...props }) => (
    <Control {...props}>
      {props.selectProps.value.icon} {children}
    </Control>
  )

  return (
    <Container>
      <WalletContentHeader>
        <p>
          <span>{filteredWallets.length} wallets</span> out of{" "}
          {walletCardData.length}
        </p>
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setFirstFeatureSelect(selectedOption)
          }}
        />
        <SecondStyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setSecondFeatureSelect(selectedOption)
          }}
        />
        <ThirdStyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setThirdFeatureSelect(selectedOption)
          }}
        />
      </WalletContentHeader>
      {filteredWallets.map((wallet, idx) => {
        const deviceLabels: Array<string> = []

        wallet.ios && deviceLabels.push("iOS")
        wallet.android && deviceLabels.push("Android")
        wallet.linux && deviceLabels.push("Linux")
        wallet.windows && deviceLabels.push("Windows")
        wallet.macOS && deviceLabels.push("macOS")
        wallet.chromium && deviceLabels.push("Chromium")
        wallet.firefox && deviceLabels.push("Firefox")
        wallet.hardware && deviceLabels.push("Hardware")

        return (
          <WalletContainer>
            <Wallet>
              <FlexInfo>
                <div>
                  <Image
                    image={getImage(data[wallet.image_name])!}
                    objectFit="contain"
                  />
                </div>
                <div>
                  <p>{wallet.name}</p>
                  <SecondaryText>{deviceLabels.join(" | ")}</SecondaryText>
                  <Link to={wallet.url}>Check out {wallet.name}</Link>
                </div>
              </FlexInfo>
              <FlexInfoCenter onClick={() => updateMoreInfo(idx)}>
                <WalletFeatureCircle
                  name="circle"
                  hasFeature={wallet[firstFeatureSelect.filterKey]}
                />
              </FlexInfoCenter>
              <FlexInfoCenter onClick={() => updateMoreInfo(idx)}>
                <WalletFeatureCircle
                  name="circle"
                  hasFeature={wallet[secondFeatureSelect.filterKey]}
                />
              </FlexInfoCenter>
              <FlexInfoCenter onClick={() => updateMoreInfo(idx)}>
                <WalletFeatureCircle
                  name="circle"
                  hasFeature={wallet[thirdFeatureSelect.filterKey]}
                />
              </FlexInfoCenter>
              <FlexInfoCenter>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => updateMoreInfo(idx)}
                >
                  <WalletMoreInfoArrow
                    name={wallet.moreInfo ? "chevronUp" : "chevronDown"}
                  />
                </div>
              </FlexInfoCenter>
            </Wallet>
            {wallet.moreInfo && (
              <div>
                <WalletMoreInfoContainer>
                  <div>
                    <ColoredLine color={wallet.brand_color} />
                  </div>
                  <WalletMoreInfo>
                    <div>
                      <h4>Features</h4>
                      {featureDropdownItems.map((feature) => {
                        if (feature.category === "feature")
                          return (
                            <FeatureLabel
                              hasFeature={wallet[feature.filterKey]}
                            >
                              {feature.icon}
                              <p>{feature.label}</p>
                            </FeatureLabel>
                          )
                      })}
                    </div>
                    <div>
                      <h4>Security</h4>
                      {featureDropdownItems.map((feature) => {
                        if (feature.category === "security")
                          return (
                            <FeatureLabel
                              hasFeature={wallet[feature.filterKey]}
                            >
                              {feature.icon}
                              <p>{feature.label}</p>
                            </FeatureLabel>
                          )
                      })}
                    </div>
                    <div>
                      <h4>Trade & buy</h4>
                      {featureDropdownItems.map((feature) => {
                        if (feature.category === "trade_and_buy")
                          return (
                            <FeatureLabel
                              hasFeature={wallet[feature.filterKey]}
                            >
                              {feature.icon}
                              <p>{feature.label}</p>
                            </FeatureLabel>
                          )
                      })}
                    </div>
                    <div>
                      <h4>Smart contract</h4>
                      {featureDropdownItems.map((feature) => {
                        if (feature.category === "smart_contract")
                          return (
                            <FeatureLabel
                              hasFeature={wallet[feature.filterKey]}
                            >
                              {feature.icon}
                              <p>{feature.label}</p>
                            </FeatureLabel>
                          )
                      })}
                    </div>
                  </WalletMoreInfo>
                </WalletMoreInfoContainer>
                <SocialsContainer>
                  <Socials>
                    <p>{wallet.name} links</p>
                    <Link to={wallet.url} hideArrow={true}>
                      <Icon name="webpage" size={"2rem"} color={true} />
                    </Link>
                    {wallet.twitter && (
                      <Link to={wallet.twitter} hideArrow={true}>
                        <Icon name="twitter" size={"2rem"} color={true} />
                      </Link>
                    )}
                    {wallet.discord && (
                      <Link to={wallet.discord} hideArrow={true}>
                        <Icon name="discord" size={"2rem"} color={true} />
                      </Link>
                    )}
                  </Socials>
                </SocialsContainer>
              </div>
            )}
          </WalletContainer>
        )
      })}
    </Container>
  )
}

export default WalletTable
