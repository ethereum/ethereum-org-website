import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { Twemoji } from "react-emoji-render"

import Card from "../components/Card"
import EthVideo from "../components/EthVideo"
import Callout from "../components/Callout"
import Button from "../components/Button"
import CalloutBanner from "../components/CalloutBanner"
import Link from "../components/Link"
import CardList from "../components/CardList"
import HorizontalCard from "../components/HorizontalCard"
import { Page } from "../components/SharedStyledComponents"
import EmojiBanner from "../components/EmojiBanner"

const Divider = styled.div`
  margin-bottom: 4rem;
  width: 10%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.homeDivider};
`

const Content = styled.div`
  width: 100%;
  padding: 1rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    padding: 1rem 2rem;
  }
`

const Emoji = styled(Twemoji)`
  & > img {
    width: 8em !important;
    height: 8em !important;
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

const Caption = styled.p`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.textSidebar};
`
const CaptionLink = styled.a`
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`
const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const StyledVideo = styled(EthVideo)`
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = styled.header`
  flex: 1 1 50%;
  margin-top: 8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin-top: 0;
  }
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

const Intro = styled.div`
  max-width: 608px;
  padding: 0rem 2rem;
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 0rem 2rem;
`

const ActionCardContainer = styled(CardContainer)`
  justify-content: center;
  margin-bottom: 3rem;
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

const TokenCard = styled(StyledCard)`
  flex: 1 1 25%;
  max-width: 320px;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex: 1 1 25%;
    max-width: 100%;
    min-width: 240px;
  }
`

const TokenCardVert = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
`

const Banner = styled(Img)`
  height: fit-content;
  width: 100%;
`

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 4rem;
`

const BannerContent = styled.div`
  position: absolute;
  padding: 0.5rem;
  top: 0%;
  left: 29%;
  width: 40%;
  text-align: center;
  justify-content: center;
`

const BannerMessage = styled.h2`
  font-size: 48px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 32px;
    top: 35%;
  }
`

const BannerCopy = styled.p`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 32px;
    top: 35%;
  }
`

const TwoColumnContent = styled(Content)`
  display: flex;
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 3rem;
  }
`

const Column = styled.div`
  flex: 0 0 50%;
  max-width: 75%;
  padding-right: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-right: 1rem;
`

const CardColumn = styled.div`
  flex: 0 1 50%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`

const SingleCard = styled(StyledCard)`
  margin: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 2rem;
  }
  a {
    text-decoration: underline;
  }
`

const GradientContainer = styled(GrayContainer)`
  background: linear-gradient(
    49.21deg,
    rgba(127, 127, 213, 0.2) 19.87%,
    rgba(134, 168, 231, 0.2) 58.46%,
    rgba(145, 234, 228, 0.2) 97.05%
  );
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`

const StyledCallout = styled(Callout)`
  flex: 1 1 424px;
`

const EthPrice = styled.div`
  background: linear-gradient(
    180deg,
    rgba(207, 236, 224, 0.4) 0%,
    rgba(207, 236, 224, 0) 100%
  );
  border-radius: 2px;
  padding: 1.5rem;
  margin-top: 3rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};

  display: flex;
  max-width: 424px;
`

const EthPriceValue = styled.p`
  font-size: 40px;
`

const EthPriceCurrent = styled.div`
  flex: 1 0 50%;
`

const EthPriceSwitcher = styled.div`
  flex: 1 0 33%;
  display: flex;
  flex-direction: column;
  text-align: right;
  align-content: space-between;
`

const PriceTrendUp = styled.p`
  font-color: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    #109e62;
  font-size: 24px;
  line-height: 140%;
`

const BlueContainer = styled.div`
  background: #f5feff;
  display: flex;
  padding: 2rem;
  margin-bottom: 2rem;
`

const OrangeContainer = styled.div`
  background: #fff9f6;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin-bottom: 2rem;
`

const PurpleContainer = styled.div`
  background: #f8f8fe;
  display: flex;
  padding: 2rem;
  margin-bottom: 2rem;
`

const Ethvalue = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 66%;
  margin: 3rem 0rem;
`

const EthValueCard = styled(HorizontalCard)`
  border: 0px;
  margin: 1rem 0rem;
`

const EmojiBannerReverse = styled(EmojiBanner)`
  display: flex;
  flex-direction: row;
