import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { pick } from "@/lib/utils/lodash"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import StablecoinsPage from "./_components/stablecoins"

import {
  fetchEthereumEcosystemData,
  fetchEthereumStablecoinsData,
} from "@/lib/api/stablecoinsData"

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

export interface Market {
  name: string
  marketCap: string
  image: string
  type: string
  url: string
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

async function Page({ params }: { params: Promise<{ locale: Lang }> }) {
  const { locale } = await params

  setRequestLocale(locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/stablecoins")
  const messages = pick(allMessages, requiredNamespaces)

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
    TUSD: { type: FIAT, url: "https://tusd.io/" },
    HUSD: { type: FIAT, url: "https://www.huobi.com/en-us/usd-deposit/" },
    SUSD: { type: CRYPTO, url: "https://www.synthetix.io/" },
    EURS: { type: FIAT, url: "https://eurs.stasis.net/" },
    USDK: { type: FIAT, url: "https://www.oklink.com/usdk" },
    MUSD: { type: CRYPTO, url: "https://mstable.org/" },
    USDX: { type: CRYPTO, url: "https://usdx.money/" },
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

  return (
    <I18nProvider locale={locale} messages={messages}>
      <StablecoinsPage markets={markets} marketsHasError={marketsHasError} />
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
