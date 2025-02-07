import { GetStaticProps, InferGetStaticPropsType } from "next"
import type { ImageProps } from "next/image"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import type { HTMLAttributes } from "react"
import { MdInfoOutline } from "react-icons/md"

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
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import StatErrorMessage from "@/components/StatErrorMessage"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Center, Flex, HStack, Stack, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import {
  getLocaleForNumberFormat,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"

import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
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
  <p className="text-[2rem] leading-xs" {...props} />
)

const Title = (props: ChildOnlyProp) => (
  <h1
    className="text-sm font-medium uppercase leading-xs tracking-wider"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <p className="text-xl leading-xs" {...props} />
)

const Hero = (props: ChildOnlyProp) => (
  <div
    className="max-w-[800px] flex-[1_1_100%] bg-cover bg-no-repeat"
    {...props}
  />
)

const Summary = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded p-4",
      "border-accent-c/10 bg-gradient-to-t from-accent-c/10 from-20% to-accent-c/5 to-60% dark:from-accent-c/20 dark:to-accent-c/10",
      className
    )}
    {...rest}
  />
)

const Content = (props: ChildOnlyProp) => (
  <div className="w-full px-8 py-4" {...props} />
)

const TwoColumnContent = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <Flex
    className={cn(
      "w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-0",
      className
    )}
    {...rest}
  />
)

const Section = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <section className={cn("w-full px-8 py-12", className)} {...rest} />
)

export const Width60 = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full flex-[3]", className)}>{children}</div>
)

export const Width40 = (props: ChildOnlyProp) => (
  <Center className="w-full flex-[2] gap-0" {...props} />
)

const H2 = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <h2
    className={cn("mb-6 text-2xl leading-xs md:text-3xl", className)}
    {...rest}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <h3 className="text-xl font-semibold leading-xs md:text-2xl" {...props} />
)

const CardContainer = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <Flex className={cn("-mx-4 flex-wrap", className)} {...rest} />
)

const Column = (props: ChildOnlyProp) => (
  <div className="mb-6 md:max-w-[75%]" {...props} />
)

const StatPrimary = (props: ChildOnlyProp) => (
  <div className="mb-4 text-5xl leading-none" {...props} />
)

const StatDescription = (props: ChildOnlyProp) => (
  <div className="text-md text-[#666] dark:text-[#b2b2b2]" {...props} />
)

const ButtonRow = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <HStack className={cn("flex-wrap gap-4", className)} {...rest} />
)

const NoWrapText = (props: ChildOnlyProp) => (
  <span className="whitespace-nowrap" {...props} />
)

const Image400 = ({ src }: Pick<ImageProps, "src">) => (
  <TwImage src={src} alt="" width={400} />
)

type Props = BasePageProps & {
  data: MetricReturnData
}

const loadData = dataLoader([["growThePieData", fetchGrowThePie]])

