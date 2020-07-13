import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Select from "react-select"
import styled from "styled-components"

import CardList from "./CardList"
import Link from "./Link"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledSelect = styled(Select)`
  width: 100%;
  max-width: 640px;
`

const ResultsContainer = styled.div`
  display: flex;
  margin-top: 4rem;
  width: 100%;
  max-width: 876px;

  div:first-child {
    margin-right: 1.5rem;
  }
`

const ListContainer = styled.div`
  flex: 1 1 50%;
`

const Header = styled.h2`
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
`

// TODO add error colors
const NoResultsText = styled.p`
  font-weight: bold;
`

const exchanges = {
  Coinbase: "https://www.coinbase.com/",
  Kraken: "https://www.kraken.com/",
  Coinmama: "https://www.coinmama.com/",
  Bittrex: "https://global.bittrex.com/",
  Gemini: "https://gemini.com/",
  Binance: "https://www.binance.com/en",
}

// TODO sort out Dharma & Rainbow - no provider?
const walletProviders = {
  Wyre: {
    Ambo: { url: "https://www.ambo.io/	", platform: "iOS" },
    Squarelink: { url: "https://squarelink.com/	", platform: "Web" },
    BRD: { url: "https://brd.com/	", platform: "Mobile" },
  },
  Moonpay: {
    Argent: { url: "https://www.argent.xyz/	", platform: "Mobile" },
    Trust: { url: "https://trustwallet.com/	", platform: "Mobile" },
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

const EthExchanges = () => {
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
    }
  `)

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
      <StyledSelect
        options={exchangesByCountry}
        onChange={handleSelectChange}
      />
      {hasSelectedCountry && (
        <ResultsContainer>
          <ListContainer>
            <h3>Exchanges</h3>
            <p>
              It can take a number of days to register with an exchange because
              of their legal checks.
            </p>
            {hasExchangeResults && <CardList content={filteredExchanges} />}
            {!hasExchangeResults && (
              <NoResultsText>
                We didn't find any exchanges where you can buy ETH for this
                country. Find more options to buy ETH below.
              </NoResultsText>
            )}
          </ListContainer>
          <ListContainer>
            <h3>Wallets</h3>
            <p>
              Where you live, you can buy ETH directly from these wallets. Learn
              more about <Link to="/wallets/">wallets</Link>.
            </p>
            {hasWalletResults && <CardList content={filteredWallets} />}
            {!hasWalletResults && (
              <NoResultsText>
                We didn't find any wallets where you can by ETH directly for
                this country.
              </NoResultsText>
            )}
          </ListContainer>
        </ResultsContainer>
      )}
    </Container>
  )
}

export default EthExchanges
