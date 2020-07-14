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

// TODO style for dark mode
// https://react-select.com/styles
const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 640px;
  color: black;
`

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 876px;

  div:first-child {
    margin-right: 1.5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-wrap: wrap;
    div:first-child {
      margin-right: 0;
    }
  }
`

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const ListContainer = styled.div`
  margin-top: 4rem;
  flex: 1 1 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex: 1 1 100%;
  }
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
  color: black;
  margin-top: 2rem;
  padding: 16px 24px;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #ff7324;
  border-radius: 2px;
  border: #ff7324 1px solid;
`

const Lists = styled.div`
  display: flex;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const exchanges = {
  Coinbase: "https://www.coinbase.com/",
  Kraken: "https://www.kraken.com/",
  Coinmama: "https://www.coinmama.com/",
  Bittrex: "https://global.bittrex.com/",
  Gemini: "https://gemini.com/",
  Binance: "https://www.binance.com/en",
}

const walletProviders = {
  Wyre: {
    Ambo: { url: "https://www.ambo.io/	", platform: "iOS" },
    Squarelink: { url: "https://squarelink.com/	", platform: "Web" },
    BRD: { url: "https://brd.com/	", platform: "Mobile" },
  },
  Moonpay: {
    Argent: { url: "https://www.argent.xyz/	", platform: "Mobile" },
    Trust: { url: "https://trustwallet.com/	", platform: "Mobile" },
    imToken: { url: "https://token.im/ ", platform: "Mobile" },
  },
  Simplex: {
    MyEtherWallet: {
      url: "https://www.myetherwallet.com/	Mobile/",
      platform: "web",
    },
  },
  Rainbow: { Rainbow: { url: "http://rainbow.me/", platform: "iOS" } },
  Dharma: { Dharma: { url: "https://www.dharma.io/	", platform: "Mobile" } },
}

const NoResults = ({ text }) => (
  <EmptyStateContainer>
    <Emoji svg text=":woman_shrugging:" />
    <EmptyStateText>
      {text}. Try a <Link to="/get-eth/#dex">decentralized exchange</Link>
    </EmptyStateText>
  </EmptyStateContainer>
)

const EthExchanges = () => {
  // TODO fetch exchange & wallet images
  const data = useStaticQuery(graphql`
    query {
      exchangesByCountry: allExchangesByCountryCsv {
        nodes {
          Binance
          Bittrex
          Coinbase
          Coinmama
          Country
          Gemini
          Kraken
          Moonpay
          Rainbow_wallet
          Simplex
          Wyre
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
    }
  `)

  const intl = useIntl()
  const lastUpdated = getLocaleTimestamp(
    intl.locale,
    data.timestamp.parent.fields.gitLogLatestDate
  )

  const [state, setState] = useState({ selectedCountry: {} })

  const handleSelectChange = (selectedOption) => {
    setState({ selectedCountry: selectedOption })
  }

  const exchangesByCountry = data.exchangesByCountry.nodes.map((node) => {
    node.value = node.Country
    node.label = node.Country
    return node
  })

  const exchangesArray = Object.keys(exchanges)
  const walletProvidersArray = Object.keys(walletProviders)
  // Construct arrays for CardList
  let filteredExchanges = []
  let filteredWalletProviders = []
  let filteredWallets = []

  const hasSelectedCountry = !!state.selectedCountry.Country
  if (hasSelectedCountry) {
    filteredExchanges = exchangesArray
      // Filter to exchanges that serve selected Country
      .filter((exchange) => state.selectedCountry[exchange] === "TRUE")
      // Format array for CardList
      .map((exchange) => {
        return {
          title: exchange,
          link: exchanges[exchange],
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
      {hasSelectedCountry && (
        <ResultsContainer>
          {/* No results */}
          {!hasExchangeResults && !hasWalletResults && (
            <NoResults text="Sorry, we don’t know any exchanges or wallets that let you buy ETH from this country" />
          )}
          {/* Has results */}
          {(hasExchangeResults || hasWalletResults) && (
            <Lists>
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
                      Where you live, you can buy ETH directly from these
                      wallets. Learn more about{" "}
                      <Link to="/wallets/">wallets</Link>.
                    </p>
                    <CardList content={filteredWallets} />
                  </SuccessContainer>
                )}
                {!hasWalletResults && (
                  <NoResults text="Sorry, we don’t know any wallets that let you buy ETH from this country" />
                )}
              </ListContainer>
            </Lists>
          )}
          <Disclaimer>
            We collected this information manually so let us know if you spot
            something wrong. Last updated {lastUpdated}
          </Disclaimer>
        </ResultsContainer>
      )}
    </Container>
  )
}

export default EthExchanges
