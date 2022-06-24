// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

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
import Warning from "../../assets/staking/warning-product-glyph.svg"
import GreenCheck from "../../assets/staking/green-check-product-glyph.svg"
import { opacify } from "polished"
import { opacity } from "styled-system"

// Styles
const Container = styled.table`
  width: 100%;
`

const WalletContainer = styled(Container)`
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  :hover {
    background: ${(props) => props.theme.colors.boxShadow};
    transition: 0.5s all;
  }
`

const Grid = styled.tr`
  display: grid;
  grid-template-columns: 40% auto auto auto 5%;
  width: 100%;
  column-gap: 0.5rem;
  align-items: center;

  p {
    margin: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 60% auto 0% 0% 5%;

    th:nth-of-type(3) {
      display: none;
    }
    th:nth-of-type(4) {
      display: none;
    }

    td:nth-of-type(3) {
      display: none;
    }
    td:nth-of-type(4) {
      display: none;
    }
  }
`

const WalletContentHeader = styled(Grid)`
  position: sticky;
  top: 76px;
  padding: 8px;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  th {
    padding: 0;
    border-bottom: none;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    top: 140px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    grid-template-columns: auto;
    gap: 1rem;
    text-align: center;
    th:nth-of-type(1) {
      text-align: center;
    }
    th:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 1rem;
      &:before {
        white-space: nowrap;
        content: "Compare features";
      }
    }
  }
`

const Wallet = styled(Grid)`
  padding: 25px 4px;
  td {
    padding: 0;
    border-bottom: none;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 25px 1rem;
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  .react-select__control {
    border: 1px solid ${(props) => props.theme.colors.text};
    background: none;
    cursor: pointer;
    font-size: 0.9rem;
    padding-right: 0.3rem;
    transition: 0.5s all;
    svg {
      fill: ${(props) => props.theme.colors.text};
      transition: 0.5s all;
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
        padding: 0;
      }
    }

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      cursor: pointer;
      border: 1px solid ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.background};
      transition: 0.5s all;
      svg {
        fill: ${(props) => props.theme.colors.background};
        transition: 0.5s all;
      }

      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.background};
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
      fill: ${(props) => props.theme.colors.background};
      transition: 0.5s all;
    }

    .react-select__value-container {
      .react-select__single-value {
        color: ${(props) => props.theme.colors.background};
      }
    }

    .react-select__indicators {
      background: ${(props) => props.theme.colors.primary};
      .react-select__value-container {
        .react-select__single-value {
          color: ${(props) => props.theme.colors.background};
        }
      }

      .react-select__indicators {
        .react-select__indicator {
          color: ${(props) => props.theme.colors.background};
        }
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 0;
    }
  }
`

const FlexInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: start;

  p {
    padding: 0;
    font-size: 1.2rem;
  }
  p + p {
    margin: 0.1rem 0 1rem;
    font-size: 0.9rem;
    line-height: 1rem;
  }
  p + a {
    font-size: 0.9rem;
    border: 1px solid ${(props) => props.theme.colors.primary};
    padding: 4px 8px;
    margin-top: 1rem;
    border-radius: 4px;
    text-decoration: none;
    transition: 0.5s all;
    :after {
      display: none;
    }
    :hover {
      background: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.background};
      transition: 0.5s all;
    }
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

const WalletMoreInfoArrow = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const WalletMoreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 65px auto;
  width: 100%;
`

const WalletMoreInfoCategory = styled.div`
  width: 100%;
  margin: 3rem 0 0;
    :first-child{
      margin: 0.5rem 0 0;
    }

  h4 {
    color: ${(props) => props.theme.colors.primary};
    margin: 0 0 0.5rem;
  }
