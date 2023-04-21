// Libraries
import React, { ReactNode } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { useTranslation } from "gatsby-plugin-react-i18next"

// Components
import Icon from "../../Icon"
import Link from "../../Link"
import { StyledSelect as Select } from "../../SharedStyledComponents"

// Icons
import {
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "../../icons/staking"

// Utils
import { trackCustomEvent } from "../../../utils/matomo"
import { getImage } from "../../../utils/image"
import { useWalletTable } from "./useWalletTable"
import { WalletData } from "../../../data/wallets/wallet-data"
import { WalletMoreInfo } from "./WalletMoreInfo"

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
// Pass menuIsOpen to component to debug
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
    border: 1px solid ${(props) => props.theme.colors.primary};
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

// Types
export interface DropdownOption {
  label: string
  value: string
  filterKey: string
  category: string
  icon: ReactNode
}

// Constants
const firstCol = "firstCol"
const secondCol = "secondCol"
const thirdCol = "thirdCol"

export interface WalletTableProps {
  data: Record<string, any>
  filters: Record<string, boolean>
  walletData: WalletData[]
}

const WalletTable = ({ data, filters, walletData }: WalletTableProps) => {
  const { t } = useTranslation()
  const {
    featureDropdownItems,
    filteredFeatureDropdownItems,
    filteredWallets,
    setFirstFeatureSelect,
    setSecondFeatureSelect,
    setThirdFeatureSelect,
    updateDropdown,
    updateMoreInfo,
    firstFeatureSelect,
    secondFeatureSelect,
    thirdFeatureSelect,
    walletCardData,
  } = useWalletTable({ filters, t, walletData })

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
                          hideArrow
                          customEventOptions={{
                            eventCategory: "WalletExternalLinkList",
                            eventAction: `Go to wallet`,
                            eventName: `${wallet.name} ${idx}`,
                            eventValue: JSON.stringify(filters),
                          }}
                        >
                          <Icon name="webpage" size={"1.5rem"} color />
                        </Link>
                        {wallet.twitter && (
                          <Link
                            to={wallet.twitter}
                            hideArrow
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: JSON.stringify(filters),
                            }}
                          >
                            <Icon name="twitter" size={"1.5rem"} color />
                          </Link>
                        )}
                        {wallet.discord && (
                          <Link
                            to={wallet.discord}
                            hideArrow
                            customEventOptions={{
                              eventCategory: "WalletExternalLinkList",
                              eventAction: `Go to wallet`,
                              eventName: `${wallet.name} ${idx}`,
                              eventValue: JSON.stringify(filters),
                            }}
                          >
                            <Icon name="discord" size={"1.5rem"} color />
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
              <WalletMoreInfo
                wallet={wallet}
                filters={filters}
                idx={idx}
                featureDropdownItems={featureDropdownItems}
              />
            )}
          </WalletContainer>
        )
      })}
    </Container>
  )
}

export default WalletTable
