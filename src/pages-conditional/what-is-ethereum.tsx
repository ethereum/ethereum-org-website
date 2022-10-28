import React from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

import Translation from "../components/Translation"
import Callout from "../components/Callout"
import Card from "../components/Card"
import ButtonLink from "../components/ButtonLink"
import Button from "../components/Button"
import PageMetadata from "../components/PageMetadata"
import Tooltip from "../components/Tooltip"
import Tabs from "../components/Tabs"
import Icon from "../components/Icon"
import Link from "../components/Link"
import {
  CardContainer,
  Content,
  GrayContainer,
  Page,
  Width60,
  Width40,
  NoWrapText,
} from "../components/SharedStyledComponents"
import {
  Banner,
  BannerBody,
  BannerGrid,
  BannerGridCell,
  BannerImage,
} from "../components/BannerGrid"
import AdoptionChart from "../components/AdoptionChart"
import EnergyConsumptionChart from "../components/EnergyConsumptionChart"
import Slider, { EmblaSlide } from "../components/Slider"
import FeedbackCard from "../components/FeedbackCard"
import QuizWidget from "../components/Quiz/QuizWidget"

import { getLocaleForNumberFormat } from "../utils/translations"
import { Lang } from "../utils/languages"
import { trackCustomEvent } from "../utils/matomo"
import { getImage, getSrc } from "../utils/image"

import useFetchStat, {
  defaultFormatter,
  IFetchStat,
} from "../hooks/useFetchStat"
import { GATSBY_FUNCTIONS_PATH } from "../constants"
import { Context } from "../types"
import StatErrorMessage from "../components/StatErrorMessage"
import StatLoadingMessage from "../components/StatLoadingMessage"
import { Center } from "@chakra-ui/react"

const Slogan = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 2rem;
  line-height: 140%;
`

const Title = styled.h1`
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: 0.04em;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textTableOfContents};
`

const Subtitle = styled.div`
  font-size: 1.25rem;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.text200};
`

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    flex-direction: column-reverse;
  }
`

const Hero = styled(GatsbyImage)`
  flex: 1 1 100%;
  max-width: 800px;
  background-size: cover;
  background-repeat: no-repeat;
`

const Header = styled.header`
  margin-top: 12rem;
  @media (max-width: 1280px) {
    margin-top: 8rem;
  }
  @media (max-width: 1160px) {
    margin-top: 7rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    margin-top: 4rem;
  }
  @media (max-width: 920px) {
    margin-top: 2rem;
  }
  @media (max-width: 870px) {
    margin-top: 1rem;
  }
  @media (max-width: 840px) {
    margin-top: 0;
  }
`

const StyledGrayContainer = styled(GrayContainer)`
  padding: 0;
  margin: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    margin-top: 0rem;
    box-shadow: none;
  }
`

const StyledCard = styled(Card)`
  flex: 1 1 30%;
  min-width: 240px;
  margin: 1rem;
  padding: 1.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex: 1 1 30%;
  }
`

const Summary = styled.div`
  padding: 1rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.cardGradient};

  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text300};
  }

  p:last-child {
    margin: 0;
  }
`

const TwoColumnContent = styled.div<{ reverse?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};

  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    flex-direction: column;
    align-items: flex-start;

    & > *:first-child {
      margin-bottom: 2rem;
    }
  }
`

const Section = styled.div<{
  bgColor?: string
  padding?: string
}>`
  width: 100%;
  padding: ${({ padding }) => padding ?? "3rem 2rem"};
  background-color: ${({ bgColor = "transparent" }) => bgColor};

  h2 {
    margin-top: 0;
  }
`

const Column = styled.div`
  flex: 0 0 50%;
  max-width: 75%;
  @media (max-width: ${({ theme }) => theme.breakpoints.m}) {
    max-width: 100%;
  }
  margin-bottom: 1.5rem;
`

const StyledCallout = styled(Callout)`
  flex: 1 1 416px;
  min-height: 100%;
`

const TabContent = styled.p`
  margin: 0;
`

const StatPrimary = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  line-height: 1;
`

