import { pick } from "lodash"
import {
  ArrowLeftRight,
  Globe,
  Info,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import FeedbackCard from "@/components/FeedbackCard"
import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import { CheckCircle } from "@/components/icons/CheckCircle"
import { XCircle } from "@/components/icons/XCircle"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import ProductList from "@/components/ProductList"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import StablecoinsTable from "@/components/StablecoinsTable"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import PathwayCard from "@/components/ui/cards/pathway-card"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import InlineLink, { LinkWithArrow } from "@/components/ui/Link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { stablecoins } from "./data"
import StablecoinsPageJsonLD from "./page-jsonld"

import { getStablecoinsData } from "@/lib/data"
import sparkfiImg from "@/public/images/dapps/sparkfi.png"
import summerfiImg from "@/public/images/dapps/summerfi.png"
import swapCardImg from "@/public/images/developers-eth-blocks.png"
import exchangeCardImg from "@/public/images/homepage/features/global.png"
import buyCardImg from "@/public/images/impact_transparent.png"
import aaveImg from "@/public/images/stablecoins/aave.png"
import bitcoinPizzaImg from "@/public/images/stablecoins/bitcoin-pizza.png"
import compoundImg from "@/public/images/stablecoins/compound.png"
import gettingStartedImg from "@/public/images/stablecoins/getting-started.png"
import ghoLargeImg from "@/public/images/stablecoins/gho-large.png"
import gloLargeImg from "@/public/images/stablecoins/glo-large.png"
import heroImg from "@/public/images/stablecoins/hero-coins.png"
import interestImg from "@/public/images/stablecoins/interest.png"
import duneImg from "@/public/images/stablecoins/tools/dune.png"
import stablePulseImg from "@/public/images/stablecoins/tools/stable-pulse.png"
import stablecoinsWtfImg from "@/public/images/stablecoins/tools/stablecoinswtf.png"
import stablesInfoImg from "@/public/images/stablecoins/tools/stables-info.png"
import stablesWarsImg from "@/public/images/stablecoins/tools/stables-wars.png"
import visaImg from "@/public/images/stablecoins/tools/visa.png"
import usdcLargeImg from "@/public/images/stablecoins/usdc-large.png"
import usdsLargeImg from "@/public/images/stablecoins/usds-large.png"
import earnCardImg from "@/public/images/upgrades/core.png"
import borrowCardImg from "@/public/images/upgrades/upgrade_eth.png"
import walletCardImg from "@/public/images/wallets/wallet-hero.png"

export type CoinDetails = {
  name: string
  marketCap: string
  image: string
  type: string
  url: string
  peg: string
  symbol: string
}

const MIN_MARKET_CAP_USD = 500_000

// Vertical rhythm matches the Figma (112px / py-28 between section content on
// desktop), eased down on smaller viewports.
const Section = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <section
    className={cn(
      "mx-auto w-full max-w-screen-xl px-8 py-16 lg:py-28",
      className
    )}
    {...props}
  />
)