export const getStaticProps = (async ({ locale }) => {
  const [data] = await loadData()

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/what-is-ethereum")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      data: data.txCount,
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
        <p>
          <Translation id="page-what-is-ethereum:page-what-is-ethereum-blockchain-tab-content" />
        </p>
      ),
    },
    {
      title: t("page-what-is-ethereum-cryptocurrency-tab-title"),
      eventName: "Cryptocurrency tab",
      content: (
        <Stack className="gap-6">
          <p>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-1" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-2" />
          </p>
          <p>
            <Translation id="page-what-is-ethereum:page-what-is-ethereum-cryptocurrency-tab-content-3" />
          </p>
        </Stack>
      ),
    },
  ] as const

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
    <VStack className="mx-0 my-auto w-full gap-0" asChild>
      <MainArticle>
        <PageMetadata
          title={t("page-what-is-ethereum-meta-title")}
          description={t("page-what-is-ethereum-meta-description")}
          image="/images/what-is-ethereum.png"
        />
        <Content>
          <Flex className="flex-col-reverse items-center justify-between md:flex-row">
            <Stack className="mb-6 gap-4" asChild>
              <header>
                <Title>{t("page-what-is-ethereum-title")}</Title>
                <Stack className="gap-6">
                  <Slogan>{t("page-what-is-ethereum-desc")}</Slogan>
                  <Subtitle>{t("page-what-is-ethereum-subtitle")}</Subtitle>
                  <ButtonRow>
                    <Button toId="summary">
                      {t("page-what-is-ethereum-button-lets-start")}
                    </Button>
                  </ButtonRow>
                </Stack>
              </header>
            </Stack>
            <Hero>
              <TwImage
                src={hero}
                alt={t("page-what-is-ethereum-alt-img-bazaar")}
                // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
                sizes="(max-width: 992px) 100vw, 750px"
                priority
              />
            </Hero>
          </Flex>
        </Content>
        <div className="w-full bg-background-highlight">
          <Section>
            <Stack className="gap-14">
              <TwoColumnContent id="summary">
                <Width60>
                  <Summary>
                    <Stack className="gap-6">
                      <h2 className="text-[1.4rem] leading-xs text-[#4c4c4c] dark:text-[#ccc]">
                        {t("page-what-is-ethereum-summary-title")}
                      </h2>
                      <Stack className="gap-6">
                        <p>{t("page-what-is-ethereum-summary-desc-1")}</p>
                        <p>{t("page-what-is-ethereum-summary-desc-2")}</p>
                        <ul>
                          <li>
                            <Translation id="page-what-is-ethereum:page-what-is-ethereum-summary-bullet-1" />
                          </li>
                          <li>
                            <Translation id="page-what-is-ethereum:page-what-is-ethereum-summary-bullet-2" />
                          </li>
                          <li>
                            <Translation id="page-what-is-ethereum:page-what-is-ethereum-summary-bullet-3" />
                          </li>
                          <li>
                            <Translation id="page-what-is-ethereum:page-what-is-ethereum-summary-bullet-4" />
                          </li>
                        </ul>
                      </Stack>
                    </Stack>
                  </Summary>
                </Width60>
                <Width40 />
              </TwoColumnContent>
              <Stack className="gap-8">
                <div>
                  <H2>{t("page-what-is-ethereum-what-can-eth-do-title")}</H2>
                  <CardContainer>
                    {cards.map((card, idx) => (
                      <Card
                        key={idx}
                        emoji={card.emoji}
                        title={card.title}
                        description={card.description}
                        className="m-4 min-w-[240px] flex-[1_1_30%] p-6"
                      />
                    ))}
                  </CardContainer>
                </div>

                <TwoColumnContent>
                  <Width60>
                    <Tabs
                      defaultValue="0"
                      onValueChange={(index) => {
                        trackCustomEvent({
                          eventCategory: `Blockchain/crypto tab`,
                          eventAction: `Clicked`,
                          eventName: tabs[index].eventName,
                        })
                      }}
                    >
                      <TabsList>
                        {tabs.map((tab, index) => (
                          <TabsTrigger key={index} value={index.toString()}>
                            {tab.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {tabs.map((tab, index) => (
                        <TabsContent key={index} value={index.toString()}>
                          {tab.content}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </Width60>
                  <Width40 />
                </TwoColumnContent>
              </Stack>
            </Stack>
          </Section>

          <Section>
            <TwoColumnContent>
              <Width60 className="lg:max-w-[60%]">
                <H2>
                  {t("page-what-is-ethereum-why-would-i-use-ethereum-title")}
                </H2>
                <Stack className="max-w-full gap-6">
                  <p>{t("page-what-is-ethereum-why-would-i-use-ethereum-1")}</p>
                  <p>{t("page-what-is-ethereum-why-would-i-use-ethereum-2")}</p>

                  <div className="max-w-full">
                    <SwiperContainer className="rounded border bg-background p-8">
                      <Swiper
                        onSlideChange={({ activeIndex }) => {
                          trackCustomEvent({
                            eventCategory: `What is Ethereum - Slider`,
                            eventAction: `Clicked`,
                            eventName: slides[activeIndex].eventName,
                          })
                        }}
                      >
                        <SwiperSlide>
                          <div className="space-y-8">
                            <H3>{t("page-what-is-ethereum-slide-1-title")}</H3>
                            <div className="mb-4 flex flex-col gap-6">
                              <p>
                                <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-1-desc-1" />
                              </p>
                              <p>{t("page-what-is-ethereum-slide-1-desc-2")}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="space-y-8">
                            <H3>{t("page-what-is-ethereum-slide-2-title")}</H3>
                            <div className="mb-4 flex flex-col gap-6">
                              <p>{t("page-what-is-ethereum-slide-2-desc-1")}</p>
                              <p>
                                <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-2-desc-2" />
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="space-y-8">
                            <H3>{t("page-what-is-ethereum-slide-3-title")}</H3>
                            <div className="mb-4 flex flex-col gap-6">
                              <p>
                                <Translation id="page-what-is-ethereum:page-what-is-ethereum-slide-3-desc-1" />
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="space-y-8">
                            <H3>{t("page-what-is-ethereum-slide-4-title")}</H3>
                            <div className="mb-4 flex flex-col gap-6">
                              <p>{t("page-what-is-ethereum-slide-4-desc-1")}</p>
                              <p>{t("page-what-is-ethereum-slide-4-desc-2")}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperNavigation />
                      </Swiper>
                    </SwiperContainer>
                  </div>
                </Stack>
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
                      {t(
                        "page-what-is-ethereum-ethereum-in-numbers-stat-1-desc"
                      )}
                      <NoWrapText>
                        &nbsp;
                        <Tooltip
                          content={tooltipContent({
                            apiUrl:
                              "https://dappradar.com/rankings/protocol/ethereum",
                            apiProvider: "State of the dapps",
                            ariaLabel:
                              "Read more about Ethereum projects stats",
                          })}
                        >
                          <span>
                            <MdInfoOutline className="inline-block align-middle" />
                          </span>
                        </Tooltip>
                      </NoWrapText>
                    </StatDescription>
                  </BannerGridCell>
                  <BannerGridCell>
                    <StatPrimary>{formatNumber(96_000_000, 2, 2)}+</StatPrimary>
                    <StatDescription>
                      {t(
                        "page-what-is-ethereum-ethereum-in-numbers-stat-2-desc"
                      )}
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
                          <span>
                            <MdInfoOutline className="inline-block align-middle" />
                          </span>
                        </Tooltip>
                      </NoWrapText>
                    </StatDescription>
                  </BannerGridCell>
                  <BannerGridCell>
                    <StatPrimary>{formatNumber(53_300_000, 3, 3)}+</StatPrimary>
                    <StatDescription>
                      {t(
                        "page-what-is-ethereum-ethereum-in-numbers-stat-3-desc"
                      )}
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
                          <span>
                            <MdInfoOutline className="inline-block align-middle" />
                          </span>
                        </Tooltip>
                      </NoWrapText>
                    </StatDescription>
                  </BannerGridCell>
                  <BannerGridCell>
                    <StatPrimary>
                      {formatNumber(410_000_000_000, 3, 3, "currency", "USD")}
                    </StatPrimary>
                    <StatDescription>
                      {t(
                        "page-what-is-ethereum-ethereum-in-numbers-stat-4-desc"
                      )}
                      <NoWrapText>
                        &nbsp;
                        <Tooltip
                          content={tooltipContent({
                            apiUrl: "https://ultrasound.money/#tvs",
                            apiProvider: "Ultrasound Money",
                            ariaLabel:
                              "Read more about about Ethereum as money",
                          })}
                        >
                          <span>
                            <MdInfoOutline className="inline-block align-middle" />
                          </span>
                        </Tooltip>
                      </NoWrapText>
                    </StatDescription>
                  </BannerGridCell>
                  <BannerGridCell>
                    <StatPrimary>
                      {formatNumber(3_500_000_000, 2, 2, "currency", "USD")}
                    </StatPrimary>
                    <StatDescription>
                      {t(
                        "page-what-is-ethereum-ethereum-in-numbers-stat-5-desc"
                      )}
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
                          <span>
                            <MdInfoOutline className="inline-block align-middle" />
                          </span>
                        </Tooltip>
                      </NoWrapText>
                    </StatDescription>
                  </BannerGridCell>
                  <BannerGridCell>
                    <StatPrimary>
                      {txStat || <StatErrorMessage className="text-md" />}
                    </StatPrimary>
                    {/* TODO: Extract strings for translation */}
                    <StatDescription>
                      {t(
                        "page-what-is-ethereum-ethereum-in-numbers-stat-6-desc"
                      )}
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
                          <span>
                            <MdInfoOutline className="inline-block align-middle" />
                          </span>
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

          <Section className="bg-[#e8e8ff] dark:bg-[#212131]">
            <TwoColumnContent>
              <Width40>
                <Image400 src={whoRunsEthereum} />
              </Width40>
              <Width60>
                <H2>{t("page-what-is-ethereum-who-runs-ethereum-title")}</H2>
                <Stack className="gap-6">
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-who-runs-ethereum-desc-1" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-who-runs-ethereum-desc-2" />
                  </p>
                  <ButtonRow>
                    <ButtonLink href="/run-a-node/">
                      {t("page-what-is-ethereum-run-a-node")}
                    </ButtonLink>
                  </ButtonRow>
                </Stack>
              </Width60>
            </TwoColumnContent>
          </Section>

          <Section>
            <TwoColumnContent className="lg:flex-row-reverse">
              <Width40>
                <Image400 src={whatAreSmartContracts} />
              </Width40>
              <Width60>
                <H2>{t("page-what-is-ethereum-smart-contract-title")}</H2>
                <Stack className="gap-6">
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-smart-contract-desc-1" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-smart-contract-desc-2" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-smart-contract-desc-3" />
                  </p>
                  <ButtonRow>
                    <ButtonLink href="/smart-contracts/">
                      {t("page-what-is-ethereum-more-on-smart-contracts")}
                    </ButtonLink>
                    <ButtonLink href="/dapps/" variant="outline" isSecondary>
                      {t("page-what-is-ethereum-explore-dapps")}
                    </ButtonLink>
                  </ButtonRow>
                </Stack>
              </Width60>
            </TwoColumnContent>
          </Section>

          <Section className="bg-[#ccfcff] dark:bg-[#293233]">
            <TwoColumnContent>
              <Width40>
                <Image400 src={ethCoin} />
              </Width40>
              <Width60>
                <H2>{t("page-what-is-ethereum-meet-ether-title")}</H2>
                <Stack className="gap-6">
                  <p>{t("page-what-is-ethereum-meet-ether-desc-1")}</p>
                  <p>{t("page-what-is-ethereum-meet-ether-desc-2")}</p>
                  <ButtonRow>
                    <ButtonLink href="/eth/">
                      {t("page-what-is-ethereum-what-is-ether")}
                    </ButtonLink>
                    <ButtonLink href="/get-eth/" variant="outline" isSecondary>
                      {t("page-what-is-ethereum-get-eth")}
                    </ButtonLink>
                  </ButtonRow>
                </Stack>
              </Width60>
            </TwoColumnContent>
          </Section>

          <Section>
            <TwoColumnContent className="lg:flex-row-reverse">
              <Width40>
                <EnergyConsumptionChart />
              </Width40>
              <Width60>
                <H2>{t("page-what-is-ethereum-energy-title")}</H2>
                <Stack className="gap-6">
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-energy-desc-1" />
                  </p>
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-energy-desc-2" />
                  </p>
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
                </Stack>
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
                <Stack className="gap-6">
                  <p>{t("page-what-is-ethereum-criminal-activity-desc-1")}</p>
                  <p>{t("page-what-is-ethereum-criminal-activity-desc-2")}</p>
                  <p>
                    <em>
                      {t("page-what-is-ethereum-criminal-activity-desc-3")}
                    </em>
                  </p>
                  <ul>
                    <li>
                      <InlineLink href="https://www.europol.europa.eu/publications-events/publications/cryptocurrencies-tracing-evolution-of-criminal-finances#downloads">
                        Europol Spotlight - Cryptocurrencies - Tracing the
                        evolution of criminal finances.pdf
                      </InlineLink>{" "}
                      EN (1.4 MB)
                    </li>
                  </ul>
                </Stack>
              </Width60>
            </TwoColumnContent>
          </Section>

          <Section>
            <TwoColumnContent className="lg:flex-row-reverse">
              <Width40>
                <Image400 src={diffEthAndBtc} />
              </Width40>
              <Width60>
                <H2>{t("page-what-is-ethereum-btc-eth-diff-title")}</H2>
                <Stack className="gap-6">
                  <p>{t("page-what-is-ethereum-btc-eth-diff-1")}</p>
                  <p>
                    <Translation id="page-what-is-ethereum:page-what-is-ethereum-btc-eth-diff-2" />
                  </p>
                  <p>{t("page-what-is-ethereum-btc-eth-diff-3")}</p>
                  <p>{t("page-what-is-ethereum-btc-eth-diff-4")}</p>
                </Stack>
              </Width60>
            </TwoColumnContent>
          </Section>
        </div>

        <Section>
          <H2>{t("page-what-is-ethereum-additional-reading")}</H2>
          <Stack className="mb-4 gap-6">
            <p>
              <InlineLink href="https://weekinethereumnews.com/">
                {t("page-what-is-ethereum-week-in-ethereum")}
              </InlineLink>{" "}
              {t("page-what-is-ethereum-week-in-ethereum-desc")}
            </p>
            <p>
              <InlineLink href="https://stark.mirror.xyz/n2UpRqwdf7yjuiPKVICPpGoUNeDhlWxGqjulrlpyYi0">
                {t("page-what-is-ethereum-atoms-institutions-blockchains")}
              </InlineLink>{" "}
              {t("page-what-is-ethereum-atoms-institutions-blockchains-desc")}
            </p>

            <p>
              <InlineLink href="https://read.kernel.community/en/learn/module-1/dreamers">
                {t("page-what-is-ethereum-kernel-dreamers")}
              </InlineLink>{" "}
              {t("page-what-is-ethereum-kernel-dreamers-desc")}
            </p>
          </Stack>
        </Section>

        <Section>
          <Column>
            <H2>{t("page-what-is-ethereum-explore")}</H2>
          </Column>
          <CardContainer>
            <Callout
              image={ethImg}
              titleKey="page-what-is-ethereum:page-what-is-ethereum-get-eth-title"
              alt={t("page-what-is-ethereum-get-eth-alt")}
              descriptionKey="page-what-is-ethereum:page-what-is-ethereum-get-eth-description"
            >
              <div>
                <ButtonLink href="/get-eth/">
                  {t("page-what-is-ethereum-get-eth")}
                </ButtonLink>
              </div>
            </Callout>
            <Callout
              image={dogeComputerImg}
              titleKey="page-what-is-ethereum:page-what-is-ethereum-explore-dapps-title"
              alt={t("page-what-is-ethereum-explore-dapps-alt")}
              descriptionKey="page-what-is-ethereum:page-what-is-ethereum-explore-dapps-description"
              className="h-full"
            >
              <div>
                <ButtonLink href="/dapps/">
                  {t("page-what-is-ethereum-explore-dapps")}
                </ButtonLink>
              </div>
            </Callout>
          </CardContainer>
        </Section>

        <Section>
          <StandaloneQuizWidget quizKey="what-is-ethereum" />
        </Section>

        <Section>
          <FeedbackCard />
        </Section>
      </MainArticle>
    </VStack>
  )
}

export default WhatIsEthereumPage