const StatDescription = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text200};
`

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1.45rem;
  flex-wrap: wrap;

  & > button,
  & > a {
    margin-right: 1rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
      margin-bottom: 1rem;
    }
  }
`

const Stat: React.FC<{ stat: IFetchStat }> = ({ stat }) => {
  const isLoading = !stat.value

  return stat.hasError ? (
    <StatErrorMessage fontSize="1rem" />
  ) : isLoading ? (
    <StatLoadingMessage fontSize="1rem" />
  ) : (
    <>{stat.formattedValue}</>
  )
}

const WhatIsEthereumPage = ({
  data,
}: PageProps<Queries.WhatIsEthereumQuery, Context>) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const theme = useTheme()

  const localeForStatsBoxNumbers = getLocaleForNumberFormat(language as Lang)

  const txCount = useFetchStat<
    Array<{ unixTimeStamp: string; transactionCount: number }>
  >(
    `${GATSBY_FUNCTIONS_PATH}/txs`,
    (response) => {
      return response
        .map(({ unixTimeStamp, transactionCount }) => ({
          timestamp: parseInt(unixTimeStamp) * 1000, // unix milliseconds
          value: transactionCount,
        }))
        .sort((a, b) => a.timestamp - b.timestamp)
    },
    (value) => defaultFormatter(value, localeForStatsBoxNumbers)
  )

  const cards = [
    {
      emoji: ":bank:",
      title: t("page-what-is-ethereum-banking-card"),
      description: t("page-what-is-ethereum-banking-card-desc"),
    },

    {
      emoji: ":detective:",
      title: t("page-what-is-ethereum-internet-card"),
      description: t("page-what-is-ethereum-internet-card-desc"),
    },
    {
      emoji: ":busts_in_silhouette:",
      title: t("page-what-is-ethereum-p2p-card"),
      description: t("page-what-is-ethereum-p2p-card-desc"),
    },
    {
      emoji: ":shield:",
      title: t("page-what-is-ethereum-censorless-card"),
      description: t("page-what-is-ethereum-censorless-card-desc"),
    },
    {
      emoji: ":shopping_bags:",
      title: t("page-what-is-ethereum-commerce-card"),
      description: t("page-what-is-ethereum-commerce-card-desc"),
    },
    {
      emoji: ":handshake:",
      title: t("page-what-is-ethereum-composable-card"),
      description: t("page-what-is-ethereum-composable-card-desc"),
    },
  ]

  const tabs = [
    {
      title: t("page-what-is-ethereum-blockchain-tab-title"),
      eventName: "Blockchain tab",
      content: (
        <TabContent>
          <Translation id="page-what-is-ethereum-blockchain-tab-content" />
        </TabContent>
      ),
    },
    {
      title: t("page-what-is-ethereum-cryptocurrency-tab-title"),
      eventName: "Cryptocurrency tab",
      content: (
        <TabContent>
          <Translation id="page-what-is-ethereum-cryptocurrency-tab-content" />
        </TabContent>
      ),
    },
  ]

  const slides = [
    {
      eventName: "Payments slide",
    },
    {
      eventName: "Time of crisis slide",
    },
    {
      eventName: "Creators slide",
    },
    {
      eventName: "Gamers slide",
    },
  ]

  const tooltipContent = ({ apiUrl, apiProvider, ariaLabel }) => (
    <div>
      <Translation id="data-provided-by" />{" "}
      <Link to={apiUrl} aria-label={ariaLabel}>
        {apiProvider}
      </Link>
    </div>
  )

  return (
    <Page>
      <PageMetadata
        title={t("page-what-is-ethereum-meta-title")}
        description={t("page-what-is-ethereum-meta-description")}
        image={getSrc(data.ogImage)}
      />
      <Content>
        <HeroContainer>
          <Header>
            <Title>
              <Translation id="page-what-is-ethereum-title" />
            </Title>
            <Slogan>
              <Translation id="page-what-is-ethereum-desc" />
            </Slogan>
            <Subtitle>
              <Translation id="page-what-is-ethereum-subtitle" />
            </Subtitle>
            <ButtonRow>
              <Button toId="summary">
                <Translation id="page-what-is-ethereum-button-lets-start" />
              </Button>
            </ButtonRow>
          </Header>
          <Hero
            image={getImage(data.hero)!}
            alt={t("page-what-is-ethereum-alt-img-bazaar")}
            loading="eager"
          />
        </HeroContainer>
      </Content>
      <StyledGrayContainer>
        <Section>
          <TwoColumnContent id="summary">
            <Width60>
              <Summary>
                <h2>
                  <Translation id="page-what-is-ethereum-summary-title" />
                </h2>
                <p>
                  <Translation id="page-what-is-ethereum-summary-desc-1" />
                </p>
                <p>
                  <Translation id="page-what-is-ethereum-summary-desc-2" />
                </p>
              </Summary>
            </Width60>
            <Width40 />
          </TwoColumnContent>
          <Section padding="3rem 0">
            <TwoColumnContent reverse>
              <Width40>
                <GatsbyImage
                  image={getImage(data.whatIsCryptocurrency)!}
                  alt=""
                />
              </Width40>
              <Width60>
                <h2>
                  <Translation id="page-what-is-ethereum-what-is-crypto-title" />
                </h2>
                <p>
                  <Translation id="page-what-is-ethereum-what-is-crypto-desc-1" />
                </p>
                <p>
                  <Translation id="page-what-is-ethereum-what-is-crypto-desc-2" />
                </p>
                <p>
                  <Translation id="page-what-is-ethereum-what-is-crypto-desc-3" />
                </p>
                <p>
                  <Translation id="page-what-is-ethereum-what-is-crypto-desc-4" />
                </p>
                <p>
                  <Translation id="page-what-is-ethereum-what-is-crypto-desc-5" />
                </p>
              </Width60>
            </TwoColumnContent>
          </Section>
          <TwoColumnContent>
            <Width60>
              <Tabs
                onTabClick={(index) => {
                  trackCustomEvent({
                    eventCategory: `Blockchain/crypto tab`,
                    eventAction: `Clicked`,
                    eventName: tabs[index].eventName,
                  })
                }}
                tabs={tabs}
              />
            </Width60>
            <Width40 />
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.diffEthAndBtc)!} alt="" />
            </Width40>
            <Width60>
              <h2>
                <Translation id="page-what-is-ethereum-btc-eth-diff-title" />
              </h2>
              <p>
                <Translation id="page-what-is-ethereum-btc-eth-diff-1" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-btc-eth-diff-2" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-btc-eth-diff-3" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-btc-eth-diff-4" />
              </p>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <h2>
            <Translation id="page-what-is-ethereum-what-can-eth-do-title" />
          </h2>
          <CardContainer>
            {cards.map((card, idx) => (
              <StyledCard
                key={idx}
                emoji={card.emoji}
                title={card.title}
                description={card.description}
              />
            ))}
          </CardContainer>
        </Section>

        <Section>
          <Banner>
            <BannerBody>
              <h2>
                <Translation id="page-what-is-ethereum-ethereum-in-numbers-title" />
              </h2>
              <BannerGrid>
                <BannerGridCell>
                  <StatPrimary>2970</StatPrimary>
                  <StatDescription>
                    Projects built on{" "}
                    <NoWrapText>
                      Ethereum{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://www.stateofthedapps.com/stats/platform/ethereum#new",
                          apiProvider: "State of the dapps",
                          ariaLabel: "Read more about Ethereum projects stats",
                        })}
                      >
                        <Icon name="info" size="1rem" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>71M+</StatPrimary>
                  <StatDescription>
                    Accounts (wallets) with an ETH{" "}
                    <NoWrapText>
                      balance{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://bitcoinist.com/ethereum-reaches-new-milestone-as-over-71-million-wallets-hold-eth/",
                          apiProvider: "Bitcoinist",
                          ariaLabel: "Read more about wallets stats",
                        })}
                      >
                        <Icon name="info" size="1rem" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>50.5M</StatPrimary>
                  <StatDescription>
                    Smart contracts on{" "}
                    <NoWrapText>
                      Ethereum{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://dune.com/sawmon_and_natalie/smart-contracts-on-ethereum",
                          apiProvider: "Dune",
                          ariaLabel: "Read more about smart contracts stats",
                        })}
                      >
                        <Icon name="info" size="1rem" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>$11.6T</StatPrimary>
                  <StatDescription>
                    Value moved through the Ethereum network in{" "}
                    <NoWrapText>
                      2021{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://stark.mirror.xyz/q3OnsK7mvfGtTQ72nfoxLyEV5lfYOqUfJIoKBx7BG1I",
                          apiProvider: "Josh Stark",
                          ariaLabel:
                            "Read more about 2021 Ethereum network stats",
                        })}
                      >
                        <Icon name="info" size="1rem" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>$3.5B</StatPrimary>
                  <StatDescription>
                    Creator earnings on Ethereum in{" "}
                    <NoWrapText>
                      2021{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://stark.mirror.xyz/q3OnsK7mvfGtTQ72nfoxLyEV5lfYOqUfJIoKBx7BG1I",
                          apiProvider: "Josh Stark",
                          ariaLabel:
                            "Read more about 2021 Ethereum earnings stats",
                        })}
                      >
                        <Icon name="info" size="1rem" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>
                    <Stat stat={txCount} />
                  </StatPrimary>
                  <StatDescription>
                    Number of transactions{" "}
                    <NoWrapText>
                      today{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl: "https://etherscan.io/",
                          apiProvider: "Etherscan",
                          ariaLabel:
                            "Read more about number of transactions stats",
                        })}
                      >
                        <Icon name="info" size="1rem" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
              </BannerGrid>
            </BannerBody>
            <BannerImage>
              <GatsbyImage image={getImage(data.stats)!} alt="" />
            </BannerImage>
          </Banner>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width60>
              <h2>
                <Translation id="page-what-is-ethereum-why-would-i-use-ethereum-title" />
              </h2>
              <p>
                <Translation id="page-what-is-ethereum-why-would-i-use-ethereum-1" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-why-would-i-use-ethereum-2" />
              </p>

              <Slider
                onSlideChange={(index) => {
                  trackCustomEvent({
                    eventCategory: `What is Ethereum - Slider`,
                    eventAction: `Clicked`,
                    eventName: slides[index].eventName,
                  })
                }}
              >
                <EmblaSlide>
                  <h3>
                    <Translation id="page-what-is-ethereum-slide-1-title" />
                  </h3>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-1-desc-1" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-1-desc-2" />
                  </p>
                </EmblaSlide>
                <EmblaSlide>
                  <h3>
                    <Translation id="page-what-is-ethereum-slide-2-title" />
                  </h3>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-2-desc-1" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-2-desc-2" />
                  </p>
                </EmblaSlide>
                <EmblaSlide>
                  <h3>
                    <Translation id="page-what-is-ethereum-slide-3-title" />
                  </h3>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-3-desc-1" />
                  </p>
                </EmblaSlide>
                <EmblaSlide>
                  <h3>
                    <Translation id="page-what-is-ethereum-slide-4-title" />
                  </h3>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-4-desc-1" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum-slide-4-desc-2" />
                  </p>
                </EmblaSlide>
              </Slider>
            </Width60>
            <Width40>
              <AdoptionChart />
            </Width40>
          </TwoColumnContent>
        </Section>

        <Section bgColor={theme.colors.homeBoxTurquoise}>
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.ethCoin)!} alt="" />
            </Width40>
            <Width60>
              <h2>
                <Translation id="page-what-is-ethereum-meet-ether-title" />
              </h2>
              <p>
                <Translation id="page-what-is-ethereum-meet-ether-desc-1" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-meet-ether-desc-2" />
              </p>
              <ButtonRow>
                <ButtonLink to="/eth/">
                  <Translation id="page-what-is-ethereum-what-is-ether" />
                </ButtonLink>
                <ButtonLink to="/get-eth/" variant="outline">
                  <Translation id="page-what-is-ethereum-get-eth" />
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent reverse>
            <Width40>
              <GatsbyImage image={getImage(data.meetEth)!} alt="" />
            </Width40>
            <Width60>
              <h2>
                <Translation id="page-what-is-ethereum-what-can-i-do-title" />
              </h2>
              <p>
                <Translation id="page-what-is-ethereum-what-can-i-do-desc-1" />
              </p>
              <ButtonRow>
                <ButtonLink to="/dapps/">
                  <Translation id="page-what-is-ethereum-explore-applications" />
                </ButtonLink>
                <ButtonLink to="/defi/" variant="outline">
                  <Translation id="page-what-is-ethereum-learn-defi" />
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section bgColor={theme.colors.homeBoxPurple}>
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.whoRunsEthereum)!} alt="" />
            </Width40>
            <Width60>
              <h2>
                <Translation id="page-what-is-ethereum-who-runs-ethereum-title" />
              </h2>
              <p>
                <Translation id="page-what-is-ethereum-who-runs-ethereum-desc-1" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-who-runs-ethereum-desc-2" />
              </p>
              <ButtonRow>
                <ButtonLink to="/run-a-node/">
                  <Translation id="page-what-is-ethereum-run-a-node" />
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent reverse>
            <Width40>
              <GatsbyImage
                image={getImage(data.whatAreSmartContracts)!}
                alt=""
              />
            </Width40>
            <Width60>
              <h2>
                <Translation id="page-what-is-ethereum-smart-contract-title" />
              </h2>
              <p>
                <Translation id="page-what-is-ethereum-smart-contract-desc-1" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-smart-contract-desc-2" />
              </p>
              <p>
                <Translation id="page-what-is-ethereum-smart-contract-desc-3" />
              </p>
              <ButtonRow>
                <ButtonLink to="/smart-contracts/">
                  <Translation id="page-what-is-ethereum-more-on-smart-contracts" />
                </ButtonLink>
                <ButtonLink to="/dapps/" variant="outline">
                  <Translation id="page-what-is-ethereum-explore-dapps" />
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>
      </StyledGrayContainer>

      <Section>
        <TwoColumnContent>
          <Width40>
            <GatsbyImage image={getImage(data.criminalActivity)!} alt="" />
          </Width40>
          <Width60>
            <h2>
              <Translation id="page-what-is-ethereum-criminal-activity-title" />
            </h2>
            <p>
              <Translation id="page-what-is-ethereum-criminal-activity-desc-1" />
            </p>
            <p>
              <Translation id="page-what-is-ethereum-criminal-activity-desc-2" />
            </p>
            <p>
              <em>
                <Translation id="page-what-is-ethereum-criminal-activity-desc-3" />
              </em>
            </p>
            <ul>
              <li>
                <Link to="https://www.europol.europa.eu/publications-events/publications/cryptocurrencies-tracing-evolution-of-criminal-finances#downloads">
                  Europol Spotlight - Cryptocurrencies - Tracing the evolution
                  of criminal finances.pdf
                </Link>{" "}
                EN (1.4 MB)
              </li>
              <li>
                <Link to="https://go.chainalysis.com/2021-CryptoCrime-Report.html">
                  Chainalysis (2021), The 2021 Crypto Crime report
                </Link>{" "}
                EN
              </li>
            </ul>
          </Width60>
        </TwoColumnContent>
      </Section>

      <Section>
        <TwoColumnContent reverse>
          <Width40>
            <EnergyConsumptionChart />
          </Width40>
          <Width60>
            <h2>
              <Translation id="page-what-is-ethereum-energy-title" />
            </h2>
            <p>
              <Translation id="page-what-is-ethereum-energy-desc-1" />
            </p>
            <p>
              <Translation id="page-what-is-ethereum-energy-desc-2" />
            </p>
            <ButtonRow>
              <ButtonLink to="/energy-consumption/">
                <Translation id="page-what-is-ethereum-more-on-energy-consumption" />
              </ButtonLink>
              <ButtonLink to="/upgrades/merge/" variant="outline">
                <Translation id="page-what-is-ethereum-the-merge-update" />
              </ButtonLink>
            </ButtonRow>
          </Width60>
        </TwoColumnContent>
      </Section>

      <Content>
        <h2>
          <Translation id="page-what-is-ethereum-additional-reading" />
        </h2>
        <p>
          <Link to="https://weekinethereumnews.com/">
            <Translation id="page-what-is-ethereum-week-in-ethereum" />
          </Link>{" "}
          <Translation id="page-what-is-ethereum-week-in-ethereum-desc" />
        </p>
        <p>
          <Link to="https://stark.mirror.xyz/q3OnsK7mvfGtTQ72nfoxLyEV5lfYOqUfJIoKBx7BG1I">
            <Translation id="page-what-is-ethereum-the-year-in-ethereum-2021" />
          </Link>{" "}
          <Translation id="page-what-is-ethereum-the-year-in-ethereum-2021-desc" />
        </p>
        <p>
          <Link to="https://stark.mirror.xyz/n2UpRqwdf7yjuiPKVICPpGoUNeDhlWxGqjulrlpyYi0">
            <Translation id="page-what-is-ethereum-atoms-institutions-blockchains" />
          </Link>{" "}
          <Translation id="page-what-is-ethereum-atoms-institutions-blockchains-desc" />
        </p>
      </Content>

      <Content>
        <Column>
          <h2>
            <Translation id="page-what-is-ethereum-explore" />
          </h2>
        </Column>
        <CardContainer>
          <StyledCallout
            image={getImage(data.developers)!}
            titleKey="page-what-is-ethereum-build"
            alt={t("page-what-is-ethereum-alt-img-lego")}
            descriptionKey="page-what-is-ethereum-build-desc"
          >
            <div>
              <ButtonLink to="/developers/">
                <Translation id="page-what-is-ethereum-start-building-btn" />
              </ButtonLink>
            </div>
          </StyledCallout>
          <StyledCallout
            image={getImage(data.community)!}
            titleKey="page-what-is-ethereum-community"
            alt={t("page-what-is-ethereum-alt-img-comm")}
            descriptionKey="page-what-is-ethereum-comm-desc"
          >
            <div>
              <ButtonLink to="/community/">
                <Translation id="page-what-is-ethereum-meet-comm" />
              </ButtonLink>
            </div>
          </StyledCallout>
        </CardContainer>
      </Content>

      <Content>
        <Center w="100%">
          <QuizWidget quizKey="what-is-ethereum" />
        </Center>
      </Content>

      <Content>
        <FeedbackCard />
      </Content>
    </Page>
  )
}

