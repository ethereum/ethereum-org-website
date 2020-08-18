import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import SelectableCard from "./SelectableCard"
import WalletCard from "./WalletCard"
import { Content, CardContainer } from "./SharedStyledComponents"

const GradientContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 3rem 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.tableItemBoxShadow};
  border-bottom: 1px solid ${(props) => props.theme.colors.tableItemBoxShadow};
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

const FilterContainer = styled.div`
  min-height: 82px;
`

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const TagContainer = styled.div`
  display: flex;
`

const Tag = styled.div`
  padding: 4px 8px;
  background: radial-gradient(
    46.28% 66.31% at 66.95% 58.35%,
    rgba(127, 127, 213, 0.2) 0%,
    rgba(134, 168, 231, 0.2) 50%,
    rgba(145, 234, 228, 0.2) 100%
  );
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
`

const ClearLink = styled.button`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: underline;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

export const walletCardImage = graphql`
  fragment walletCardImage on File {
    childImageSharp {
      fixed(width: 80) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

const ResultsContainer = styled.div`
  margin-top: 2rem;
`

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
    emoji: ":world_map:", // TODO compass not working, issue with `react-emoji-render` not using latest version of twemoji?
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
        ...walletCardImage
      }
      argent: file(relativePath: { eq: "wallets/argent.png" }) {
        ...walletCardImage
      }
      trust: file(relativePath: { eq: "wallets/trust.png" }) {
        ...walletCardImage
      }
    }
  `)

  // TODO add images
  // TODO sort?
  const wallets = {
    trust: {
      name: "Trust",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://trustwallet.com/",
      image: data.trust,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    ambo: {
      name: "Ambo",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.ambo.io/",
      image: data.ambo,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    argent: {
      name: "Argent",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.argent.xyz/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    dharma: {
      name: "Dharma",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.dharma.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    imtoken: {
      name: "imToken",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://token.im/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    authereum: {
      name: "Authereum",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://authereum.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    portis: {
      name: "Portis",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.portis.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    metamask: {
      name: "MetaMask",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://metamask.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    gnosis_safe: {
      name: "Gnosis Safe",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://gnosis-safe.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    torus: {
      name: "Torus",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://toruswallet.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    coinbase: {
      name: "Coinbase",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://wallet.coinbase.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    status: {
      name: "Status",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "http://status.im/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    ledger: {
      name: "Ledger",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.ledger.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    bitski: {
      name: "Bitski",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.bitski.com/users/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    monolith: {
      name: "Monolith",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://monolith.xyz/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    pillar_project: {
      name: "Pillar Project",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://pillarproject.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    alpha: {
      name: "AlphaWallet",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://alphawallet.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    mycrypto: {
      name: "MyCrypto",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.mycrypto.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    zengo: {
      name: "ZenGo",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://zengo.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    lumi: {
      name: "Lumi",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://lumiwallet.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    enjin: {
      name: "Enjin",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://enjin.io/wallet",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    blockchain: {
      name: "Blockchain",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://www.blockchain.com/wallet",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    eidoo: {
      name: "Eidoo Wallet",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://eidoo.io/crypto-wallet",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    eql: {
      name: "EQL Wallet",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://equal.tech/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    atomic: {
      name: "Atomic Wallet",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://atomicwallet.io/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
    },
    alice: {
      name: "Alice",
      description:
        "A mobile wallet designed for decentralized finance applications.", // TODO
      url: "https://alicefi.com/",
      image: data.argent,
      imageAlt: "", // TODO
      brandColor: "#000000", // TODO
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
        if (featureWithWallets[wallet] !== "TRUE") {
          return false
        }
      }
      return true
    })
  }

  return (
    <>
      <Content>
        <h2>Wallet features</h2>
        {/* TODO discuss copy w/ Ryan */}
        <p>
          You can filter our wallets below below by clicking on these feature
          cards.
        </p>
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
        <h2>Ethereum Wallets</h2>
        <FilterContainer>
          {hasSelectedFeatures && (
            <p>
              We found {filteredWallets.length}{" "}
              {filteredWallets.length === 1 ? "wallet" : "wallets"} with the
              following features:
            </p>
          )}
          {!hasSelectedFeatures && (
            <p>
              {/* TODO discuss copy w/ Ryan */}
              We list {filteredWallets.length} total Ethereum wallets below.
              Overwhelmed? Try filtering by features above.
            </p>
          )}
          <TagsContainer>
            <TagContainer>
              {selectedFeatures.map((feature, idx) => {
                return (
                  <Tag key={idx} onClick={() => handleSelect(feature)}>
                    {feature}
                    {"   "}X
                  </Tag>
                )
              })}
            </TagContainer>
            {hasSelectedFeatures && (
              <ClearLink onClick={clearFilters}>Clear filters</ClearLink>
            )}
          </TagsContainer>
        </FilterContainer>
        {filteredWallets.length === 0 && (
          <ResultsContainer>
            <h2>No single wallet has all of these features.</h2>
            <p>Try a less restrictive set of features.</p>
          </ResultsContainer>
        )}
        <ResultsContainer>
          <CardContainer>
            {filteredWallets.map((wallet, idx) => {
              return <WalletCard wallet={wallets[wallet]} key={idx} />
            })}
          </CardContainer>
        </ResultsContainer>
      </GradientContainer>
    </>
  )
}

export default WalletCompare
