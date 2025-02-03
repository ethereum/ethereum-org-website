import { BaseHTMLAttributes } from "react"
import { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MdHelpOutline } from "react-icons/md"

import { BasePageProps, Lang } from "@/lib/types"

import CalloutBanner from "@/components/CalloutBanner"
import DataProductCard from "@/components/DataProductCard"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import { TwImage } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import ProductList from "@/components/ProductList"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import StablecoinAccordion from "@/components/StablecoinAccordion"
import StablecoinBoxGrid from "@/components/StablecoinBoxGrid"
import StablecoinsTable from "@/components/StablecoinsTable"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, FlexProps } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import {
  fetchEthereumEcosystemData,
  fetchEthereumStablecoinsData,
} from "@/lib/api/stablecoinsData"
import summerfiImg from "@/public/images/dapps/summerfi.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
// -- daps
import aaveImg from "@/public/images/stablecoins/aave.png"
import compoundImg from "@/public/images/stablecoins/compound.png"
// Static assets
import daiLargeImg from "@/public/images/stablecoins/dai-large.png"
import heroImg from "@/public/images/stablecoins/hero.png"
import stablecoinsWtfImg from "@/public/images/stablecoins/tools/stablecoinswtf.png"
import usdcLargeImg from "@/public/images/stablecoins/usdc-large.png"

type EthereumDataResponse = Array<{
  id: string
  name: string
  market_cap: number
  image: string
  symbol: string
}>

type StablecoinDataResponse = Array<{
  id: string
  name: string
  market_cap: number
  image: string
  symbol: string
}>

interface Market {
  name: string
  marketCap: string
  image: string
  type: string
  url: string
}

type Props = BasePageProps & {
  markets: Market[]
  marketsHasError: boolean
}

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader<[EthereumDataResponse, StablecoinDataResponse]>(
  [
    ["ethereumEcosystemData", fetchEthereumEcosystemData],
    ["ethereumStablecoinsData", fetchEthereumStablecoinsData],
  ],
  REVALIDATE_TIME * 1000
)

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/stablecoins")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  let marketsHasError = false
  let markets: Market[] = []

  // Stablecoin types
  const FIAT = "FIAT"
  const CRYPTO = "CRYPTO"
  const ASSET = "ASSET"
  const ALGORITHMIC = "ALGORITHMIC"

  const stablecoins = {
    USDT: { type: FIAT, url: "https://tether.to/" },
    USDC: { type: FIAT, url: "https://www.coinbase.com/usdc" },
    DAI: { type: CRYPTO, url: "https://makerdao.com/en/" },
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
    FRAX: { type: ALGORITHMIC, url: "https://frax.finance/" },
    MIM: { type: ALGORITHMIC, url: "https://abracadabra.money/" },
    USDP: { type: FIAT, url: "https://paxos.com/usdp/" },
    FEI: { type: ALGORITHMIC, url: "https://fei.money/" },
  }

  try {
    const [ethereumEcosystemData, stablecoinsData] = await loadData()

    // Get the intersection of stablecoins and Ethereum tokens to only have a list of data for stablecoins in the Ethereum ecosystem
    const ethereumStablecoinData = stablecoinsData.filter(
      (stablecoin) =>
        ethereumEcosystemData.findIndex(
          // eslint-disable-next-line
          (etherToken) => stablecoin.id == etherToken.id
        ) > -1
    )

    marketsHasError = false
    markets = ethereumStablecoinData
      .filter((token) => {
        return stablecoins[token.symbol.toUpperCase()]
      })
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
  } catch (error) {
    console.error(error)
    markets = []
    marketsHasError = true
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      markets,
      marketsHasError,
    },
  }
}) satisfies GetStaticProps<Props>

const Content = (props: BaseHTMLAttributes<HTMLDivElement>) => (
  <div className="w-full px-8 py-4" {...props} />
)

