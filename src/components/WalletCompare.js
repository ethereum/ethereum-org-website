import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import SelectableCard from "./SelectableCard"
import { Content, CardContainer } from "./SharedStyledComponents"

const GradientContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 3rem 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.white700};
  border-bottom: 1px solid ${(props) => props.theme.colors.white700};
`

const FeatureCard = styled(SelectableCard)`
  flex: 1 1 30%;
  min-width: 240px;
  max-width: 420px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

// TODO compass emoji not working
// Issue with plugin not using latest version of twemoji?
// https://github.com/tommoor/react-emoji-render
const featureCards = [
  {
    emoji: ":bank:", // TODO update
    title: "Fiat on-ramps",
    description:
      "Buy ETH directly from your wallet with a bank card. Geographical restrictions may apply.", // TODO update
  },
  {
    emoji: ":fuel_pump:",
    title: "No transaction fees",
    description: "Your wallet will pay some of your transaction fees for you.",
  },
  {
    emoji: ":compass:",
    title: "Explore dapps",
    description:
      "These wallets are designed to help you connect to Ethereum dapps. ",
  },
  {
    emoji: ":money_with_wings:",
    title: "Access to financial tools",
    description: "Borrow, lend and earn interest directly from your wallet.",
  },
  {
    emoji: ":credit_card:",
    title: "Withdraw to card",
    description:
      "You can cash out your ETH straight to your card without going through an exchange.",
  },
  {
    emoji: ":shield:",
    title: "Limits protection",
    description:
      "Safeguard your assets by setting limits that prevent your account being drained.",
  },
  {
    emoji: ":whale:",
    title: "High-volume purchases",
    description:
      "If you want to hold a lot of ETH, choose a wallet that lets you buy more than $2000 ETH at a time.",
  },
  {
    emoji: ":repeat:",
    title: "Decentralized token swaps",
    description:
      "Trade between ETH and other tokens directly from your wallet.",
  },
  {
    emoji: ":busts_in_silhouette:",
    title: "Multi-signature accounts",
    description:
      "For extra security, multi-signature wallets require more than one account to authorise transactions.",
  },
]

