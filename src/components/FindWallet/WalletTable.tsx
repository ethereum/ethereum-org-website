// Libraries
import React, { ReactNode, useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { Icon as ChakraIcon } from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

// Components
import ButtonLink from "../ButtonLink"
import Icon from "../Icon"
import Link from "../Link"
import { StyledSelect as Select } from "../SharedStyledComponents"
import Tooltip from "../Tooltip"
import Translation from "../Translation"

// Data
import walletFilterData from "../../data/wallets/wallet-filters"

// Icons
import {
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "../icons/staking"
import {
  BuyCryptoIcon,
  ConnectDappsIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  GasFeeCustomizationIcon,
  HardwareSupportIcon,
  Layer2Icon,
  MultisigIcon,
  NFTSupportIcon,
  NonCustodialIcon,
  OpenSourceWalletIcon,
  RPCImportingIcon,
  SocialRecoverIcon,
  StakingIcon,
  SwapIcon,
  WalletConnectIcon,
  WithdrawCryptoIcon,
} from "../icons/wallets"

// Utils
import { trackCustomEvent } from "../../utils/matomo"
import { getImage } from "../../utils/image"

// Styles
const Container = styled.table`
  width: 100%;
  th {
    font-weight: normal;
    p {
      font-size: 0.9rem;
    }
  }
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
  top: 0;
  padding: 8px;
  background: ${(props) => props.theme.colors.background};
  z-index: 1;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};

  th {
    padding: 0;
    border-bottom: none;
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

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    top: 50;
  }
`

const Wallet = styled(Grid)`
  padding: 25px 4px;
  cursor: pointer;
  td {
    padding: 0;
    border-bottom: none;
    height: 100%;
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
      border-color: ${(props) => props.theme.colors.primary};
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
    border: border: 1px solid ${(props) => props.theme.colors.primary};
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
  align-items: center;
  padding-left: 0.3rem;

  p {
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  p + p {
    margin-top: 0.1rem;
    font-size: 0.9rem;
    line-height: 1rem;
    font-weight: normal;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FlexInfoCenter = styled(FlexInfo)`
  justify-content: center;
  cursor: pointer;
  height: 100%;
  display: flex;
  animation: ${fadeIn} 0.375s;

  &.fade {
    animation: ${fadeOut} 0.375s;
  }
`

const Image = styled(GatsbyImage)`
  height: 56px;
  width: 56px;
`

const SecondaryText = styled.p`
  font-size: 0.7rem;
  line-height: 0.85rem;
  color: ${(props) => props.theme.colors.text200};

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: none;
  }
`

const SecondaryTextMobile = styled.p`
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    display: block;
    font-size: 0.7rem;
    line-height: 0.85rem;
    margin: 0;
    color: ${(props) => props.theme.colors.text200};
  }
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
  :first-child {
    margin: 0.5rem 0 0;
  }

  h4 {
    color: ${(props) => props.theme.colors.primary};
    margin: 0 0.2rem 0.5rem;
    display:block;
    font-size; 1rem;
  }
`

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-wrap: nowrap;
    flex-direction: column;
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
  gap: 0.2rem;
  font-size: 0.9rem;
  line-height: 1rem;
  align-items: center;
  padding: 0.2rem;
  margin: 0 1rem;
  position: relative;
  width: 200px;
  p {
    margin-bottom: 0;
    flex: none;
    color: ${(props) =>
      props.hasFeature
        ? props.theme.colors.text
        : props.theme.colors.secondary};
    text-decoration: ${(props) => (props.hasFeature ? "none" : "line-through")};
  }
  span + p {
    text-decoration: none;
  }
  p + div,
  div + div {
    svg {
      width: 1.5rem;
      fill: ${(props) => props.theme.colors.secondary};
      padding-right: 0.5rem;
    }
  }
`

const FeatureIcon = styled.div<{ hasFeature: boolean }>`
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
`

const SocialsContainer = styled.div`
  margin-top: 1rem;
  p {
    margin: 0;
  }
  a {
    height: 32px;
  }
`

const Socials = styled.div`
  display: flex;
  gap: 0.8rem;
  p {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
  }
  a {
    height: auto;
    align-items: center;
    display: flex;
    transform: scale(1);
    transition: transform 0.1s;
    :hover {
      transform: scale(1.15);
      transition: transform 0.1s;
    }
  }
`

const LastUpdated = styled.p`
  color: ${(props) => props.theme.colors.text300};
  margin: 2rem 0;
  font-size: 0.875rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
`

