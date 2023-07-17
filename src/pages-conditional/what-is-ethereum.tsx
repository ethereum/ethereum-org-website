import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, PageProps } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import {
  Box,
  BoxProps,
  Center,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  ListItem,
  Text,
  UnorderedList,
  Icon,
} from "@chakra-ui/react"

import Translation from "../components/Translation"
import Callout from "../components/Callout"
import Card from "../components/Card"
import ButtonLink from "../components/ButtonLink"
import Button from "../components/Button"
import PageMetadata from "../components/PageMetadata"
import Tooltip from "../components/Tooltip"
import Tabs from "../components/Tabs"
import Link from "../components/Link"
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
import StatErrorMessage from "../components/StatErrorMessage"
import StatLoadingMessage from "../components/StatLoadingMessage"

import { getLocaleForNumberFormat } from "../utils/translations"
import { Lang } from "../utils/languages"
import { trackCustomEvent } from "../utils/matomo"
import { getImage, getSrc } from "../utils/image"

import useFetchStat, {
  defaultFormatter,
  IFetchStat,
} from "../hooks/useFetchStat"
import { GATSBY_FUNCTIONS_PATH } from "../constants"
import type { ChildOnlyProp, Context } from "../types"
import { MdInfoOutline } from "react-icons/md"

const Slogan = (props: ChildOnlyProp) => (
  <Text
    textStyle="normal"
    fontWeight="normal"
    fontSize="2rem"
    lineHeight={1.4}
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize="sm"
    lineHeight={1.4}
    letterSpacing="wider"
    fontWeight="500"
    mb={4}
    mt={0}
    textTransform="uppercase"
    color="textTableOfContents"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight={1.4} color="text200" {...props} />
)

const Hero = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 100%"
    maxW="800px"
    bgSize="cover"
    bgRepeat="no-repeat"
    {...props}
  />
)

const Summary = (props: BoxProps) => (
  <Box p={4} borderRadius="base" bg="cardGradient" {...props} />
)

const Content = (props: ChildOnlyProp) => (
  <Box w="full" px={8} py={4} {...props} />
)

const TwoColumnContent = (props: FlexProps) => (
  <Flex
    w="full"
    gap={{ base: 8, lg: 0 }}
    align={{ base: "flex-start", lg: "center" }}
    direction={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Section = (props: BoxProps) => <Box w="full" py={12} px={8} {...props} />

export const Width60 = (props: ChildOnlyProp) => (
  <Box w="full" flex={3} {...props} />
)

export const Width40 = (props: ChildOnlyProp) => (
  <Center w="full" flex={2} {...props} />
)

const H2 = (prop: ChildOnlyProp & HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "3xl" }}
    lineHeight={1.4}
    mt={0}
    mb={6}
    {...prop}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <Heading
    as="h3"
    mt={0}
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    fontWeight={600}
    {...props}
  />
)

const CardContainer = (props: ChildOnlyProp) => (
  <Flex wrap="wrap" mx={-4} {...props} />
)

const Column = (props: ChildOnlyProp) => (
  <Box flex="0 0 50%" maxW={{ base: "full", md: "75%" }} mb={6} {...props} />
)

const TabContent = (props: ChildOnlyProp) => <Text m={0} {...props} />

const StatPrimary = (props: ChildOnlyProp) => (
  <Box fontSize="5xl" mb={4} lineHeight={1} {...props} />
)

const StatDescription = (props: ChildOnlyProp) => (
  <Box fontSize="md" color="text200" {...props} />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Flex align="center" mt={4} mb={6} wrap="wrap" gap={4} {...props} />
)

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

const NoWrapText = (props: ChildOnlyProp) => (
  <Text as="span" whiteSpace="nowrap" {...props} />
)

