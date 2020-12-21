import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import Img from "gatsby-image"
import { graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import ButtonLink from "../components/ButtonLink"
import CalloutBanner from "../components/CalloutBanner"
import DataProductCard from "../components/DataProductCard"
import Emoji from "../components/Emoji"
import GhostCard from "../components/GhostCard"
import HorizontalCard from "../components/HorizontalCard"
import Icon from "../components/Icon"
import Link from "../components/Link"
import InfoBanner from "../components/InfoBanner"
import PageMetadata from "../components/PageMetadata"
import SimpleTable from "../components/SimpleTable"
import StablecoinAccordion from "../components/StablecoinAccordion"
import StablecoinBoxGrid from "../components/StablecoinBoxGrid"
import Tooltip from "../components/Tooltip"
import Translation from "../components/Translation"
import PageHero from "../components/PageHero"
import { translateMessageId } from "../utils/translations"
import {
  CardGrid,
  Divider,
  Content,
  Page,
  GradientContainer,
} from "../components/SharedStyledComponents"

const StyledContent = styled(Content)`
  margin-bottom: -2rem;
`

const StyledGradientContainer = styled(GradientContainer)`
  margin-bottom: 2rem;
`

/* const HeroSectionContent = styled(Content)`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  border-top: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 2rem;
  padding: 2rem;
  background: ${(props) => props.theme.colors.ednBackground};
` */

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

const StyledGhostCard = styled(GhostCard)`
  max-width: 640px;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    margin: 0rem;
    margin-top: 4rem;
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
/* const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-bottom: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    width: 100%;
  }
` */

const StyledCalloutBanner = styled(CalloutBanner)`
  margin: 2rem 0 4rem;
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

const DaiH2 = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  a {
    display: none;
  }
`

const LeftColumn = styled.div`
  margin-right: 2rem;
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
const TokenCard = styled(HorizontalCard)`
  min-width: 100%;
  margin: 0.5rem 0rem;
  border-radius: 0px;
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

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const APY = styled.p`
  font-size: 64px;
  line-height: 100%;
`

const InfoIcon = styled(Icon)`
  margin-left: 0.5rem;
  fill: ${(props) => props.theme.colors.text};
`

const tooltipContent = (
  <div>
    <Translation id="data-provided-by" />{" "}
    <Link to="https://www.coingecko.com/en/api">coingecko.com</Link>
  </div>
)

const StablecoinsPage = ({ data }) => {
  const [state, setState] = useState({
    markets: [],
    marketsHasError: false,
  })
  const intl = useIntl()

  // Stablecoin types
  const FIAT = translateMessageId(
    "page-stablecoins-stablecoins-table-type-fiat-backed",
    intl
  )
  const CRYPTO = translateMessageId(
    "page-stablecoins-stablecoins-table-type-crypto-backed",
    intl
  )
  const ASSET = translateMessageId(
    "page-stablecoins-stablecoins-table-type-precious-metals-backed",
    intl
  )
  const ALGORITHMIC = translateMessageId("page-stablecoins-algorithmic", intl)

  // TODO confirm type & url
  const stablecoins = {
    USDT: { type: FIAT, url: "https://tether.to/" },
    USDC: { type: FIAT, url: "https://www.coinbase.com/usdc" },
    DAI: { type: CRYPTO, url: "https://oasis.app/dai" },
    BUSD: { type: FIAT, url: "https://www.binance.com/en/busd" },
    PAX: { type: FIAT, url: "https://www.paxos.com/pax/" },
    TUSD: { type: FIAT, url: "https://www.trusttoken.com/trueusd" },
    HUSD: { type: FIAT, url: "https://www.huobi.com/en-us/usd-deposit/" },
    SUSD: { type: CRYPTO, url: "https://www.synthetix.io/" },
    EURS: { type: FIAT, url: "https://eurs.stasis.net/" },
    USDK: { type: FIAT, url: "https://www.oklink.com/usdk" },
    MUSD: { type: CRYPTO, url: "https://mstable.org/" },
    USDX: { type: CRYPTO, url: "https://usdx.cash/usdx-stablecoin" },
    GUSD: { type: FIAT, url: "https://gemini.com/dollar" },
    SAI: { type: CRYPTO, url: "https://makerdao.com/en/whitepaper/sai/" },
    DUSD: { type: CRYPTO, url: "https://dusd.finance/" },
    PAXG: { type: ASSET, url: "https://www.paxos.com/paxgold/" },
    AMPL: { type: ALGORITHMIC, url: "https://www.ampleforth.org/" },
  }

  useEffect(() => {
    // Currently no option to filter by stablecoins, so fetching the top tokens by market cap
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const markets = response.data
            .filter((token) =>
              Object.keys(stablecoins).includes(token.symbol.toUpperCase())
            )
            .slice(0, 10)
            .map((token) => {
              return {
                name: token.name,
                marketCap: new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(token.market_cap),
                image: token.image,
                type: stablecoins[token.symbol.toUpperCase()].type,
                url: stablecoins[token.symbol.toUpperCase()].url,
              }
            })
          setState({
            markets: markets,
            marketsHasError: false,
          })
        }
      })
      .catch((error) => {
        console.error(error)
        setState({
          markets: [],
          marketsHasError: true,
        })
      })
  }, [stablecoins])

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
      links: [
        { text: "USDC", url: "https://www.coinbase.com/usdc" },
        { text: "TrueUSD", url: "https://www.trusttoken.com/trueusd" },
      ],
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
      links: [{ text: "Dai", url: "https://makerdao.com/en/" }],
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
      links: [{ text: "Digix", url: "https://digix.global/" }],
    },
    {
      title: translateMessageId("page-stablecoins-algorithmic", intl),
      description: translateMessageId(
        "page-stablecoins-algorithmic-description",
        intl
      ),
      emoji: ":chart_with_downwards_trend:",
      pros: [
        translateMessageId("page-stablecoins-algorithmic-pro-1", intl),
        translateMessageId("page-stablecoins-algorithmic-pro-2", intl),
      ],
      cons: [
        translateMessageId("page-stablecoins-algorithmic-con-1", intl),
        translateMessageId("page-stablecoins-algorithmic-con-2", intl),
      ],
      links: [{ text: "Ampleforth", url: "https://www.ampleforth.org/" }],
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

  const tableColumns = [
    translateMessageId(
      "page-stablecoins-stablecoins-table-header-column-1",
      intl
    ),
    translateMessageId(
      "page-stablecoins-stablecoins-table-header-column-2",
      intl
    ),
    translateMessageId(
      "page-stablecoins-stablecoins-table-header-column-3",
      intl
    ),
  ]

  const heroContent = {
    title: translateMessageId("page-stablecoins-title", intl),
    header: translateMessageId("page-stablecoins-hero-header", intl),
    subtitle: translateMessageId("page-stablecoins-hero-subtitle", intl),
    image: data.stablecoins.childImageSharp.fluid,
    alt: translateMessageId("page-stablecoins-hero-alt", intl),
    buttons: [
      {
        content: translateMessageId("page-stablecoins-hero-button", intl),
        path: "#explore",
      },
      {
        content: translateMessageId(
          "page-stablecoins-how-they-work-button",
          intl
        ),
        path: "#how",
        isSecondary: "isSecondary",
      },
    ],
  }

  return (
    <Page>
      <PageMetadata
        title={translateMessageId("page-stablecoins-title", intl)}
        description={translateMessageId(
          "page-stablecoins-meta-description",
          intl
        )}
      />
      <PageHero isReverse content={heroContent} />
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
      <Divider />
      <Content>
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
                  <ButtonColumn>
                    <div>
                      <ButtonLink
                        mb={"1rem"}
                        mr={"1rem"}
                        to="https://1inch.exchange"
                      >
                        <Translation id="page-stablecoins-dai-banner-swap-button" />
                      </ButtonLink>
                    </div>
                    <div>
                      <ButtonLink isSecondary to="https://oasis.app/dai">
                        <Translation id="page-stablecoins-dai-banner-learn-button" />
                      </ButtonLink>
                    </div>
                  </ButtonColumn>
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
                  <ButtonColumn>
                    <div>
                      <ButtonLink
                        mb={"1rem"}
                        mr={"1rem"}
                        to="https://matcha.xyz/markets/ETH/USDC"
                      >
                        <Translation id="page-stablecoins-usdc-banner-swap-button" />
                      </ButtonLink>
                    </div>
                    <div>
                      <ButtonLink
                        isSecondary
                        to="https://www.coinbase.com/usdc"
                      >
                        <Translation id="page-stablecoins-usdc-banner-learn-button" />
                      </ButtonLink>
                    </div>
                  </ButtonColumn>
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
            <Tooltip content={tooltipContent}>
              <InfoIcon name="info" size="14" />
            </Tooltip>
          </H3>
          <p>
            <Translation id="page-stablecoins-top-coins-intro" />{" "}
            <Translation id="page-stablecoins-top-coins-intro-code" />
          </p>
        </StyledContent>
        <TableContent>
          <SimpleTable
            columns={tableColumns}
            content={state.markets}
            hasError={state.marketsHasError}
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
                <Link to="https://www.nytimes.com/2020/09/18/your-money/savings-interest-rates.html">
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