`

const tests = [
  {
    link: "#",
    title: "Money",
    description:
      "If you have ETH you can send it cheaply to anyone with a wallet, anywhere in the world. You can also use it to buy goods, services and other crypto tokens.",
  },
  {
    link: "#",
    title: "Money",
    description:
      "If you have ETH you can send it cheaply to anyone with a wallet, anywhere in the world. You can also use it to buy goods, services and other crypto tokens.",
  },
]

// TODO fill out copy
const cards = [
  {
    emoji: ":money_bag:",
    title: "Money",
    description:
      "If you have ETH you can send it cheaply to anyone with a wallet, anywhere in the world. You can also use it to buy goods, services and other crypto tokens.",
  },
  {
    emoji: ":gem_stone:",
    title: "Collateral",
    description:
      "You can use your ETH as collateral or a deposit for borrowing other crypto tokens. This means you can use other tokens without having to spend or trade your ETH.",
  },
  {
    emoji: ":fuel_pump:",
    title: "Fuel",
    description:
      "Transactions require a fee paid in ETH. This powers your transaction and helps keep the network secure. Some applications pay your fee for you.",
  },
]

const roles = [
  {
    emoji: ":money_bag:",
    title: "Currency",
    description:
      "You can send ETH to anyone with a wallet, anywhere in the world. But it also informs the value for many other tokens and cryptocurrencies that you can trade on Ethereum.",
  },
  {
    emoji: ":raised_fist:",
    title: "Security",
    description:
      "The price of ETH is so tied to the health of Ethereum that if there was a hack the price of ETH would plummet. This means the incentive to hack Ethereum is very low.",
  },
  {
    emoji: ":fuel_pump:",
    title: "Fuel",
    description:
      "Transactions require a fee paid in ETH. This powers your transaction and helps keep the network secure. Some applications pay your fee for you.",
  },
]

const usecases = [
  {
    emoji: ":money_bag:",
    title: "Trading and investing",
    description:
      "You can send ETH to anyone with a wallet, anywhere in the world. But it also informs the value for many other tokens and cryptocurrencies that you can trade on Ethereum.",
  },
  {
    emoji: ":raised_fist:",
    title: "Store of value",
    description:
      "used to pay Ethereum transaction fees (in the form of ‘gas’), used as collateral for a wide range of open finance applications (MakerDAO, Compound), can be lent or borrowed (Dharma), accepted as payment by certain retailers and service providers use it as a medium of exchange to purchase Ethereum-based tokens (via ICOs or exchanges), crypto-collectibles, in-game items, and other non-fungible tokens (NFTs) earned as a reward for completing bounties (Gitcoin, Bounties Network)",
  },
  {
    emoji: ":fuel_pump:",
    title: "Medium of exchange",
    description:
      "Transactions require a fee paid in ETH. This powers your transaction and helps keep the network secure. Some applications pay your fee for you.",
  },
]

const tokens = [
  {
    emoji: ":scales:",
    title: "Stablecoins",
    description:
      "Tokens with value that mirror traditional currency like dollars. This makes them less volatile and better for earning/spending. Still accessible to anyone and censorship-resistant like ETH.",
  },
  {
    emoji: ":ballot_box_with_ballot:",
    title: "Governance tokens",
    description:
      "These represent voting power in decentralized organisations. Invest to have a say in strategic votes. If strategy decisions go well, the tokens should increase in value.",
  },
  {
    emoji: ":pile_of_poo:",
    title: "Sh*t coins",
    description:
      "Anyone can build on Ethereum so anyone can make their own tokens. Please make sure you do your research before investing in any tokens – there are some that are worthless. ",
  },
  {
    emoji: ":frame_with_picture:",
    title: "Non-fungible tokens (NFTs)",
    description:
      "Tokens that you can’t send or receive in decimal parts. Usually, they represent a unique digital asset, like a piece of artwork. Or a physical object that has been tokenised and added to Ethereum to prove ownership. ",
  },
]

const benefits = [
  {
    emoji: ":woman_technologist:",
    title: "It's really yours",
    description:
      "No entity holds your ETH on your behalf so you're always in control. With Ethereum you are your own bank and your wallet is your proof of ownership.",
  },
  {
    emoji: ":shield:",
    title: "Secured by cryptography",
    description:
      "Internet money may sound dangerous but it's secured by advanced cryptography which makes payments nearly impossible to intercept. ",
  },
  {
    emoji: ":handshake:",
    title: "Peer-to-peer",
    description:
      "You don't need intermediary services, like banks, to send your ETH. It's like handing money over in-person but you can do it securely with anyone, anywhere.",
  },
  {
    emoji: ":money_with_wings:",
    title: "No one controls it",
    description:
      "There's no one in control of ETH and no entity that mints or prints it. This means it's decentralized and global, ETH has no borders and no entity has the authority to stop or censor payments.",
  },
  {
    emoji: ":signal_strength:",
    title: "Open to anyone",
    description:
      "You only need a data connection and an Ethereum address to accept ETH. You don't need access to a bank account to accept payments. ",
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
  {
    link: "https://www.coindesk.com/learn/ethereum-101/ethereum-mining-works",
    title: "How Ethereum mining works",
    description: "Coindesk",
    caption: "March 2017",
  },
]

const WhatIsEthereumPage = (props) => {
  const data = props.data
  return (
    <Page>
      <Content>
        <HeroContainer>
          <Header>
            <Title>What is Eth?</Title>
            <Slogan>The fuel for our digital future</Slogan>
            <Subtitle>
              ETH is the currency of Ethereum – it powers the network.
            </Subtitle>
            <SubtitleTwo>
              You can use it, send it, receieve it, earn it and so much more...
            </SubtitleTwo>
            <Button to="/eth/get-eth" title="where to buy eth">
              Get ETH
            </Button>
            {/*
            <EthPrice>
              <EthPriceCurrent>
                <Caption>Current price</Caption>
                <EthPriceValue>$200.89</EthPriceValue>
                <Button to="#">Get ETH</Button>
              </EthPriceCurrent>
              <EthPriceSwitcher>
                <CaptionLink href="#">1 day</CaptionLink>
                <CaptionLink href="#">1 week</CaptionLink>
                <CaptionLink href="#">1 month</CaptionLink>
                <PriceTrendUp>1.67%</PriceTrendUp>
              </EthPriceSwitcher>
            </EthPrice>
          */}
          </Header>
          <StyledVideo />
        </HeroContainer>
      </Content>

      <GradientContainer>
        <Ethvalue>
          <h2>What is ETH?</h2>
          <p>
            ETH is a cryptocurrency. Like Bitcoin, it's an internet-based
            currency that you can use in transactions. If you’re new to crypto,
            here's how ETH is different from traditional money.
          </p>
          <CardContainer>
            {benefits.map((benefits, idx) => {
              return (
                <EthValueCard
                  key={idx}
                  emoji={benefits.emoji}
                  title={benefits.title}
                  description={benefits.description}
                />
              )
            })}
          </CardContainer>
        </Ethvalue>
      </GradientContainer>
      {/*<EmojiBanner
          emoji=":money_bag:"
          title="ETH is money"
          description="If you have ETH you can send it cheaply to anyone with a wallet,
          anywhere in the world. You can also use it to buy goods, services
          and other crypto tokens." />
        <EmojiBannerReverse
          emoji=":gem_stone:"
          title="ETH is collateral"
          description="You can use your ETH as collateral or a deposit for borrowing
          other crypto tokens. This means you can use other tokens without
          having to spend or trade your ETH." />
          <EmojiBanner
            emoji=":fuel_pump:"
            title="ETH is fuel"
            description="Transactions require a fee paid in Ether. This powers your
            transaction and helps keep the network secure. Some applications
            pay your fee for you." />
        <OrangeContainer>
          <Column>
            <Subtitle>
              If you have ETH you can send it cheaply to anyone with a wallet,
              anywhere in the world. You can also use it to buy goods, services
              and other crypto tokens.
            </Subtitle>
          </Column>
          <Caption>ETH is money</Caption>
          <Emoji svg text=":money_bag:" />
        </OrangeContainer>
        <PurpleContainer>
          <TwoColumnContent>
            <Column>
              <Caption>ETH is collateral</Caption>
              <SubtitleTwo>
                You can use your ETH as collateral or a deposit for borrowing
                other crypto tokens. This means you can use other tokens without
                having to spend or trade your ETH.
              </SubtitleTwo>
            </Column>
            <Column>
              <Emoji svg text=":gem_stone:" />
            </Column>
          </TwoColumnContent>
        </PurpleContainer>
        <BlueContainer>
          <TwoColumnContent>
            <Column>
              <Caption>ETH is fuel</Caption>
              <SubtitleTwo>
                Transactions require a fee paid in Ether. This powers your
                transaction and helps keep the network secure. Some applications
                pay your fee for you.
              </SubtitleTwo>
            </Column>
            <Column>
              <Emoji svg text=":fuel_pump:" />
            </Column>
          </TwoColumnContent>
        </BlueContainer>
        <Intro>
          <h2>You can use ETH as:</h2>
        </Intro>
        <CardContainer>
          {cards.map((card, idx) => {
            return (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            )
          })}
        </CardContainer>*/}
      <TwoColumnContent>
        <Column>
          <h2>What makes ETH different?</h2>
          <p>
            ETH has some key differences to other cryptocurrencies. This is
            largely because{" "}
            <a href="/what-is-ethereum/">
              Ethereum is different to other blockchains
            </a>
            .
          </p>
          <h4>It's fuel for the Ethereum economy</h4>
          <p>
            When you send ETH or use an Ethereum application, you'll need to pay
            a small fee in ETH. This fee is an incentive for a miner to process
            and verify your transaction. Miners are like the record-keepers of
            Ethereum – they check and prove that no one is cheating. But doing
            this is expensive, so your fee has to cover their costs.
          </p>
          <p>
            The work miners do keeps Ethereum secure and decentralized (without
            central ownership). So, in essence,{" "}
            <strong>ETH powers Ethereum</strong>.
          </p>
          <h4>It's the collateral for Ethereum's open financial system</h4>
          <p>
            Not content with payments, the Ethereum community is building a
            financial system that's peer-to-peer and accessible to everyone.
          </p>
          <p>
            Right now, you can borrow, lend and earn interest on ETH. You can
            even use it as collateral to generate entirely different
            cryptocurrency tokens on Ethereum.
          </p>
          <p>
            To ensure these services are safe and fair, products use ETH as
            collateral.
          </p>
          <h4>It's open to innovation</h4>
          <p>
            Because Ethereum is programmable, developers can mould ETH to their
            imagination.
          </p>
          <p>
            Right now, you can stream ETH to pay someone or receive funds in
            real time. You can seamlesly trade ETH with other tokens including
            Bitcoin. Eventually, you'll be able to play a part in securing
            Ethereum by staking your ETH and earning more in return.
          </p>
        </Column>
        <Column>
          <h2>The community on ETH</h2>
          <CardList content={cardListContent} />
        </Column>
      </TwoColumnContent>
      <CalloutBanner
        title="Where to get ETH"
        description="You can get ETH from an exchange or a wallet that lets you buy ETH directly. Different regions and countries have different policies, so we’ve put together a list to help you find the best places to buy ETH based on where you are."
        image={data.dapps.childImageSharp.fixed}
      >
        <div>
          <Button to="#">Get ETH</Button>
        </div>
      </CalloutBanner>

      <BannerContainer>
        <Banner fluid={data.banner.childImageSharp.fluid} />
        <BannerContent>
          <BannerMessage>Where to get ETH</BannerMessage>
          <BannerCopy>
            You can get ETH from an exchange or a wallet that lets you buy ETH
            directly. We’ve put together a list to help you find the best places
            to buy ETH based on where you are.
          </BannerCopy>
          <Button to="#">Get ETH</Button>
        </BannerContent>
      </BannerContainer>
      <GrayContainer>
        {/*<Content>
          <h2>ETH's role in Ethereum</h2>
          <p>
            ETH is fundamental to the whole Ethereum network. It fuels
            transactions, secures the network and, like Bitcoin, provides a
            decentralized store of value.
          </p>
          <CardContainer>
            {roles.map((role, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={role.emoji}
                  title={role.title}
                  description={role.description}
                />
              )
            })}
          </CardContainer>
          <h2>How are people using ETH</h2>
          <p>
            ETH has a few different uses right now in the Ethereum community.
          </p>
          <CardContainer>
            {usecases.map((usecase, idx) => {
              return (
                <StyledCard
                  key={idx}
                  emoji={usecase.emoji}
                  title={usecase.title}
                  description={usecase.description}
                />
              )
            })}
          </CardContainer>
        </Content>*/}
        <Content>
          <h2>ETH is not the only crypto on Ethereum</h2>
        </Content>
        <TwoColumnContent>
          <Column>
            <h3>Tokenise all the things</h3>
            <p>
              Anyone can create tokens and trade them on Ethereum. People have
              tokenised traditional currencies, their real estate, their art and
              even themselves!{" "}
            </p>
            <p>
              So Ethereum is home to thousands of tokens – some more useful and
              valuable than others. Developers are constantly building new
              tokens that unlock new possibilities and open new markets.
            </p>
            <h3>ETH is irreplaceable in Ethereum </h3>
            <p>
              With all these tokens, what about ETH? Well, no token can replace
              ETH because it’s the native token of Ethereum – it’s how you pay
              your transaction fees. It’s also tied to the security of the
              network. Ether is designed to make network hacks unprofitable. A
              hack would decimate the price of ETH and make it nearly impossible
              to sell. Plus, preparing the computing power you’d need would be
              an investment in itself. Thanks to ETH, hacking Ethereum would
              cost you more than you’d gain.
            </p>
            <br />
            <p>
              {" "}
              If you'd like to learn more about tokens, our friends at EthHub
              have written a couple of great overviews:{" "}
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
      </GrayContainer>
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
  }
`
