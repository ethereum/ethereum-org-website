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
  peg: string
  symbol: string
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
  const markets: Market[] = []

  try {
    marketsHasError = false

    // const stablecoinsData = await fetchEthereumStablecoinsData()
    const [ethereumEcosystemData, stablecoinsData] = await loadData()

    // Get the intersection of stablecoins and Ethereum tokens to only have a list of data for stablecoins in the Ethereum ecosystem
    const ethereumStablecoinData = stablecoinsData.filter(
      (stablecoin) =>
        ethereumEcosystemData.findIndex(
          // eslint-disable-next-line
          (etherToken) => stablecoin.id == etherToken.id
        ) > -1
    )

    markets.push(
      ...ethereumStablecoinData
        .filter((stablecoin) => stablecoin.symbol.toUpperCase() in stablecoins)
        .map((token) => ({
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
          peg: stablecoins[token.symbol.toUpperCase()].peg || "USD",
          symbol: token.symbol,
        }))
    )
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