const EditorsChoice = ({ className, ...props }: FlexProps) => (
  <Flex
    className={cn(
      "mb-8 w-full flex-col-reverse justify-between rounded-sm border border-border-high-contrast bg-background p-8 text-body lg:flex-row",
      className
    )}
    {...props}
  />
)

const Page = (props: FlexProps) => (
  <Flex className="mx-auto my-0 w-full flex-col items-center" {...props} />
)

const H2 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("mb-8 mt-12", className)} {...props} />
)

const H3 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("mb-8 mt-10", className)} {...props} />
)

const StablecoinsPage = ({ markets, marketsHasError }) => {
  const { t } = useTranslation("page-stablecoins")

  const tooltipContent = (
    <div>
      {t("common:data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/api">
        coingecko.com
      </InlineLink>
    </div>
  )

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
        { text: "USDC", url: "https://www.coinbase.com/usdc" },
        { text: "TrueUSD", url: "https://www.trusttoken.com/trueusd" },
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
        { text: "DAI", url: "https://makerdao.com/en/" },
        { text: "RAI", url: "https://reflexer.finance/" },
      ],
    },
    {
      title: t("page-stablecoins-precious-metals"),
      description: t("page-stablecoins-precious-metals-description"),
      emoji: ":gem_stone:",
      pros: [t("page-stablecoins-precious-metals-pro-1")],
      cons: [
        t("page-stablecoins-precious-metals-con-1"),
        t("page-stablecoins-precious-metals-con-2"),
      ],
      links: [{ text: "Pax Gold", url: "https://paxos.com/paxgold/" }],
    },
    {
      title: t("page-stablecoins-algorithmic"),
      description: t("page-stablecoins-algorithmic-description"),
      disclaimer: t("page-stablecoins-algorithmic-disclaimer"),
      emoji: ":chart_with_downwards_trend:",
      pros: [
        t("page-stablecoins-algorithmic-pro-1"),
        t("page-stablecoins-algorithmic-pro-2"),
      ],
      cons: [
        t("page-stablecoins-algorithmic-con-1"),
        t("page-stablecoins-algorithmic-con-2"),
      ],
      links: [{ text: "Ampleforth", url: "https://www.ampleforth.org/" }],
    },
  ]

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

  const dapps = [
    {
      background: "linear-gradient(225deg, #aa589b 0%, #5cb8c4 100%)",
      url: "https://aave.com",
      alt: t("aave-logo"),
      image: aaveImg,
      width: 64,
      name: "Aave",
      description: t("page-stablecoins-stablecoins-dapp-description-1"),
    },
    {
      background: "#f9fafb",
      url: "https://compound.finance",
      alt: t("compound-logo"),
      image: compoundImg,
      width: 160,
      name: "Compound",
      description: t("page-stablecoins-stablecoins-dapp-description-2"),
    },
    {
      background: "linear-gradient(135deg, #c7efe6 0%, #eeeac7 100%)",
      url: "https://summer.fi/",
      alt: t("summerfi-logo"),
      image: summerfiImg,
      width: 80,
      name: "Summer.fi",
      description: t("page-stablecoins-stablecoins-dapp-description-4"),
    },
  ]

  const tableColumns = [
    t("page-stablecoins-stablecoins-table-header-column-1"),
    t("page-stablecoins-stablecoins-table-header-column-2"),
    t("page-stablecoins-stablecoins-table-header-column-3"),
  ]

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

  const toolsData = [
    {
      title: "Stablecoins.wtf",
      description: t("page-stablecoins-tools-stablecoinswtf-description"),
      link: "https://stablecoins.wtf",
      image: stablecoinsWtfImg,
      alt: "Stablecoins.wtf",
    },
  ]

  return (
    <Page asChild>
      <MainArticle>
        <PageMetadata
          title={t("page-stablecoins-meta-title")}
          description={t("page-stablecoins-meta-description")}
          image="/images/stablecoins/hero.png"
        />
        <PageHero isReverse content={heroContent} />
        <Divider />
        <Content>
          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <div className="me-auto ms-auto w-full lg:me-2 lg:ms-0">
              <H2 className="mt-0">{t("page-stablecoins-why-stablecoins")}</H2>
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
              <H3>{t("page-stablecoins-bitcoin-pizza")}</H3>
              <p className="mb-6">
                {t("page-stablecoins-bitcoin-pizza-body")}{" "}
              </p>
            </GhostCard>
          </Flex>
        </Content>
        <div
          className={cn(
            "my-8 w-full py-16 shadow-inner",
            "bg-gradient-to-r from-accent-a/10 to-accent-c/10",
            "dark:bg-gradient-to-tr dark:from-primary/20 dark:from-20% dark:via-accent-a/20 dark:via-60% dark:to-accent-c/20 dark:to-95%"
          )}
        >
          <div className="-mb-8 w-full px-8 py-4">
            <H2 className="mt-0">{t("page-stablecoins-find-stablecoin")}</H2>
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
            <H3 className="mb-4 mt-0">
              {t("page-stablecoins-editors-choice")}
            </H3>
            <p className="mb-6">{t("page-stablecoins-editors-choice-intro")}</p>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              <EditorsChoice className="shadow-grid-yellow-box-shadow">
                <Flex className="me-auto ms-auto w-full flex-col justify-center lg:me-8 lg:ms-0 lg:w-1/2">
                  <div>
                    <H2 className="mb-2 mt-0 text-3xl">
                      {t("page-stablecoins-dai-banner-title")}
                    </H2>
                    <p className="mb-6 text-xl text-body-medium">
                      {t("page-stablecoins-dai-banner-body")}
                    </p>
                    <Flex className="flex-col">
                      <div>
                        <ButtonLink
                          className="mb-4 me-4"
                          href="https://matcha.xyz/tokens/ethereum/0x6b175474e89094c44da98b954eedeac495271d0f?sellChain=1&sellAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                        >
                          {t("page-stablecoins-dai-banner-swap-button")}
                        </ButtonLink>
                      </div>
                      <div>
                        <ButtonLink
                          variant="outline"
                          href="https://www.coinbase.com/price/dai#WhatIsDaiDAI"
                          isSecondary
                        >
                          {t("page-stablecoins-dai-banner-learn-button")}
                        </ButtonLink>
                      </div>
                    </Flex>
                  </div>
                </Flex>
                <TwImage
                  src={daiLargeImg}
                  alt={t("page-stablecoins-dai-logo")}
                  className="my-8 min-w-24 max-w-24 flex-1 self-center bg-cover bg-repeat sm:min-w-40 sm:max-w-40 md:my-0 md:max-w-60"
                />
              </EditorsChoice>

              <EditorsChoice className="shadow-grid-blue-box-shadow">
                <Flex className="me-auto ms-auto w-full flex-col justify-center lg:me-8 lg:ms-0 lg:w-1/2">
                  <H2 className="mb-2 mt-0 text-3xl">
                    {t("page-stablecoins-usdc-banner-title")}
                  </H2>
                  <p className="mb-6 text-xl text-body-medium">
                    {t("page-stablecoins-usdc-banner-body")}
                  </p>
                  <Flex className="flex-col">
                    <div>
                      <ButtonLink
                        className="mb-4 me-4"
                        href="https://matcha.xyz/tokens/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48?sellChain=1&sellAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                      >
                        {t("page-stablecoins-usdc-banner-swap-button")}
                      </ButtonLink>
                    </div>
                    <div>
                      <ButtonLink
                        variant="outline"
                        href="https://www.coinbase.com/usdc"
                        isSecondary
                      >
                        {t("page-stablecoins-usdc-banner-learn-button")}
                      </ButtonLink>
                    </div>
                  </Flex>
                </Flex>
                <TwImage
                  src={usdcLargeImg}
                  alt={t("page-stablecoins-usdc-logo")}
                  className="my-8 min-w-24 max-w-24 flex-1 self-center bg-cover bg-repeat sm:min-w-40 sm:max-w-40 md:my-0 md:max-w-60"
                />
              </EditorsChoice>
            </div>
            <H3>
              {t("page-stablecoins-top-coins")}
              <Tooltip content={tooltipContent}>
                <MdHelpOutline className="ms-2 fill-body" size={16} />
              </Tooltip>
            </H3>
            <InfoBanner emoji="⚠️" isWarning mb="4">
              {t("page-stablecoins-algorithmic-disclaimer")}
            </InfoBanner>
            <p className="mb-6">
              {t("page-stablecoins-top-coins-intro")}{" "}
              {t("page-stablecoins-top-coins-intro-code")}
            </p>
          </div>
          <div className="w-full overflow-x-auto px-8 py-4">
            <StablecoinsTable
              columns={tableColumns}
              content={markets}
              hasError={marketsHasError}
            />
          </div>
        </div>
        <Content id="explore">
          <H2>{t("page-stablecoins-get-stablecoins")}</H2>
        </Content>
        <Flex className="w-full items-center pb-4 pe-0 ps-0 lg:pe-8 lg:ps-8">
          <StablecoinAccordion />
        </Flex>
        <Divider />
        <Content>
          <CalloutBanner
            className="mx-0 mb-16 mt-8"
            titleKey={t("page-stablecoins-stablecoins-dapp-callout-title")}
            descriptionKey={t(
              "page-stablecoins-stablecoins-dapp-callout-description"
            )}
            image={dogeComputerImg}
            imageWidth={600}
            alt={t("page-stablecoins-stablecoins-dapp-callout-image-alt")}
          >
            <div className="flex flex-wrap gap-4">
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
            </div>
          </CalloutBanner>
          <H2>{t("page-stablecoins-save-stablecoins")}</H2>
          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <div className="me-auto ms-auto w-full lg:me-2 lg:ms-0">
              <p className="mb-6">
                {t("page-stablecoins-save-stablecoins-body")}
              </p>
              <H3>{t("page-stablecoins-interest-earning-dapps")}</H3>
              <p className="mb-6">{t("page-stablecoins-saving")}</p>
            </div>
          </Flex>
          <div className="mb-16 grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-8">
            {dapps.map((dapp, idx) => (
              <DataProductCard
                key={idx}
                background={dapp.background}
                url={dapp.url}
                alt={dapp.alt}
                image={dapp.image!}
                imgWidth={dapp.width!}
                name={dapp.name}
                description={dapp.description}
              />
            ))}
          </div>
        </Content>
        <Divider />
        <Content id="how">
          <H2 className="mt-0">{t("page-stablecoins-types-of-stablecoin")}</H2>
          <InfoBanner emoji="⚠️" isWarning>
            <H3 className="mb-4 mt-0">
              {t("page-stablecoins-research-warning-title")}
            </H3>
            {t("page-stablecoins-algorithmic-disclaimer")}
          </InfoBanner>
          <StablecoinBoxGrid items={features} />
        </Content>
        <div id="tools" className="w-full px-8 py-12">
          <H2>{t("page-stablecoins-tools-title")}</H2>

          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <Flex className="me-auto ms-auto w-full flex-col justify-center lg:me-2 lg:ms-0 lg:w-1/2">
              <ProductList
                actionLabel={t("page-stablecoins:page-dapps-ready-button")}
                category={t(
                  "page-stablecoins-category-dashboard-and-education"
                )}
                content={toolsData}
              />
            </Flex>
          </Flex>
        </div>
        <Content>
          <StandaloneQuizWidget quizKey="stablecoins" />
          <FeedbackCard />
        </Content>
      </MainArticle>
    </Page>
  )
}

export default StablecoinsPage
