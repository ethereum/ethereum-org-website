import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"

import CardList from "../components/CardList"
import EthExchanges from "../components/EthExchanges"
import EthPriceCard from "../components/EthPriceCard"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import Button from "../components/Button"
import PageMetadata from "../components/PageMetadata"
import CalloutBanner from "../components/CalloutBanner"
import Warning from "../components/Warning"
import {
  Content,
  Divider,
  LeftColumn,
  Page,
  RightColumn,
  StyledCard,
  TwoColumnContent,
} from "../components/SharedStyledComponents"

const Title = styled.h1`
  font-weight: normal;
  font-size: 3rem;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 2rem;
  }
`

const Subtitle = styled.div`
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.colors.text200};
`

const SubtitleTwo = styled.div`
  font-size: 20px;
  line-height: 140%;
  margin-bottom: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.text300};
`

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column-reverse;
    margin-bottom: 0rem;
  }
`

const Hero = styled(Img)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  max-width: 1440px;
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    max-width: 100vw;
  }
  min-height: 300px;
  max-height: 400px;
  background-size: cover;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 2rem;
  }
`

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 1rem;
  }
`

const WalletImage = styled(Img)`
  align-self: center;
  width: 50%;
  max-width: 600px;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    width: 100%;
  }
`

const WalletLeftColumn = styled(LeftColumn)`
  display: flex;
  flex-direction: column;
`

const GradientContainer = styled.div`
  background: radial-gradient(
    46.28% 66.31% at 66.95% 58.35%,
    rgba(127, 127, 213, 0.2) 0%,
    rgba(134, 168, 231, 0.2) 50%,
    rgba(145, 234, 228, 0.2) 100%
  );
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 4rem;
  padding: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 4rem 2rem;
  }
`

const CodeBox = styled.div`
  display: flex;
  justify-content: space-between;
  background: #191919;
  border-radius: 4px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
  }
`

const Code = styled.p`
  font-family: monospace;
  color: #ffffff;
  margin-bottom: 0rem;
`

const CodeLabel = styled.p`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.fail300};
  margin-bottom: 0rem;
  margin-right: 1rem;
  margin-left: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
  }