const WalletCompare = () => {
  const [state, setState] = useState({ selectedFeatures: [] })

  const data = useStaticQuery(graphql`
    query {
      walletsByFeature: allWalletsByFeatureCsv {
        nodes {
          feature
          trust
          ambo
          argent
          dharma
          imtoken
          authereum
          portis
          metamask
          gnosis_safe
          torus
          coinbase
          status
          ledger
          bitski
          monolith
          pillar_project
          alpha
          mycrypto
          zengo
          lumi
          enjin
          blockchain
          eidoo
          eql
          atomic
          alice
        }
      }
      timestamp: walletsByFeatureCsv {
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
      trust: file(relativePath: { eq: "wallets/trust.png" }) {
        ...cardListImage
      }
    }
  `)

  // TODO add images
  // TODO sort?
  const wallets = {
    trust: {
      name: "Trust",
      url: "https://trustwallet.com/",
      image: data.trust,
    },
    ambo: {
      name: "Ambo",
      url: "https://www.ambo.io/",
      image: data.ambo,
    },
    argent: {
      name: "Argent",
      url: "https://www.argent.xyz/",
      image: data.argent,
    },
    dharma: {
      name: "Dharma",
      url: "https://www.dharma.io/",
      image: data.argent,
    },
    imtoken: {
      name: "imToken",
      url: "https://token.im/",
      image: data.argent,
    },
    authereum: {
      name: "Authereum",
      url: "https://authereum.com/",
      image: data.argent,
    },
    portis: {
      name: "Portis",
      url: "https://www.portis.io/",
      image: data.argent,
    },
    metamask: {
      name: "MetaMask",
      url: "https://metamask.io/",
      image: data.argent,
    },
    gnosis_safe: {
      name: "Gnosis Safe",
      url: "https://gnosis-safe.io/",
      image: data.argent,
    },
    torus: {
      name: "Torus",
      url: "https://toruswallet.io/",
      image: data.argent,
    },
    coinbase: {
      name: "Coinbase",
      url: "https://wallet.coinbase.com/",
      image: data.argent,
    },
    status: {
      name: "Status",
      url: "http://status.im/",
      image: data.argent,
    },
    ledger: {
      name: "Ledger",
      url: "https://www.ledger.com/",
      image: data.argent,
    },
    bitski: {
      name: "Bitski",
      url: "https://www.bitski.com/users/",
      image: data.argent,
    },
    monolith: {
      name: "Monolith",
      url: "https://monolith.xyz/",
      image: data.argent,
    },
    pillar_project: {
      name: "Pillar Project",
      url: "https://pillarproject.io/",
      image: data.argent,
    },
    alpha: {
      name: "AlphaWallet",
      url: "https://alphawallet.com/",
      image: data.argent,
    },
    mycrypto: {
      name: "MyCrypto",
      url: "https://www.mycrypto.com/",
      image: data.argent,
    },
    zengo: {
      name: "ZenGo",
      url: "https://zengo.com/",
      image: data.argent,
    },
    lumi: {
      name: "Lumi",
      url: "https://lumiwallet.com/",
      image: data.argent,
    },
    enjin: {
      name: "Enjin",
      url: "https://enjin.io/wallet",
      image: data.argent,
    },
    blockchain: {
      name: "Blockchain",
      url: "https://www.blockchain.com/wallet",
      image: data.argent,
    },
    eidoo: {
      name: "Eidoo Wallet",
      url: "https://eidoo.io/crypto-wallet",
      image: data.argent,
    },
    eql: {
      name: "EQL Wallet",
      url: "https://equal.tech/",
      image: data.argent,
    },
    atomic: {
      name: "Atomic Wallet",
      url: "https://atomicwallet.io/",
      image: data.argent,
    },
    alice: {
      name: "Alice",
      url: "https://alicefi.com/",
      image: data.argent,
    },
  }

  const walletsByFeature = data.walletsByFeature.nodes
  const walletsArray = Object.keys(wallets)

  const clearFilters = () => {
    setState({ selectedFeatures: [] })
  }

  const handleSelect = (feature) => {
    const featureWithWallets = walletsByFeature.filter((featureFilter) => {
      return featureFilter.feature === feature
    })[0]
    const selectedFeatures = state.selectedFeatures
    const index = selectedFeatures.indexOf(featureWithWallets)
    if (index > -1) {
      selectedFeatures.splice(index, 1)
    } else {
      selectedFeatures.push(featureWithWallets)
    }
    setState({ selectedFeatures })
  }

  let filteredWallets = walletsArray

  const selectedFeatures = state.selectedFeatures.map(
    (filter) => filter.feature
  )

  const hasSelectedFeatures = selectedFeatures.length > 0

  if (hasSelectedFeatures) {
    // Filter to wallets that have the features
    filteredWallets = walletsArray.filter((wallet) => {
      for (const featureWithWallets of state.selectedFeatures) {
        const feature = featureWithWallets.feature
        if (featureWithWallets[wallet] !== "TRUE") {
          return false
        }
      }
      // state.selectedFeatures[0][wallet] === "TRUE"
      return true
    })
  }

  // console.log(filteredWallets)
  // console.log(walletsByFeature)

  return (
    <>
      <Content>
        <h2>Wallet features</h2>
        <CardContainer>
          {featureCards.map((card, idx) => {
            return (
              <FeatureCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
                onSelect={handleSelect}
                value={card.title}
              />
            )
          })}
        </CardContainer>
      </Content>

      <GradientContainer>
        {hasSelectedFeatures && (
          <>
            Feature filters:
            {selectedFeatures.map((feature, idx) => {
              return <div key={idx}>{feature}</div>
            })}
            <a onClick={clearFilters}>Clear filters</a>
          </>
        )}
        {filteredWallets.length === 0 && (
          <>
            <h2>No single wallet has all of these features.</h2>
            <p>Try a less restrictive set of features.</p>
          </>
        )}
        {filteredWallets.map((wallet, idx) => {
          return (
            <div key={idx}>
              <h4>Name: {wallets[wallet].name}</h4>
            </div>
          )
        })}
      </GradientContainer>
    </>
  )
}

export default WalletCompare
