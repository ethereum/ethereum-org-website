import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { MdHelpOutline } from "react-icons/md"

import { Lang } from "@/lib/types"

import ABTestWrapper from "@/components/AB/TestWrapper"
import CalloutBannerSSR from "@/components/CalloutBannerSSR"
import DataProductCard from "@/components/DataProductCard"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import ProductList from "@/components/ProductList"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import StablecoinAccordion from "@/components/StablecoinAccordion"
// import StablecoinsTable from "@/components/StablecoinsTable"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { stablecoins } from "./data"

import { fetchEthereumStablecoinsData } from "@/lib/api/stablecoinsData"
import sparkfiImg from "@/public/images/dapps/sparkfi.png"
import summerfiImg from "@/public/images/dapps/summerfi.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
import aaveImg from "@/public/images/stablecoins/aave.png"
import compoundImg from "@/public/images/stablecoins/compound.png"
import ghoLargeImg from "@/public/images/stablecoins/gho-large.png"
import gloLargeImg from "@/public/images/stablecoins/glo-large.png"
import heroImg from "@/public/images/stablecoins/hero.png"
import duneImg from "@/public/images/stablecoins/tools/dune.png"
import stablePulseImg from "@/public/images/stablecoins/tools/stable-pulse.png"
import stablecoinsWtfImg from "@/public/images/stablecoins/tools/stablecoinswtf.png"
import stablesInfoImg from "@/public/images/stablecoins/tools/stables-info.png"
import stablesWarsImg from "@/public/images/stablecoins/tools/stables-wars.png"
import visaImg from "@/public/images/stablecoins/tools/visa.png"
import usdcLargeImg from "@/public/images/stablecoins/usdc-large.png"
import usdsLargeImg from "@/public/images/stablecoins/usds-large.png"

type CoinGeckoCoinMarketResponse = Array<{
  id: string
  name: string
  market_cap: number
  image: string
  symbol: string
}>

export type CoinDetails = {
  name: string
  marketCap: string
  image: string
  type: string
  url: string
  peg: string
  symbol: string
}

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1
const MIN_MARKET_CAP_USD = 500_000

const Section = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <section className={cn("w-full px-8 py-4", className)} {...props} />
)

const loadData = dataLoader<[CoinGeckoCoinMarketResponse]>(
  [["ethereumStablecoinsData", fetchEthereumStablecoinsData]],
  REVALIDATE_TIME * 1000
)

