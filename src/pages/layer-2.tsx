// Libraries
import React, { useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "@emotion/styled"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

// Data
import layer2Data from "../data/layer-2/layer-2.json"

// Components
import ButtonLink from "../components/ButtonLink"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import FeedbackCard from "../components/FeedbackCard"
import Icon from "../components/Icon"
import InfoBanner from "../components/InfoBanner"
import Layer2Onboard from "../components/Layer2/Layer2Onboard"
import Layer2ProductCard from "../components/Layer2ProductCard"
import Link from "../components/Link"
import OrderedList from "../components/OrderedList"
import PageHero from "../components/PageHero"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import ProductList from "../components/ProductList"
import QuizWidget from "../components/Quiz/QuizWidget"
import Tooltip from "../components/Tooltip"
import Translation from "../components/Translation"
import { CardGrid, Content, Page } from "../components/SharedStyledComponents"

// Utils
import { getData } from "../utils/cache"
import { getLocaleForNumberFormat, TranslationKey } from "../utils/translations"
import { Lang } from "../utils/languages"
import { getImage } from "../utils/image"

// Constants
import { GATSBY_FUNCTIONS_PATH } from "../constants"

// Styles

const HeroBackground = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.layer2Gradient};
`

const HeroContainer = styled.div`
  width: 100%;
`

const Hero = styled(PageHero)`
  padding-bottom: 2rem;
`

const PaddedContent = styled(Content)`
  padding-top: 3rem;
  padding-bottom: 3rem;
`

const LightGrayContent = styled(PaddedContent)`
  background: ${(props) => props.theme.colors.layer2ContentSecondary};
`

const FlexContainer = styled.div<{ flexPercent: string | number }>`
  flex: ${(props) => props.flexPercent}%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const Flex50 = styled.div`
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const StyledIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
  opacity: 0.8;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
  }
  &:hover,
  &:active,
  &:focus {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const TwoColumnContent = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0rem;
    margin-right: 0rem;
  }
`

const InfoGrid = styled(CardGrid)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: 1rem 2rem;
  & > div {
    height: fit-content;
    &:hover {
      transition: 0.1s;
      transform: scale(1.01);
      img {
        transition: 0.1s;
        transform: scale(1.1);
      }
    }
  }
`

const RollupCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.ednBackground};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.5rem;
  flex: 50%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column;
  }
`

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 33%;
  padding: 0 20px;
  text-align: center;
  align-content: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex: 100%;
  }
`

const StatPrimary = styled.p`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.primary};
  font-family: monospace;
`

const StatSpan = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`

const StatDescription = styled.p`
  opacity: 0.8;
  margin: 0;
`

const StatDivider = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.homeDivider};
  max-height: 100px;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    border-left: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.homeDivider};
    width: 100%;
    height: 0%;
    margin: 2rem 0;
  }
