import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Button from "./Button"
import Tag from "./Tag"
import SelectableCard from "./SelectableCard"
import WalletCard from "./WalletCard"
import { Content, CardContainer } from "./SharedStyledComponents"
import { Twemoji } from "react-emoji-render"
import Link from "../components/Link"

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text200};
`

const GradientContainer = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.cardGradient};
  padding: 3rem 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.tableItemBoxShadow};
  border-bottom: 1px solid ${(props) => props.theme.colors.tableItemBoxShadow};
`

// TODO checkbox hover effect?
const FeatureCard = styled(SelectableCard)`
  margin: 1rem;
  padding: 1.5rem;
  flex: 1 0 30%;
  min-width: 280px;
  max-width: 30%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: 46%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
`

const FilterContainer = styled.div`
  min-height: 82px;
`

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
  }
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80%;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    max-width: 100%;
    margin-bottom: 1rem;
  }
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
  margin-top: 0rem;
  text-align: center;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
    margin-bottom: 2em !important;
    margin-top: 2em !important;
  }
`

const Disclaimer = styled.div`
  margin-top: 2rem;
`

const walletFeatures = [
  {
    emoji: ":credit_card:",
    title: "Buy crypto with a card",
    description:
      "Buy ETH directly from your wallet with a bank card. Geographical restrictions may apply.",
  },
  {
    emoji: ":fuel_pump:",
    title: "No transaction fees",
    description: "Your wallet will pay some of your transaction fees for you.",
  },
  {
    emoji: ":world_map:",
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
          gnosis
          torus
          coinbase
          status
          ledger
          bitski
          monolith
          pillar
          alpha
          mycrypto
          zengo
          lumi
          enjin
          blockchain
          eidoo
          eql
          atomic
          rainbow
          squarelink
          myetherwallet
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
      alpha: file(relativePath: { eq: "wallets/alpha.png" }) {
        ...walletCardImage
      }
      ambo: file(relativePath: { eq: "wallets/ambo.png" }) {
        ...walletCardImage
      }
      argent: file(relativePath: { eq: "wallets/argent.png" }) {
        ...walletCardImage
      }
      atomic: file(relativePath: { eq: "wallets/atomic.png" }) {
        ...walletCardImage
      }
      authereum: file(relativePath: { eq: "wallets/authereum.png" }) {
        ...walletCardImage
      }
      bitski: file(relativePath: { eq: "wallets/bitski.png" }) {
        ...walletCardImage
      }
      blockchain: file(relativePath: { eq: "wallets/blockchain.png" }) {
        ...walletCardImage
      }
      coinbase: file(relativePath: { eq: "wallets/coinbase.png" }) {
        ...walletCardImage
      }
      dharma: file(relativePath: { eq: "wallets/dharma.png" }) {
        ...walletCardImage
      }
      eidoo: file(relativePath: { eq: "wallets/eidoo.png" }) {
        ...walletCardImage
      }
      enjin: file(relativePath: { eq: "wallets/enjin.png" }) {
        ...walletCardImage
      }
      eql: file(relativePath: { eq: "wallets/eql.png" }) {
        ...walletCardImage
      }
      gnosis: file(relativePath: { eq: "wallets/gnosis.png" }) {
        ...walletCardImage
      }
      imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
        ...walletCardImage
      }
      ledger: file(relativePath: { eq: "wallets/ledger.png" }) {
        ...walletCardImage
      }
      lumi: file(relativePath: { eq: "wallets/lumi.png" }) {
        ...walletCardImage
      }
      metamask: file(relativePath: { eq: "wallets/metamask.png" }) {
        ...walletCardImage
      }
      monolith: file(relativePath: { eq: "wallets/monolith.png" }) {
        ...walletCardImage
      }
      mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
        ...walletCardImage
      }
      myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
        ...walletCardImage
      }
      pillar: file(relativePath: { eq: "wallets/pillar.png" }) {
        ...walletCardImage
      }
      portis: file(relativePath: { eq: "wallets/portis.png" }) {
        ...walletCardImage
      }
      rainbow: file(relativePath: { eq: "wallets/rainbow.png" }) {
        ...walletCardImage
      }
      squarelink: file(relativePath: { eq: "wallets/squarelink.png" }) {
        ...walletCardImage
      }
      status: file(relativePath: { eq: "wallets/status.png" }) {
        ...walletCardImage
      }
      torus: file(relativePath: { eq: "wallets/torus.png" }) {
        ...walletCardImage
      }
      trezor: file(relativePath: { eq: "wallets/trezor.png" }) {
        ...walletCardImage
      }
      trust: file(relativePath: { eq: "wallets/trust.png" }) {
        ...walletCardImage
      }
      zengo: file(relativePath: { eq: "wallets/zengo.png" }) {
        ...walletCardImage
      }
    }
  `)

  // TODO add device options
  const wallets = {
    trust: {
      name: "Trust",
      description: "Buy, store, view prices, exchange, and earn crypto", // TODO
      url: "https://trustwallet.com/",
      image: data.trust,
      brandColor: "", // TODO
    },
    ambo: {
      name: "Ambo",
      description:
        "Cut straight to investing and get your first investment within minutes of downloading the app", // TODO
      url: "https://www.ambo.io/",
      image: data.ambo,
      brandColor: "#fff", // TODO
    },
    argent: {
      name: "Argent",
      description:
        "One tap to earn interest & invest; borrow, store and send. Own it.",
      url: "https://www.argent.xyz/",
      image: data.argent,
      brandColor: "#FF875B",
    },
    dharma: {
      name: "Dharma",
      description:
        "Dharma is the easiest, most secure way to invest + manage your money in DeFi", // TODO
      url: "https://www.dharma.io/",
      image: data.dharma,
      brandColor: "", // TODO
    },
    imtoken: {
      name: "imToken",
      description:
        "imToken is an easy and secure digital wallet trusted by millions", // TODO
      url: "https://token.im/",
      image: data.imtoken,
      brandColor: "", // TODO
    },
    authereum: {
      name: "Authereum",
      description:
        "No downloads, no seed phrases. Any browser, any time, mobile or desktop", // TODO
      url: "https://authereum.com/",
      image: data.authereum,
      brandColor: "#00172B", // TODO
    },
    portis: {
      name: "Portis",
      description:
        "The non-custodial blockchain wallet that makes apps simple for everyone", // TODO
      url: "https://www.portis.io/",
      image: data.portis,
      brandColor: "#fff", // TODO
    },
    metamask: {
      name: "MetaMask",
      description:
        "Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide", // TODO
      url: "https://metamask.io/",
      image: data.metamask,
      brandColor: "", // TODO
    },
    gnosis: {
      name: "Gnosis Safe",
      description:
        "The most trusted platform to store digital assets on Ethereum", // TODO
      url: "https://gnosis-safe.io/",
      image: data.gnosis,
      brandColor: "#fff", // TODO
    },
    torus: {
      name: "Torus",
      description: "One-Click login for Web 3.0", // TODO
      url: "https://toruswallet.io/",
      image: data.torus,
      brandColor: "#1d73ff", // TODO
    },
    coinbase: {
      name: "Coinbase",
      description: "The secure app to store crypto yourself", // TODO
      url: "https://wallet.coinbase.com/",
      image: data.coinbase,
      brandColor: "#fff", // TODO
    },
    status: {
      name: "Status",
      description:
        "Status is a secure messaging app, crypto wallet, and Web3 browser built with state-of-the-art technology", // TODO
      url: "http://status.im/",
      image: data.status,
      brandColor: "#fff", // TODO
    },
    ledger: {
      name: "Ledger",
      description: "Keep your assets safe with the highest security standards", // TODO
      url: "https://www.ledger.com/",
      image: data.ledger,
      brandColor: "", // TODO
    },
    bitski: {
      name: "Bitski",
      description:
        "Stores and secures your digital assets and integrates with the new world of decentralized applications", // TODO
      url: "https://www.bitski.com/users/",
      image: data.bitski,
      brandColor: "#F1F7FE", // TODO
    },
    monolith: {
      name: "Monolith",
      description:
        "Everything you would expect from a financial platform, built for the DeFi economy", // TODO
      url: "https://monolith.xyz/",
      image: data.monolith,
      brandColor: "#2f2aff", // TODO
    },
    pillar: {
      name: "Pillar Project",
      description: "Next-generation smart wallet and payment network", // TODO
      url: "https://pillarproject.io/",
      image: data.pillar,
      brandColor: "#01ff28", // TODO
    },
    alpha: {
      name: "AlphaWallet",
      description:
        "Beginner-friendly with no hidden fees or tech background needed", // TODO
      url: "https://alphawallet.com/",
      image: data.alpha,
      brandColor: "#F5F5F5", // TODO
    },
    mycrypto: {
      name: "MyCrypto",
      description:
        "MyCrypto is a free, open-source interface for interacting with the blockchain.", // TODO
      url: "https://www.mycrypto.com/",
      image: data.mycrypto,
      brandColor: "#fff", // TODO
    },
    zengo: {
      name: "ZenGo",
      description:
        "Buy, store, and earn crypto with unprecedented simplicity and safety", // TODO
      url: "https://zengo.com/",
      image: data.zengo,
      brandColor: "#fff", // TODO
    },
    lumi: {
      name: "Lumi",
      description: "Secure and trusted cryptocurrency wallet", // TODO
      url: "https://lumiwallet.com/",
      image: data.lumi,
      brandColor: "#12466d", // TODO
    },
    enjin: {
      name: "Enjin",
      description:
        "Impenetrable, feature-packed, and convenient—built for traders, gamers, and developers", // TODO
      url: "https://enjin.io/wallet",
      image: data.enjin,
      brandColor: "", // TODO
    },
    blockchain: {
      name: "Blockchain",
      description:
        "Wallet for Bitcoin, Ethereum, and other top cryptocurrencies", // TODO
      url: "https://www.blockchain.com/wallet",
      image: data.blockchain,
      brandColor: "", // TODO
    },
    eidoo: {
      name: "Eidoo Wallet",
      description: "Decentralized finance, at your fingertips", // TODO
      url: "https://eidoo.io/crypto-wallet",
      image: data.eidoo,
      brandColor: "#2C4857", // TODO
    },
    eql: {
      name: "EQL Wallet",
      description: "Blockchain made simple", // TODO
      url: "https://equal.tech/",
      image: data.eql,
      brandColor: "#fff", // TODO
    },
    atomic: {
      name: "Atomic Wallet",
      description:
        "Supports more than 500 coins and tokens, providing simplicity, safety, and convenience for its users", // TODO
      url: "https://atomicwallet.io/",
      image: data.atomic,
      brandColor: "#222D4B", // TODO
    },
    rainbow: {
      name: "Rainbow",
      description: "A better home for your Ethereum assets", // TODO
      url: "https://rainbow.me/",
      image: data.rainbow,
      brandColor: "", // TODO
    },
    squarelink: {
      name: "SquareLink",
      description:
        "Squarelink provides a shortcut to the blockchain ecosystem, without compromising security and privacy", // TODO
      url: "https://squarelink.com/",
      image: data.squarelink,
      brandColor: "", // TODO
    },
    myetherwallet: {
      name: "MyEtherWallet",
      description:
        "A free, client-side interface helping you interact with the Ethereum blockchain", // TODO
      url: "https://www.myetherwallet.com/",
      image: data.myetherwallet,
      brandColor: "", // TODO
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

    // Add filter (or remove filter if already selected)
    const index = selectedFeatures.indexOf(featureWithWallets)
    if (index > -1) {
      selectedFeatures.splice(index, 1)
    } else {
      selectedFeatures.push(featureWithWallets)
    }
    setState({ selectedFeatures })
  }

  // TODO random sort?
  let filteredWallets = walletsArray.sort((a, b) => a.localeCompare(b))

  const allFeatures = walletFeatures.map((feature) => feature.title)
  const selectedFeatures = state.selectedFeatures.map(
    (filter) => filter.feature
  )
  const remainingFeatures = allFeatures.filter(
    (feature) => !selectedFeatures.includes(feature)
  )

  const hasSelectedFeatures = selectedFeatures.length > 0
  if (hasSelectedFeatures) {
    // Filter to wallets that have the features
    filteredWallets = walletsArray
      .filter((wallet) => {
        for (const featureWithWallets of state.selectedFeatures) {
          if (featureWithWallets[wallet] !== "TRUE") {
            return false
          }
        }
        return true
      })
      .sort((a, b) => a.localeCompare(b))
  }

  return (
    <>
      <Content>
        <h2>Choose the wallet features you care about</h2>
        <CardContainer>
          {walletFeatures.map((card, idx) => {
            const isSelected = selectedFeatures.includes(card.title)
            return (
              <FeatureCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
                isSelected={isSelected}
                onSelect={handleSelect}
                value={card.title}
              />
            )
          })}
        </CardContainer>

        <ButtonContainer id="results">
          <Button to="/wallets/find-wallet/#results">
            Search chosen features
          </Button>
        </ButtonContainer>
      </Content>

      <GradientContainer>
        <h2>Ethereum Wallets</h2>
        <FilterContainer>
          {hasSelectedFeatures && (
            <Subtitle>
              We found {filteredWallets.length}{" "}
              {filteredWallets.length === 1 ? "wallet" : "wallets"} with the
              following features:
            </Subtitle>
          )}
          {!hasSelectedFeatures && (
            <Subtitle>
              Showing {filteredWallets.length} Ethereum wallets below.
              Overwhelmed? Try filtering by features above.
            </Subtitle>
          )}
          <TagsContainer>
            <TagContainer>
              {selectedFeatures.map((feature, idx) => {
                return (
                  <Tag
                    name={feature}
                    key={idx}
                    onSelect={handleSelect}
                    value={feature}
                  />
                )
              })}
              {selectedFeatures.length > 0 &&
                remainingFeatures.map((feature, idx) => {
                  return (
                    <Tag
                      name={feature}
                      key={idx + selectedFeatures.length}
                      onSelect={handleSelect}
                      value={feature}
                      isActive={false}
                    />
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
            <Emoji svg text=":crying_face:" />
            <h2>
              No wallet has all of these features <b>yet</b>
            </h2>
            <p>Try removing a feature or two</p>
          </ResultsContainer>
        )}
        <ResultsContainer>
          <CardContainer>
            {filteredWallets.map((wallet, idx) => {
              return <WalletCard wallet={wallets[wallet]} key={idx} />
            })}
          </CardContainer>
        </ResultsContainer>
        <Disclaimer>
          <p>
            <em>
              All wallets listed on this page are not official endorsements, and
              are provided for informational purposes only. Their descriptions
              have been provided by the wallet companies themselves. We add
              products to this page based on criteria in our{" "}
              <Link to="/contributing/adding-products/">listing policy</Link>.
              If you'd like us to add a wallet,{" "}
              <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">
                raise an issue in GitHub
              </Link>
              .
            </em>
          </p>
        </Disclaimer>
      </GradientContainer>
    </>
  )
}

export default WalletCompare