`

const GetETHPage = ({ data }) => {
  const decentralizedExchanges = [
    {
      title: "Localcryptos.com",
      link: "https://localcryptos.com/",
      image: data.localcryptos.childImageSharp.fixed,
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const tokenSwaps = [
    {
      title: "1inch",
      link: "https://1inch.exchange/#/",
      image: data.oneinch.childImageSharp.fixed,
    },
    {
      title: "Bancor",
      link: "https://www.bancor.network/",
      image: data.bancor.childImageSharp.fixed,
    },
    {
      title: "dYdX",
      link: "https://dydx.exchange/",
      image: data.dydx.childImageSharp.fixed,
    },
    {
      title: "Kyber",
      link: "https://kyberswap.com/swap/",
      image: data.kyber.childImageSharp.fixed,
    },
    {
      title: "Loopring",
      link: "https://loopring.io/trade/ETH-USDT",
      image: data.loopring.childImageSharp.fixed,
    },
    {
      title: "Uniswap V1",
      link: "https://app.uniswap.org/#/swap?use=v1",
      image: data.uniswap.childImageSharp.fixed,
    },
  ].sort((a, b) => a.title.localeCompare(b.title))

  const safetyArticles = [
    {
      title: "Protecting yourself and your funds",
      link:
        "https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds",
      description: "MyCrypto",
    },
    {
      title: "The keys to keeping your crypto safe",
      link:
        "https://blog.coinbase.com/the-keys-to-keeping-your-crypto-safe-96d497cce6cf",
      description: "Coinbase blog",
    },
    {
      title: "How to store digital assets on Ethereum",
      link:
        "https://media.consensys.net/how-to-store-digital-assets-on-ethereum-a2bfdcf66bd0",
      description: "ConsenSys",
    },
  ]

  return (
    <Page>
      <PageMetadata
        title="How to buy ETH"
        description="How to get ETH based on where you live and advice on how to look after it"
      />

      <HeroContainer>
        <Hero
          fluid={data.hero.childImageSharp.fluid}
          alt="Get ETH hero image"
          loading="eager"
        />
        <Header>
          <Title>Where to buy ETH</Title>
          <Subtitle>
            You can buy ETH from exchanges or from wallets directly.
          </Subtitle>
          <SubtitleTwo>
            Check which services you can use based on where you live.
          </SubtitleTwo>
          <EthPriceCard />
          <Button to="/get-eth/#country-picker">Search by country</Button>
        </Header>
      </HeroContainer>
      <CardContainer>
        <StyledCard
          emoji=":office_building:"
          title="Centralized exchanges"
          description="Exchanges are businesses that let you buy crypto using traditional currencies. They have custody over any ETH you buy until you send it to a wallet you control."
        />
        <StyledCard
          emoji=":busts_in_silhouette:"
          title="Decentralized exchanges (DEXs)"
          description="If you want more control, buy ETH peer-to-peer. With a DEX you can trade without giving control of your funds to a centralized company."
        >
          <Link to="/get-eth/#dex">Try a Dex</Link>
        </StyledCard>
        <StyledCard
          emoji=":robot:"
          title="Wallets"
          description="Some wallets let you buy crypto with a debit/credit card, bank transfer or even Apple Pay. Geographical restrictions apply."
        >
          <Link to="/wallets/">More on wallets</Link>
        </StyledCard>
        <Content>
          <p>
            <em>
              All exchanges, wallets and DEXs listed on this page are not
              official endorsements, and are provided for informational purposes
              only. We add products to this page based on criteria in our{" "}
              <Link to="/en/contributing/adding-products/">dapps</Link> {" "}and <Link to="/en/contributing/adding-exchanges/">exchanges</Link> {" "}listing policies.
              If you want to add an exchange or provide feedback on the policy{" "} <Link to="https://github.com/ethereum/ethereum-org-website/issues/new/choose">raise an issue in GitHub</Link>.
            </em>
          </p>
        </Content>
      </CardContainer>
      <InfoBanner emoji=":wave:">
        New to ETH? Here's an overview to get you started.{" "}
        <Link to="/eth/">What's ETH?</Link>
      </InfoBanner>
      <GradientContainer id="country-picker">
        <EthExchanges />
      </GradientContainer>
      <Content id="dex">
        <h2>Decentralized exchanges (DEXs)</h2>
      </Content>
      <TwoColumnContent>
        <LeftColumn>
          <h3>What are DEXs?</h3>
          <p>
            Decentralized exchanges are open marketplaces for ETH and other
            tokens. They connect buyers and sellers directly.
          </p>
          <p>
            Instead of using a trusted third party to safeguard funds in the
            transaction, they use code. The seller's ETH will only be
            transferred when payment is guaranteed. This type of code is known
            as a <Link to="/learn/#smart-contracts">smart contract</Link>.
          </p>
          <p>
            This means there are fewer geographical restrictions than with
            centralized alternatives. If someone is selling what you want and
            accepting a payment method you can provide, you’re good to go. DEXs
            can let you buy ETH with other tokens, PayPal or even in-person cash
            deliveries.
          </p>
          <p>You will need a wallet to use a DEX.</p>
          <Button to="/wallets">Get a wallet</Button>
        </LeftColumn>
        <RightColumn>
          <h3>Buy with traditional currencies</h3>
          <p>Buy ETH with traditional payment types directly from sellers.</p>
          <CardList content={decentralizedExchanges} />
          <h3>Buy with other crypto</h3>
          <p>Swap your tokens for other people's ETH. And vice versa.</p>
          <CardList content={tokenSwaps} />
          <Warning>
            These DEXs aren't for beginners as you'll need some ETH to use them.
          </Warning>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <Content>
        <h2>Keeping your ETH safe</h2>
      </Content>
      <TwoColumnContent>
        <WalletLeftColumn>
          <WalletImage fluid={data.wallet.childImageSharp.fluid} />
          <h3>Community posts on security</h3>
          <CardList content={safetyArticles} />
        </WalletLeftColumn>
        <RightColumn>
          <p>
            Ethereum and ETH aren't controlled by any government or company -
            they are decentralized. This means ETH's open to everyone to use.
          </p>
          <p>
            But this also means you need to take the security of your funds
            seriously. With ETH, you’re not trusting a bank to look after your
            money, you’re trusting yourself.
          </p>
          <h3>Protect your ETH in a wallet</h3>
          <p>
            If you plan on buying a lot of ETH you may want to keep it in a
            wallet you control, not an exchange. That's beacuse an exchange is a
            likely target for hackers. If a hacker gains access, you could lose
            your funds. Alternatively, only you have control of your wallet.
          </p>
          <h3>Your ETH address</h3>
          <p>
            When you download a <Link to="/wallets/">wallet</Link>, it will
            create a public ETH address for you. Here's what one looks like:
          </p>
          <CodeBox>
            <Code>0x0125e2478d69eXaMpLe81766fef5c120d30fb53f</Code>
            <CodeLabel>EXAMPLE: DO NOT COPY</CodeLabel>
          </CodeBox>
          <p>
            Think of this like your email address, but instead of mail it can
            receive ETH. If you want to transfer ETH from an exchange to your
            wallet, use your address as the destination. Be sure to always
            double check before you send!
          </p>
          <h3>Follow wallet instructions</h3>
          <p>
            If you lose access to your wallet, you’ll lose access to your funds.
            Your wallet should give you instructions on protecting against this.
            Be sure to follow them carefully – in most cases, no one can help
            you if you lose access to your wallet.
          </p>
        </RightColumn>
      </TwoColumnContent>
      <Divider />
      <CalloutBanner
        title="Use your ETH"
        description="Now that you own some ETH, check out some Ethereum applications (dapps). There are dapps for finance, social media, gaming and lots of other categories."
        image={data.dapps.childImageSharp.fluid}
        maxImageWidth={600}
      >
        <div>
          <Button to="/dapps">Check out dapps</Button>
        </div>
      </CalloutBanner>
    </Page>
  )
}

export default GetETHPage

export const listItemImage = graphql`
  fragment listItemImage on File {
    childImageSharp {
      fixed(width: 20) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    hero: file(relativePath: { eq: "get-eth.png" }) {
      childImageSharp {
        fluid(maxWidth: 1440) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dapps: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    localcryptos: file(relativePath: { eq: "exchanges/localcryptos.png" }) {
      ...listItemImage
    }
    uniswap: file(relativePath: { eq: "exchanges/uniswap.png" }) {
      ...listItemImage
    }
    matcha: file(relativePath: { eq: "exchanges/matcha.png" }) {
      ...listItemImage
    }
    kyber: file(relativePath: { eq: "exchanges/kyber.png" }) {
      ...listItemImage
    }
    loopring: file(relativePath: { eq: "exchanges/loopring.png" }) {
      ...listItemImage
    }
    oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
      ...listItemImage
    }
    bancor: file(relativePath: { eq: "exchanges/bancor.png" }) {
      ...listItemImage
    }
    dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
      ...listItemImage
    }
  }
`
