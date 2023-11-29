import { useState } from "react"
import { shuffle } from "lodash"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { Lang } from "@/lib/types"

// TODO: Remove unused?
// import argent from "@/public/wallets/argent.png"
// import binanceus from "@/public/exchanges/binance.png"
// import imtoken from "@/public/wallets/imtoken.png"
// import mycrypto from "@/public/wallets/mycrypto.png"
// import myetherwallet from "@/public/wallets/myetherwallet.png"
// import squarelink from "@/public/wallets/squarelink.png"
// import trust from "@/public/wallets/trust.png"
import type { ImageProps } from "@/components/Image"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { resizeImage } from "@/lib/utils/resizeImage"
import { getLocaleTimestamp } from "@/lib/utils/time"

import exchangeData from "@/data/exchangesByCountry"

import binance from "@/public/exchanges/binance.png"
import bitbuy from "@/public/exchanges/bitbuy.png"
import bitfinex from "@/public/exchanges/bitfinex.png"
import bitflyer from "@/public/exchanges/bitflyer.png"
import bitkub from "@/public/exchanges/bitkub.png"
import bitso from "@/public/exchanges/bitso.png"
import bittrex from "@/public/exchanges/bittrex.png"
import bitvavo from "@/public/exchanges/bitvavo.png"
import bybit from "@/public/exchanges/bybit.png"
import coinbase from "@/public/exchanges/coinbase.png"
import coinmama from "@/public/exchanges/coinmama.png"
import coinspot from "@/public/exchanges/coinspot.png"
import cryptocom from "@/public/exchanges/crypto.com.png"
import easycrypto from "@/public/exchanges/easycrypto.png"
import gateio from "@/public/exchanges/gateio.png"
import gemini from "@/public/exchanges/gemini.png"
import huobiglobal from "@/public/exchanges/huobiglobal.png"
import itezcom from "@/public/exchanges/itezcom.png"
import korbit from "@/public/exchanges/korbit.png"
import kraken from "@/public/exchanges/kraken.png"
import kucoin from "@/public/exchanges/kucoin.png"
import moonpay from "@/public/exchanges/moonpay.png"
import mtpelerin from "@/public/exchanges/mtpelerin.png"
import okx from "@/public/exchanges/okx.png"
import rain from "@/public/exchanges/rain.png"
import shakepay from "@/public/exchanges/shakepay.png"
import wazirx from "@/public/exchanges/wazirx.png"

type ExchangeKey =
  | "binance"
  | "binanceus"
  | "bitbuy"
  | "bitfinex"
  | "bitflyer"
  | "bitkub"
  | "bitso"
  | "bittrex"
  | "bitvavo"
  | "bybit"
  | "coinbase"
  | "coinmama"
  | "coinspot"
  | "cryptocom"
  | "easycrypto"
  | "gateio"
  | "gemini"
  | "huobiglobal"
  | "itezcom"
  | "kraken"
  | "kucoin"
  | "mtpelerin"
  | "moonpay"
  | "okx"
  | "rain"
  | "shakepay"
  | "wazirx"
  | "korbit"

type ExchangeDetail = {
  name: string
  url: string
  image: ImageProps["src"]
  usaExceptions: string[]
}

type ExchangeDetails = Record<ExchangeKey, ExchangeDetail>

type Country = keyof typeof exchangeData

type ExchangeData = Record<Country, ExchangeKey[]>

type ExchangeByCountryOption = {
  value: string
  label: string
  exchanges: string[]
}

type FilteredData = {
  title: string
  description?: string
  link: string
  image: ImageProps["src"]
  alt: string
}

const UNITED_STATES = "United States of America (USA)"

const resize = (image: ImageProps["src"]): ImageProps["src"] => resizeImage(image, 20)

