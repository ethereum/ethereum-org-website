import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { navigate } from "gatsby-plugin-intl"
import Pill from "../components/Pill"
import StablecoinBoxGrid from "../components/StablecoinBoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import HorizontalCard from "../components/HorizontalCard"
import ProductCard from "../components/ProductCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import Warning from "../components/Warning"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import SimpleTable from "../components/SimpleTable"
import {
  ButtonSecondary,
  ButtonPrimary,
  CardGrid,
  Divider,
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
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const DaiBanner = styled.div`
  background: ${(props) => props.theme.colors.gridYellow};
  border-radius: 2px;
  display: flex;
  width: 100%;
  padding: 6rem 6rem;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.colors.black200};
`

const DaiSubtitle = styled.p`
  font-size: 24px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.black200};
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
  margin: 2rem 0 4rem;
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
  padding: 0rem 2rem;
  padding-bottom: 4rem;
  margin-top: -2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
    padding-left: 0rem;
    padding-right: 0rem;
    margin-top: -2rem;
  }
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

const DaiH2 = styled.h2`
  font-size: 40px;
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

const DaiButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const DaiButton = styled(ButtonLink)`
  color: ${(props) => props.theme.colors.black300};
  border: 1px solid ${(props) => props.theme.colors.black300};
`

const StyledDocLink = styled(DocLink)``

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 12rem;
  }
`

const StyledLeftColumn = styled(LeftColumn)`
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 50%;
`

const StyledCardGrid = styled(CardGrid)`
  margin-bottom: 4rem;
`

const TableContent = styled(Content)`
  overflow-x: scroll;
`

const HeroSectionContent = styled(Content)`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 2rem;
  padding: 2rem;
  background: ${(props) => props.theme.colors.ednBackground};
