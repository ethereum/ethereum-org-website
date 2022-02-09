import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useIntl } from "gatsby-plugin-intl"
import Select from "react-select"
import styled from "styled-components"

import CardList from "./CardList"
import Link from "./Link"
import { getLocaleTimestamp } from "../utils/time"
import { trackCustomEvent } from "../utils/matomo"
import Emoji from "./Emoji"
import Translation from "./Translation"
import { translateMessageId } from "../utils/translations"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// https://react-select.com/styles#using-classnames
// Pass menuIsOpen={true} to component to debug
const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 640px;
  color: black;
  /* Component */
  .react-select__control {
    border: 1px solid ${(props) => props.theme.colors.searchBorder};
    background: ${(props) => props.theme.colors.searchBackground};
    /* Dropdown arrow */
    .react-select__indicator {
      color: ${(props) => props.theme.colors.searchBorder};
    }
    &.react-select__control--is-focused {
      border-color: ${(props) => props.theme.colors.primary} !important;
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary} !important;
      .react-select__value-container {
        border-color: ${(props) => props.theme.colors.primary} !important;
      }
    }
  }
  .react-select__placeholder {
    color: ${(props) => props.theme.colors.text200};
  }
  .react-select__single-value {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__menu {
    background: ${(props) => props.theme.colors.searchBackground};
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__input {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__option {
    &:hover {
      background-color: ${(props) => props.theme.colors.selectHover};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.selectActive};
      color: ${(props) => props.theme.colors.buttonColor} !important;
    }
  }
  .react-select__option--is-focused {
    background-color: ${(props) => props.theme.colors.selectHover};
  }
  .react-select__option--is-selected {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.buttonColor};
    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
`

const ListContainer = styled.div`
  margin-top: 4rem;
  flex: 1 1 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex: 1 1 100%;
  }
`

const ResultsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 876px;

  ${ListContainer}:first-child {
    margin-right: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-wrap: wrap;
    ${ListContainer}:first-child {
      margin-right: 0;
    }
  }
`

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`

const EmptyStateContainerSingle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

const EmptyStateText = styled.p`
  margin: 2rem;
  font-size: 1.25rem;
  max-width: 450px;
  text-align: center;
`

const EmptyStateTextSingle = styled.p`
  max-width: 450px;
  margin-bottom: 4rem;
`

const Intro = styled.p`
  font-size: 1rem;
  line-height: 140%;
  margin-top: 0rem;
  margin-bottom: 2rem;
  max-width: 640px;
  text-align: center;
`

const Disclaimer = styled.p`
  width: 100%;
  max-width: 876px;
  margin-top: 4rem;
  margin-bottom: 0;
`

const NoResults = ({ children }) => (
  <EmptyStateContainer>
    <Emoji text=":crying_face:" size={5} />
    <EmptyStateText>
      {children}{" "}
      <Link to="mailto:website@ethereum.org">website@ethereum.org</Link>.
    </EmptyStateText>
  </EmptyStateContainer>
)

const NoResultsSingle = ({ children }) => (
  <EmptyStateContainerSingle>
    <EmptyStateTextSingle>
      {children}{" "}
      <Link to="mailto:website@ethereum.org">website@ethereum.org</Link>.
    </EmptyStateTextSingle>
    <Emoji text=":crying_face:" size={5} />
  </EmptyStateContainerSingle>
)

export const cardListImage = graphql`
  fragment cardListImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

// TODO move component into get-eth.js page?
const EthExchanges = () => {
  const intl = useIntl()
  const placeholderString = translateMessageId(
    "page-get-eth-exchanges-search",
    intl
  )
  const data = useStaticQuery(graphql`
    query {
      exchangesByCountry: allExchangesByCountryCsv {
        nodes {
          binance
          bitbuy
          bittrex
          bitvavo
          coinbase
          coinmama
          coinspot
          country
          cryptocom
          gemini
          itezcom
          kraken
          moonpay
          rain
          simplex
          wyre
        }
      }
      timestamp: exchangesByCountryCsv {
        parent {
          ... on File {
            id
            name
            fields {
              gitLogLatestDate
            }
          }
        }
      }
      argent: file(relativePath: { eq: "wallets/argent.png" }) {
        ...cardListImage
      }
      binance: file(relativePath: { eq: "exchanges/binance.png" }) {
        ...cardListImage
      }
      bitbuy: file(relativePath: { eq: "exchanges/bitbuy.png" }) {
        ...cardListImage
      }
      bittrex: file(relativePath: { eq: "exchanges/bittrex.png" }) {
        ...cardListImage
      }
      bitvavo: file(relativePath: { eq: "exchanges/bitvavo.png" }) {
        ...cardListImage
      }
      coinbase: file(relativePath: { eq: "exchanges/coinbase.png" }) {
        ...cardListImage
      }
      coinmama: file(relativePath: { eq: "exchanges/coinmama.png" }) {
        ...cardListImage
      }
      coinspot: file(relativePath: { eq: "exchanges/coinspot.png" }) {
        ...cardListImage
      }
      cryptocom: file(relativePath: { eq: "exchanges/crypto.com.png" }) {
        ...cardListImage
      }
      gemini: file(relativePath: { eq: "exchanges/gemini.png" }) {
        ...cardListImage
      }
      imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
        ...cardListImage
      }
      itezcom: file(relativePath: { eq: "exchanges/itezcom.png" }) {
        ...cardListImage
      }
      kraken: file(relativePath: { eq: "exchanges/kraken.png" }) {
        ...cardListImage
      }
      myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
        ...cardListImage
      }
      mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
        ...cardListImage
      }
      rain: file(relativePath: { eq: "exchanges/rain.png" }) {
        ...cardListImage
      }
      squarelink: file(relativePath: { eq: "wallets/squarelink.png" }) {
        ...cardListImage
      }
      trust: file(relativePath: { eq: "wallets/trust.png" }) {
        ...cardListImage
      }
    }
  `)

  const exchanges = {
    binance: {
      name: "Binance",
      url: "https://www.binance.com/en",
      image: data.binance,
      usaExceptions: [
        "AL",
        "AK",
        "CT",
        "FL",
        "GA",
        "HI",
        "ID",
        "LA",
        "NY",
        "NC",
        "TX",
        "VT",
        "WA",
      ],
    },
    bitbuy: {
      name: "Bitbuy",
      url: "https://bitbuy.ca/",
      image: data.bitbuy,
      usaExceptions: [],
    },
    bittrex: {
      name: "Bittrex",
      url: "https://global.bittrex.com/",
      image: data.bittrex,
      usaExceptions: ["CT", "HI", "NY", "NH", "TX", "VT", "VA"],
    },
    bitvavo: {
      name: "Bitvavo",
      url: "https://bitvavo.com/en/ethereum",
      image: data.bitvavo,
      usaExceptions: [],
    },
    coinbase: {
      name: "Coinbase",
      url: "https://www.coinbase.com/",
      image: data.coinbase,
      usaExceptions: ["HI"],
    },
    coinmama: {
      name: "Coinmama",
      url: "https://www.coinmama.com/",
      image: data.coinmama,
      usaExceptions: ["CT", "FL", "IA", "NY"],
    },
    coinspot: {
      name: "CoinSpot",
      url: "https://www.coinspot.com.au/",
      image: data.coinspot,
      usaExceptions: [],
    },
    cryptocom: {
      name: "Crypto.com",
      url: "https://crypto.com/exchange/",
      image: data.cryptocom,
      usaExceptions: ["NY"],
    },
    itezcom: {
      name: "Itez",
      url: "https://itez.com/",
      image: data.itezcom,
      usaExceptions: [],
    },
    kraken: {
      name: "Kraken",
      url: "https://www.kraken.com/",
      image: data.kraken,
      usaExceptions: ["NY, WA"],
    },
    gemini: {
      name: "Gemini",
      url: "https://gemini.com/",
      image: data.gemini,
      usaExceptions: ["HI"],
    },
    rain: {
      name: "Rain",
      url: "https://rain.bh",
      image: data.rain,
      usaExceptions: [],
    },
  }

  const walletProviders = {
    wyre: {
      usaExceptions: ["CT", "HI", "NY", "NH", "TX", "VT", "VA"],
      wallets: {
        Squarelink: {
          url: "https://squarelink.com/	",
          platform: "Web",
          image: data.squarelink,
        },
      },
    },
    moonpay: {
      usaExceptions: [
        "CT",
        "HI",
        "IA",
        "KS",
        "KY",
        "MS",
        "NE",
        "NM",
        "NY",
        "RI",
        "WV",
      ],
      wallets: {
        Argent: {
          url: "https://www.argent.xyz/	",
          platform: "Mobile",
          image: data.argent,
        },
        imToken: {
          url: "https://token.im/ ",
          platform: "Mobile",
          image: data.imtoken,
        },
        Trust: {
          url: "https://trustwallet.com/	",
          platform: "Mobile",
          image: data.trust,
        },
        MyCrypto: {
          url: "https://app.mycrypto.com",
          platform: "Web",
          image: data.mycrypto,
        },
      },
    },
    simplex: {
      usaExceptions: ["AL", "AK", "NM", "HI", "NV", "WA", "VT", "NY"],
      wallets: {
        MyEtherWallet: {
          url: "https://www.myetherwallet.com/",
          platform: "Mobile/Web",
          image: data.myetherwallet,
        },
      },
    },
  }

  const lastUpdated = getLocaleTimestamp(
    intl.locale,
    data.timestamp.parent.fields.gitLogLatestDate
  )

  const [state, setState] = useState({ selectedCountry: {} })

  const handleSelectChange = (selectedOption) => {
    trackCustomEvent({
      eventCategory: `Country input`,
      eventAction: `Selected`,
      eventName: selectedOption.country,
    })
    setState({ selectedCountry: selectedOption })
  }

  // Add `value` & `label` for Select component
  const exchangesByCountry = data.exchangesByCountry.nodes
    .map((node) => {
      node.value = node.country
      node.label = node.country
      return node
    })
    .sort((a, b) => a.country.localeCompare(b.country))

  const exchangesArray = Object.keys(exchanges)
  const walletProvidersArray = Object.keys(walletProviders)
  // Construct arrays for CardList
  let filteredExchanges = []
  let filteredWalletProviders = []
  let filteredWallets = []

  const hasSelectedCountry = !!state.selectedCountry.country
  if (hasSelectedCountry) {
    // Filter to exchanges that serve selected Country
    filteredExchanges = exchangesArray
      .filter((exchange) => state.selectedCountry[exchange] === "TRUE")
      // Format array for <CardList/>
      .map((exchange) => {
        // Add state exceptions if Country is USA
        let description = null
        if (
          state.selectedCountry.country ===
          translateMessageId("page-get-eth-exchanges-usa", intl)
        ) {
          const exceptions = exchanges[exchange].usaExceptions
          if (exceptions.length > 0) {
            description = `${translateMessageId(
              "page-get-eth-exchanges-except",
              intl
            )} ${exceptions.join(", ")}`
          }
        }
        return {
          title: exchanges[exchange].name,
          description,
          link: exchanges[exchange].url,
          image: getImage(exchanges[exchange].image),
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))

    // Filter to wallet providers that serve selected Country
    filteredWalletProviders = walletProvidersArray.filter(
      (provider) => state.selectedCountry[provider] === "TRUE"
    )
  }
  if (filteredWalletProviders.length) {
    // Construct wallets based on the provider
    filteredWallets = filteredWalletProviders
      .reduce((res, currentProvider) => {
        const wallets = Object.keys(walletProviders[currentProvider].wallets)
        // Flatten data into single array for <CardList/>
        return res.concat(
          wallets.reduce((result, currentWallet) => {
            const walletObject =
              walletProviders[currentProvider].wallets[currentWallet]
            // Add state exceptions if Country is USA
            let description = null
            if (
              state.selectedCountry.country ===
              translateMessageId("page-get-eth-exchanges-usa", intl)
            ) {
              const exceptions = walletProviders[currentProvider].usaExceptions
              if (exceptions.length > 0) {
                description = `${translateMessageId(
                  "page-get-eth-exchanges-except",
                  intl
                )} ${exceptions.join(", ")}`
              }
              // Filter out wallets that only service USA
            } else if (walletObject.isUsaOnly) {
              return result
            }
            return result.concat({
              title: currentWallet,
              description,
              link: walletObject.url,
              image: getImage(walletObject.image),
            })
          }, [])
        )
      }, [])
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  const hasExchangeResults = filteredExchanges.length > 0
  const hasWalletResults = filteredWallets.length > 0

  return (
    <Container>
      <h2>
        <Translation id="page-get-eth-exchanges-header" />
      </h2>
      <Intro>
        <Translation id="page-get-eth-exchanges-intro" />
      </Intro>
      <StyledSelect
        className="react-select-container"
        classNamePrefix="react-select"
        options={exchangesByCountry}
        onChange={handleSelectChange}
        placeholder={placeholderString}
      />
      {!hasSelectedCountry && (
        <EmptyStateContainer>
          <Emoji text=":world_map:" size={5} />
          <EmptyStateText>
            <Translation id="page-get-eth-exchanges-empty-state-text" />
          </EmptyStateText>
        </EmptyStateContainer>
      )}
      {/* No results */}
      {hasSelectedCountry && !hasExchangeResults && !hasWalletResults && (
        <ResultsContainer>
          <NoResults>
            <Translation id="page-get-eth-exchanges-no-exchanges-or-wallets" />
          </NoResults>
        </ResultsContainer>
      )}
      {/* Has results */}
      {(hasExchangeResults || hasWalletResults) && (
        <>
          <ResultsContainer>
            <ListContainer>
              <h3>
                <Translation id="page-get-eth-exchanges-header-exchanges" />
              </h3>
              {hasExchangeResults && (
                <SuccessContainer>
                  <p>
                    <Translation id="page-get-eth-exchanges-success-exchange" />
                  </p>
                  <CardList content={filteredExchanges} />
                </SuccessContainer>
              )}
              {!hasExchangeResults && (
                <NoResultsSingle>
                  <Translation id="page-get-eth-exchanges-no-exchanges" />
                </NoResultsSingle>
              )}
            </ListContainer>
            <ListContainer>
              <h3>
                <Translation id="page-get-eth-exchanges-header-wallets" />
              </h3>

              {hasWalletResults && (
                <SuccessContainer>
                  <p>
                    <Translation id="page-get-eth-exchanges-success-wallet-paragraph" />{" "}
                    <Link to="/wallets/">
                      <Translation id="page-get-eth-exchanges-success-wallet-link" />
                    </Link>
                    .
                  </p>
                  <CardList content={filteredWallets} />
                </SuccessContainer>
              )}
              {!hasWalletResults && (
                <NoResultsSingle>
                  <Translation id="page-get-eth-exchanges-no-wallets" />
                </NoResultsSingle>
              )}
            </ListContainer>
          </ResultsContainer>
          <Disclaimer>
            <Translation id="page-get-eth-exchanges-disclaimer" />{" "}
            <Link to="mailto:website@ethereum.org">website@ethereum.org</Link>.
            <Translation id="page-find-wallet-last-updated" />{" "}
            <strong>{lastUpdated}</strong>
          </Disclaimer>
        </>
      )}
    </Container>
  )
}

export default EthExchanges
