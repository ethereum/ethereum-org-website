import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import Select from "react-select"
import styled from "styled-components"
import { Twemoji } from "react-emoji-render"

import CardList from "./CardList"
import Link from "./Link"
import { getLocaleTimestamp } from "../utils/moment"

const Emoji = styled(Twemoji)`
  & > img {
    width: 5em !important;
    height: 5em !important;
  }
`

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
  .react-select__control {
    border: 1px solid ${(props) => props.theme.colors.searchBorder};
    background: ${(props) => props.theme.colors.searchBackground};
  }
  .react-select__single-value {
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__menu {
    background: ${(props) => props.theme.colors.searchBackground};
    color: ${(props) => props.theme.colors.text};
  }
  .react-select__option {
    &:hover {
      background-color: ${(props) => props.theme.colors.selectHover};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.primary};
    }
  }
  .react-select__option--is-selected {
    background-color: ${(props) => props.theme.colors.primary};
  }
  .react-select__option--is-focused {
    background-color: ${(props) => props.theme.colors.selectHover};
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

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

const EmptyStateText = styled.p`
  margin-top: 2rem;
  font-size: 20px;
  max-width: 450px;
  text-align: center;
`

const Intro = styled.p`
  font-size: 16px;
  line-height: 140%;
  margin-top: 0rem;
  margin-bottom: 2rem;
  max-width: 640px;
  text-align: center;
`

const Header = styled.h2`
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
  text-align: center;
  margin-bottom: 1rem;
`

const Disclaimer = styled.p`
  width: 100%;
  max-width: 876px;
  margin-top: 4rem;
  margin-bottom: 0;
`

const NoResults = ({ text }) => (
  <EmptyStateContainer>
    <Emoji svg text=":woman_shrugging:" />
    <EmptyStateText>
      {text}. Try a <Link to="/get-eth/#dex">decentralized exchange</Link>
    </EmptyStateText>
  </EmptyStateContainer>
)

export const cardListImage = graphql`
  fragment cardListImage on File {
    childImageSharp {
      fixed(width: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

const EthExchanges = () => {
  const data = useStaticQuery(graphql`
    query {
      exchangesByCountry: allExchangesByCountryCsv {
        nodes {
          binance
          bittrex
          coinbase
          coinmama
          country
          gemini
          kraken
          moonpay
          simplex
          wyre
          rainbow
          dharma
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
      ambo: file(relativePath: { eq: "wallets/ambo.png" }) {
        ...cardListImage
      }
      argent: file(relativePath: { eq: "wallets/argent.png" }) {
        ...cardListImage
      }
      binance: file(relativePath: { eq: "exchanges/binance.png" }) {
        ...cardListImage
      }
      bittrex: file(relativePath: { eq: "exchanges/bittrex.png" }) {
        ...cardListImage
      }
      brd: file(relativePath: { eq: "wallets/brd.png" }) {
        ...cardListImage
      }
      coinbase: file(relativePath: { eq: "exchanges/coinbase.png" }) {
        ...cardListImage
      }
      coinmama: file(relativePath: { eq: "exchanges/coinmama.png" }) {
        ...cardListImage
      }
      dharma: file(relativePath: { eq: "wallets/dharma.png" }) {
        ...cardListImage
      }
      gemini: file(relativePath: { eq: "exchanges/gemini.png" }) {
        ...cardListImage
      }
      imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
        ...cardListImage
      }
      kraken: file(relativePath: { eq: "exchanges/kraken.png" }) {
        ...cardListImage
      }
      myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
        ...cardListImage
      }
      rainbow: file(relativePath: { eq: "wallets/rainbow.png" }) {
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
    coinbase: {
      name: "Coinbase",
      url: "https://www.coinbase.com/",
      image: data.coinbase,
    },
    kraken: {
      name: "Kraken",
      url: "https://www.kraken.com/",
      image: data.kraken,
    },
    coinmama: {
      name: "Coinmama",
      url: "https://www.coinmama.com/",
      image: data.coinmama,
    },
    bittrex: {
      name: "Bittrex",
      url: "https://global.bittrex.com/",
      image: data.bittrex,
    },
    gemini: {
      name: "Gemini",
      url: "https://gemini.com/",
      image: data.gemini,
    },
    binance: {
      name: "Binance",
      url: "https://www.binance.com/en",
      image: data.binance,
    },
  }

  const walletProviders = {
    wyre: {
      Ambo: {
        url: "https://www.ambo.io/	",
        platform: "iOS",
        image: data.ambo,
      },
      Squarelink: {
        url: "https://squarelink.com/	",
        platform: "Web",
        image: data.squarelink,
      },
      BRD: {
        url: "https://brd.com/	",
        platform: "Mobile",
        image: data.brd,
      },
    },
    moonpay: {
      Argent: {
        url: "https://www.argent.xyz/	",
        platform: "Mobile",
        image: data.argent,
      },
      Trust: {
        url: "https://trustwallet.com/	",
        platform: "Mobile",
        image: data.trust,
      },
      imToken: {
        url: "https://token.im/ ",
        platform: "Mobile",
        image: data.imtoken,
      },
    },
    simplex: {
      MyEtherWallet: {
        url: "https://www.myetherwallet.com/	Mobile/",
        platform: "web",
        image: data.myetherwallet,
      },
    },
    rainbow: {
      Rainbow: {
        url: "http://rainbow.me/",
        platform: "iOS",
        image: data.rainbow,
      },
    },
    dharma: {
      Dharma: {
        url: "https://www.dharma.io/	",
        platform: "Mobile",
        image: data.dharma,
      },
    },
  }

  const intl = useIntl()
  const lastUpdated = getLocaleTimestamp(
    intl.locale,
    data.timestamp.parent.fields.gitLogLatestDate
  )

  const [state, setState] = useState({ selectedCountry: {} })

  const handleSelectChange = (selectedOption) => {
    setState({ selectedCountry: selectedOption })
  }

  // Add `value` & `label` for Select component
  const exchangesByCountry = data.exchangesByCountry.nodes.map((node) => {
    node.value = node.country
    node.label = node.country
    return node
  })

  const exchangesArray = Object.keys(exchanges)
  const walletProvidersArray = Object.keys(walletProviders)
  // Construct arrays for CardList
  let filteredExchanges = []
  let filteredWalletProviders = []
  let filteredWallets = []

  const hasSelectedCountry = !!state.selectedCountry.country
  if (hasSelectedCountry) {
    filteredExchanges = exchangesArray
      // Filter to exchanges that serve selected Country
      .filter((exchange) => state.selectedCountry[exchange] === "TRUE")
      // Format array for CardList
      .map((exchange) => {
        return {
          title: exchanges[exchange].name,
          link: exchanges[exchange].url,
          image: exchanges[exchange].image.childImageSharp.fixed,
        }
      })
    // Filter to wallet providers that serve selected Country
    filteredWalletProviders = walletProvidersArray.filter(
      (provider) => state.selectedCountry[provider] === "TRUE"
    )
  }
  if (filteredWalletProviders.length) {
    // Construct wallets based on the provider & flatten into single array
    filteredWallets = filteredWalletProviders.reduce((res, currentProvider) => {
      const wallets = Object.keys(walletProviders[currentProvider])
      return res.concat(
        wallets.reduce((result, currentWallet) => {
          return result.concat({
            title: currentWallet,
            link: walletProviders[currentProvider][currentWallet].url,
            image:
              walletProviders[currentProvider][currentWallet].image
                .childImageSharp.fixed,
          })
        }, [])
      )
    }, [])
  }

  const hasExchangeResults = filteredExchanges.length > 0
  const hasWalletResults = filteredWallets.length > 0

  return (
    <Container>
      <Header>What country do you live in?</Header>
      <Intro>
        An exchange or wallet can only sell crypto in countries where they've
        signed the right agreements.
      </Intro>
      <StyledSelect
        className="react-select-container"
        classNamePrefix="react-select"
        options={exchangesByCountry}
        onChange={handleSelectChange}
        placeholder={"Type where you live..."}
      />
      {!hasSelectedCountry && (
        <EmptyStateContainer>
          <Emoji svg text=":world_map:" />
          <EmptyStateText>
            Enter your country to see a list of wallets and exchanges you can
            use to buy ETH
          </EmptyStateText>
        </EmptyStateContainer>
      )}
      {/* No results */}
      {hasSelectedCountry && !hasExchangeResults && !hasWalletResults && (
        <ResultsContainer>
          <NoResults text="Sorry, we don’t know any exchanges or wallets that let you buy ETH from this country" />
        </ResultsContainer>
      )}
      {/* Has results */}
      {(hasExchangeResults || hasWalletResults) && (
        <>
          <ResultsContainer>
            <ListContainer>
              <h3>Exchanges</h3>
              {hasExchangeResults && (
                <SuccessContainer>
                  <p>
                    It can take a number of days to register with an exchange
                    because of their legal checks.
                  </p>
                  <CardList content={filteredExchanges} />
                </SuccessContainer>
              )}
              {!hasExchangeResults && (
                <NoResults text="Sorry, we don’t know any exchanges that let you buy ETH from this country" />
              )}
            </ListContainer>
            <ListContainer>
              <h3>Wallets</h3>

              {hasWalletResults && (
                <SuccessContainer>
                  <p>
                    Where you live, you can buy ETH directly from these wallets.
                    Learn more about <Link to="/wallets/">wallets</Link>.
                  </p>
                  <CardList content={filteredWallets} />
                </SuccessContainer>
              )}
              {!hasWalletResults && (
                <NoResults text="Sorry, we don’t know any wallets that let you buy ETH from this country" />
              )}
            </ListContainer>
          </ResultsContainer>
          <Disclaimer>
            We collected this information manually. If you spot something wrong,
            let us know at{" "}
            <a href="mailto:website@ethereum.org">website@ethereum.org</a>. Last
            updated <strong>{lastUpdated}</strong>
          </Disclaimer>
        </>
      )}
    </Container>
  )
}

export default EthExchanges
