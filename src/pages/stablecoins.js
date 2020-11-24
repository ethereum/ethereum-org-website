import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { navigate } from "gatsby-plugin-intl"
import Pill from "../components/Pill"
import BoxGrid from "../components/BoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import HorizontalCard from "../components/HorizontalCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import Warning from "../components/Warning"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import ProductList from "../components/ProductList"
import {
  ButtonSecondary,
  ButtonPrimary,
  CardGrid,
  Content,
  Page,
  CenterDivider,
  Eth2Header,
} from "../components/SharedStyledComponents"
import StablecoinAccordion from "../components/StablecoinAccordion"

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0rem;
  border-radius: 2px;
  padding: 0rem 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    padding: 0;
  }
`

const HeroContent = styled.div`
  max-width: 640px;
  padding: 8rem 0 8rem 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding: 4rem 0;
    max-width: 100%;
  }
`

const Hero = styled(Img)`
  flex: 1 1 50%;
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  margin-top: -3rem;
  margin-right: 3rem;
  width: 100%;
  max-width: 624px;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0;
    margin-right: 0;
    max-width: 560px;
  }
`

const HeroHeader = styled(Eth2Header)`
  max-width: 100%;
`

const MagiciansImage = styled(Img)`
  background-size: cover;
  background-repeat: no-repeat;
  align-self: center;
  width: 100%;
  min-width: 240px;
  max-width: 300px;
  margin: 2rem 6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 2rem 0rem;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledGhostCard = styled(GhostCard)`
  max-width: 640px;
  margin-right: 2rem;
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 14px;
  color: ${(props) => props.theme.colors.text300};
`

const HeroSubtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Subtitle = styled.div`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
  margin-top: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    font-size: 20px;
  }
`

const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const IntroRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  background: ${(props) => props.theme.colors.background};
  border-radius: 32px;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const TwoColumnContent = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const StyledWarning = styled(Warning)`
  margin: 0rem 0 0rem;
  width: 50%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
`

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 8rem 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 0;
  }
`

const MobileOptionContainer = styled(OptionContainer)`
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.m}) {
    display: none;
  }
`

const Option = styled.div`
  border-radius: 2rem;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  box-shadow: ${(props) =>
    props.isActive ? props.theme.colors.tableBoxShadow : `none`};
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
  }
`

const OptionText = styled.div`
  font-size: 24px;
  line-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 16px;
    font-weight: 600;
  }
`

const Column = styled.div`
  flex: 1 1 75%;
  margin-bottom: 1.5rem;
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
    margin-left: 0rem;
  }
`

const StyledButtonLink = styled(ButtonLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-bottom: 1rem;
  }
`

const FullWidthContainer = styled(Page)`
  margin: 0rem 0rem;
  margin-bottom: 4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.ednBackground};
  padding: 2rem 0rem;
  padding-top: 4rem;
`

const CardContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: 1fr;
  }
`

const CenteredCard = styled(Card)`
  text-align: center;
`

const StepBoxContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0rem;
  margin-bottom: 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-wrap: wrap;
  }
`

const StepBox = styled(Link)`
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  width: 100%;
  &:hover {
    background: ${(props) => props.theme.colors.ednBackground};
    transition: transform 0.2s;
    transform: scale(1.05);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 2rem;
  }
`

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  a {
    display: none;
  }
`

const CenterText = styled.p`
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 1.5rem;
    margin-bottom: 1rem;
  }
`

const LeftColumn = styled.div`
  margin-right: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`

const RightColumn = styled.div`
  margin-left: 2rem;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: auto 0rem;
  }
`
const About = styled.div`
  margin-top: 3rem;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    align-items: flex-start;
  }
`

const BoxText = styled.p`
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    text-align: left;
  }
`

const TextNoMargin = styled.p`
  margin-bottom: 0rem;
  margin-right: 1rem;
`
const AddDapp = styled.div`
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 1.5rem;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const AddDappButton = styled(ButtonLink)`
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin-top: 2rem;
  }
`

const TokenCard = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
`

const StyledDocLink = styled(DocLink)``

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 12rem;
  }
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 4rem;
`

const tokens = [
  {
    emoji: ":globe_showing_americas:",
    description:
      "Accept them wherever you live – no bank account or personal details required.",
  },
  {
    emoji: ":shield:",
    description:
      "Stablecoins are censor-proof and anonymous. No one can stop you receiving them, sending them, or swapping them.",
  },
  {
    emoji: ":handshake:",
    description:
      "Stablecoins are exchangeable for ETH and any other Ethereum token. And most Ethereum finance products rely on stablecoins.",
  },
  {
    emoji: ":key:",
    description:
      "Stablecoins are secured by cryptography. No one can forge transactions on your behalf.",
  },
]

