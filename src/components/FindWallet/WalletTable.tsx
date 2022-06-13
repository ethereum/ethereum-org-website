// Libraries
import React, { useState } from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

// Components
import Icon from "../Icon"
import Link from "../Link"
import { StyledSelect as Select } from "../SharedStyledComponents"

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
`

const WalletContentHeader = styled(Grid)`
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  position: sticky;
  top: 76px;
  padding-top: 8px;
  background: ${(props) => props.theme.colors.background};

  span {
    color: ${(props) => props.theme.colors.primary};
  }
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  .react-select__control {
    border: none;
    background: none;
    cursor: pointer;

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

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    .react-select__control {
      padding: 14px 0;
    }
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
    margin: 0;
    padding: 0;
  }
`

const FlexInfoCenter = styled(FlexInfo)`
  justify-content: center;
`

const Image = styled(GatsbyImage)`
  height: 56px;
  width: 56px;
`

const SecondaryText = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.text200};
`

const WalletFeatureCircle = styled(Icon)<{ hasFeature: boolean }>`
  fill: ${(props) =>
    props.hasFeature ? props.theme.colors.primary : props.theme.colors.text200};
`

const WalletMoreInfoArrow = styled(Icon)`
  fill: ${(props) => props.theme.colors.primary};
`

const WalletMoreInfo = styled.div`
  display: grid;
  grid-template-columns: 65px auto auto auto auto;
  width: 100%;
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

const FeatureLabel = styled.p<{ hasFeature: boolean }>`
  color: ${(props) =>
    props.hasFeature ? props.theme.colors.primary : props.theme.colors.text200};
`

// Constants
const featureDropdownItems = [
  {
    label: "Open source",
    value: "Open source",
    filterKey: "open_source",
    category: "security",
  },
  {
    label: "Self custody",
    value: "Self custody",
    filterKey: "non_custodial",
    category: "security",
  },
  {
    label: "Hardware wallet support",
    value: "Hardware wallet support",
    filterKey: "hardware_support",
    category: "feature",
  },
  {
    label: "WalletConnect",
    value: "WalletConnect",
    filterKey: "walletconnect",
    category: "feature",
  },
  {
    label: "RPC importing",
    value: "RPC importing",
    filterKey: "rpc_importing",
    category: "feature",
  },
  {
    label: "NFT support",
    value: "NFT support",
    filterKey: "nft_support",
    category: "feature",
  },
  {
    label: "Connect to dapps",
    value: "Connect to dapps",
    filterKey: "connect_to_dapps",
    category: "feature",
  },
  {
    label: "Staking",
    value: "Staking",
    filterKey: "staking",
    category: "feature",
  },
  {
    label: "Swaps",
    value: "Swaps",
    filterKey: "swaps",
    category: "feature",
  },
  {
    label: "Layer 2",
    value: "Layer 2",
    filterKey: "layer_2",
    category: "feature",
  },
  {
    label: "Gas fee customization",
    value: "Gas fee customization",
    filterKey: "gas_fee_customization",
    category: "feature",
  },
  {
    label: "ENS support",
    value: "ENS support",
    filterKey: "ens_support",
    category: "feature",
  },
  {
    label: "Token importing",
    value: "Token importing",
    filterKey: "erc_20_support",
    category: "feature",
  },
  {
    label: "Buy crypto",
    value: "Buy crypto",
    filterKey: "buy_crypto",
    category: "trade_and_buy",
  },
  {
    label: "Withdraw crypto",
    value: "Withdraw crypto",
    filterKey: "withdraw_crypto",
    category: "trade_and_buy",
  },
  {
    label: "Multisig",
    value: "Multisig",
    filterKey: "multisig",
    category: "smart_contract",
  },
  {
    label: "Social recovery",
    value: "Social recovery",
    filterKey: "social_recovery",
    category: "smart_contract",
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
          defaultValue={firstFeatureSelect}
        />
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setSecondFeatureSelect(selectedOption)
          }}
          defaultValue={secondFeatureSelect}
        />
        <StyledSelect
          className="react-select-container"
          classNamePrefix="react-select"
          options={featureDropdownItems}
          onChange={(selectedOption) => {
            setThirdFeatureSelect(selectedOption)
          }}
          defaultValue={thirdFeatureSelect}
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
              <FlexInfoCenter>
                <WalletFeatureCircle
                  name="circle"
                  hasFeature={wallet[firstFeatureSelect.filterKey]}
                />
              </FlexInfoCenter>
              <FlexInfoCenter>
                <WalletFeatureCircle
                  name="circle"
                  hasFeature={wallet[secondFeatureSelect.filterKey]}
                />
              </FlexInfoCenter>
              <FlexInfoCenter>
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
                <WalletMoreInfo>
                  <div>
                    <ColoredLine color={wallet.brand_color} />
                  </div>
                  <div>
                    <h4>Features</h4>
                    {featureDropdownItems.map((feature) => {
                      if (feature.category === "feature")
                        return (
                          <FeatureLabel hasFeature={wallet[feature.filterKey]}>
                            {feature.label}
                          </FeatureLabel>
                        )
                    })}
                  </div>
                  <div>
                    <h4>Security</h4>
                    {featureDropdownItems.map((feature) => {
                      if (feature.category === "security")
                        return (
                          <FeatureLabel hasFeature={wallet[feature.filterKey]}>
                            {feature.label}
                          </FeatureLabel>
                        )
                    })}
                  </div>
                  <div>
                    <h4>Trade & buy</h4>
                    {featureDropdownItems.map((feature) => {
                      if (feature.category === "trade_and_buy")
                        return (
                          <FeatureLabel hasFeature={wallet[feature.filterKey]}>
                            {feature.label}
                          </FeatureLabel>
                        )
                    })}
                  </div>
                  <div>
                    <h4>Smart contract</h4>
                    {featureDropdownItems.map((feature) => {
                      if (feature.category === "smart_contract")
                        return (
                          <FeatureLabel hasFeature={wallet[feature.filterKey]}>
                            {feature.label}
                          </FeatureLabel>
                        )
                    })}
                  </div>
                </WalletMoreInfo>
                <p>Socials</p>
              </div>
            )}
          </WalletContainer>
        )
      })}
    </Container>
  )
}

export default WalletTable