async function Page({ params }: { params: Promise<{ locale: Lang }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "page-stablecoins" })

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/stablecoins")
  const messages = pick(allMessages, requiredNamespaces)

  // let marketsHasError = false // TODO: Implement error handling
  const coinDetails: CoinDetails[] = []

  try {
    // marketsHasError = false

    const [stablecoinsData] = await loadData()

    const ethereumStablecoinData = stablecoins
      .map(({ id, ...rest }) => {
        const coinMarketData = stablecoinsData.find((coin) => coin.id === id)
        if (!coinMarketData)
          throw new Error("CoinGecko stablecoin data not found:" + id)
        return { ...coinMarketData, ...rest }
      })
      .filter((coin) => coin.market_cap >= MIN_MARKET_CAP_USD)
      .sort((a, b) => b.market_cap - a.market_cap)
      .map(({ market_cap, ...rest }) => ({
        ...rest,
        marketCap: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(market_cap),
      }))
    coinDetails.push(...ethereumStablecoinData)
  } catch (error) {
    console.error(error)
    // marketsHasError = true // TODO: Handle error state
  }

  const heroContent = {
    title: t("page-stablecoins-title"),
    header: t("page-stablecoins-hero-header"),
    subtitle: t("page-stablecoins-hero-subtitle"),
    image: heroImg,
    alt: t("page-stablecoins-hero-alt"),
    buttons: [
      {
        content: t("page-stablecoins-hero-button"),
        toId: "explore",
        matomo: {
          eventCategory: "stablecoins hero buttons",
          eventAction: "click",
          eventName: "get stablecoins",
        },
      },
      {
        content: t("page-stablecoins-how-they-work-button"),
        toId: "how",
        variant: "outline" as const,
        matomo: {
          eventCategory: "stablecoins hero buttons",
          eventAction: "click",
          eventName: "how they work",
        },
      },
    ],
  }

  const tokens = [
    {
      emoji: ":globe_showing_americas:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-1" />
      ),
    },
    {
      emoji: ":chart_with_upwards_trend:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-2" />
      ),
    },
    {
      emoji: ":handshake:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-3" />
      ),
    },
    {
      emoji: ":key:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-4" />
      ),
    },
  ]

  const getMarketCapByName = (name: string) =>
    coinDetails.find((m) => m.symbol.toUpperCase() === name.toUpperCase())
      ?.marketCap

  const editorsChoices = [
    {
      title: "USDS",
      body: t("page-stablecoins-usds-banner-body"),
      image: usdsLargeImg,
      alt: t("page-stablecoins-usds-logo"),
      swapUrl: "https://swap.cow.fi/#/1/swap/ETH/USDS",
      swapButtonText: t("page-stablecoins-usds-banner-swap-button"),
      learnUrl: "https://sky.money/",
      learnButtonText: t("page-stablecoins-usds-banner-learn-button"),
      shadowColor: "amber",
      marketCap: getMarketCapByName("usds"),
    },
    {
      title: "USDC",
      body: t("page-stablecoins-usdc-banner-body"),
      image: usdcLargeImg,
      alt: t("page-stablecoins-usdc-logo"),
      swapUrl: "https://www.usdc.com/providers",
      swapButtonText: t("page-stablecoins-usdc-banner-swap-button"),
      learnUrl: "https://www.circle.com/en/usdc",
      learnButtonText: t("page-stablecoins-usdc-banner-learn-button"),
      shadowColor: "blue",
      marketCap: getMarketCapByName("usdc"),
    },
    {
      title: "GHO",
      body: t("page-stablecoins-gho-banner-body"),
      image: ghoLargeImg,
      alt: t("page-stablecoins-gho-logo"),
      swapUrl:
        "https://matcha.xyz/tokens/ethereum/eth?buyChain=1&buyAddress=0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f&sellChain=1&sellAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      swapButtonText: t("page-stablecoins-gho-banner-swap-button"),
      learnUrl: "https://aave.com/docs/primitives/gho",
      learnButtonText: t("page-stablecoins-gho-banner-learn-button"),
      shadowColor: "green",
      marketCap: getMarketCapByName("gho"),
    },
    {
      title: "Glo Dollar",
      body: t("page-stablecoins-glo-banner-body"),
      image: gloLargeImg,
      alt: t("page-stablecoins-glo-logo"),
      swapUrl: "https://app.glodollar.org/",
      swapButtonText: t("page-stablecoins-glo-banner-swap-button"),
      learnUrl: "https://www.glodollar.org/",
      learnButtonText: t("page-stablecoins-glo-banner-learn-button"),
      shadowColor: "cyan",
      marketCap: getMarketCapByName("usdglo"),
    },
  ]

  const tooltipContent = (
    <div>
      {t("common:data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/api">
        coingecko.com
      </InlineLink>
    </div>
  )

  const dapps = [
    {
      url: "https://aave.com",
      alt: t("aave-logo"),
      image: aaveImg,
      width: 64 * 3,
      name: "Aave",
      description: t("page-stablecoins-stablecoins-dapp-description-1"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-tr from-[#5cb8c4] to-[#aa589b]",
    },
    {
      url: "https://compound.finance",
      alt: t("compound-logo"),
      image: compoundImg,
      width: 64 * 2,
      name: "Compound",
      description: t("page-stablecoins-stablecoins-dapp-description-2"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-tr dark:from-white/5 ",
    },
    {
      url: "https://summer.fi/",
      alt: t("summerfi-logo"),
      image: summerfiImg,
      width: (64 * 3) / 2,
      name: "Summer.fi",
      description: t("page-stablecoins-stablecoins-dapp-description-4"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-br from-[#c7efe6] to-[#eeeac7]",
    },
    {
      url: "https://spark.fi/",
      alt: t("sparkfi-logo"),
      image: sparkfiImg,
      width: 64 * 2,
      name: "Spark Protocol",
      description: t("page-stablecoins-stablecoins-dapp-description-5"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-tr dark:from-white/5",
    },
  ]

  const features = [
    {
      title: t("page-stablecoins-fiat-backed"),
      description: t("page-stablecoins-fiat-backed-description"),
      emoji: ":dollar:",
      pros: [
        t("page-stablecoins-fiat-backed-pro-1"),
        t("page-stablecoins-fiat-backed-pro-2"),
      ],
      cons: [
        t("page-stablecoins-fiat-backed-con-1"),
        t("page-stablecoins-fiat-backed-con-2"),
      ],
      links: [
        { text: "USDC", url: "https://www.circle.com/en/usdc" },
        { text: "USDT", url: "https://tether.to/" },
      ],
    },
    {
      title: t("page-stablecoins-crypto-backed"),
      description: t("page-stablecoins-crypto-backed-description"),
      emoji: ":unicorn:",
      pros: [
        t("page-stablecoins-crypto-backed-pro-1"),
        t("page-stablecoins-crypto-backed-pro-2"),
        t("page-stablecoins-crypto-backed-pro-3"),
      ],
      cons: [
        t("page-stablecoins-crypto-backed-con-1"),
        t("page-stablecoins-crypto-backed-con-2"),
      ],
      links: [
        { text: "USDS", url: "https://sky.money/" },
        { text: "Ethena USDe", url: "https://ethena.fi/" },
      ],
    },
    {
      title: t("page-stablecoins-precious-metals"),
      description: (
        <Translation id="page-stablecoins:page-stablecoins-precious-metals-description" />
      ),
      emoji: ":gem_stone:",
      pros: [t("page-stablecoins-precious-metals-pro-1")],
      cons: [
        t("page-stablecoins-precious-metals-con-1"),
        t("page-stablecoins-precious-metals-con-2"),
      ],
      links: [
        { text: "Pax Gold", url: "https://paxos.com/paxgold/" },
        { text: "Tether Gold", url: "https://gold.tether.to/" },
      ],
    },
    {
      title: t("page-stablecoins-algorithmic"),
      description: t("page-stablecoins-algorithmic-description"),
      emoji: ":chart_with_downwards_trend:",
      pros: [
        t("page-stablecoins-algorithmic-pro-1"),
        t("page-stablecoins-algorithmic-pro-2"),
      ],
      cons: [
        t("page-stablecoins-algorithmic-con-1"),
        t("page-stablecoins-algorithmic-con-2"),
      ],
      links: [{ text: "USDX", url: "https://usdx.money/" }],
    },
  ]

  const toolsData = [
    {
      title: "Stablecoins.wtf",
      description: t("page-stablecoins-tools-stablecoinswtf-description"),
      link: "https://stablecoins.wtf",
      image: stablecoinsWtfImg,
      alt: "Stablecoins.wtf",
    },
    {
      title: "Stablepulse",
      description: t("page-stablecoins-tools-stablepulse-description"),
      link: "https://www.stablepulse.org/",
      image: stablePulseImg,
      alt: "Stablepulse logo",
      className: "[&_img]:p-1",
    },
    {
      title: "Stables.info",
      description: t("page-stablecoins-tools-stablesinfo-description"),
      link: "https://stables.info/",
      image: stablesInfoImg,
      alt: "Stables.info logo",
    },
    {
      title: "Dune Stablecoin Metrics",
      description: t("page-stablecoins-tools-dune-description"),
      link: "https://dune.com/overview/stablecoin",
      image: duneImg,
      alt: "Dune Stablecoin Metrics logo",
      className: "dark:[&_img]:invert [&_img]:p-2",
    },
    {
      title: "Visa Onchain Analytics",
      description: t("page-stablecoins-tools-visa-description"),
      link: "https://visaonchainanalytics.com/",
      image: visaImg,
      alt: "Visa Onchain Analytics logo",
    },
    {
      title: "Stablewars",
      description: t("page-stablecoins-tools-stablewars-description"),
      link: "https://stablewars.xyz/",
      image: stablesWarsImg,
      alt: "Stablewars logo",
      className: "[&_img]:p-1",
    },
  ]

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="mx-auto my-0 w-full flex-col items-center">
        <PageHero isReverse content={heroContent} />
        <Divider />
        <Section>
          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <div className="me-auto ms-auto w-full lg:me-2 lg:ms-0">
              <h2 className="mb-8">{t("page-stablecoins-why-stablecoins")}</h2>
              <p className="mb-6">
                {t("page-stablecoins-prices-definition")}{" "}
                <InlineLink href="#how">
                  {t("page-stablecoins-prices-definition-how")}
                </InlineLink>
              </p>
            </div>
          </Flex>
          <Flex className="mb-8 me-0 w-full flex-col items-start lg:me-8 lg:flex-row">
            <Flex className="mx-auto w-full flex-col gap-2 lg:mx-8 lg:my-0">
              {tokens.map((token, index) => (
                <div key={index} className="my-2 min-w-full">
                  <HorizontalCard
                    emoji={token.emoji}
                    description={token.description}
                  />
                </div>
              ))}
            </Flex>
            <GhostCard className="me-0 mt-16 max-w-[640px] lg:me-8 lg:mt-2">
              <Emoji text=":pizza:" className="text-5xl" />
              <h3 className="mb-8 mt-12">
                {t("page-stablecoins-bitcoin-pizza")}
              </h3>
              <p className="mb-6">
                {t("page-stablecoins-bitcoin-pizza-body")}{" "}
              </p>
            </GhostCard>
          </Flex>
        </Section>

        <div
          className={cn(
            "my-8 w-full py-16 shadow-inner",
            "bg-gradient-to-r from-accent-a/10 to-accent-c/10",
            "dark:bg-gradient-to-tr dark:from-primary/20 dark:from-20% dark:via-accent-a/20 dark:via-60% dark:to-accent-c/20 dark:to-95%"
          )}
        >
          <div className="-mb-8 w-full px-8 py-4">
            <h2 className="mb-8">{t("page-stablecoins-find-stablecoin")}</h2>
            <Flex className="me-auto ms-auto w-full flex-col justify-center lg:me-2 lg:ms-0 lg:w-1/2">
              <p className="mb-6">
                {t("page-stablecoins-find-stablecoin-intro")}
              </p>
              <ul>
                <li>
                  <InlineLink href="#how">
                    {t("page-stablecoins-find-stablecoin-types-link")}
                  </InlineLink>
                </li>
                <li>
                  <InlineLink href="#explore">
                    {t("page-stablecoins-find-stablecoin-how-to-get-them")}
                  </InlineLink>
                </li>
              </ul>
            </Flex>

            <h3 className="mb-4 mt-0">
              {t("page-stablecoins-editors-choice")}
            </h3>
            <p className="mb-6">{t("page-stablecoins-editors-choice-intro")}</p>

            <div className="mb-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
              {editorsChoices.map((choice, idx) => (
                <Flex
                  className="w-full flex-col-reverse justify-between gap-x-8 rounded-sm border border-border-high-contrast bg-background p-8 text-body sm:flex-row"
                  key={idx}
                  style={{
                    boxShadow: `0.75rem 0.75rem 0 hsla(var(--${choice.shadowColor}-500), 0.25)`,
                  }}
                >
                  <Flex className="flex-col">
                    <div>
                      <h4 className="mb-2 text-3xl">{choice.title}</h4>
                      <p className="mb-6 text-body-medium">{choice.body}</p>
                    </div>
                    <div className="mt-auto">
                      <Flex className="flex-col">
                        <div>
                          <ButtonLink
                            className="mb-4 me-4"
                            href={choice.swapUrl}
                          >
                            {choice.swapButtonText}
                          </ButtonLink>
                        </div>
                        <div>
                          <ButtonLink
                            variant="outline"
                            href={choice.learnUrl}
                            isSecondary
                          >
                            {choice.learnButtonText}
                          </ButtonLink>
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                  <Flex className="items-center justify-between gap-x-8 gap-y-4 max-sm:mb-8 max-sm:max-h-16 sm:flex-col sm:justify-center">
                    <div className="relative isolate my-8 max-w-24 self-center bg-cover bg-repeat max-sm:w-16 sm:min-w-40 sm:max-w-40 md:my-0">
                      <Image
                        src={choice.image}
                        alt=""
                        data-label="blur-decorator"
                        aria-disabled
                        className="absolute inset-0 z-[-1] blur-[12px]"
                      />
                      <Image src={choice.image} alt={choice.alt} />
                    </div>
                    <div>
                      <div className="text-center">
                        {choice.marketCap ? (
                          <span className="text-lg font-semibold">
                            {choice.marketCap}
                          </span>
                        ) : (
                          <span className="text-lg text-body-medium">-</span>
                        )}
                      </div>
                      <div className="text-center text-sm text-body-medium">
                        {t(
                          "page-stablecoins-stablecoins-table-header-column-2"
                        )}
                      </div>
                    </div>
                  </Flex>
                </Flex>
              ))}
            </div>

            <h3 id="stablecoin-markets" className="mb-8 mt-12">
              {t("page-stablecoins-top-coins")}
              <Tooltip content={tooltipContent}>
                <MdHelpOutline className="ms-2 fill-body" size={16} />
              </Tooltip>
            </h3>

            <p className="mb-6">
              {t("page-stablecoins-top-coins-intro")}{" "}
              {t("page-stablecoins-top-coins-intro-code")}
            </p>
          </div>

          {/* CLIENT SIDE */}
          {/* <StablecoinsTable content={coinDetails} hasError={marketsHasError} /> */}
        </div>

        <Section id="explore">
          <h2 className="mb-8">{t("page-stablecoins-get-stablecoins")}</h2>
          <Flex className="w-full items-center pb-4 pe-0 ps-0 lg:pe-8 lg:ps-8">
            {/* CLIENT SIDE */}
            <StablecoinAccordion />
          </Flex>
        </Section>
        <Divider />
        <Section>
          <CalloutBannerSSR
            className="mx-0 mb-16 mt-8"
            title={t("page-stablecoins-stablecoins-dapp-callout-title")}
            description={t(
              "page-stablecoins-stablecoins-dapp-callout-description"
            )}
            image={dogeComputerImg}
            imageWidth={600}
            alt={t("page-stablecoins-stablecoins-dapp-callout-image-alt")}
          >
            <ABTestWrapper
              testKey="AppTest"
              variants={[
                <div key="original" className="flex flex-wrap gap-4">
                  <ButtonLink href="/dapps/">
                    {t("page-stablecoins-explore-dapps")}
                  </ButtonLink>
                  <ButtonLink
                    variant="outline"
                    href="/defi/"
                    className="whitespace-normal"
                    isSecondary
                  >
                    {t("page-stablecoins-more-defi-button")}
                  </ButtonLink>
                </div>,
                <div key="Variation1" className="flex flex-wrap gap-4">
                  <ButtonLink href="/dapps/">
                    {t("page-stablecoins-explore-apps")}
                  </ButtonLink>
                </div>,
              ]}
            />
          </CalloutBannerSSR>
          <h2>{t("page-stablecoins-save-stablecoins")}</h2>
          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <div className="me-auto ms-auto w-full lg:me-2 lg:ms-0">
              <p className="mb-6">
                {t("page-stablecoins-save-stablecoins-body")}
              </p>
              <h3 className="mb-8 mt-12">
                {t("page-stablecoins-interest-earning-dapps")}
              </h3>
              <p className="mb-6">{t("page-stablecoins-saving")}</p>
            </div>
          </Flex>
          <div className="mb-16 grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-8">
            {dapps.map((dapp, idx) => (
              <DataProductCard
                key={idx}
                url={dapp.url}
                alt={dapp.alt}
                image={dapp.image!}
                imgWidth={dapp.width!}
                name={dapp.name}
                description={dapp.description}
                className={dapp.className}
              />
            ))}
          </div>
        </Section>
        <Divider />
        <Section id="how">
          <h2 className="mb-8">{t("page-stablecoins-types-of-stablecoin")}</h2>
          <Tabs defaultValue={features[0].title} className="mt-8">
            <TabsList className="mb-4 flex h-fit flex-wrap items-end">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.title}
                  value={feature.title}
                  className="h-fit"
                >
                  <Emoji
                    text={feature.emoji}
                    className="me-2 hidden shrink-0 data-[state=active]:inline-block"
                  />
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {features.map((feature) => (
              <TabsContent key={feature.title} value={feature.title}>
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="mb-4 flex-shrink-0 text-7xl md:mb-0 md:me-8 md:text-8xl">
                    <Emoji text={feature.emoji} />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-3xl font-bold">{feature.title}</h3>
                    <div className="mb-6 text-lg">{feature.description}</div>
                    <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                      {feature.pros && (
                        <div>
                          <h4 className="mb-2 rounded bg-success/25 p-2 text-xl font-semibold">
                            {t("pros")}
                          </h4>
                          <ul className="list-inside list-disc">
                            {feature.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {feature.cons && (
                        <div>
                          <h4 className="mb-2 rounded bg-error/25 p-2 text-xl font-semibold">
                            {t("cons")}
                          </h4>
                          <ul className="list-inside list-disc">
                            {feature.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {feature.links && feature.links.length > 0 && (
                      <div>
                        <h4 className="mb-2 text-xl font-semibold">
                          {t("example-projects")}
                        </h4>
                        <ul className="list-inside list-disc">
                          {feature.links.map((link, idx) => (
                            <li key={idx}>
                              <InlineLink
                                href={link.url}
                                className="text-primary hover:underline"
                              >
                                {link.text}
                              </InlineLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>
        <div id="tools" className="w-full px-8 py-12">
          <h2 className="mb-8">{t("page-stablecoins-tools-title")}</h2>

          <div
            className={cn(
              "[&_[aria-labelledby='category-name']]:grid [&_[aria-labelledby='category-name']]:grid-cols-1 [&_[aria-labelledby='category-name']]:gap-x-16 md:[&_[aria-labelledby='category-name']]:grid-cols-2",
              toolsData.length % 2 === 0 &&
                "md:[&_[aria-labelledby='category-name']>:not(:nth-last-child(-n+2))]:border-b md:[&_[aria-labelledby='category-name']>:nth-last-child(-n+2)]:border-b-0",
              "[&_img]:shadow-none"
            )}
          >
            <ProductList
              actionLabel={t("page-dapps-ready-button")}
              category={t("page-stablecoins-category-dashboard-and-education")}
              content={toolsData}
            />
          </div>
        </div>
        <Section>
          <StandaloneQuizWidget quizKey="stablecoins" />
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

  const t = await getTranslations({ locale, namespace: "page-stablecoins" })

  return await getMetadata({
    locale,
    slug: ["stablecoins"],
    title: t("page-stablecoins-meta-title"),
    description: t("page-stablecoins-meta-description"),
    image: "/images/stablecoins/hero.png",
  })
}

export default Page