const features = [
  {
    title: "Fiat backed",
    description:
      "Once deployed to Ethereum, dapp code can’t be taken down. And anyone can use the dapp’s features. Even if the team behind the dapp disbanded you could still use it. Once on Ethereum, it stays there.",
    emoji: ":dollar:",
  },
  {
    title: "Crypto backed",
    description:
      "You can't be blocked from using a dapp or submitting transactions. For example, if Twitter was on Ethereum, no one could block your account or stop you from tweeting.",
    emoji: ":unicorn:",
  },
  {
    title: "Precious metals ",
    description:
      "Because Ethereum has ETH, payments are native to Ethereum. Developers don't need to spend time integrating with third-party payment providers.",
    emoji: ":gem_stone:",
  },
  {
    title: "Rebase",
    description:
      "Dapp code is often in the open and compatible by default. Teams regularly build using other teams' work. If you want to let users swap tokens in your dapp, you can just plug in another dapp's code.",
    emoji: ":chart_with_downwards_trend:",
  },
]

const StablecoinsPage = ({ data }) => {
  const [selectedCategory, setCategory] = useState(false)

  const handleMobileCategorySelect = (category) => {
    setCategory(category)
    navigate("/dapps/#explore")
  }

  return (
    <Page>
      <PageMetadata
        title="Stablecoins"
        description="An introduction to Ethereum stablecoins: what they are, how to get them, and why they're important."
      />
      <Content>
        <HeroContainer>
          <HeroContent>
            <Title>Stablecoins</Title>
            <HeroHeader>Digital currencies for everyday use</HeroHeader>
            <HeroSubtitle>
              Stablecoins are Ethereum tokens with a stable value, making them
              more suitable for payments.
            </HeroSubtitle>
            <StyledButtonLink to="#explore">Get stablecoins</StyledButtonLink>
          </HeroContent>
          <Hero
            fluid={data.stablecoins.childImageSharp.fluid}
            alt="The three biggest stablecoins by market cap: dai, usdc, and tether."
          />
        </HeroContainer>
      </Content>
      <Content>
        <H2>Stablecoin prices</H2>
        <p>
          Stablecoins are designed to stay “stable” unlike other cryptocurrency
          tokens. There are a few{" "}
          <Link to="#">different ways they keep their value stable</Link>.
        </p>
        <TwoColumnContent>
          <LeftColumn>
            <H2>Why stablecoins?</H2>
            <p>
              ETH, like Bitcoin, is volatile – most cryptocurrrencies are. This
              makes them bad for things like spending, salaries, and other
              financial services. Stablecoins mirror the value of traditional
              currencies to give you access to stable money that you can use on
              Ethereum.
            </p>
          </LeftColumn>
        </TwoColumnContent>
        <TwoColumnContent>
          <LeftColumn>
            {tokens.map((token, idx) => {
              return (
                <TokenCard
                  key={idx}
                  emoji={token.emoji}
                  description={token.description}
                  emojiSize={3}
                />
              )
            })}
          </LeftColumn>
          <StyledGhostCard>
            <Emoji svg size={3} text=":pizza:" />
            <h3>The infamous Bitcoin pizza</h3>
            <p>
              ETH, like Bitcoin, is volatile – most cryptocurrrencies are. This
              makes them bad for things like spending, salaries, and other
              financial services. Stablecoins mirror the value of traditional
              currencies to give you access to stable money that you can use on
              Ethereum.{" "}
            </p>
          </StyledGhostCard>
        </TwoColumnContent>
      </Content>
      <Content>
        <H2 id="explore">How to get stablecoins</H2>
        <StablecoinAccordion
          title="Swap"
          emoji=":twisted_rightwards_arrows:"
          contentPreview="You can pick up most stablecoins on decentralized exchanges. So you can swap any tokens you might have for a stablecoin you want."
        ></StablecoinAccordion>
        <StablecoinAccordion
          title="Buy"
          emoji=":shopping_bags:"
          contentPreview="A lot of centralized exchanges will offer fiat-backed stablecoins too. So you should be able to buy them in the same way that you buy ETH."
        ></StablecoinAccordion>
        <StablecoinAccordion
          title="Generate"
          emoji=":high_voltage:"
          contentPreview="You can generate some stablecoins by using your ETH as collateral, which you have to pay back. Dai is perhaps the most famous example."
        ></StablecoinAccordion>
      </Content>
      <Content>
        <H2>How they work: types of stablecoin</H2>
        <BoxGrid items={features} />
      </Content>
    </Page>
  )
}

