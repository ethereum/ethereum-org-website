import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl, navigate } from "gatsby-plugin-intl"
import StablecoinBoxGrid from "../components/StablecoinBoxGrid"
import Card from "../components/Card"
import Callout from "../components/Callout"
import CalloutBanner from "../components/CalloutBanner"
import HorizontalCard from "../components/HorizontalCard"
import DataProductCard from "../components/DataProductCard"
import GhostCard from "../components/GhostCard"
import Link from "../components/Link"
import InfoBanner from "../components/InfoBanner"
import DocLink from "../components/DocLink"
import Emoji from "../components/Emoji"
import ButtonLink from "../components/ButtonLink"
import PageMetadata from "../components/PageMetadata"
import SimpleTable from "../components/SimpleTable"
import Translation from "../components/Translation"
import { translateMessageId } from "../utils/translations"
import {
  ButtonSecondary,
  ButtonPrimary,
  CardGrid,
  Divider,
  Content,
  Page,
  Eth2Header,
  GradientContainer,
} from "../components/SharedStyledComponents"
import StablecoinAccordion from "../components/StablecoinAccordion"

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0rem;
  padding: 0rem 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    padding: 0;
  }
`

const StyledContent = styled(Content)`
  margin-bottom: -2rem;
`

const StyledGradientContainer = styled(GradientContainer)`
  margin-bottom: 2rem;
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

const Image = styled(Img)`
  background-size: cover;
  background-repeat: repeat;
  align-self: center;
  width: 100%;
  min-width: 240px;
  max-width: 240px;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    margin: 2rem 2rem;
    min-width: 160px;
    max-width: 160px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    margin: 2rem 0rem;
    min-width: 96px;
    max-width: 96px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-top: 0rem;
  }
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledGhostCard = styled(GhostCard)`
  max-width: 640px;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
    margin-top: 4rem;
  }
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
  border: 1.5px solid ${(props) => props.theme.colors.text};
  box-shadow: 8px 8px 0px 0px ${(props) => props.theme.colors.gridYellow};
  border-radius: 2px;
  background: ${(props) => props.theme.colors.background};
  justify-content: space-between;
  display: flex;
  width: 100%;
  padding: 1rem 6rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column-reverse;
    padding: 2rem 2rem;
  }
`

const StyledDaiBanner = styled(DaiBanner)`
  margin-right: 2rem;
  padding: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-right: 0rem;
  }
`

const USDCBanner = styled(DaiBanner)`
  margin-left: 2rem;
  padding: 2rem;
  box-shadow: 8px 8px 0px 0px ${(props) => props.theme.colors.gridBlue};
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin-left: 0rem;
  }
`

const DaiSubtitle = styled.p`
  font-size: 20px;
  line-height: 140%;
  color: ${(props) => props.theme.colors.text200};
`

const H2 = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

const H3 = styled.h3`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: left;
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
  font-size: 32px;
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

const StyledRightColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 2px;
  padding: 2rem;
  width: 100%;
  border: 1.5px solid ${(props) => props.theme.colors.text};
  box-shadow: ${(props) => props.theme.colors.cardBoxShadow};
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
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
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

const APY = styled.p`
  font-size: 64px;
  line-height: 100%;
`