const StyledIcon = styled(Icon)<{ hasFeature: boolean }>`
  fill: ${(props) =>
    props.hasFeature ? props.theme.colors.text : props.theme.colors.secondary};
  &:hover,
  &:active,
  &:focus {
    fill: ${({ theme }) => theme.colors.primary};
  }
`
// Types
export interface DropdownOption {
  label: string
  value: string
  filterKey: string
  category: string
  icon: ReactNode
}

type ColumnClassName = "firstCol" | "secondCol" | "thirdCol"

// Constants
const firstCol = "firstCol"
const secondCol = "secondCol"
const thirdCol = "thirdCol"

const WalletTable = ({ data, filters, walletData }) => {
  const { t } = useTranslation()
  const featureDropdownItems: Array<DropdownOption> = [
    {
      label: t("page-find-wallet-open-source"),
      value: t("page-find-wallet-open-source"),
      filterKey: "open_source",
      category: "security",
      icon: <OpenSourceWalletIcon />,
    },
    {
      label: t("page-find-wallet-self-custody"),
      value: t("page-find-wallet-self-custody"),
      filterKey: "non_custodial",
      category: "security",
      icon: <NonCustodialIcon />,
    },
    {
      label: t("page-find-wallet-hardware-wallet-support"),
      value: t("page-find-wallet-hardware-wallet-support"),
      filterKey: "hardware_support",
      category: "feature",
      icon: <HardwareSupportIcon />,
    },
    {
      label: t("page-find-wallet-walletconnect"),
      value: t("page-find-wallet-walletconnect"),
      filterKey: "walletconnect",
      category: "feature",
      icon: <WalletConnectIcon />,
    },
    {
      label: t("page-find-wallet-rpc-importing"),
      value: t("page-find-wallet-rpc-importing"),
      filterKey: "rpc_importing",
      category: "feature",
      icon: <RPCImportingIcon />,
    },
    {
      label: t("page-find-wallet-nft-support"),
      value: t("page-find-wallet-nft-support"),
      filterKey: "nft_support",
      category: "feature",
      icon: <NFTSupportIcon />,
    },
    {
      label: t("page-find-wallet-connect-to-dapps"),
      value: t("page-find-wallet-connect-to-dapps"),
      filterKey: "connect_to_dapps",
      category: "feature",
      icon: <ConnectDappsIcon />,
    },
    {
      label: t("page-find-wallet-staking"),
      value: t("page-find-wallet-staking"),
      filterKey: "staking",
      category: "feature",
      icon: <StakingIcon />,
    },
    {
      label: t("page-find-wallet-swaps"),
      value: t("page-find-wallet-swaps"),
      filterKey: "swaps",
      category: "feature",
      icon: <SwapIcon />,
    },
    {
      label: t("page-find-wallet-layer-2"),
      value: t("page-find-wallet-layer-2"),
      filterKey: "layer_2",
      category: "feature",
      icon: <Layer2Icon />,
    },
    {
      label: t("page-find-wallet-gas-fee-customization"),
      value: t("page-find-wallet-gas-fee-customization"),
      filterKey: "gas_fee_customization",
      category: "feature",
      icon: <GasFeeCustomizationIcon />,
    },
    {
      label: t("page-find-wallet-ens-support"),
      value: t("page-find-wallet-ens-support"),
      filterKey: "ens_support",
      category: "feature",
      icon: <ENSSupportIcon />,
    },
    {
      label: t("page-find-wallet-token-importing"),
      value: t("page-find-wallet-token-importing"),
      filterKey: "erc_20_support",
      category: "feature",
      icon: <ERC20SupportIcon />,
    },
    {
      label: t("page-find-wallet-fee-optimization"),
      value: t("page-find-wallet-fee-optimization"),
      filterKey: "eip_1559_support",
      category: "feature",
      icon: <EIP1559Icon />,
    },
    {
      label: t("page-find-wallet-buy-crypto"),
      value: t("page-find-wallet-buy-crypto"),
      filterKey: "buy_crypto",
      category: "trade_and_buy",
      icon: <BuyCryptoIcon />,
    },
    {
      label: t("page-find-wallet-sell-for-fiat"),
      value: t("page-find-wallet-sell-for-fiat"),
      filterKey: "withdraw_crypto",
      category: "trade_and_buy",
      icon: <WithdrawCryptoIcon />,
    },
    {
      label: t("page-find-wallet-multisig"),
      value: t("page-find-wallet-multisig"),
      filterKey: "multisig",
      category: "smart_contract",
      icon: <MultisigIcon />,
    },
    {
      label: t("page-find-wallet-social-recovery"),
      value: t("page-find-wallet-social-recovery"),
      filterKey: "social_recovery",
      category: "smart_contract",
      icon: <SocialRecoverIcon />,
    },
  ]

  const [walletCardData, setWalletData] = useState(
    walletData.map((wallet) => {
      return { ...wallet, moreInfo: false, key: wallet.image_name }
    })
  )
  const [firstFeatureSelect, setFirstFeatureSelect] = useState(
    featureDropdownItems[14]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    featureDropdownItems[1]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    featureDropdownItems[9]
  )

  const updateMoreInfo = (key) => {
    const temp = [...walletCardData]

    for (const [idx, wallet] of temp.entries()) {
      if (wallet.key === key) {
        temp[idx].moreInfo = !temp[idx].moreInfo
        break
      }
    }

    setWalletData(temp)
  }

  const filteredWallets = walletCardData.filter((wallet) => {
    let showWallet = true
    let mobileCheck = true
    let desktopCheck = true
    let browserCheck = true
    let hardwareCheck = true

    const featureFilterKeys = featureDropdownItems.map((item) => item.filterKey)
    const deviceFilters = Object.entries(filters).filter(
      (item) => !featureFilterKeys.includes(item[0])
    )
    const mobileFiltersTrue = deviceFilters
      .filter((item) => item[0] === "ios" || item[0] === "android")
      .filter((item) => item[1])
      .map((item) => item[0])
    const desktopFiltersTrue = deviceFilters
      .filter(
        (item) =>
          item[0] === "linux" || item[0] === "windows" || item[0] === "macOS"
      )
      .filter((item) => item[1])
      .map((item) => item[0])
    const browserFiltersTrue = deviceFilters
      .filter((item) => item[0] === "firefox" || item[0] === "chromium")
      .filter((item) => item[1])
      .map((item) => item[0])
    const hardwareFiltersTrue = deviceFilters
      .filter((item) => item[0] === "hardware")
      .filter((item) => item[1])
      .map((item) => item[0])

    for (let item of mobileFiltersTrue) {
      if (wallet[item]) {
        mobileCheck = true
        break
      } else {
        mobileCheck = false
      }
    }

    for (let item of desktopFiltersTrue) {
      if (wallet[item]) {
        desktopCheck = true
        break
      } else {
        desktopCheck = false
      }
    }

    for (let item of browserFiltersTrue) {
      if (wallet[item]) {
        browserCheck = true
        break
      } else {
        browserCheck = false
      }
    }

    for (let item of hardwareFiltersTrue) {
      if (wallet[item]) {
        hardwareCheck = true
        break
      } else {
        hardwareCheck = false
      }
    }

    featureFilterKeys.forEach((filter) => {
      if (filters[filter] && showWallet === true) {
        showWallet = filters[filter] === wallet[filter]
      }
    })

    return (
      mobileCheck && desktopCheck && browserCheck && hardwareCheck && showWallet
    )
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

  /**
   *
   * @param selectedOption selected dropdown option
   * @param stateUpdateMethod method for updating state for dropdown
   * @param className className of column
   *
   * This method gets the elements with the className, adds a fade class to fade icons out, after 0.5s it will then update state for the dropdown with the selectedOption, and then remove the fade class to fade the icons back in. Then it will send a matomo event for updating the dropdown.
   */
  const updateDropdown = (
    selectedOption: DropdownOption,
    stateUpdateMethod: Function,
    className: ColumnClassName
  ) => {
    const domItems: HTMLCollectionOf<Element> =
      document.getElementsByClassName(className)
    for (let item of domItems) {
      item.classList.add("fade")
    }
    setTimeout(() => {
      stateUpdateMethod(selectedOption)
      for (let item of domItems) {
        item.classList.remove("fade")
      }
    }, 375)

    trackCustomEvent({
      eventCategory: "WalletFeatureCompare",
      eventAction: `Select WalletFeatureCompare`,
      eventName: `${selectedOption.filterKey} selected`,
    })
  }

  const WalletMoreInfo = ({ wallet, filters, idx }) => {
    const walletHasFilter = (filterKey) => {
      return wallet[filterKey] === true
    }
    // Cast as Number because TypeScript warned about sorting implictily by true/false
    const orderedFeatureDropdownItems = [...featureDropdownItems].sort(
      (a, b) =>
        Number(walletHasFilter(b.filterKey)) -
        Number(walletHasFilter(a.filterKey))
    )

    return (
      <div>
        <WalletMoreInfoContainer>
          <div>
            <ColoredLine color={wallet.brand_color} />
          </div>
          <div>
            <WalletMoreInfoCategory>
              <h4>
                <Translation id="page-find-wallet-features" />
              </h4>
              <Features>
                {orderedFeatureDropdownItems.map((feature) => {
                  if (feature.category === "feature")
                    return (
                      <FeatureLabel
                        hasFeature={wallet[feature.filterKey!]}
                        key={feature.label}
                      >
                        <FeatureIcon hasFeature={wallet[feature.filterKey!]}>
                          {feature.icon}
                        </FeatureIcon>
                        <p>{feature.label}</p>
                        <Tooltip
                          content={
                            <p>
                              {t(
                                walletFilterData[feature.filterKey].description
                              )}
                            </p>
                          }
                        >
                          <StyledIcon
                            name="info"
                            hasFeature={wallet[feature.filterKey!]}
                          />
                        </Tooltip>
                      </FeatureLabel>
                    )
                })}
              </Features>
            </WalletMoreInfoCategory>
            <WalletMoreInfoCategory>
              <h4>
                <Translation id="page-find-wallet-security" />
              </h4>
              <Features>
                {orderedFeatureDropdownItems.map((feature) => {
                  if (feature.category === "security")
                    return (
                      <FeatureLabel
                        hasFeature={wallet[feature.filterKey!]}
                        key={feature.label}
                      >
                        <FeatureIcon hasFeature={wallet[feature.filterKey!]}>
                          {feature.icon}
                        </FeatureIcon>
                        <p>{feature.label}</p>
                        <Tooltip
                          content={
                            <p>
                              {t(
                                walletFilterData[feature.filterKey].description
                              )}
                            </p>
                          }
                        >
                          <StyledIcon
                            name="info"
                            hasFeature={wallet[feature.filterKey!]}
                          />
                        </Tooltip>
                      </FeatureLabel>
                    )
                })}
              </Features>
            </WalletMoreInfoCategory>
            <WalletMoreInfoCategory>
              <h4>
                {`${t("page-find-wallet-buy-crypto")} / ${t(
                  "page-find-wallet-sell-for-fiat"
                )}`}
              </h4>
              <Features>
                {orderedFeatureDropdownItems.map((feature) => {
                  if (feature.category === "trade_and_buy")
                    return (
                      <FeatureLabel
                        hasFeature={wallet[feature.filterKey!]}
                        key={feature.label}
                      >
                        <FeatureIcon hasFeature={wallet[feature.filterKey!]}>
                          {feature.icon}
                        </FeatureIcon>
                        <p>{feature.label}</p>
                        <Tooltip
                          content={
                            <p>
                              {t(
                                walletFilterData[feature.filterKey].description
                              )}
                            </p>
                          }
                        >
                          <StyledIcon
                            name="info"
                            hasFeature={wallet[feature.filterKey!]}
                          />
                        </Tooltip>
                      </FeatureLabel>
                    )
                })}
              </Features>
            </WalletMoreInfoCategory>
            <WalletMoreInfoCategory>
              <h4>
                <Translation id="page-find-wallet-smart-contract" />
              </h4>
              <Features>
                {orderedFeatureDropdownItems.map((feature) => {
                  if (feature.category === "smart_contract")
                    return (
                      <FeatureLabel
                        hasFeature={wallet[feature.filterKey!]}
                        key={feature.label}
                      >
                        <FeatureIcon hasFeature={wallet[feature.filterKey!]}>
                          {feature.icon}
                        </FeatureIcon>
                        <p>{feature.label}</p>
                        <Tooltip
                          content={
                            <p>
                              {t(
                                walletFilterData[feature.filterKey].description
                              )}
                            </p>
                          }
                        >
                          <StyledIcon
                            name="info"
                            hasFeature={wallet[feature.filterKey!]}
                          />
                        </Tooltip>
                      </FeatureLabel>
                    )
                })}
              </Features>
            </WalletMoreInfoCategory>
            <LastUpdated>
              <ButtonLink
                to={wallet.url}
                customEventOptions={{
                  eventCategory: "WalletExternalLinkList",
                  eventAction: `Go to wallet`,
                  eventName: `${wallet.name} ${idx}`,
                  eventValue: filters,
                }}
              >
                {`${t("page-find-wallet-check-out")} ${wallet.name}`}
              </ButtonLink>
              <i>
                {`${wallet.name} ${t("page-find-wallet-info-updated-on")} ${
                  wallet.last_updated
                }`}
              </i>
            </LastUpdated>
          </div>
        </WalletMoreInfoContainer>
      </div>
    )
  }

  return (
    <Container>
      <WalletContentHeader>
        <th>
          {filteredWallets.length === walletCardData.length ? (
            <p>
              {t("page-find-wallet-showing-all-wallets")} (
              <strong>{walletCardData.length}</strong>)
            </p>
          ) : (
            <p>
              {t("page-find-wallet-showing")}{" "}
              <strong>
                {filteredWallets.length} / {walletCardData.length}
              </strong>{" "}
              {t("page-find-wallet-wallets")}
            </p>
          )}
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setFirstFeatureSelect, firstCol)
            }}
            defaultValue={firstFeatureSelect}
            isSearchable={false}
          />
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setSecondFeatureSelect, secondCol)
            }}
            defaultValue={secondFeatureSelect}
            isSearchable={false}
          />
        </th>
        <th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-find-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setThirdFeatureSelect, thirdCol)
            }}
            defaultValue={thirdFeatureSelect}
            isSearchable={false}
          />
        </th>
      </WalletContentHeader>
      {filteredWallets.map((wallet, idx) => {
        const deviceLabels: Array<string> = []

        wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
        wallet.android && deviceLabels.push(t("page-find-wallet-android"))
        wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
        wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
        wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
        wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
        wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
        wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))

        return (
          <WalletContainer key={wallet.key}>
            <Wallet
              onClick={() => {
                updateMoreInfo(wallet.key)
                trackCustomEvent({
                  eventCategory: "WalletMoreInfo",
                  eventAction: `More info wallet`,
                  eventName: `More info ${wallet.name} ${wallet.moreInfo}`,
                })
              }}
            >
              <td>
                <FlexInfo>
                  <div>
                    <Image
                      image={getImage(data[wallet.image_name])!}
                      alt=""
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p>{wallet.name}</p>
                    <SecondaryText>{deviceLabels.join(" | ")}</SecondaryText>
                    {deviceLabels.map((label) => (
                      <SecondaryTextMobile key={label}>
                        {label}
                      </SecondaryTextMobile>
                    ))}
                    <SocialsContainer>
                      <Socials>
                        <Link
                          to={wallet.url}
                          hideArrow={true}
                          customEventOptions={{
                            eventCategory: "WalletExternalLinkList",
                            eventAction: `Go to wallet`,
                            eventName: `${wallet.name} ${idx}`,
                            eventValue: filters,
                          }}
                        >
                          <Icon name="webpage" size={"1.5rem"} color={true} />
                        </Link>
                        {wallet.twitter && (
                          <Link
                            to={wallet.twitter}
                            hideArrow={true}
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: filters,
                            }}
                          >
                            <Icon name="twitter" size={"1.5rem"} color={true} />
                          </Link>
                        )}
                        {wallet.discord && (
                          <Link
                            to={wallet.discord}
                            hideArrow={true}
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: filters,
                            }}
                          >
                            <Icon name="discord" size={"1.5rem"} color={true} />
                          </Link>
                        )}
                      </Socials>
                    </SocialsContainer>
                  </div>
                </FlexInfo>
              </td>
              <td>
                <FlexInfoCenter className={firstCol}>
                  {wallet[firstFeatureSelect.filterKey!] ? (
                    <GreenCheckProductGlyphIcon />
                  ) : (
                    <WarningProductGlyphIcon />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter className={secondCol}>
                  {wallet[secondFeatureSelect.filterKey!] ? (
                    <GreenCheckProductGlyphIcon />
                  ) : (
                    <WarningProductGlyphIcon />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter className={thirdCol}>
                  {wallet[thirdFeatureSelect.filterKey!] ? (
                    <GreenCheckProductGlyphIcon />
                  ) : (
                    <WarningProductGlyphIcon />
                  )}
                </FlexInfoCenter>
              </td>
              <td>
                <FlexInfoCenter>
                  <div>
                    <WalletMoreInfoArrow
                      name={wallet.moreInfo ? "chevronUp" : "chevronDown"}
                    />
                  </div>
                </FlexInfoCenter>
              </td>
            </Wallet>
            {wallet.moreInfo && (
              <WalletMoreInfo wallet={wallet} filters={filters} idx={idx} />
            )}
          </WalletContainer>
        )
      })}
    </Container>
  )
}

export default WalletTable