export default WhatIsEthereumPage

export const twoColImage = graphql`
  fragment twoColImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 400
        layout: CONSTRAINED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const calloutImage = graphql`
  fragment calloutImage on File {
    childImageSharp {
      gatsbyImageData(
        height: 200
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

export const query = graphql`
  query WhatIsEthereum($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    hero: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    ogImage: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    banner: file(relativePath: { eq: "home/hero.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, quality: 100)
      }
    }
    whatIsCryptocurrency: file(relativePath: { eq: "wallet.png" }) {
      ...twoColImage
    }
    diffEthAndBtc: file(relativePath: { eq: "eth.png" }) {
      ...twoColImage
    }
    stats: file(relativePath: { eq: "upgrades/newrings.png" }) {
      ...twoColImage
    }
    ethCoin: file(relativePath: { eq: "impact_transparent.png" }) {
      ...twoColImage
    }
    meetEth: file(relativePath: { eq: "upgrades/merge.png" }) {
      ...twoColImage
    }
    whoRunsEthereum: file(
      relativePath: { eq: "run-a-node/ethereum-inside.png" }
    ) {
      ...twoColImage
    }
    whatAreSmartContracts: file(
      relativePath: { eq: "infrastructure_transparent.png" }
    ) {
      ...twoColImage
    }
    criminalActivity: file(relativePath: { eq: "finance_transparent.png" }) {
      ...twoColImage
    }
    developers: file(relativePath: { eq: "developers-eth-blocks.png" }) {
      ...calloutImage
    }
    community: file(relativePath: { eq: "enterprise.png" }) {
      ...calloutImage
    }
  }
`
