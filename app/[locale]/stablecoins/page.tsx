import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { Lang } from "@/lib/types"

import I18nProvider from "@/components/I18nProvider"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import StablecoinsPage from "./_components/stablecoins"
import { stablecoins } from "./data"

import { fetchEthereumStablecoinsData } from "@/lib/api/stablecoinsData"

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

const loadData = dataLoader<[CoinGeckoCoinMarketResponse]>(
  [["ethereumStablecoinsData", fetchEthereumStablecoinsData]],
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
  const markets: CoinDetails[] = []

  try {
    marketsHasError = false

    const [stablecoinsData] = await loadData()

    const ethereumStablecoinData = stablecoins.map(
      ({ symbol, type, url, peg, id }) => {
        const coinMarketData = stablecoinsData.find((coin) => coin.id === id)
        if (!coinMarketData)
          throw new Error("Stablecoin data not found from CoinGecko for " + id)
        const { name, image } = coinMarketData
        const marketCap = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(coinMarketData.market_cap)
        return { name, marketCap, image, type, url, peg, symbol }
      }
    )
    markets.push(...ethereumStablecoinData)
  } catch (error) {
    console.error(error)
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