async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-stablecoins")
  const tCommon = await getTranslations("common")

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/stablecoins")
  const messages = pick(allMessages, requiredNamespaces)

  let marketsHasError = false
  const coinDetails: CoinDetails[] = []

  try {
    marketsHasError = false

    // Fetch stablecoins data using the data-layer function (already cached)
    const stablecoinsData = await getStablecoinsData()

    if (!stablecoinsData) {
      throw new Error("Failed to fetch stablecoins data")
    }

    const ethereumStablecoinData = stablecoins
      .map(({ id, ...rest }) => {
        const coinMarketData = stablecoinsData.find((coin) => coin.id === id)
        if (!coinMarketData) {
          return null
        }
        return { ...coinMarketData, ...rest }
      })
      .filter(
        (coin): coin is Exclude<typeof coin, null> =>
          coin !== null && coin.market_cap >= MIN_MARKET_CAP_USD
      )
      .sort((a, b) => b.market_cap - a.market_cap)
      .map(({ market_cap, ...rest }) => ({
        ...rest,
        marketCap: numberFormat(locale, {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(market_cap),
      }))
    coinDetails.push(...ethereumStablecoinData)
  } catch (error) {
    console.error(error)
    marketsHasError = true
  }

  const heroButtons: ContentHeroProps["buttons"] = [
    {
      content: t("page-stablecoins-hero-button"),
      toId: "get-stablecoins",
      matomo: {
        eventCategory: "stablecoins hero buttons",
        eventAction: "click",
        eventName: "get stablecoins",
      },
    },
    {
      content: t("page-stablecoins-how-they-work-button"),
      toId: "how",
      matomo: {
        eventCategory: "stablecoins hero buttons",
        eventAction: "click",
        eventName: "how they work",
      },
    },
  ]

  const features = [
    {
      title: t("page-stablecoins-feature-1-title"),
      icon: Globe,
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-1" />
      ),
    },
    {
      title: t("page-stablecoins-feature-2-title"),
      icon: TrendingUp,
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-2" />
      ),
    },
    {
      title: t("page-stablecoins-feature-3-title"),
      icon: ArrowLeftRight,
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-3" />
      ),
    },
    {
      title: t("page-stablecoins-feature-4-title"),
      icon: ShieldCheck,
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-4" />
      ),
    },
  ]

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
      bannerClass: "bg-amber-100 dark:bg-amber-950/40",
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
      bannerClass: "bg-blue-100 dark:bg-blue-950/40",
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
      bannerClass: "bg-green-100 dark:bg-green-950/40",
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
      bannerClass: "bg-cyan-100 dark:bg-cyan-950/40",
    },
  ]

  const tooltipContent = (
    <div>
      {tCommon("data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/api">
        coingecko.com
      </InlineLink>
    </div>
  )

  // How to get stablecoins — method cards linking to anchors / DeFi page
  const methods = [
    {
      title: t("page-stablecoins-method-swap-title"),
      description: t("page-stablecoins-method-swap-description"),
      href: "/defi/#swaps",
      image: swapCardImg,
      badge: {
        label: t("page-stablecoins-recommended"),
        status: "success" as const,
      },
    },
    {
      title: t("page-stablecoins-method-buy-title"),
      description: t("page-stablecoins-method-buy-description"),
      href: "#stablecoin-markets",
      image: buyCardImg,
    },
    {
      title: t("page-stablecoins-method-earn-title"),
      description: t("page-stablecoins-method-earn-description"),
      href: "#earn-interest",
      image: earnCardImg,
    },
    {
      title: t("page-stablecoins-method-borrow-title"),
      description: t("page-stablecoins-method-borrow-description"),
      href: "/defi/#lending",
      image: borrowCardImg,
      badge: {
        label: t("page-stablecoins-advanced"),
        status: "warning" as const,
      },
    },
  ]

  const interestApps = [
    {
      url: "https://aave.com",
      alt: t("aave-logo"),
      image: aaveImg,
      name: "Aave",
      description: t("page-stablecoins-stablecoins-dapp-description-1"),
      bannerClass: "bg-[#a78bfa]",
    },
    {
      url: "https://compound.finance",
      alt: t("compound-logo"),
      image: compoundImg,
      name: "Compound",
      description: t("page-stablecoins-stablecoins-dapp-description-2"),
      bannerClass: "bg-gray-900",
    },
    {
      url: "https://summer.fi/",
      alt: t("summerfi-logo"),
      image: summerfiImg,
      name: "Summer.fi",
      description: t("page-stablecoins-stablecoins-dapp-description-4"),
      bannerClass: "bg-gray-900",
    },
    {
      url: "https://spark.fi/",
      alt: t("sparkfi-logo"),
      image: sparkfiImg,
      name: "Spark Protocol",
      description: t("page-stablecoins-stablecoins-dapp-description-5"),
      bannerClass: "bg-gray-100 dark:bg-gray-800",
    },
  ]

  const types = [
    {
      title: t("page-stablecoins-fiat-backed"),
      description: t("page-stablecoins-fiat-backed-description"),
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

  const { contributors } = await getAppPageContributorInfo(
    "stablecoins",
    locale as Lang
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StablecoinsPageJsonLD locale={locale} contributors={contributors} />
      <MainArticle className="mx-auto my-0 w-full flex-col items-center">
        <ContentHero
          breadcrumbs={{ slug: "/stablecoins" }}
          title={t("page-stablecoins-hero-header")}
          description={t("page-stablecoins-hero-subtitle")}
          heroImg={heroImg}
          buttons={heroButtons}
        />

        {/* Why stablecoins */}
        <Section className="text-center">
          <h2 className="mb-4">{t("page-stablecoins-why-stablecoins")}</h2>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-body-medium">
            <Translation id="page-stablecoins:page-stablecoins-why-stablecoins-intro" />
          </p>
          <div className="mb-12 grid grid-cols-1 gap-4 text-start sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description, icon: Icon }) => (
              <Card key={title} variant="base" size="lg">
                <CardContent>
                  <Icon className="size-12 text-primary" />
                  <CardTitle variant="black">{title}</CardTitle>
                  <CardParagraph>{description}</CardParagraph>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card
            variant="nested"
            className="flex-row items-center gap-6 p-6 text-start"
            bordered
          >
            <div className="relative h-32 w-40 shrink-0 overflow-hidden rounded-xl max-sm:hidden">
              <Image
                src={bitcoinPizzaImg}
                alt={t("page-stablecoins-bitcoin-pizza-alt")}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div>
              <CardTitle variant="semibold" className="mb-2">
                {t("page-stablecoins-bitcoin-pizza")}
              </CardTitle>
              <CardParagraph className="text-sm">
                {t("page-stablecoins-bitcoin-pizza-body")}
              </CardParagraph>
            </div>
          </Card>
        </Section>

        {/* How they work: types of stablecoins */}
        <Section id="how" className="text-center">
          <h2 className="mb-4">{t("page-stablecoins-types-of-stablecoin")}</h2>
          <p className="mx-auto mb-10 max-w-3xl text-lg text-body-medium">
            {t("page-stablecoins-types-intro")}
          </p>
          <Tabs defaultValue={types[0].title}>
            <TabsList>
              {types.map((type) => (
                <TabsTrigger key={type.title} value={type.title}>
                  {type.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {types.map((type) => (
              <TabsContent
                key={type.title}
                value={type.title}
                className="mt-6 border-0 p-0"
              >
                <div className="grid grid-cols-1 gap-8 rounded-2xl bg-background-highlight p-6 text-start md:grid-cols-2 md:p-10">
                  <div>
                    <h3 className="mb-4 text-2xl">{type.title}</h3>
                    <div className="mb-6 text-body-medium">
                      {type.description}
                    </div>
                    {type.links.length > 0 && (
                      <div>
                        <p className="mb-2 font-bold">
                          {t("example-projects")}
                        </p>
                        <ul className="m-0 list-disc space-y-1 ps-5">
                          {type.links.map((link) => (
                            <li key={link.text}>
                              <InlineLink href={link.url}>
                                {link.text}
                              </InlineLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div>
                    {/* Shared header row — one continuous divider across both columns on desktop */}
                    <div className="mb-3 hidden border-b border-border pb-2 sm:grid sm:grid-cols-2 sm:gap-x-6">
                      <h4 className="text-success">{t("pros")}</h4>
                      <h4 className="text-error">{t("cons")}</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="mb-3 border-b border-border pb-2 text-success sm:hidden">
                          {t("pros")}
                        </h4>
                        <ul className="m-0 list-none space-y-3 ps-0">
                          {type.pros.map((pro, idx) => (
                            <li key={idx} className="flex gap-2">
                              <CheckCircle className="shrink-0" />
                              <span className="font-bold">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-3 border-b border-border pb-2 text-error sm:hidden">
                          {t("cons")}
                        </h4>
                        <ul className="m-0 list-none space-y-3 ps-0">
                          {type.cons.map((con, idx) => (
                            <li key={idx} className="flex gap-2">
                              <XCircle className="shrink-0" />
                              <span className="font-bold">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        {/* Getting started */}
        <Section>
          <div className="grid grid-cols-1 items-center gap-10 text-start lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-4">
                {t("page-stablecoins-getting-started-title")}
              </h2>
              <p className="mb-8 text-lg text-body-medium">
                {t("page-stablecoins-getting-started-intro")}
              </p>
              <div className="grid grid-cols-1 gap-6">
                <PathwayCard
                  href="/wallets/find-wallet/"
                  banner={
                    <Image
                      src={walletCardImg}
                      alt=""
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  }
                  title={t("page-stablecoins-download-wallet-title")}
                  description={t(
                    "page-stablecoins-download-wallet-description"
                  )}
                  badge={{
                    label: t("page-stablecoins-recommended"),
                    status: "success",
                  }}
                />
                <PathwayCard
                  href="/get-eth/"
                  banner={
                    <Image
                      src={exchangeCardImg}
                      alt=""
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  }
                  title={t("page-stablecoins-register-exchange-title")}
                  description={t(
                    "page-stablecoins-register-exchange-description"
                  )}
                />
              </div>
            </div>
            <div className="mx-auto w-full max-w-lg">
              <Image
                src={gettingStartedImg}
                alt={t("page-stablecoins-getting-started-alt")}
                sizes="(max-width: 1024px) 90vw, 600px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Section>

        {/* Choose a stablecoin: editor's choices + market cap table */}
        <div className="my-8 w-full rounded-t-4xl bg-radial-a">
          {/* Figma: ~80px top padding, content runs to the band bottom; override
              the default symmetric py so the explicit values win at every bp. */}
          <Section className="pt-16 pb-12 lg:pt-20 lg:pb-16">
            <div className="text-center">
              <h2 className="mb-4">{t("page-stablecoins-choose-title")}</h2>
              <p className="mx-auto mb-6 max-w-3xl text-lg text-body-medium">
                {t("page-stablecoins-choose-intro")}
              </p>
              <div className="mb-12 flex flex-wrap justify-center gap-x-8 gap-y-2">
                <LinkWithArrow href="#how">
                  {t("page-stablecoins-choose-link-types")}
                </LinkWithArrow>
                <LinkWithArrow href="#get-stablecoins">
                  {t("page-stablecoins-get-stablecoins")}
                </LinkWithArrow>
              </div>
            </div>

            <h3 className="mb-2 text-2xl">
              {t("page-stablecoins-editors-choice")}
            </h3>
            <p className="mb-6 text-body-medium">
              {t("page-stablecoins-editors-choice-intro")}
            </p>
            <EdgeScrollContainer className="[--edge-spacing:2rem]">
              {editorsChoices.map((choice) => (
                <EdgeScrollItem
                  key={choice.title}
                  className="ms-4 basis-[80%] sm:basis-1/2 lg:basis-[29%]"
                >
                  <Card variant="nested" bordered className="h-full">
                    <CardHeader>
                      <CardBanner
                        background="none"
                        fit="contain"
                        size="full"
                        zoom={false}
                        className={cn(
                          "flex h-40 items-center justify-center p-8",
                          choice.bannerClass
                        )}
                      >
                        <Image
                          src={choice.image}
                          alt={choice.alt}
                          sizes="160px"
                        />
                      </CardBanner>
                    </CardHeader>
                    <CardContent spacing="sm">
                      <CardTitle asChild>
                        <h4>{choice.title}</h4>
                      </CardTitle>
                      <CardParagraph className="text-sm">
                        {choice.body}
                      </CardParagraph>
                    </CardContent>
                    <CardFooter buttons="full" className="flex flex-col gap-2">
                      <ButtonLink href={choice.swapUrl}>
                        {choice.swapButtonText}
                      </ButtonLink>
                      <ButtonLink href={choice.learnUrl} variant="outline">
                        {choice.learnButtonText}
                      </ButtonLink>
                    </CardFooter>
                  </Card>
                </EdgeScrollItem>
              ))}
            </EdgeScrollContainer>

            <h3 id="stablecoin-markets" className="mt-16 scroll-mt-24 text-2xl">
              {t("page-stablecoins-top-coins")}&nbsp;
              <Tooltip content={tooltipContent}>
                <Info className="inline size-4" />
              </Tooltip>
            </h3>
            <p className="mt-4 mb-0 text-body-medium">
              {t("page-stablecoins-top-coins-intro")}{" "}
              {t("page-stablecoins-top-coins-intro-code")}
            </p>
            <StablecoinsTable
              content={coinDetails}
              hasError={marketsHasError}
            />
          </Section>
        </div>

        {/* How to get stablecoins */}
        <Section id="get-stablecoins" className="scroll-mt-24 text-center">
          <h2 className="mb-4">{t("page-stablecoins-get-stablecoins")}</h2>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-body-medium">
            {t("page-stablecoins-get-intro")}
          </p>
          <div className="grid grid-cols-1 gap-6 text-start md:grid-cols-2">
            {methods.map((method) => (
              <PathwayCard
                key={method.title}
                href={method.href}
                banner={
                  <Image
                    src={method.image}
                    alt=""
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                }
                title={method.title}
                description={method.description}
                badge={method.badge}
              />
            ))}
          </div>
        </Section>

        {/* Interest rate / apps to earn interest */}
        <div className="my-8 w-full rounded-4xl bg-background-highlight">
          <Section id="earn-interest" className="pt-16 pb-12 lg:pt-20 lg:pb-16">
            <div className="mb-12 flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="mb-4">
                  {t("page-stablecoins-interest-rate-title")}
                </h2>
                <p className="mb-0 text-lg text-body-medium">
                  <Translation id="page-stablecoins:page-stablecoins-interest-rate-body" />
                </p>
              </div>
              <Image
                src={interestImg}
                alt={t("page-stablecoins-interest-rate-alt")}
                sizes="(max-width: 1024px) 80vw, 409px"
                className="h-auto w-full max-w-sm shrink-0 lg:w-[409px] lg:max-w-none"
              />
            </div>
            <h3 className="mb-2 text-2xl">
              {t("page-stablecoins-apps-earn-interest-title")}
            </h3>
            <p className="mb-8 text-body-medium">
              {t("page-stablecoins-apps-earn-interest-intro")}
            </p>
            <EdgeScrollContainer className="[--edge-spacing:2rem]">
              {interestApps.map((app) => (
                <EdgeScrollItem
                  key={app.name}
                  className="ms-4 basis-[80%] sm:basis-1/2 lg:basis-[29%]"
                >
                  <Card variant="nested" className="h-full">
                    <CardHeader>
                      <CardBanner
                        background="none"
                        fit="contain"
                        size="full"
                        zoom={false}
                        className={cn(
                          "flex h-40 items-center justify-center p-10",
                          app.bannerClass
                        )}
                      >
                        <Image src={app.image} alt={app.alt} sizes="280px" />
                      </CardBanner>
                    </CardHeader>
                    <CardContent spacing="sm">
                      <CardTitle className="uppercase" asChild>
                        <h4>{app.name}</h4>
                      </CardTitle>
                      <CardParagraph className="text-sm">
                        {app.description}
                      </CardParagraph>
                    </CardContent>
                    <CardFooter buttons="full">
                      <ButtonLink href={app.url}>
                        {t("page-stablecoins-learn-more")}
                      </ButtonLink>
                    </CardFooter>
                  </Card>
                </EdgeScrollItem>
              ))}
            </EdgeScrollContainer>
          </Section>
        </div>

        {/* Learn more / tools */}
        <Section>
          <h2 className="mb-6">{t("page-stablecoins-tools-title")}</h2>
          <div className="[&_img]:shadow-none">
            <ProductList
              columns={2}
              category={t("page-stablecoins-category-dashboard-and-education")}
              actionLabel={t("page-apps-ready-button")}
              content={toolsData}
            />
          </div>
        </Section>

        <Section>
          <StandaloneQuizWidget quizKey="stablecoins" />
          <FeedbackCard />
        </Section>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-stablecoins")

  return await getMetadata({
    locale,
    slug: ["stablecoins"],
    title: t("page-stablecoins-meta-title"),
    description: t("page-stablecoins-meta-description"),
    image: "/images/mainnet.png",
  })
}

export default Page