export default StablecoinsPage

export const dappImage = graphql`
  fragment dappImage on File {
    childImageSharp {
      fluid(maxWidth: 80) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
export const editorImage = graphql`
  fragment editorImage on File {
    childImageSharp {
      fixed(height: 80, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const query = graphql`
  query {
    stablecoins: file(relativePath: { eq: "stablecoins/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    magicians: file(relativePath: { eq: "magicians.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        fixed(height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    wallet: file(relativePath: { eq: "wallet.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    uniswapec: file(relativePath: { eq: "dapps/uni.png" }) {
      ...editorImage
    }
    foundationec: file(relativePath: { eq: "dapps/foundation.png" }) {
      ...editorImage
    }
    darkforestec: file(relativePath: { eq: "dapps/darkforest.png" }) {
      ...editorImage
    }
    pooltogetherec: file(relativePath: { eq: "dapps/pooltogether.png" }) {
      ...editorImage
    }
    aave: file(relativePath: { eq: "dapps/aave.png" }) {
      ...dappImage
    }
    compound: file(relativePath: { eq: "dapps/compound.png" }) {
      ...dappImage
    }
    pooltogether: file(relativePath: { eq: "dapps/pooltogether.png" }) {
      ...dappImage
    }
    uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
      ...dappImage
    }
    dai: file(relativePath: { eq: "dapps/stabledai.png" }) {
      ...dappImage
    }
    set: file(relativePath: { eq: "dapps/set.png" }) {
      ...dappImage
    }
    tornado: file(relativePath: { eq: "dapps/tornado.png" }) {
      ...dappImage
    }
    loopring: file(relativePath: { eq: "dapps/loopring.png" }) {
      ...dappImage
    }
    polymarket: file(relativePath: { eq: "dapps/polymarket.png" }) {
      ...dappImage
    }
    sablier: file(relativePath: { eq: "dapps/sablier.png" }) {
      ...dappImage
    }
    golem: file(relativePath: { eq: "dapps/golem.png" }) {
      ...dappImage
    }
    gitcoin: file(relativePath: { eq: "dapps/gitcoin.png" }) {
      ...dappImage
    }
    ens: file(relativePath: { eq: "dapps/ens.png" }) {
      ...dappImage
    }
    radicle: file(relativePath: { eq: "dapps/radicle.png" }) {
      ...dappImage
    }
    brave: file(relativePath: { eq: "dapps/brave.png" }) {
      ...dappImage
    }
    opera: file(relativePath: { eq: "dapps/opera.png" }) {
      ...dappImage
    }
    foundation: file(relativePath: { eq: "dapps/foundation.png" }) {
      ...dappImage
    }
    superrare: file(relativePath: { eq: "dapps/superrare.png" }) {
      ...dappImage
    }
    audius: file(relativePath: { eq: "dapps/audius.png" }) {
      ...dappImage
    }
    marble: file(relativePath: { eq: "dapps/marble.png" }) {
      ...dappImage
    }
    nifty: file(relativePath: { eq: "dapps/nifty.png" }) {
      ...dappImage
    }
    opensea: file(relativePath: { eq: "dapps/opensea.png" }) {
      ...dappImage
    }
    rarible: file(relativePath: { eq: "dapps/rarible.png" }) {
      ...dappImage
    }
    decentraland: file(relativePath: { eq: "dapps/decentraland.png" }) {
      ...dappImage
    }
    cryptopunks: file(relativePath: { eq: "dapps/cryptopunks.png" }) {
      ...dappImage
    }
    darkforest: file(relativePath: { eq: "dapps/darkforest.png" }) {
      ...dappImage
    }
    axie: file(relativePath: { eq: "dapps/axie.png" }) {
      ...dappImage
    }
    gods: file(relativePath: { eq: "dapps/gods.png" }) {
      ...dappImage
    }
    cryptovoxels: file(relativePath: { eq: "dapps/cryptovoxels.png" }) {
      ...dappImage
    }
    matcha: file(relativePath: { eq: "dapps/matcha.png" }) {
      ...dappImage
    }
    oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
      ...dappImage
    }
    dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
      ...dappImage
    }
    augur: file(relativePath: { eq: "dapps/augur.png" }) {
      ...dappImage
    }
  }
`
