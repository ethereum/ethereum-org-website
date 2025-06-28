import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { MdInfoOutline } from "react-icons/md"

import type { ChildOnlyProp, CommitHistory, Lang } from "@/lib/types"

import AdoptionChart from "@/components/AdoptionChart/lazy"
import {
  Banner,
  BannerBody,
  BannerGrid,
  BannerGridCell,
  BannerImage,
} from "@/components/BannerGrid"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart/lazy"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import I18nProvider from "@/components/I18nProvider"
import { Image, ImageProps } from "@/components/Image"
import ListenToPlayer from "@/components/ListenToPlayer/lazy"
import MainArticle from "@/components/MainArticle"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import StatErrorMessage from "@/components/StatErrorMessage"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Center, Flex, HStack, Stack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import {
  getLocaleForNumberFormat,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"

import WhatTabs from "./_components/WhatTabs/lazy"
import WhySwiper from "./_components/WhySwiper/lazy"

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

const Summary = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded p-4",
      "border-accent-c/10 bg-gradient-to-t from-accent-c/10 from-20% to-accent-c/5 to-60% dark:from-accent-c/20 dark:to-accent-c/10",
      className
    )}
    {...rest}
  />
)

const TwoColumnContent = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Flex
    className={cn(
      "w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-0",
      className
    )}
    {...rest}
  />
)

const Section = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <section className={cn("w-full px-8 py-12", className)} {...rest} />
)

const Width60 = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("w-full flex-[3]", className)}>{children}</div>
)

const Width40 = (props: ChildOnlyProp) => (
  <Center className="w-full flex-[2] gap-0" {...props} />
)

const H2 = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <h2
    className={cn("mb-6 text-2xl leading-xs md:text-3xl", className)}
    {...rest}
  />
)

const CardContainer = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
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

const ButtonRow = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => (
  <HStack className={cn("flex-wrap gap-4", className)} {...rest} />
)

const NoWrapText = (props: ChildOnlyProp) => (
  <span className="whitespace-nowrap" {...props} />
)

const Image400 = ({ src }: Pick<ImageProps, "src">) => (
  <Image src={src} alt="" width={400} />
)

const loadData = dataLoader([["growThePieData", fetchGrowThePie]])

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params
  const localeForNumberFormat = getLocaleForNumberFormat(locale as Lang)

  const t = await getTranslations({
    locale,
    namespace: "page-what-is-ethereum",
  })
  const tCommon = await getTranslations({
    locale,
    namespace: "common",
  })
  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/what-is-ethereum")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "what-is-ethereum",
      locale as Lang,
      commitHistoryCache
    )

  // Load data
  const [loadedData] = await loadData()
  const data = loadedData.txCount

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

  const tooltipContent = ({ apiUrl, apiProvider, ariaLabel }) => (
    <div>
      {tCommon("data-provided-by")}{" "}
      <InlineLink href={apiUrl} aria-label={ariaLabel}>
        {apiProvider}
      </InlineLink>
    </div>
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="mx-0 my-auto flex w-full flex-col items-center gap-0">
        <Flex className="w-full flex-col-reverse items-center justify-between px-8 py-4 md:flex-row">
          <Stack className="mb-6 gap-4" asChild>
            <header>
              <h1 className="text-sm font-medium uppercase leading-xs tracking-wider">
                {t("page-what-is-ethereum-title")}
              </h1>
              <Stack className="gap-6">
                <p className="text-[2rem] leading-xs">
                  {t("page-what-is-ethereum-desc")}
                </p>
                <p className="text-xl leading-xs">
                  {t("page-what-is-ethereum-subtitle")}
                </p>
                <ButtonRow>
                  <Button toId="summary">
                    {t("page-what-is-ethereum-button-lets-start")}
                  </Button>
                </ButtonRow>
              </Stack>
            </header>
          </Stack>
          <div className="max-w-[800px] flex-[1_1_100%] bg-cover bg-no-repeat">
            <Image
              src={hero}
              alt={t("page-what-is-ethereum-alt-img-bazaar")}
              // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
              sizes="(max-width: 992px) 100vw, 750px"
              priority
            />
          </div>
        </Flex>

        <div className="w-full bg-background-highlight">
          <Section>
            <div className="mb-8">
              <ListenToPlayer slug={"what-is-ethereum"} />
            </div>
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
                    <WhatTabs />
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
                    <WhySwiper />
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
          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <FeedbackCard />
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-what-is-ethereum",
  })

  return await getMetadata({
    locale,
    slug: ["what-is-ethereum"],
    title: t("page-what-is-ethereum-meta-title"),
    description: t("page-what-is-ethereum-meta-description"),
    image: "/images/what-is-ethereum.png",
  })
}

export default Page
