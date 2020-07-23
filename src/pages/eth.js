import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Twemoji } from "react-emoji-render"

import ActionCard from "../components/ActionCard"
import Button from "../components/Button"
import Card from "../components/Card"
import EthVideo from "../components/EthVideo"
import CalloutBanner from "../components/CalloutBanner"
import Link from "../components/Link"
import CardList from "../components/CardList"
import HorizontalCard from "../components/HorizontalCard"
import { Page } from "../components/SharedStyledComponents"
import EthPriceCard from "../components/EthPriceCard"
import PageMetadata from "../components/PageMetadata"

const Divider = styled.div`
  margin-bottom: 4rem;
  margin-top: 4rem;
  width: 10%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.homeDivider};
`

const Content = styled.div`
  padding: 1rem 2rem;
  width: 100%;
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
  }
  margin-bottom: 2rem;
`

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textSidebar};
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const Hero = styled(Img)`
  flex: 1 1 100%;
  max-width: 800px;
  align-self: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-left: 0;
    width: 100%;
  }
`

const Header = styled.header`
  flex: 1 1 50%;
  min-width: 300px;
  margin-top: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
  }
`

const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem 1.5rem;
  background: #f8f8fe; /* TODO add color to theme */
  border: 1px solid #a4a4f3; /* TODO add color to theme */
  background-color: ${(props) => props.theme.colors.searchBackground};
  border-radius: 4px;
  margin: 2rem 2rem 0;
`

const InfoCopy = styled.p`
  margin-bottom: 0px;
  margin-left: 1.5rem;
  color: ${(props) => props.theme.colors.text};
`

const InfoEmoji = styled(Emoji)`
  & > img {
    width: 3em !important;
    height: 3em !important;
  }
  margin-bottom: 0rem;
`

// TODO move to shared styles
const GrayContainer = styled.div`
  width: 100%;
  padding: 4rem 0rem;
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.grayBackground};
  box-shadow: inset 0px 1px 0px
    ${(props) => props.theme.colors.tableItemBoxShadow};
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 0rem 2rem;
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  max-width: 420px;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const TokenCardVert = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
`

const TwoColumnContent = styled(Content)`
  display: flex;
  margin-top: 3rem;
  margin-bottom: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 3rem;
  }
`

const Column = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  margin-bottom: 2rem;
  padding-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-right: 1rem;
`

const TextDivider = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
  width: 10%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.searchResultBackground};
`

const CentralColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
  margin: 4rem auto;
`

const CentralActionCard = styled(ActionCard)`
  flex: none;
  margin: 2rem 0;
  .action-card-image-wrapper {
    padding: 1rem;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    display: flex;

    .action-card-image-wrapper {
      min-width: 260px;
    }
    .action-card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 1rem;

      p {
        margin-bottom: 0;
      }
    }
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 5rem 0;
`

const tokens = [
  {
    emoji: ":scales:",
    title: "Stablecoins",
    description:
      "Tokens that mirror the value of traditional currency like dollars. This solves the volatility problem with many cryptocurrencies.",
  },
  {
    emoji: ":ballot_box_with_ballot:",
    title: "Governance tokens",
    description:
      "Tokens that represent voting power in decentralized organisations.",
  },
  {
    emoji: ":pile_of_poo:",
    title: "Sh*t coins",
    description:
      "Because making new tokens is easy, anyone can do it - even people with bad or misguided intentions. Always do your research before using them!",
  },
  {
    emoji: ":frame_with_picture:",
    title: "Collectible tokens",
    description:
      "Tokens that represent a collectible game item, piece of digital art, or other unique assets. Commonly known as non-fungible tokens (NFTs).",
  },
]

const benefits = [
  {
    emoji: ":woman_technologist:",
    title: "It's really yours",
    description:
      "ETH lets you be your own bank. You can control your own funds with your wallet as proof of ownership – no third parties necessary.",
  },
  {
    emoji: ":shield:",
    title: "Secured by cryptography",
    description:
      "Internet money may be new but it's secured by proven cryptography. This protects your wallet, your ETH, and your transactions. ",
  },
  {
    emoji: ":handshake:",
    title: "Peer-to-peer",
    description:
      "You can send your ETH without any intermediary service like a bank. It's like handing cash over in-person, but you can do it securely with anyone, anywhere, anytime.",
  },
  {
    emoji: ":money_with_wings:",
    title: "No centralized control ",
    description:
      "ETH is decentralized and global. There's no company or bank that can decide to print more ETH, or change the terms of use.",
  },
  {
    emoji: ":signal_strength:",
    title: "Open to anyone",
    description:
      "You only need an internet connection and a wallet to accept ETH. You don't need access to a bank account to accept payments. ",
  },
  {
    emoji: ":earth_africa:",
    title: "Fast, global payments",
    description:
      "You can send ETH easily to anyone with an Ethereum wallet, anywhere in the world.",
  },
]