const exchanges: ExchangeDetails = {
  binance: {
    name: "Binance",
    url: "https://www.binance.com/",
    image: resize(binance),
    usaExceptions: [],
  },
  binanceus: {
    name: "Binance US",
    url: "https://www.binance.us/",
    image: resize(binance),
    usaExceptions: ["HI", "ID", "NY", "TX", "VT"],
  },
  bitbuy: {
    name: "Bitbuy",
    url: "https://bitbuy.ca/",
    image: resize(bitbuy),
    usaExceptions: [],
  },
  bitfinex: {
    name: "Bitfinex",
    url: "https://www.bitfinex.com/",
    image: resize(bitfinex),
    usaExceptions: [],
  },
  bitflyer: {
    name: "bitFlyer",
    url: "https://bitflyer.com/",
    image: resize(bitflyer),
    usaExceptions: ["NV", "WV"],
  },
  bitkub: {
    name: "Bitkub",
    url: "https://www.bitkub.com/",
    image: resize(bitkub),
    usaExceptions: [],
  },
  bitso: {
    name: "Bitso",
    url: "https://bitso.com/",
    image: resize(bitso),
    usaExceptions: [],
  },
  bittrex: {
    name: "Bittrex",
    url: "https://global.bittrex.com/",
    image: resize(bittrex),
    usaExceptions: ["CT", "HI", "NY", "NH", "TX", "VT", "VA"],
  },
  bitvavo: {
    name: "Bitvavo",
    url: "https://bitvavo.com/en/ethereum",
    image: resize(bitvavo),
    usaExceptions: [],
  },
  bybit: {
    name: "Bybit",
    url: "https://www.bybit.com/",
    image: resize(bybit),
    usaExceptions: [],
  },
  coinbase: {
    name: "Coinbase",
    url: "https://www.coinbase.com/",
    image: resize(coinbase),
    usaExceptions: ["HI"],
  },
  coinmama: {
    name: "Coinmama",
    url: "https://www.coinmama.com/",
    image: resize(coinmama),
    usaExceptions: ["CT", "FL", "IA", "NY"],
  },
  coinspot: {
    name: "CoinSpot",
    url: "https://www.coinspot.com.au/",
    image: resize(coinspot),
    usaExceptions: [],
  },
  cryptocom: {
    name: "Crypto.com",
    url: "https://crypto.com/exchange/",
    image: resize(cryptocom),
    usaExceptions: ["NY"],
  },
  easycrypto: {
    name: "Easy Crypto",
    url: "https://easycrypto.com/",
    image: resize(easycrypto),
    usaExceptions: [],
  },
  gateio: {
    name: "Gate.io",
    url: "https://www.gate.io/",
    image: resize(gateio),
    usaExceptions: [],
  },
  huobiglobal: {
    name: "Huobi Global",
    url: "https://huobi.com/",
    image: resize(huobiglobal),
    usaExceptions: [],
  },
  itezcom: {
    name: "Itez",
    url: "https://itez.com/",
    image: resize(itezcom),
    usaExceptions: [],
  },
  kraken: {
    name: "Kraken",
    url: "https://www.kraken.com/",
    image: resize(kraken),
    usaExceptions: ["NY, WA"],
  },
  kucoin: {
    name: "KuCoin",
    url: "https://www.kucoin.com/",
    image: resize(kucoin),
    usaExceptions: [],
  },
  moonpay: {
    name: "MoonPay",
    url: "https://www.moonpay.com/",
    image: resize(moonpay),
    usaExceptions: ["VI"],
  },
  mtpelerin: {
    name: "Mt Pelerin",
    url: "https://www.mtpelerin.com/",
    image: resize(mtpelerin),
    usaExceptions: [],
  },
  okx: {
    name: "OKX",
    url: "https://www.okx.com/",
    image: resize(okx),
    usaExceptions: [],
  },
  gemini: {
    name: "Gemini",
    url: "https://gemini.com/",
    image: resize(gemini),
    usaExceptions: ["HI"],
  },
  rain: {
    name: "Rain",
    url: "https://rain.bh",
    image: resize(rain),
    usaExceptions: [],
  },
  shakepay: {
    name: "Shakepay",
    url: "https://shakepay.com",
    image: resize(shakepay),
    usaExceptions: [],
  },
  wazirx: {
    name: "WazirX",
    url: "https://wazirx.com/",
    image: resize(wazirx),
    usaExceptions: [],
  },
  korbit: {
    name: "Korbit",
    url: "https://korbit.co.kr",
    image: resize(korbit),
    usaExceptions: [],
  },
}

export const useCentralizedExchanges = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-get-eth")
  const [selectedCountry, setSelectedCountry] = useState<ExchangeByCountryOption | null>()

  const placeholderString = t("page-get-eth-exchanges-search")

  const lastUpdated = getLocaleTimestamp(
    locale as Lang,
    // TODO: Set up git log fetch; confirm no SSR issues
    // data.timestamp.parent.fields.gitLogLatestDate
    new Date().toISOString()
  )

  // Add `value` & `label` for Select component, sort alphabetically
  const selectOptions: ExchangeByCountryOption[] = Object.entries(exchangeData as ExchangeData)
    .map(([country, exchanges]) => ({ value: country, label: country, exchanges }))
    .sort((a, b) => a.value.localeCompare(b.value))

  const handleSelectChange = (selectedOption: ExchangeByCountryOption): void => {
    trackCustomEvent({
      eventCategory: `Country input`,
      eventAction: `Selected`,
      eventName: selectedOption.value,
    })
    setSelectedCountry(selectedOption)
  }

  const exchangesArray = Object.keys(exchanges) as ExchangeKey[]

  const formatList = (values: string[]): string => new Intl.ListFormat(locale, {
    style: 'long',
    type: 'conjunction',
  }).format(values)

  // Construct arrays for CardList
  let filteredExchanges: FilteredData[] = []

  const hasSelectedCountry = !!selectedCountry?.value
  if (hasSelectedCountry) {
    // Filter to exchanges that serve selected Country
    filteredExchanges = shuffle(
      exchangesArray
        .filter(
          (exchange) => selectedCountry?.exchanges.includes(exchange)
        )
        // Format array for <CardList/>
        .map((exchange) => {
          // Add state exceptions if Country is USA
          let description: string | undefined
          // TODO: Set up for i18n support; currently all country names in English:
          if (selectedCountry.value === UNITED_STATES) {
            const { usaExceptions } = exchanges[exchange]
            if (usaExceptions.length > 0) {
              description = `${t("page-get-eth-exchanges-except")} ${formatList(usaExceptions)}`
            }
          }
          return {
            title: exchanges[exchange].name,
            description,
            link: exchanges[exchange].url,
            image: exchanges[exchange].image,
            alt: "", // TODO: Add alt text for exchange image
          }
        })
    )
  }

  const hasExchangeResults = filteredExchanges.length > 0

  return {
    selectOptions,
    handleSelectChange,
    placeholderString,
    hasSelectedCountry,
    hasExchangeResults,
    filteredExchanges,
    lastUpdated,
  }
}