const StablecoinsPage = ({ data }) => {
  const intl = useIntl()

  const features = [
    {
      title: translateMessageId("page-stablecoins-fiat-backed", intl),
      description: translateMessageId(
        "page-stablecoins-fiat-backed-description",
        intl
      ),
      emoji: ":dollar:",
      pros: [
        translateMessageId("page-stablecoins-fiat-backed-pro-1", intl),
        translateMessageId("page-stablecoins-fiat-backed-pro-2", intl),
      ],
      cons: [
        translateMessageId("page-stablecoins-fiat-backed-con-1", intl),
        translateMessageId("page-stablecoins-fiat-backed-con-2", intl),
      ],
      projects: ["Tether", "USDC"],
      links: ["https://www.tether.com", "https://www.tether.com"],
    },
    {
      title: translateMessageId("page-stablecoins-crypto-backed", intl),
      description: translateMessageId(
        "page-stablecoins-crypto-backed-description",
        intl
      ),
      emoji: ":unicorn:",
      pros: [
        translateMessageId("page-stablecoins-crypto-backed-pro-1", intl),
        translateMessageId("page-stablecoins-crypto-backed-pro-2", intl),
        translateMessageId("page-stablecoins-crypto-backed-pro-3", intl),
      ],
      cons: [
        translateMessageId("page-stablecoins-crypto-backed-con-1", intl),
        translateMessageId("page-stablecoins-crypto-backed-con-2", intl),
      ],
      projects: ["Dai", "Test"],
      links: ["https://www.tether.com", "https://www.tether.com"],
    },
    {
      title: translateMessageId("page-stablecoins-precious-metals", intl),
      description: translateMessageId(
        "page-stablecoins-precious-metals-description",
        intl
      ),
      emoji: ":gem_stone:",
      pros: [
        translateMessageId("page-stablecoins-precious-metals-pro-1", intl),
      ],
      cons: [
        translateMessageId("page-stablecoins-precious-metals-con-1", intl),
        translateMessageId("page-stablecoins-precious-metals-con-2", intl),
      ],
      projects: ["Dai", "Test"],
      links: ["https://www.tether.com", "https://www.tether.com"],
    },
    {
      title: translateMessageId("page-stablecoins-non-collateralised", intl),
      description: translateMessageId(
        "page-stablecoins-non-collateralised-description",
        intl
      ),
      emoji: ":chart_with_downwards_trend:",
      pros: [
        translateMessageId("page-stablecoins-non-collateralised-pro-1", intl),
        translateMessageId("page-stablecoins-non-collateralised-pro-2", intl),
      ],
      cons: [
        translateMessageId("page-stablecoins-non-collateralised-con-1", intl),
        translateMessageId("page-stablecoins-non-collateralised-con-2", intl),
      ],
      projects: ["Dai", "Test"],
      links: ["https://www.tether.com", "https://www.tether.com"],
    },
  ]

  const tokens = [
    {
      emoji: ":globe_showing_americas:",
      description: translateMessageId(
        "page-stablecoins-stablecoins-feature-1",
        intl
      ),
    },
    {
      emoji: ":chart_with_upwards_trend:",
      description: translateMessageId(
        "page-stablecoins-stablecoins-feature-2",
        intl
      ),
    },
    {
      emoji: ":handshake:",
      description: translateMessageId(
        "page-stablecoins-stablecoins-feature-3",
        intl
      ),
    },
    {
      emoji: ":key:",
      description: translateMessageId(
        "page-stablecoins-stablecoins-feature-4",
        intl
      ),
    },
  ]

  const dapps = [
    {
      background: "linear-gradient(225deg, #AA589B 0%, #5CB8C4 100%)",
      url: "https://aave.com",
      alt: translateMessageId("aave-logo", intl),
      image: data.aave.childImageSharp.fixed,
      name: "Aave",
      /* data: [
        {
          logo: data.tether.childImageSharp.fixed,
          apy: "4",
          coin: "Tether",
        },
        {
          logo: data.daitable.childImageSharp.fixed,
          apy: "3.5",
          coin: "Dai",
        },
        {
          logo: data.usdc.childImageSharp.fixed,
          apy: "7",
          coin: "USDC",
        },
      ], */
      description: translateMessageId(
        "page-stablecoins-stablecoins-dapp-description-1",
        intl
      ),
    },
    {
      background: "#F9FAFB",
      url: "https://compound.finance",
      alt: translateMessageId("compound-logo", intl),
      image: data.compound.childImageSharp.fixed,
      name: "Compound",
      /* data: [
        {
          logo: data.tether.childImageSharp.fixed,
          apy: "4",
          coin: "Tether",
        },
        {
          logo: data.daitable.childImageSharp.fixed,
          apy: "3.5",
          coin: "Dai",
        },
        {
          logo: data.usdc.childImageSharp.fixed,
          apy: "7",
          coin: "USDC",
        },
      ], */
      description: translateMessageId(
        "page-stablecoins-stablecoins-dapp-description-2",
        intl
      ),
    },
    {
      background: "#212121",
      url: "https://trade.dydx.exchange/portfolio/overview",
      alt: translateMessageId("dydx-logo", intl),
      image: data.dydx.childImageSharp.fixed,
      name: "dYdX",
      /* data: [
        {
          logo: data.tether.childImageSharp.fixed,
          apy: "4",
          coin: "Tether",
        },
        {
          logo: data.daitable.childImageSharp.fixed,
          apy: "3.5",
          coin: "Dai",
        },
        {
          logo: data.usdc.childImageSharp.fixed,
          apy: "7",
          coin: "USDC",
        },
      ], */
      description: translateMessageId(
        "page-stablecoins-stablecoins-dapp-description-3",
        intl
      ),
    },
    {
      background: "linear-gradient(135deg, #C7EFE6 0%, #EEEAC7 100%)",
      url: "https://oasis.app",
      alt: translateMessageId("oasis-logo", intl),
      image: data.oasis.childImageSharp.fixed,
      name: "Oasis",
      /* data: [
        {
          logo: data.tether.childImageSharp.fixed,
          apy: "4",
          coin: "Tether",
        },
        {
          logo: data.daitable.childImageSharp.fixed,
          apy: "3.5",
          coin: "Dai",
        },
        {
          logo: data.usdc.childImageSharp.fixed,
          apy: "7",
          coin: "USDC",
        },
      ], */
      description: translateMessageId(
        "page-stablecoins-stablecoins-dapp-description-4",
        intl
      ),
    },
  ]

  const table = [
    {
      test1: "Tether",
      test2: "$17,860,785,598	",
      test3: translateMessageId(
        "page-stablecoins-stablecoins-table-type-fiat-backed",
        intl
      ),
      link: "https://tether.to/",
      image: data.tether.childImageSharp.fixed,
    },
    {
      test1: "USDC",
      test2: "$2,785,583,438	",
      test3: translateMessageId(
        "page-stablecoins-stablecoins-table-type-fiat-backed",
        intl
      ),
      link: "https://www.coinbase.com/usdc",
      image: data.usdc.childImageSharp.fixed,
    },
    {
      test1: "Dai",
      test2: "$1,007,654,948",
      test3: translateMessageId(
        "page-stablecoins-stablecoins-table-type-crypto-backed",
        intl
      ),
      link: "https://oasis.app/dai",
      image: data.daitable.childImageSharp.fixed,
    },
  ]

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-stablecoins-title", intl)}
        description={translateMessageId(
          "page-stablecoins-meta-description",
          intl
        )}
      />
      <Content>
        <HeroContainer>
          <HeroContent>
            <Title>
              <Translation id="page-stablecoins-title" />
            </Title>
            <HeroHeader>
              <Translation id="page-stablecoins-hero-header" />
            </HeroHeader>
            <HeroSubtitle>
              <Translation id="page-stablecoins-hero-subtitle" />
            </HeroSubtitle>
            <StyledButtonLink to="#explore">
              <Translation id="page-stablecoins-hero-button" />
            </StyledButtonLink>
          </HeroContent>
          <Hero
            fluid={data.stablecoins.childImageSharp.fluid}
            alt={translateMessageId("page-stablecoins-hero-alt", intl)}
          />
        </HeroContainer>
      </Content>
      {/* <HeroSectionContent>
        <H2>
          <Translation id="page-stablecoins-prices" />
        </H2>
        <p>
          <Translation id="page-stablecoins-prices-definition" />{" "}
          <Link to="#how">
            <Translation id="page-stablecoins-prices-definition-how" />
          </Link>
        </p>
        <H3>
          <Translation id="page-stablecoins-coin-price-change" />
        </H3>
        [Insert graph showing price changes over 30days for stablecoins vs ETH
        to demo comparative stability]
      </HeroSectionContent> */}
      <Content>
        <Divider />
        <TwoColumnContent>
          <LeftColumn>
            <H2>
              <Translation id="page-stablecoins-why-stablecoins" />
            </H2>
            <p>
              <Translation id="page-stablecoins-prices-definition" />{" "}
              <Link to="#how">
                <Translation id="page-stablecoins-prices-definition-how" />
              </Link>
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
            <h3>
              <Translation id="page-stablecoins-bitcoin-pizza" />
            </h3>
            <p>
              <Translation id="page-stablecoins-bitcoin-pizza-body" />{" "}
            </p>
          </StyledGhostCard>
        </TwoColumnContent>
      </Content>
      <StyledGradientContainer>
        <StyledContent>
          <H2>
            <Translation id="page-stablecoins-find-stablecoin" />
          </H2>
          <StyledLeftColumn>
            <p>
              <Translation id="page-stablecoins-find-stablecoin-intro" />
            </p>
            <ul>
              <li>
                <Link to="#how">
                  <Translation id="page-stablecoins-find-stablecoin-types-link" />
                </Link>
              </li>
              <li>
                <Link to="#explore">
                  <Translation id="page-stablecoins-find-stablecoin-how-to-get-them" />
                </Link>
              </li>
            </ul>
          </StyledLeftColumn>
          <H3>
            <Translation id="page-stablecoins-editors-choice" />
          </H3>
          <p>
            <Translation id="page-stablecoins-editors-choice-intro" />
          </p>
          <Row>
            <StyledDaiBanner>
              <StyledLeftColumn>
                <div>
                  <DaiH2>
                    <Translation id="page-stablecoins-dai-banner-title" />
                  </DaiH2>
                  <DaiSubtitle>
                    <Translation id="page-stablecoins-dai-banner-body" />
                  </DaiSubtitle>
                  <ButtonLink
                    mb={"1rem"}
                    mr={"1rem"}
                    to="https://1inch.exchange"
                  >
                    <Translation id="page-stablecoins-dai-banner-swap-button" />
                  </ButtonLink>
                  <ButtonLink isSecondary to="https://oasis.app/dai">
                    <Translation id="page-stablecoins-dai-banner-learn-button" />
                  </ButtonLink>
                </div>
              </StyledLeftColumn>
              <Image
                fluid={data.dailarge.childImageSharp.fluid}
                alt={translateMessageId("page-stablecoins-dai-logo", intl)}
              />
            </StyledDaiBanner>
            <USDCBanner>
              <StyledLeftColumn>
                <div>
                  <DaiH2>
                    <Translation id="page-stablecoins-usdc-banner-title" />
                  </DaiH2>
                  <DaiSubtitle>
                    <Translation id="page-stablecoins-usdc-banner-body" />
                  </DaiSubtitle>
                  <ButtonLink
                    mb={"1rem"}
                    mr={"1rem"}
                    to="https://matcha.xyz/markets/ETH/USDC"
                  >
                    <Translation id="page-stablecoins-usdc-banner-swap-button" />
                  </ButtonLink>
                  <ButtonLink isSecondary to="https://www.coinbase.com/usdc">
                    <Translation id="page-stablecoins-usdc-banner-learn-button" />
                  </ButtonLink>
                </div>
              </StyledLeftColumn>
              <Image
                fluid={data.usdclarge.childImageSharp.fluid}
                alt={translateMessageId("page-stablecoins-usdc-logo", intl)}
              />
            </USDCBanner>
          </Row>
          <H3>
            <Translation id="page-stablecoins-top-coins" />
          </H3>
          <p>
            <Translation id="page-stablecoins-top-coins-intro" />{" "}
            <code>
              <Translation id="page-stablecoins-top-coins-intro-code" />
            </code>
            .
          </p>
        </StyledContent>
        <TableContent>
          <SimpleTable
            column1={translateMessageId(
              "page-stablecoins-stablecoins-table-header-column-1",
              intl
            )}
            column2={translateMessageId(
              "page-stablecoins-stablecoins-table-header-column-2",
              intl
            )}
            column3={translateMessageId(
              "page-stablecoins-stablecoins-table-header-column-3",
              intl
            )}
            content={table}
          />
        </TableContent>
      </StyledGradientContainer>
      <Content id="explore">
        <H2>
          <Translation id="page-stablecoins-get-stablecoins" />
        </H2>
      </Content>
      <FullWidthContainer>
        <StablecoinAccordion />
      </FullWidthContainer>
      <Divider />
      <Content>
        <StyledCalloutBanner
          title={translateMessageId(
            "page-stablecoins-stablecoins-dapp-callout-title",
            intl
          )}
          description={translateMessageId(
            "page-stablecoins-stablecoins-dapp-callout-description",
            intl
          )}
          image={data.doge.childImageSharp.fluid}
          maxImageWidth={600}
          alt={translateMessageId(
            "page-stablecoins-stablecoins-dapp-callout-image-alt",
            intl
          )}
        >
          <div>
            <ButtonLink to="/dapps/">
              <Translation id="page-stablecoins-explore-dapps" />
            </ButtonLink>
          </div>
        </StyledCalloutBanner>
        <H2>
          <Translation id="page-stablecoins-save-stablecoins" />
        </H2>
        <TwoColumnContent>
          <LeftColumn>
            <p>
              <Translation id="page-stablecoins-save-stablecoins-body" />
            </p>
            <H3>
              <Translation id="page-stablecoins-interest-earning-dapps" />
            </H3>
            <p>
              <Translation id="page-stablecoins-saving" />
            </p>
          </LeftColumn>
          <StyledRightColumn>
            <div>
              <Emoji size={5} mb={"1rem"} text=":bank:" />
              <APY>
                <Translation id="page-stablecoins-bank-apy" />
              </APY>
              <em>
                <Translation id="page-stablecoins-bank-apy-source" />{" "}
                <Link to="#">
                  <Translation id="page-stablecoins-bank-apy-source-link" />
                </Link>
              </em>
            </div>
          </StyledRightColumn>
        </TwoColumnContent>
        <StyledCardGrid>
          {dapps.map((dapp, idx) => {
            return (
              <DataProductCard
                key={idx}
                background={dapp.background}
                url={dapp.url}
                alt={dapp.alt}
                image={dapp.image}
                name={dapp.name}
                data={dapp.data}
                description={dapp.description}
              />
            )
          })}
        </StyledCardGrid>
        <InfoBanner isWarning={true} shouldCenter={true}>
          <H2>
            <Translation id="page-stablecoins-research-warning-title" />
          </H2>
          <Translation id="page-stablecoins-research-warning" />
        </InfoBanner>
      </Content>
      <Divider />
      <Content id="how">
        <H2>
          <Translation id="page-stablecoins-types-of-stablecoin" />
        </H2>
        <StablecoinBoxGrid items={features} />
      </Content>
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
    dai: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
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
    usdclarge: file(relativePath: { eq: "stablecoins/usdc-large.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
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
    compound: file(relativePath: { eq: "stablecoins/compound.png" }) {
      childImageSharp {
        fixed(width: 160) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    aave: file(relativePath: { eq: "stablecoins/aave.png" }) {
      childImageSharp {
        fixed(width: 64) {
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
    oasis: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        fixed(width: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    oasissmall: file(relativePath: { eq: "stablecoins/dai-large.png" }) {
      childImageSharp {
        fixed(width: 24) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