const WhatIsEthereumPage = ({
  data,
}: PageProps<Queries.WhatIsEthereumQuery, Context>) => {
  const { t } = useTranslation()
  const { language } = useI18next()

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
          <Text>
            <Translation id="page-what-is-ethereum-cryptocurrency-tab-content-1" />
          </Text>
          <Text>
            <Translation id="page-what-is-ethereum-cryptocurrency-tab-content-2" />
          </Text>
          <Text>
            <Translation id="page-what-is-ethereum-cryptocurrency-tab-content-3" />
          </Text>
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
    <Flex direction="column" align="center" w="full" m="0 auto">
      <PageMetadata
        title={t("page-what-is-ethereum-meta-title")}
        description={t("page-what-is-ethereum-meta-description")}
        image={getSrc(data.ogImage)}
      />
      <Content>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Box as="header">
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
          </Box>
          <Hero>
            <GatsbyImage
              image={getImage(data.hero)!}
              alt={t("page-what-is-ethereum-alt-img-bazaar")}
              loading="eager"
            />
          </Hero>
        </Flex>
      </Content>
      <Box
        w="full"
        bg="grayBackground"
        boxShadow={{
          base: "none",
          md: "inset 0px 1px 0px var(--eth-colors-tableItemBoxShadow)",
        }}
      >
        <Section>
          <TwoColumnContent id="summary">
            <Width60>
              <Summary>
                <Heading
                  fontSize="1.4rem"
                  lineHeight={1.4}
                  color="text300"
                  mt={0}
                  mb={6}
                >
                  <Translation id="page-what-is-ethereum-summary-title" />
                </Heading>
                <Text>
                  <Translation id="page-what-is-ethereum-summary-desc-1" />
                </Text>
                <Text>
                  <Translation id="page-what-is-ethereum-summary-desc-2" />
                </Text>
                <Text mb={0}>
                  <Translation id="page-what-is-ethereum-summary-desc-3" />
                </Text>
              </Summary>
            </Width60>
            <Width40 />
          </TwoColumnContent>

          <br />
          <br />

          <Section>
            <H2>
              <Translation id="page-what-is-ethereum-what-can-eth-do-title" />
            </H2>
            <CardContainer>
              {cards.map((card, idx) => (
                <Card
                  key={idx}
                  emoji={card.emoji}
                  title={card.title}
                  description={card.description}
                  flex="1 1 30%"
                  minW="240px"
                  m={4}
                  p={6}
                />
              ))}
            </CardContainer>
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
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-why-would-i-use-ethereum-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-why-would-i-use-ethereum-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-why-would-i-use-ethereum-2" />
              </Text>

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
                  <H3>
                    <Translation id="page-what-is-ethereum-slide-1-title" />
                  </H3>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-1-desc-1" />
                  </Text>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-1-desc-2" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>
                    <Translation id="page-what-is-ethereum-slide-2-title" />
                  </H3>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-2-desc-1" />
                  </Text>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-2-desc-2" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>
                    <Translation id="page-what-is-ethereum-slide-3-title" />
                  </H3>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-3-desc-1" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>
                    <Translation id="page-what-is-ethereum-slide-4-title" />
                  </H3>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-4-desc-1" />
                  </Text>
                  <Text>
                    <Translation id="page-what-is-ethereum-slide-4-desc-2" />
                  </Text>
                </EmblaSlide>
              </Slider>
            </Width60>
            <Width40>
              <AdoptionChart />
            </Width40>
          </TwoColumnContent>
        </Section>

        <Section>
          <Banner>
            <BannerBody>
              <H2>
                <Translation id="page-what-is-ethereum-ethereum-in-numbers-title" />
              </H2>
              <BannerGrid>
                <BannerGridCell>
                  <StatPrimary>4k+</StatPrimary>
                  <StatDescription>
                    Projects built on{" "}
                    <NoWrapText>
                      Ethereum{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://dappradar.com/rankings/protocol/ethereum",
                          apiProvider: "State of the dapps",
                          ariaLabel: "Read more about Ethereum projects stats",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>96M+</StatPrimary>
                  <StatDescription>
                    Accounts (wallets) with an ETH{" "}
                    <NoWrapText>
                      balance{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://messari.io/asset/ethereum/metrics/all",
                          apiProvider: "Messari",
                          ariaLabel: "Read more about wallets stats",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>53.3M+</StatPrimary>
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
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>$410B</StatPrimary>
                  <StatDescription>
                    Value secured on{" "}
                    <NoWrapText>
                      Ethereum{" "}
                      <Tooltip
                        content={tooltipContent({
                          apiUrl: "https://ultrasound.money/#tvs",
                          apiProvider: "Ultrasound Money",
                          ariaLabel: "Read more about about Ethereum as money",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
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
                        <Icon as={MdInfoOutline} fontSize="md" />
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
                        <Icon as={MdInfoOutline} fontSize="md" />
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

        <Section bgColor="homeBoxPurple">
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.whoRunsEthereum)!} alt="" />
            </Width40>
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-who-runs-ethereum-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-who-runs-ethereum-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-who-runs-ethereum-desc-2" />
              </Text>
              <ButtonRow>
                <ButtonLink to="/run-a-node/">
                  <Translation id="page-what-is-ethereum-run-a-node" />
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent direction={{ base: "column", lg: "row-reverse" }}>
            <Width40>
              <GatsbyImage
                image={getImage(data.whatAreSmartContracts)!}
                alt=""
              />
            </Width40>
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-smart-contract-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-smart-contract-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-smart-contract-desc-2" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-smart-contract-desc-3" />
              </Text>
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

        <Section bgColor="homeBoxTurquoise">
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.ethCoin)!} alt="" />
            </Width40>
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-meet-ether-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-meet-ether-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-meet-ether-desc-2" />
              </Text>
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
          <TwoColumnContent direction={{ base: "column", lg: "row-reverse" }}>
            <Width40>
              <EnergyConsumptionChart />
            </Width40>
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-energy-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-energy-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-energy-desc-2" />
              </Text>
              <ButtonRow>
                <ButtonLink to="/energy-consumption/">
                  <Translation id="page-what-is-ethereum-more-on-energy-consumption" />
                </ButtonLink>
                <ButtonLink to="/roadmap/merge/" variant="outline">
                  <Translation id="page-what-is-ethereum-the-merge-update" />
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.criminalActivity)!} alt="" />
            </Width40>
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-criminal-activity-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-criminal-activity-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-criminal-activity-desc-2" />
              </Text>
              <Text>
                <Text as="em">
                  <Translation id="page-what-is-ethereum-criminal-activity-desc-3" />
                </Text>
              </Text>
              <UnorderedList>
                <ListItem>
                  <Link to="https://www.europol.europa.eu/publications-events/publications/cryptocurrencies-tracing-evolution-of-criminal-finances#downloads">
                    Europol Spotlight - Cryptocurrencies - Tracing the evolution
                    of criminal finances.pdf
                  </Link>{" "}
                  EN (1.4 MB)
                </ListItem>
                <ListItem>
                  <Link to="https://go.chainalysis.com/2021-CryptoCrime-Report.html">
                    Chainalysis (2021), The 2021 Crypto Crime report
                  </Link>{" "}
                  EN
                </ListItem>
              </UnorderedList>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width40>
              <GatsbyImage image={getImage(data.diffEthAndBtc)!} alt="" />
            </Width40>
            <Width60>
              <H2>
                <Translation id="page-what-is-ethereum-btc-eth-diff-title" />
              </H2>
              <Text>
                <Translation id="page-what-is-ethereum-btc-eth-diff-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-btc-eth-diff-2" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-btc-eth-diff-3" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum-btc-eth-diff-4" />
              </Text>
            </Width60>
          </TwoColumnContent>
        </Section>
      </Box>

      <Content>
        <H2>
          <Translation id="page-what-is-ethereum-additional-reading" />
        </H2>
        <Text>
          <Link to="https://weekinethereumnews.com/">
            <Translation id="page-what-is-ethereum-week-in-ethereum" />
          </Link>{" "}
          <Translation id="page-what-is-ethereum-week-in-ethereum-desc" />
        </Text>
        <Text>
          <Link to="https://stark.mirror.xyz/n2UpRqwdf7yjuiPKVICPpGoUNeDhlWxGqjulrlpyYi0">
            <Translation id="page-what-is-ethereum-atoms-institutions-blockchains" />
          </Link>{" "}
          <Translation id="page-what-is-ethereum-atoms-institutions-blockchains-desc" />
        </Text>

        <Text>
          <Link to="https://www.kernel.community/en/learn/module-1/dreamers">
            <Translation id="page-what-is-ethereum-kernel-dreamers" />
          </Link>{" "}
          <Translation id="page-what-is-ethereum-kernel-dreamers-desc" />
        </Text>
      </Content>

      <Content>
        <Column>
          <H2>
            <Translation id="page-what-is-ethereum-explore" />
          </H2>
        </Column>
        <CardContainer>
          <Callout
            flex="1 1 416px"
            minH="full"
            image={getImage(data.developers)!}
            titleKey="page-what-is-ethereum-build"
            alt={t("page-what-is-ethereum-alt-img-lego")}
            descriptionKey="page-what-is-ethereum-build-desc"
          >
            <Box>
              <ButtonLink to="/developers/">
                <Translation id="page-what-is-ethereum-start-building-btn" />
              </ButtonLink>
            </Box>
          </Callout>
          <Callout
            flex="1 1 416px"
            minH="full"
            image={getImage(data.community)!}
            titleKey="page-what-is-ethereum-community"
            alt={t("page-what-is-ethereum-alt-img-comm")}
            descriptionKey="page-what-is-ethereum-comm-desc"
          >
            <Box>
              <ButtonLink to="/community/">
                <Translation id="page-what-is-ethereum-meet-comm" />
              </ButtonLink>
            </Box>
          </Callout>
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
    </Flex>
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
  query WhatIsEthereum($languagesToFetch: [String!]!) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["page-what-is-ethereum", "learn-quizzes", "common"] }
      }
    ) {
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
        gatsbyImageData(
          width: 740
          layout: CONSTRAINED
          placeholder: BLURRED
          quality: 100
        )
      }
    }
    ogImage: file(relativePath: { eq: "what-is-ethereum.png" }) {
      childImageSharp {
        gatsbyImageData(
          width: 1200
          layout: FIXED
          placeholder: BLURRED
          quality: 100
        )
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