`
interface L2DataResponseItem {
  daily: {
    data: Array<[string, number, number]>
  }
}
interface L2DataResponse {
  layers2s: L2DataResponseItem
  combined: L2DataResponseItem
  bridges: L2DataResponseItem
}

interface FeeDataResponse {
  data: Array<{ id: string; results: { feeTransferEth: number } }>
}

const Layer2Page = ({ data }: PageProps<Queries.Layer2PageQuery>) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const [tvl, setTVL] = useState("loading...")
  const [percentChangeL2, setL2PercentChange] = useState("loading...")
  const [averageFee, setAverageFee] = useState("loading...")

  useEffect(() => {
    const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)

    const fetchL2Beat = async (): Promise<void> => {
      try {
        const l2BeatData = await getData<L2DataResponse>(
          `${GATSBY_FUNCTIONS_PATH}/l2beat`
        )

        const dailyData = l2BeatData.layers2s.daily.data

        // formatted TVL from L2beat API formatted
        const TVL = new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(dailyData[dailyData.length - 1][1])

        setTVL(`${TVL}`)
        // Calculate percent change ((new value - old value) / old value) *100)
        const percentage =
          ((dailyData[dailyData.length - 1][1] -
            dailyData[dailyData.length - 31][1]) /
            dailyData[dailyData.length - 31][1]) *
          100
        setL2PercentChange(
          percentage > 0
            ? `+${percentage.toFixed(2)}%`
            : `${percentage.toFixed(2)}%`
        )
      } catch (error) {
        console.error(error)
        setTVL("Error, please refresh.")
        setL2PercentChange("Error, please refresh.")
      }
    }
    fetchL2Beat()

    const fetchCryptoStats = async (): Promise<void> => {
      try {
        // Average eth transfer fee from L2's supported by cryptostats API
        const feeDataResponse = await getData<FeeDataResponse>(
          "https://api.cryptostats.community/api/v1/l2-fees/feeTransferEth?metadata=false"
        )

        // filtering out L2's we arent listing
        const feeData = feeDataResponse.data.filter((l2) => l2.id !== "hermez")

        const feeAverage =
          feeData.reduce(
            (acc, curr) => (acc += curr.results.feeTransferEth),
            0
          ) / feeData.length

        const intlFeeAverage = new Intl.NumberFormat(localeForStatsBoxNumbers, {
          style: "currency",
          currency: "USD",
          notation: "compact",
          minimumSignificantDigits: 2,
          maximumSignificantDigits: 3,
        }).format(feeAverage)
        setAverageFee(`${intlFeeAverage}`)
      } catch (error) {
        setAverageFee("Error, please refresh.")
        console.error(error)
      }
    }
    fetchCryptoStats()
  }, [language])

  const heroContent = {
    title: t("layer-2-hero-title"),
    header: t("layer-2-hero-header"),
    subtitle: t("layer-2-hero-subtitle"),
    image: getImage(data.heroImage)!,
    alt: t("layer-2-hero-alt-text"),
    buttons: [
      {
        content: t("layer-2-hero-button-1"),
        toId: "what-is-layer-2",
      },
      {
        content: t("layer-2-hero-button-2"),
        toId: "use-layer-2",
        variant: "outline",
      },
      {
        content: t("layer-2-hero-button-3"),
        toId: "how-to-get-onto-layer-2",
        variant: "outline",
      },
    ],
  }

  const layer2Cards = [
    {
      emoji: ":money_with_wings:",
      title: t("layer-2-lower-fees-title"),
      description: t("layer-2-lower-fees-description"),
    },
    {
      emoji: ":closed_lock_with_key:",
      title: t("layer-2-maintain-security-title"),
      description: t("layer-2-maintain-security-description"),
    },
    {
      emoji: ":hammer_and_wrench:",
      title: t("layer-2-expand-use-cases-title"),
      description: t("layer-2-expand-use-cases-description"),
    },
  ]

  const rollupCards = [
    {
      image: getImage(data.optimisticRollup),
      title: t("layer-2-optimistic-rollups-title"),
      description: t("layer-2-optimistic-rollups-description"),
      childSentence: t("layer-2-optimistic-rollups-childSentance"),
      childLink: "/developers/docs/scaling/optimistic-rollups/",
    },
    {
      image: getImage(data.zkRollup),
      title: t("layer-2-zk-rollups-title"),
      description: t("layer-2-zk-rollups-description"),
      childSentence: t("layer-2-zk-rollups-childSentance"),
      childLink: "/developers/docs/scaling/zk-rollups/",
    },
  ]

  const toolsData = {
    information: [
      {
        title: "L2BEAT",
        description: t("layer-2-tools-l2beat-description"),
        link: "https://l2beat.com",
        image: getImage(data.l2beat),
        alt: "L2BEAT",
      },
      {
        title: "L2 Fees",
        description: t("layer-2-tools-l2fees-description"),
        link: "https://l2fees.info",
        image: getImage(data.doge),
        alt: "L2 Fees",
      },
      {
        title: "Chainlist",
        description: t("layer-2-tools-chainlist-description"),
        link: "https://chainlist.org",
        image: getImage(data.doge),
        alt: "Chainlist",
      },
    ],
    walletManagers: [
      {
        title: "Zapper",
        description: t("layer-2-tools-zapper-description"),
        link: "https://zapper.fi/",
        image: getImage(data.zapper),
        alt: "Zapper",
      },
      {
        title: "Zerion",
        description: t("layer-2-tools-zerion-description"),
        link: "https://zerion.io",
        image: getImage(data.zerion),
        alt: "Zerion",
      },
      {
        title: "DeBank",
        description: t("layer-2-tools-debank-description"),
        link: "https://debank.com",
        image: getImage(data.debank),
        alt: "DeBank",
      },
    ],
  }

  const layer2DataCombined = [...layer2Data.optimistic, ...layer2Data.zk]

  const tooltipContent = (metric: {
    apiUrl: string
    apiProvider: string
  }): JSX.Element => (
    <div>
      <Translation id="data-provided-by" />{" "}
      <Link to={metric.apiUrl}>{metric.apiProvider}</Link>
    </div>
  )

  return (
    <Page>
      <PageMetadata
        title={"Layer 2"}
        description={"Introduction page to layer 2"}
      />

      <HeroBackground>
        <HeroContainer>
          <Hero content={heroContent} isReverse />
        </HeroContainer>

        <PaddedContent>
          <StatsContainer>
            <StatBox>
              <StatPrimary>{tvl}</StatPrimary>
              <StatSpan>
                <StatDescription>
                  <Translation id="layer-2-statsbox-1" />
                </StatDescription>
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://l2beat.com/",
                    apiProvider: "L2BEAT",
                  })}
                >
                  <StyledIcon name="info" />
                </Tooltip>
              </StatSpan>
            </StatBox>
            <StatDivider />
            <StatBox>
              <StatPrimary>{averageFee}</StatPrimary>
              <StatSpan>
                <StatDescription>
                  <Translation id="layer-2-statsbox-2" />
                </StatDescription>
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://cryptostats.community/",
                    apiProvider: "CryptoStats",
                  })}
                >
                  <StyledIcon name="info" />
                </Tooltip>
              </StatSpan>
            </StatBox>
            <StatDivider />
            <StatBox>
              <StatPrimary>{percentChangeL2}</StatPrimary>
              <StatSpan>
                <StatDescription>
                  <Translation id="layer-2-statsbox-3" />
                </StatDescription>
                <Tooltip
                  content={tooltipContent({
                    apiUrl: "https://l2beat.com/",
                    apiProvider: "L2BEAT",
                  })}
                >
                  <StyledIcon name="info" />
                </Tooltip>
              </StatSpan>
            </StatBox>
          </StatsContainer>
        </PaddedContent>
      </HeroBackground>

      <PaddedContent id="what-is-layer-2">
        <TwoColumnContent>
          <Flex50>
            <h2>
              <Translation id="layer-2-what-is-layer-2-title" />
            </h2>
            <p>
              <Translation id="layer-2-what-is-layer-2-1" />
            </p>
            <p>
              <Translation id="layer-2-what-is-layer-2-2" />
            </p>
          </Flex50>
          <Flex50>
            <GatsbyImage
              image={getImage(data.whatIsEthereum)!}
              alt=""
              style={{ maxHeight: "400px" }}
              objectFit="contain"
            />
          </Flex50>
        </TwoColumnContent>
      </PaddedContent>
      <LightGrayContent>
        <h2>
          <Translation id="layer-2-what-is-layer-1-title" />
        </h2>
        <TwoColumnContent>
          <Flex50>
            <p>
              <Translation id="layer-2-what-is-layer-1-1" />
            </p>
            <p>
              <Translation id="layer-2-what-is-layer-1-2" />
            </p>
          </Flex50>
          <Flex50>
            <p>
              <Translation id="layer-2-what-is-layer-1-list-title" />
            </p>
            <OrderedList
              listData={[
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-1" />
                </p>,
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-2" />
                </p>,
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-3" />
                </p>,
                <p>
                  <Translation id="layer-2-what-is-layer-1-list-4" />
                </p>,
              ]}
            />
            <p>
              <Translation id="layer-2-what-is-layer-1-list-link-1" />{" "}
              <Link to="/what-is-ethereum/">
                <Translation id="layer-2-what-is-layer-1-list-link-2" />
              </Link>
            </p>
          </Flex50>
        </TwoColumnContent>
      </LightGrayContent>

      <PaddedContent>
        <TwoColumnContent>
          <FlexContainer
            flexPercent="50"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <GatsbyImage
              image={getImage(data.dao)!}
              alt=""
              style={{ width: "100%" }}
              objectFit="contain"
            />
          </FlexContainer>
          <FlexContainer flexPercent="50">
            <h2>
              <Translation id="layer-2-why-do-we-need-layer-2-title" />
            </h2>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-1" />
            </p>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-2" />
            </p>

            <h3>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability" />
            </h3>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-1" />
            </p>
            <p>
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-2" />
            </p>
            <Link to="/upgrades/vision/">
              <Translation id="layer-2-why-do-we-need-layer-2-scalability-3" />
            </Link>
          </FlexContainer>
        </TwoColumnContent>
        <h3>
          <Translation id="layer-2-benefits-of-layer-2-title" />
        </h3>
        <InfoGrid>
          {layer2Cards.map(({ emoji, title, description }, idx) => (
            <Card
              description={description}
              title={title}
              emoji={emoji}
              key={idx}
            />
          ))}
        </InfoGrid>
      </PaddedContent>

      <PaddedContent>
        <TwoColumnContent>
          <FlexContainer flexPercent="50">
            <h2>
              <Translation id="layer-2-how-does-layer-2-work-title" />
            </h2>
            <p>
              <Translation id="layer-2-how-does-layer-2-work-1" />
            </p>
            <p>
              <Translation id="layer-2-how-does-layer-2-work-2" />
            </p>
            <h3>
              <Translation id="layer-2-rollups-title" />
            </h3>
            <p>
              <Translation id="layer-2-rollups-1" />
            </p>
            <p>
              <Translation id="layer-2-rollups-2" />
            </p>
          </FlexContainer>
          <FlexContainer
            flexPercent="50"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <GatsbyImage
              image={getImage(data.rollup)!}
              alt=""
              style={{ width: "100%" }}
              objectFit="contain"
            />
          </FlexContainer>
        </TwoColumnContent>
        <TwoColumnContent>
          {rollupCards.map(
            ({ image, title, description, childSentence, childLink }) => (
              <RollupCard key={title}>
                <GatsbyImage
                  image={image!}
                  alt=""
                  objectPosition="0"
                  objectFit="contain"
                />
                <h3>{title}</h3>
                <p>{description}</p>
                <p>
                  <Link to={childLink}>{childSentence}</Link>
                </p>
              </RollupCard>
            )
          )}
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent>
        <InfoBanner isWarning={true}>
          <h2>
            <Translation id="layer-2-dyor-title" />
          </h2>
          <p>
            <Translation id="layer-2-dyor-1" />
          </p>
          <p>
            <Translation id="layer-2-dyor-2" />
          </p>
          <p>
            <ButtonLink to="https://l2beat.com/?view=risk">
              <Translation id="layer-2-dyor-3" />
            </ButtonLink>
          </p>
        </InfoBanner>
      </PaddedContent>

      <PaddedContent id="use-layer-2">
        <h2>
          <Translation id="layer-2-use-layer-2-title" />
        </h2>
        <p>
          <Translation id="layer-2-use-layer-2-1" />
        </p>
        <p>
          <Translation id="layer-2-contract-accounts" />
        </p>
        <h3>
          <Translation id="layer-2-use-layer-2-generalized-title" />
        </h3>
        <p>
          <Translation id="layer-2-use-layer-2-generalized-1" />
        </p>
        <CardGrid>
          {layer2DataCombined
            .filter((l2) => !l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <Layer2ProductCard
                  key={idx}
                  background={l2.background}
                  image={getImage(data[l2.imageKey])!}
                  description={t(l2.descriptionKey as TranslationKey)}
                  url={l2.website}
                  note={t(l2.noteKey as TranslationKey)}
                  name={l2.name}
                  bridge={l2.bridge}
                  ecosystemPortal={l2.ecosystemPortal}
                  tokenLists={l2.tokenLists}
                />
              )
            })}
        </CardGrid>
      </PaddedContent>

      <PaddedContent>
        <h3>
          <Translation id="layer-2-use-layer-2-application-specific-title" />
        </h3>
        <p>
          <Translation id="layer-2-use-layer-2-application-specific-1" />
        </p>
        <CardGrid>
          {layer2DataCombined
            .filter((l2) => l2.purpose.indexOf("universal"))
            .map((l2, idx) => {
              return (
                <Layer2ProductCard
                  key={idx}
                  background={l2.background}
                  image={getImage(data[l2.imageKey])!}
                  description={t(l2.descriptionKey as TranslationKey)}
                  url={l2.website}
                  note={t(l2.noteKey as TranslationKey)}
                  name={l2.name}
                  bridge={l2.bridge}
                  ecosystemPortal={l2.ecosystemPortal}
                  tokenLists={l2.tokenLists}
                >
                  {l2.purpose.map((purpose, index) => (
                    <Pill key={index}>{purpose}</Pill>
                  ))}
                </Layer2ProductCard>
              )
            })}
        </CardGrid>
      </PaddedContent>

      <PaddedContent>
        <h2>
          <Translation id="layer-2-sidechains-title" />
        </h2>
        <TwoColumnContent>
          <Flex50>
            <p>
              <Translation id="layer-2-sidechains-1" />
            </p>
            <p>
              <Translation id="layer-2-sidechains-2" />
            </p>
            <p>
              <Link to="/developers/docs/scaling/sidechains/">
                <Translation id="layer-2-more-on-sidechains" />
              </Link>
            </p>
            <p>
              <Link to="/developers/docs/scaling/validium/">
                <Translation id="layer-2-more-on-validiums" />
              </Link>
            </p>
          </Flex50>
          <Flex50>
            <p>
              <Translation id="layer-2-sidechains-4" />
            </p>
            <p>
              <Translation id="layer-2-sidechains-5" />
            </p>
          </Flex50>
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent id="how-to-get-onto-layer-2">
        <Layer2Onboard
          layer2DataCombined={layer2DataCombined}
          ethIcon={getImage(data.ethHome)!}
          ethIconAlt={t("ethereum-logo")}
        />
      </PaddedContent>

      <PaddedContent>
        <h2>
          <Translation id="layer-2-tools-title" />
        </h2>
        <TwoColumnContent>
          <Flex50>
            <ProductList
              category="Information"
              content={toolsData.information}
            />
          </Flex50>
          <Flex50>
            <ProductList
              category="Wallet managers"
              content={toolsData.walletManagers}
            />
          </Flex50>
        </TwoColumnContent>
      </PaddedContent>

      <PaddedContent>
        <h2>
          <Translation id="layer-2-faq-title" />
        </h2>
        <ExpandableCard title={`${t("layer-2-faq-question-1-title")}`}>
          <p>
            <Translation id="layer-2-faq-question-1-description-1" />
          </p>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-2-title")}`}>
          <p>
            <Translation id="layer-2-faq-question-2-description-1" />
          </p>
          <p>
            <Translation id="layer-2-faq-question-2-description-2" />
          </p>
          <p>
            <Translation id="layer-2-faq-question-2-description-3" />
          </p>
          <p>
            <Link to="/developers/docs/scaling/optimistic-rollups/">
              <Translation id="layer-2-more-info-on-optimistic-rollups" />
            </Link>
          </p>
          <p>
            <Link to="/developers/docs/scaling/zk-rollups/">
              <Translation id="layer-2-more-info-on-zk-rollups" />
            </Link>
          </p>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-3-title")}`}>
          <p>
            <Translation id="layer-2-faq-question-3-description-1" />{" "}
          </p>
          <p>
            <Link to="/upgrades/sharding/">
              <Translation id="layer-2-more-on-sharding" />
            </Link>
          </p>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-4-title")}`}>
          <p>
            <Translation id="layer-2-faq-question-4-description-1" />
          </p>
          <p>
            <Translation id="layer-2-faq-question-4-description-2" />
          </p>
          <p>
            <Translation id="layer-2-faq-question-4-description-3" />
          </p>
          <p>
            <Link to="/bridges/">
              <Translation id="layer-2-more-on-bridges" />
            </Link>
          </p>
        </ExpandableCard>
        <ExpandableCard title={`${t("layer-2-faq-question-5-title")}`}>
          <p>
            <Translation id="layer-2-faq-question-5-description-1" />{" "}
            <Link to="/contributing/adding-layer-2s/">
              <Translation id="layer-2-faq-question-5-view-listing-policy" />
            </Link>
          </p>
          <p>
            <Translation id="layer-2-faq-question-5-description-2" />
          </p>
        </ExpandableCard>
      </PaddedContent>

      <PaddedContent>
        <h2>
          <Translation id="layer-2-further-reading-title" />
        </h2>
        <ul>
          <li>
            <Link to="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">
              <Translation id="a-rollup-centric-ethereum-roadmap" />
            </Link>{" "}
            <i>- Vitalik Buterin </i>
          </li>
          <li>
            <Link to="https://vitalik.ca/general/2021/01/05/rollup.html">
              <Translation id="an-incomplete-guide-to-rollups" />
            </Link>{" "}
            <i>- Vitalik Buterin</i>
          </li>
          <li>
            <Link to="https://www.youtube.com/watch?v=DyNbmgkyxJI">
              <Translation id="polygon-sidechain-vs-ethereum-rollups" />
            </Link>{" "}
            <i>- Lex Clips</i>
          </li>
          <li>
            <Link to="https://www.youtube.com/watch?v=7pWxCklcNsU">
              <Translation id="rollups-the-ultimate-ethereum-scaling-strategy" />
            </Link>{" "}
            <i>- Finematics</i>
          </li>
          <li>
            <Link to="/upgrades/sharding/">
              <Translation id="scaling-layer-1-with-shard-chains" />
            </Link>
          </li>
          <li>
            <Link to="https://barnabe.substack.com/p/understanding-rollup-economics-from?s=r">
              <Translation id="understanding-rollup-economics-from-first-principals" />
            </Link>{" "}
            <i>- Barnabé Monnot</i>
          </li>
        </ul>
      </PaddedContent>
      <PaddedContent>
        <QuizWidget quizKey="layer-2" />
      </PaddedContent>
      <PaddedContent>
        <FeedbackCard />
      </PaddedContent>
    </Page>
  )
}