const cardListContent = [
  {
    link: "https://docs.ethhub.io/ethereum-basics/monetary-policy/",
    title: "Ethereum's monetary policy",
    description: "EthHub",
    caption: "Updated often",
  },
  {
    link: "https://medium.com/ethhub/why-ether-is-valuable-2b4e39e01eb3",
    title: "Why Ether is valuable",
    description: "Anthony Sassano",
    caption: "January 2019",
  },
  {
    link:
      "https://support.mycrypto.com/how-to/getting-started/how-to-buy-ether-with-usd",
    title: "How to buy Ether",
    description: "MyCrypto",
    caption: "Updated often",
  },
]

const mining = [
  {
    link: "https://docs.ethhub.io/using-ethereum/mining/",
    title: "Mining",
    description: "ETHHub",
  },
]

const WhatIsEthereumPage = (props) => {
  const data = props.data
  return (
    <Page>
      {/* image={data.ogImage.childImageSharp.fixed.src} */}
      <PageMetadata
        title="What is Ether (ETH)?"
        description="The basic information you need to understand ETH."
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>What is Ether (ETH)?</Title>
            <Slogan>Currency for our digital future</Slogan>
            <Subtitle>ETH is digital, global money.</Subtitle>
            <SubtitleTwo>It's the currency of Ethereum apps.</SubtitleTwo>
            <EthPriceCard />
            <Button to="/eth/get-eth" title="where to buy eth">
              Get ETH
            </Button>
          </Header>
          <Hero
            fluid={data.eth.childImageSharp.fluid}
            alt="Illustration of a person peering into a bazaar, meant to represent Ethereum"
            loading="eager"
          />
        </HeroContainer>
      </Content>
      <GrayContainer>
        <Content>
          <Column>
            <p>
              ETH is a cryptocurrency. It is scarce digital money that you can
              use on the internet – similar to Bitcoin. If you’re new to crypto,
              here's how ETH is different from traditional money.
            </p>
          </Column>
        </Content>
        <CardContainer>
          {benefits.map((benefits, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={benefits.emoji}
                title={benefits.title}
                description={benefits.description}
              />
            )
          })}
        </CardContainer>
        <InfoBanner>
          <InfoEmoji svg text=":wave:" />
          <InfoCopy>
            <b>Want to buy some Ethereum?</b> It's common to mix up Ethereum and
            ETH. Ethereum is the blockchain and ETH is the primary asset of
            Ethereum. ETH is what you're probably looking to buy.{" "}
            <Link to="/what-is-ethereum/">More on Ethereum</Link>.
          </InfoCopy>
        </InfoBanner>
      </GrayContainer>
      <Content>
        <CentralColumn>
          <h2>What's unique about ETH?</h2>
          <p>
            There are many cryptocurrencies and lots of other tokens on
            Ethereum, but there are some things that only ETH can do.
          </p>
          <EthVideo />
          <Divider />
          <Emoji svg text=":fuel_pump:" />
          <div>
            <h4>ETH fuels and secures Ethereum</h4>
            <p>
              ETH is the lifeblood of Ethereum. When you send ETH or use an
              Ethereum application, you'll pay a small fee in ETH to use the
              Ethereum network. This fee is an incentive for a miner to process
              and verify what you're trying to do.
            </p>
            <p>
              Miners are like the record-keepers of Ethereum – they check and
              prove that no one is cheating. Miners who do this work are also
              rewarded with small amounts of newly-issued ETH.
            </p>
            <p>
              The work miners do keeps Ethereum secure and free of centralized
              control. In other words, <strong>ETH powers Ethereum</strong>.
            </p>
            <p>
              ETHHub have a great overview if you want{" "}
              <Link to="https://docs.ethhub.io/using-ethereum/mining/">
                more on Mining
              </Link>
              .
            </p>
          </div>
          <CentralActionCard
            to="/what-is-ethereum/"
            title="What is Ethereum?"
            description="If you'd like to learn more about Ethereum, the technology behind ETH, check out our introduction."
            image={data.ethereum.childImageSharp.fixed}
          />
          <TextDivider />
          <Emoji svg text=":gem_stone:" />
          <div>
            <h4>ETH underpins the Ethereum financial system</h4>
            <p>
              Not content with payments, the Ethereum community is building a
              financial system that's peer-to-peer and accessible to everyone.
            </p>
            <p>
              You can use ETH as collateral to generate entirely different
              cryptocurrency tokens on Ethereum. Plus you can borrow, lend and
              earn interest on ETH and other ETH-backed tokens.
            </p>
          </div>
          <TextDivider />
          <Emoji svg text=":milky_way:" />
          <div>
            <h4>Uses for ETH grow every day</h4>
            <p>
              Because Ethereum is programmable, developers can mould ETH to
              their imagination. The things you can do with ETH grows daily.
            </p>
            <p>
              Back in 2015, all you could do was send ETH from one Ethereum
              account to another...
            </p>
            <p>
              Right now, you can{" "}
              <Link to="https://sablier.finance">stream ETH</Link> to pay
              someone or receive funds in real time. You can seamlesly{" "}
              <Link to="https://app.uniswap.org/#/swap?use=v1">
                trade ETH with other tokens
              </Link>{" "}
              including Bitcoin. Eventually, you'll be able to play a part in
              securing Ethereum by staking your ETH and earning more in return.
            </p>
          </div>
        </CentralColumn>
        <StyledCalloutBanner
          title="Where to get ETH"
          description="You can get ETH from an exchange or a wallet that lets you buy ETH directly. Different regions and countries have different policies, so we’ve put together a list to help you find services that let you buy ETH where you live ."
          image={data.eth_cat.childImageSharp.fluid}
          maxImageWidth={300}
        >
          <div>
            <Button to="/get-eth/">Get ETH</Button>
          </div>
        </StyledCalloutBanner>
        <Divider />
      </Content>
      <Content id="tokens">
        <h2>More on ETH</h2>
      </Content>
      <TwoColumnContent>
        <Column>
          <h3>Why does ETH have value?</h3>
          <p>
            ETH gets its value in different ways dependent on how you want to
            use it.
          </p>
          <p>
            For most users of Ethereum, ETH is valuable because it lets you pay
            transaction fees to use the network. Others see it as an investment,
            similar to Bitcoin or other cryptocurrencies.
          </p>
          <p>
            But the issuance of ETH decreases over time, so others also
            consdider it valuable as a digital store of value.
          </p>
          <p>
            Most recently, ETH has become valuable to users of financial apps on
            Ethereum. That's because you can use ETH as a form of collateral, or
            as a payment system.
          </p>
        </Column>
        <Column>
          <h3>From the community</h3>
          <CardList content={cardListContent} />
        </Column>
      </TwoColumnContent>
      <TwoColumnContent>
        <Column>
          <h3 id="tokens">ETH isn't the only crypto on Ethereum</h3>
          <p>
            Anyone can create new kinds of assets and trade them on Ethereum.
            These are known as "tokens". People have tokenised traditional
            currencies, their real estate, their art and even themselves!{" "}
          </p>
          <p>
            Ethereum is home to thousands of tokens – some more useful and
            valuable than others. Developers are constantly building new tokens
            that unlock new possibilities and open new markets.
          </p>
          <p id="tokens">
            {" "}
            If you'd like to learn more about tokens, our friends at EthHub have
            written a couple of great overviews:{" "}
          </p>
          <Link to="https://docs.ethhub.io/guides/a-straightforward-guide-erc20-tokens/">
            Ethereum tokens
          </Link>
          <br />
          <Link to="https://docs.ethhub.io/built-on-ethereum/erc-token-standards/erc721/#summary">
            Non-fungible tokens
          </Link>
        </Column>
        <Column>
          <h3>Popular types of token</h3>

          {tokens.map((token, idx) => {
            return (
              <TokenCardVert
                key={idx}
                emoji={token.emoji}
                title={token.title}
                description={token.description}
              />
            )
          })}
        </Column>
      </TwoColumnContent>
    </Page>
  )
}

export default WhatIsEthereumPage

export const query = graphql`
  query {
    banner: file(relativePath: { eq: "home/eth_tokens.png" }) {
      childImageSharp {
        fluid(maxHeight: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "home/doge_computer.png" }) {
      childImageSharp {
        fixed(width: 372) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    eth: file(relativePath: { eq: "eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ethereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        fixed(width: 220) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    eth_cat: file(relativePath: { eq: "eth_logo_1.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
