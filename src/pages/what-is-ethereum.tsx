import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MdInfoOutline } from "react-icons/md"
import {
  Box,
  type BoxProps,
  Center,
  Flex,
  type FlexProps,
  Heading,
  type HeadingProps,
  Icon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"

import type {
  BasePageProps,
  ChildOnlyProp,
  Lang,
  MetricReturnData,
} from "@/lib/types"

import AdoptionChart from "@/components/AdoptionChart"
import {
  Banner,
  BannerBody,
  BannerGrid,
  BannerGridCell,
  BannerImage,
} from "@/components/BannerGrid"
import Button from "@/components/Buttons/Button"
import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import { Image, type ImageProps } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Slider, { EmblaSlide } from "@/components/Slider"
import StatErrorMessage from "@/components/StatErrorMessage"
import Tabs from "@/components/Tabs"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import {
  getLocaleForNumberFormat,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"

import { fetchTxCount } from "@/lib/api/fetchTxCount"
import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import diffEthAndBtc from "@/public/images/eth.png"
import criminalActivity from "@/public/images/finance_transparent.png"
import ethCoin from "@/public/images/impact_transparent.png"
import whatAreSmartContracts from "@/public/images/infrastructure_transparent.png"
import whoRunsEthereum from "@/public/images/run-a-node/ethereum-inside.png"
import stats from "@/public/images/upgrades/newrings.png"
import hero from "@/public/images/what-is-ethereum.png"

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
    mb={6}
    {...prop}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <OldHeading
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

const StatPrimary = (props: ChildOnlyProp) => (
  <Box fontSize="5xl" mb={4} lineHeight={1} {...props} />
)

const StatDescription = (props: ChildOnlyProp) => (
  <Box fontSize="md" color="text200" {...props} />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Flex align="center" mt={4} mb={6} wrap="wrap" gap={4} {...props} />
)

const NoWrapText = (props: ChildOnlyProp) => (
  <Text as="span" whiteSpace="nowrap" {...props} />
)

const Image400 = ({ src }: Pick<ImageProps, "src">) => (
  <Image src={src} alt="" width={400} />
)

const cachedFetchTxCount = runOnlyOnce(fetchTxCount)

type Props = BasePageProps & {
  data: MetricReturnData
}

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/what-is-ethereum")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const data = await cachedFetchTxCount()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      data,
    },
  }
}) satisfies GetStaticProps<Props>

const WhatIsEthereumPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["page-what-is-ethereum", "learn-quizzes"])

  const { locale } = useRouter()
  const localeForNumberFormat = getLocaleForNumberFormat(locale! as Lang)

  const formatNumber = (
    value: number,
    minSignificantDigits: number,
    maxSignificantDigits: number,
    style?: Intl.NumberFormatOptions["style"],
    currency?: string
  ) =>
    new Intl.NumberFormat(localeForNumberFormat, {
      notation: "compact",
      minimumSignificantDigits: minSignificantDigits,
      maximumSignificantDigits: maxSignificantDigits,
      style: style,
      currency: currency,
      currencyDisplay: "narrowSymbol",
    }).format(value)

  const txStat = "error" in data ? "" : formatNumber(data.value, 3, 4)

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
        <Text mb="0">
          <Translation id="page-what-is-ethereum:page-what-is-ethereum-blockchain-tab-content" />
        </Text>
      ),
    },
    {
      title: t("page-what-is-ethereum-cryptocurrency-tab-title"),
      eventName: "Cryptocurrency tab",
      content: (
        <>
          <Text>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-1" />
          </Text>
          <Text>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-2" />
          </Text>
          <Text mb="0">
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-3" />
          </Text>
        </>
      ),
    },
  ]

  const slides = [
    { eventName: "Payments slide" },
    { eventName: "Time of crisis slide" },
    { eventName: "Creators slide" },
    { eventName: "Gamers slide" },
  ]

  const tooltipContent = ({ apiUrl, apiProvider, ariaLabel }) => (
    <div>
      {t("common:data-provided-by")}{" "}
      <InlineLink href={apiUrl} aria-label={ariaLabel}>
        {apiProvider}
      </InlineLink>
    </div>
  )

  return (
    <Flex
      as={MainArticle}
      direction="column"
      align="center"
      w="full"
      m="0 auto"
    >
      <PageMetadata
        title={t("page-what-is-ethereum-meta-title")}
        description={t("page-what-is-ethereum-meta-description")}
        image="/images/what-is-ethereum.png"
      />
      <Content>
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: "column-reverse", md: "row" }}
        >
          <Box as="header">
            <Title>{t("page-what-is-ethereum-title")}</Title>
            <Slogan>{t("page-what-is-ethereum-desc")}</Slogan>
            <Subtitle>{t("page-what-is-ethereum-subtitle")}</Subtitle>
            <ButtonRow>
              <Button toId="summary">
                {t("page-what-is-ethereum-button-lets-start")}
              </Button>
            </ButtonRow>
          </Box>
          <Hero>
            <Image
              src={hero}
              alt={t("page-what-is-ethereum-alt-img-bazaar")}
              // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
              sizes="(max-width: 992px) 100vw, 750px"
              priority
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
                  mb={6}
                >
                  {t("page-what-is-ethereum-summary-title")}
                </Heading>
                <Text>{t("page-what-is-ethereum-summary-desc-1")}</Text>
                <Text>{t("page-what-is-ethereum-summary-desc-2")}</Text>
                <Text mb={0}>{t("page-what-is-ethereum-summary-desc-3")}</Text>
              </Summary>
            </Width60>
            <Width40 />
          </TwoColumnContent>

          <br />
          <br />

          <Box>
            <H2>{t("page-what-is-ethereum-what-can-eth-do-title")}</H2>
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
          </Box>

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
                {t("page-what-is-ethereum-why-would-i-use-ethereum-title")}
              </H2>
              <Text>
                {t("page-what-is-ethereum-why-would-i-use-ethereum-1")}
              </Text>
              <Text>
                {t("page-what-is-ethereum-why-would-i-use-ethereum-2")}
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
                  <H3>{t("page-what-is-ethereum-slide-1-title")}</H3>
                  <Text>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-1-desc-1" />
                  </Text>
                  <Text>{t("page-what-is-ethereum-slide-1-desc-2")}</Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>{t("page-what-is-ethereum-slide-2-title")}</H3>
                  <Text>{t("page-what-is-ethereum-slide-2-desc-1")}</Text>
                  <Text>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-2-desc-2" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>{t("page-what-is-ethereum-slide-3-title")}</H3>
                  <Text>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-3-desc-1" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>{t("page-what-is-ethereum-slide-4-title")}</H3>
                  <Text>{t("page-what-is-ethereum-slide-4-desc-1")}</Text>
                  <Text>{t("page-what-is-ethereum-slide-4-desc-2")}</Text>
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
              <H2>{t("page-what-is-ethereum-ethereum-in-numbers-title")}</H2>
              <BannerGrid>
                <BannerGridCell>
                  <StatPrimary>{formatNumber(4000, 1, 1)}+</StatPrimary>
                  <StatDescription>
                    {t("page-what-is-ethereum-ethereum-in-numbers-stat-1-desc")}
                    <NoWrapText>
                      &nbsp;
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://dappradar.com/rankings/protocol/ethereum",
                          apiProvider: "State of the dapps",
                          ariaLabel: "Read more about Ethereum projects stats",
                        })}
                      >
                        <Box as="span">
                          <Icon as={MdInfoOutline} verticalAlign="middle" />
                        </Box>
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>{formatNumber(96_000_000, 2, 2)}+</StatPrimary>
                  <StatDescription>
                    {t("page-what-is-ethereum-ethereum-in-numbers-stat-2-desc")}
                    <NoWrapText>
                      &nbsp;
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://messari.io/asset/ethereum/metrics/all",
                          apiProvider: "Messari",
                          ariaLabel: "Read more about wallets stats",
                        })}
                      >
                        <Box as="span">
                          <Icon as={MdInfoOutline} verticalAlign="middle" />
                        </Box>
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>{formatNumber(53_300_000, 3, 3)}+</StatPrimary>
                  <StatDescription>
                    {t("page-what-is-ethereum-ethereum-in-numbers-stat-3-desc")}
                    <NoWrapText>
                      &nbsp;
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://dune.com/sawmon_and_natalie/smart-contracts-on-ethereum",
                          apiProvider: "Dune",
                          ariaLabel: "Read more about smart contracts stats",
                        })}
                      >
                        <Box as="span">
                          <Icon as={MdInfoOutline} verticalAlign="middle" />
                        </Box>
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>
                    {formatNumber(410_000_000_000, 3, 3, "currency", "USD")}
                  </StatPrimary>
                  <StatDescription>
                    {t("page-what-is-ethereum-ethereum-in-numbers-stat-4-desc")}
                    <NoWrapText>
                      &nbsp;
                      <Tooltip
                        content={tooltipContent({
                          apiUrl: "https://ultrasound.money/#tvs",
                          apiProvider: "Ultrasound Money",
                          ariaLabel: "Read more about about Ethereum as money",
                        })}
                      >
                        <Box as="span">
                          <Icon as={MdInfoOutline} verticalAlign="middle" />
                        </Box>
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>
                    {formatNumber(3_500_000_000, 2, 2, "currency", "USD")}
                  </StatPrimary>
                  <StatDescription>
                    {t("page-what-is-ethereum-ethereum-in-numbers-stat-5-desc")}
                    <NoWrapText>
                      &nbsp;
                      <Tooltip
                        content={tooltipContent({
                          apiUrl:
                            "https://stark.mirror.xyz/q3OnsK7mvfGtTQ72nfoxLyEV5lfYOqUfJIoKBx7BG1I",
                          apiProvider: "Josh Stark",
                          ariaLabel:
                            "Read more about 2021 Ethereum earnings stats",
                        })}
                      >
                        <Box as="span">
                          <Icon as={MdInfoOutline} verticalAlign="middle" />
                        </Box>
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>
                    {txStat || <StatErrorMessage fontSize="md" />}
                  </StatPrimary>
                  {/* TODO: Extract strings for translation */}
                  <StatDescription>
                    {t("page-what-is-ethereum-ethereum-in-numbers-stat-6-desc")}
                    <NoWrapText>
                      &nbsp;
                      <Tooltip
                        content={tooltipContent({
                          apiUrl: "https://etherscan.io/",
                          apiProvider: "Etherscan",
                          ariaLabel:
                            "Read more about number of transactions stats",
                        })}
                      >
                        <Box as="span">
                          <Icon as={MdInfoOutline} verticalAlign="middle" />
                        </Box>
                      </Tooltip>
                    </NoWrapText>
                  </StatDescription>
                </BannerGridCell>
              </BannerGrid>
            </BannerBody>
            <BannerImage>
              <Image400 src={stats} />
            </BannerImage>
          </Banner>
        </Section>

        <Section bgColor="homeBoxPurple">
          <TwoColumnContent>
            <Width40>
              <Image400 src={whoRunsEthereum} />
            </Width40>
            <Width60>
              <H2>{t("page-what-is-ethereum-who-runs-ethereum-title")}</H2>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-who-runs-ethereum-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-who-runs-ethereum-desc-2" />
              </Text>
              <ButtonRow>
                <ButtonLink href="/run-a-node/">
                  {t("page-what-is-ethereum-run-a-node")}
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent direction={{ base: "column", lg: "row-reverse" }}>
            <Width40>
              <Image400 src={whatAreSmartContracts} />
            </Width40>
            <Width60>
              <H2>{t("page-what-is-ethereum-smart-contract-title")}</H2>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-smart-contract-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-smart-contract-desc-2" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-smart-contract-desc-3" />
              </Text>
              <ButtonRow>
                <ButtonLink href="/smart-contracts/">
                  {t("page-what-is-ethereum-more-on-smart-contracts")}
                </ButtonLink>
                <ButtonLink href="/dapps/" variant="outline" isSecondary>
                  {t("page-what-is-ethereum-explore-dapps")}
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section bgColor="homeBoxTurquoise">
          <TwoColumnContent>
            <Width40>
              <Image400 src={ethCoin} />
            </Width40>
            <Width60>
              <H2>{t("page-what-is-ethereum-meet-ether-title")}</H2>
              <Text>{t("page-what-is-ethereum-meet-ether-desc-1")}</Text>
              <Text>{t("page-what-is-ethereum-meet-ether-desc-2")}</Text>
              <ButtonRow>
                <ButtonLink href="/eth/">
                  {t("page-what-is-ethereum-what-is-ether")}
                </ButtonLink>
                <ButtonLink href="/get-eth/" variant="outline" isSecondary>
                  {t("page-what-is-ethereum-get-eth")}
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
              <H2>{t("page-what-is-ethereum-energy-title")}</H2>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-energy-desc-1" />
              </Text>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-energy-desc-2" />
              </Text>
              <ButtonRow>
                <ButtonLink href="/energy-consumption/">
                  {t("page-what-is-ethereum-more-on-energy-consumption")}
                </ButtonLink>
                <ButtonLink
                  href="/roadmap/merge/"
                  variant="outline"
                  isSecondary
                >
                  {t("page-what-is-ethereum-the-merge-update")}
                </ButtonLink>
              </ButtonRow>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width40>
              <Image400 src={criminalActivity} />
            </Width40>
            <Width60>
              <H2>{t("page-what-is-ethereum-criminal-activity-title")}</H2>
              <Text>{t("page-what-is-ethereum-criminal-activity-desc-1")}</Text>
              <Text>{t("page-what-is-ethereum-criminal-activity-desc-2")}</Text>
              <Text>
                <Text as="em">
                  {t("page-what-is-ethereum-criminal-activity-desc-3")}
                </Text>
              </Text>
              <UnorderedList>
                <ListItem>
                  <InlineLink href="https://www.europol.europa.eu/publications-events/publications/cryptocurrencies-tracing-evolution-of-criminal-finances#downloads">
                    Europol Spotlight - Cryptocurrencies - Tracing the evolution
                    of criminal finances.pdf
                  </InlineLink>{" "}
                  EN (1.4 MB)
                </ListItem>
              </UnorderedList>
            </Width60>
          </TwoColumnContent>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width40>
              <Image400 src={diffEthAndBtc} />
            </Width40>
            <Width60>
              <H2>{t("page-what-is-ethereum-btc-eth-diff-title")}</H2>
              <Text>{t("page-what-is-ethereum-btc-eth-diff-1")}</Text>
              <Text>
                <Translation id="page-what-is-ethereum:page-what-is-ethereum-btc-eth-diff-2" />
              </Text>
              <Text>{t("page-what-is-ethereum-btc-eth-diff-3")}</Text>
              <Text>{t("page-what-is-ethereum-btc-eth-diff-4")}</Text>
            </Width60>
          </TwoColumnContent>
        </Section>
      </Box>

      <Content>
        <H2>{t("page-what-is-ethereum-additional-reading")}</H2>
        <Text>
          <InlineLink href="https://weekinethereumnews.com/">
            {t("page-what-is-ethereum-week-in-ethereum")}
          </InlineLink>{" "}
          {t("page-what-is-ethereum-week-in-ethereum-desc")}
        </Text>
        <Text>
          <InlineLink href="https://stark.mirror.xyz/n2UpRqwdf7yjuiPKVICPpGoUNeDhlWxGqjulrlpyYi0">
            {t("page-what-is-ethereum-atoms-institutions-blockchains")}
          </InlineLink>{" "}
          {t("page-what-is-ethereum-atoms-institutions-blockchains-desc")}
        </Text>

        <Text>
          <InlineLink href="https://www.kernel.community/en/learn/module-1/dreamers">
            {t("page-what-is-ethereum-kernel-dreamers")}
          </InlineLink>{" "}
          {t("page-what-is-ethereum-kernel-dreamers-desc")}
        </Text>
      </Content>

      <Content>
        <Column>
          <H2>{t("page-what-is-ethereum-explore")}</H2>
        </Column>
        <CardContainer>
          <Callout
            flex="1 1 416px"
            minH="full"
            image={ethImg}
            titleKey="page-what-is-ethereum:page-what-is-ethereum-get-eth-title"
            alt={t("page-what-is-ethereum-get-eth-alt")}
            descriptionKey="page-what-is-ethereum:page-what-is-ethereum-get-eth-description"
          >
            <Box>
              <ButtonLink href="/get-eth/">
                {t("page-what-is-ethereum-get-eth")}
              </ButtonLink>
            </Box>
          </Callout>
          <Callout
            flex="1 1 416px"
            minH="full"
            image={dogeComputerImg}
            titleKey="page-what-is-ethereum:page-what-is-ethereum-explore-dapps-title"
            alt={t("page-what-is-ethereum-explore-dapps-alt")}
            descriptionKey="page-what-is-ethereum:page-what-is-ethereum-explore-dapps-description"
          >
            <Box>
              <ButtonLink href="/dapps/">
                {t("page-what-is-ethereum-explore-dapps")}
              </ButtonLink>
            </Box>
          </Callout>
        </CardContainer>
      </Content>

      <Content>
        <StandaloneQuizWidget quizKey="what-is-ethereum" />
      </Content>

      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default WhatIsEthereumPage