`

const features = [
  {
    title: "Fiat backed",
    description:
      "Basically an IOU (I owe you) for a traditional fiat currency (usually dollars). You use your fiat currency to purchase a stablecoin that you can later cash-in and redeem for your original currency.",
    emoji: ":dollar:",
    pros: [
      "Safe against crypto volatility.",
      "Safe if blockchain is attacked.",
    ],
    cons: [
      "Centralized – someone must issue the tokens.",
      "Requires auditing to ensure company has suffficient reserves.",
    ],
    projects: ["Tether", "USDc"],
    links: ["https://www.tether.com", "https://www.tether.com"],
  },
  {
    title: "Crypto backed",
    description:
      "These stablecoins are backed by other crypto assets, like ETH. Their price depends on the value of the underlying asset (or collateral), which can be volatile. Because ETH's value can fluctuate, these stablecoins are overcollateralised to ensure the price stays as stable as possible. This means it's closer to say that a $1 crypto backed stablecoin has an underlying crypto asset worth at least $2. So if the price of ETH drops, more ETH must be used to back the stablecoin, else the stablecoins will lose their value.",
    emoji: ":unicorn:",
    pros: [
      "Transparent and fully decentralized.",
      "Quick to turn into other crypto assets.",
    ],
    cons: [
      "Less stable than fiat-backed stablecoins.",
      "You need to keep an eye on the value of the crypto collateral.",
    ],
    projects: ["Dai", "Test"],
    links: ["https://www.tether.com", "https://www.tether.com"],
  },
  {
    title: "Precious metals ",
    description:
      "Like fiat-backed coins, instead these stablecoins use resources like Gold to maintain their value.",
    emoji: ":gem_stone:",
    pros: [
      "Safe against crypto volatility.",
      "Safe if blockchain is attacked.",
    ],
    cons: [
      "Centralized – someone must issue the tokens.",
      "You need to trust the token issuer and the precious metal reserves.",
      "Expensive and slow to turn back into fiat currency.",
    ],
    projects: ["Dai", "Test"],
    links: ["https://www.tether.com", "https://www.tether.com"],
  },
  {
    title: "Non-collateralised",
    description:
      "These stablecoins aren't backed by any other asset. Instead an algorithm will sell tokens if the price falls below the desired value and supply tokens if the value goes beyond the desired amount. Because the number of these tokens in circulation changes regularly, the number of tokens you own will change, but will always reflect your share.",
    emoji: ":chart_with_downwards_trend:",
    pros: ["No collateral needed.", "Controlled by a public algorithm."],
    cons: [
      "You need to trust (or be able to read) the algorithm.",
      "Your balance of coins will fluctuate.",
    ],
    projects: ["Dai", "Test"],
    links: ["https://www.tether.com", "https://www.tether.com"],
  },
]

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
      "Stablecoins are exchangeable for ETH and any other Ethereum token. Lots of dapps rely on stablecoins.",
  },
  {
    emoji: ":key:",
    description:
      "Stablecoins are secured by cryptography. No one can forge transactions on your behalf.",
  },
]

const StablecoinsPage = ({ data }) => {
  const dapps = [
    {
      background: "#000000",
      url: "https://aave.com",
      alt: "Aave logo",
      image: data.aave.childImageSharp.fixed,
      name: "Aave",
    },
    {
      background: "#000000",
      url: "https://compound.finance",
      alt: "Compound logo",
      image: data.compound.childImageSharp.fixed,
      name: "Compound",
    },
    {
      background: "#000000",
      url: "https://dydx.com",
      alt: "DyDx logo",
      image: data.dydx.childImageSharp.fixed,
      name: "dYdX",
    },
    {
      background: "#000000",
      url: "https://oasis.app",
      alt: "Oasis logo",
      image: data.oasis.childImageSharp.fixed,
      name: "Oasis",
    },
  ]

  const table = [
    {
      test1: "Tether",
      test2: "$17,860,785,598	",
      test3: "Fiat backed",
      link: "https://google.com",
      image: data.tether.childImageSharp.fixed,
    },
    {
      test1: "USDc",
      test2: "$2,785,583,438	",
      test3: "Fiat backed",
      link: "https://google.com",
      image: data.usdc.childImageSharp.fixed,
    },
    {
      test1: "Dai",
      test2: "$1,007,654,948	",
      test3: "Crypto backed",
      link: "https://google.com",
      image: data.daitable.childImageSharp.fixed,
    },
  ]
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
      <HeroSectionContent>
        <H2>Stablecoin prices</H2>
        <p>
          Stablecoins are designed to stay “stable” unlike other cryptocurrency
          tokens. There are a few{" "}
          <Link to="#how">different ways they keep their value stable</Link>.
        </p>
      </HeroSectionContent>
      <Content>
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
        <DaiBanner>
          <StyledLeftColumn>
            <div>
              <DaiH2>Dai stablecoin</DaiH2>
              <DaiSubtitle>
                Dai is probably the most famous decentralized stablecoin. It’s
                value is roughly a dollar and it’s accepted widely across dapps.{" "}
              </DaiSubtitle>
              <DaiButtonRow>
                <b>Got ETH and a wallet?</b>{" "}
                <DaiButton isSecondary ml={"1rem"} to="https://1inch.exchange">
                  Swap for Dai
                </DaiButton>
              </DaiButtonRow>
              <DaiButtonRow>
                <b>Need help getting startedd?</b>{" "}
                <DaiButton isSecondary ml={"1rem"} to="#explore">
                  How to get Dai
                </DaiButton>
              </DaiButtonRow>
            </div>
          </StyledLeftColumn>
          <Hero
            fluid={data.dailarge.childImageSharp.fluid}
            alt="The Dai logo"
          />
        </DaiBanner>
      </Content>
      <Content>
        <H2 id="explore">How to get stablecoins</H2>
      </Content>
      <FullWidthContainer>
        <StablecoinAccordion />
      </FullWidthContainer>
      <Divider />
      <Content>
        <StyledCalloutBanner
          title="Use your stablecoins"
          description="Check out Ethereum’s dapps – stablecoins are often more useful for everyday transactions."
          image={data.doge.childImageSharp.fluid}
          maxImageWidth={600}
          alt="Illustration of a doge."
        >
          <div>
            <ButtonLink to="/dapps/">Explore dapps</ButtonLink>
          </div>
        </StyledCalloutBanner>
        <TwoColumnContent>
          <LeftColumn>
            <H2>Save with stablecoins</H2>
            <p>
              Stablecoins often have an above-average interest rate because
              there’s a lot of demand for borrowing them. There are dapps out
              there that let you earn interest on your stablecoins in real time.
              In the background, you're supplying tokens for potential borrowers
              but you can withdraw your tokens and your interest at any time.
            </p>
          </LeftColumn>
          <RightColumn>
            <Warning>
              <H2>Always do your own research</H2>
              Ethereum is a new technology and most applications are new. Make
              sure you're aware of the risk and only deposit what you can afford
              to lose.
            </Warning>
          </RightColumn>
        </TwoColumnContent>
        <StyledCardGrid>
          {dapps.map((dapp, idx) => {
            return (
              <ProductCard
                key={idx}
                background={dapp.background}
                url={dapp.url}
                alt={dapp.alt}
                image={dapp.image}
                name={dapp.name}
              >
                <p>{dapp.description}</p>
              </ProductCard>
            )
          })}
        </StyledCardGrid>
      </Content>
      <Divider />
      <Content id="how">
        <H2>How they work: types of stablecoin</H2>
        <StablecoinBoxGrid items={features} />
      </Content>
      <H2>Top stablecoins by market capitalisation</H2>
      <p>
        Market capitalisation is <code>total supply x value</code>.
      </p>
      <TableContent>
        <SimpleTable
          column1="Currency"
          column2="Market cap"
          column3="Type"
          content={table}
        />
      </TableContent>
    </Page>
  )
}

export default StablecoinsPage

export const query = graphql`
  query {
    stablecoins: file(relativePath: { eq: "stablecoins/hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 624) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dai: file(relativePath: { eq: "stablecoins/dai.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dailarge: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    daitable: file(relativePath: { eq: "stablecoins/dai.png" }) {
      childImageSharp {
        fixed(width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    tether: file(relativePath: { eq: "stablecoins/tether.png" }) {
      childImageSharp {
        fixed(width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    usdc: file(relativePath: { eq: "stablecoins/usdc.png" }) {
      childImageSharp {
        fixed(width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    compound: file(relativePath: { eq: "dapps/compound.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    aave: file(relativePath: { eq: "dapps/aave.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    dydx: file(relativePath: { eq: "exchanges/dydx.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    oasis: file(relativePath: { eq: "dapps/stabledai.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    oasissmall: file(relativePath: { eq: "dapps/stabledai.png" }) {
      childImageSharp {
        fixed(width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