`

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
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
  gap: 0.2rem;
  font-size: 0.9rem;
  line-height: 1rem;
  align-items: center;
  padding: 0.2rem;
  margin: 0 1rem;
  position:relative;
  svg {
    width: 1.75rem;
    height: 1.75rem;

    path {
      fill: ${(props) =>
        props.hasFeature
          ? props.theme.colors.text
          : props.theme.colors.secondary};
    }
  }
  p {
    margin-bottom: 0;
    color: ${(props) =>
      props.hasFeature
        ? props.theme.colors.text
        : props.theme.colors.secondary};
  }
  :after{
    content:"";
    display:block;
    height:1px;
    width: 100%;
    background:${(props) =>
      props.hasFeature
        ? "rgba(0, 0, 0, 0)"
        : props.theme.colors.secondary};
    position:absolute;
  }
`

const SocialsContainer = styled.div`
  padding-bottom: 2rem;
  p {
    margin: 0;
  }
  a {
    height: 32px;
  }
`

const Socials = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
`

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text300};
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
    featureDropdownItems[1]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    featureDropdownItems[13]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    featureDropdownItems[9]
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

  const filteredFeatureDropdownItems = [...featureDropdownItems].filter(
    (item) => {
      return (
        item.label !== firstFeatureSelect.label &&
        item.label !== secondFeatureSelect.label &&
        item.label !== thirdFeatureSelect.label
      )
    }
  )

  return (
    <Container>
      <WalletContentHeader>
        <th>
          <p>
            <strong>Showing {filteredWallets.length} wallets</strong> out of{" "}
            {walletCardData.length}
          </p>
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={filteredFeatureDropdownItems}
            onChange={(selectedOption) => {
              setFirstFeatureSelect(selectedOption)
            }}
            defaultValue={firstFeatureSelect}
            isSearchable={false}
          />
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={filteredFeatureDropdownItems}
            onChange={(selectedOption) => {
              setSecondFeatureSelect(selectedOption)
            }}
            defaultValue={secondFeatureSelect}
            isSearchable={false}
          />
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={filteredFeatureDropdownItems}
            onChange={(selectedOption) => {
              setThirdFeatureSelect(selectedOption)
            }}
            defaultValue={thirdFeatureSelect}
            isSearchable={false}
          />
        </th>
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
              <td>
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
                    <Link to={wallet.url}>Go to {wallet.name}</Link>
                  </div>
                </FlexInfo>
              </td>
              <td>
                <FlexInfoCenter onClick={() => updateMoreInfo(idx)}>
                  {wallet[firstFeatureSelect.filterKey] ? (
                    <GreenCheck />
                  ) : (
                    <Warning />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter onClick={() => updateMoreInfo(idx)}>
                  {wallet[secondFeatureSelect.filterKey] ? (
                    <GreenCheck />
                  ) : (
                    <Warning />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter onClick={() => updateMoreInfo(idx)}>
                  {wallet[thirdFeatureSelect.filterKey] ? (
                    <GreenCheck />
                  ) : (
                    <Warning />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
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
              </td>
            </Wallet>
            {wallet.moreInfo && (
              <div>
                <WalletMoreInfoContainer>
                  <div>
                    <ColoredLine color={wallet.brand_color} />
                  </div>
                  <div>
                    <WalletMoreInfoCategory>
                      <h4>Features</h4>
                      <Features>
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
                      </Features>
                    </WalletMoreInfoCategory>
                    <WalletMoreInfoCategory>
                      <h4>Security</h4>
                      <Features>
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
                      </Features>
                    </WalletMoreInfoCategory>
                    <WalletMoreInfoCategory>
                      <h4>Trade & buy</h4>
                      <Features>
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
                      </Features>
                    </WalletMoreInfoCategory>
                    <WalletMoreInfoCategory>
                      <h4>Smart contract</h4>
                      <Features>
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
                      </Features>
                    </WalletMoreInfoCategory>
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
                      <LastUpdated>
                        <i>
                          {wallet.name} info updated on {wallet.last_updated}
                        </i>
                      </LastUpdated>
                    </SocialsContainer>
                  </div>
                </WalletMoreInfoContainer>
              </div>
            )}
          </WalletContainer>
        )
      })}
    </Container>
  )
}

export default WalletTable