export default Layer2Page

export const query = graphql`
  query Layer2Page($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    dao: file(relativePath: { eq: "use-cases/dao-2.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 500
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    doge: file(relativePath: { eq: "doge-computer.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethBlocks: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ethHome: file(relativePath: { eq: "eth-home-icon.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 50
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    financeTransparent: file(relativePath: { eq: "finance_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    heroImage: file(relativePath: { eq: "layer-2/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
      }
    }
    impact: file(relativePath: { eq: "impact_transparent.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 300
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    optimisticRollup: file(
      relativePath: { eq: "layer-2/optimistic_rollup.png" }
    ) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
          width: 122
        )
      }
    }
    rollup: file(relativePath: { eq: "layer-2/rollup-2.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, quality: 100)
      }
    }
    zkRollup: file(relativePath: { eq: "layer-2/zk_rollup.png" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
          width: 122
        )
      }
    }
    whatIsEthereum: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 624
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    arbitrum: file(relativePath: { eq: "layer-2/arbitrum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    aztec: file(relativePath: { eq: "layer-2/aztec.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 200
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    boba: file(relativePath: { eq: "layer-2/boba.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    chainlist: file(relativePath: { eq: "layer-2/chainlist.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    debank: file(relativePath: { eq: "layer-2/debank.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }

    l2beat: file(relativePath: { eq: "layer-2/l2beat.jpg" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    loopring: file(relativePath: { eq: "layer-2/loopring.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    metis: file(relativePath: { eq: "layer-2/metis-dark.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    optimism: file(relativePath: { eq: "layer-2/optimism.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zapper: file(relativePath: { eq: "layer-2/zapper.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zerion: file(relativePath: { eq: "layer-2/zerion.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zkspace: file(relativePath: { eq: "layer-2/zkspace.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    zksync: file(relativePath: { eq: "layer-2/zksync.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 100
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
  }
`
