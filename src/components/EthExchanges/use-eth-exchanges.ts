import { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

import { getLocaleTimestamp } from "../../utils/time"
import { trackCustomEvent } from "../../utils/matomo"
import { getImage, ImageDataLike } from "../../utils/image"
import { Lang } from "../../utils/languages"

export const cardListImage = graphql`
  fragment cardListImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 20
        layout: FIXED
        placeholder: BLURRED
        quality: 100
      )
    }
  }
`

type StringBoolean = "TRUE" | "FALSE"

type ExchangeName =
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

type WalletProviderName = "simplex" | "moonpay" | "wyre"

type ExchangeByCountry = {
  value: string
  label: string
  exchanges: { [key in ExchangeName]: StringBoolean }
}

interface Exchange {
  name: string
  url: string
  image: ImageDataLike | null
  usaExceptions: Array<string>
}

type Exchanges = Record<ExchangeName, Exchange>

interface Wallet {
  url: string
  platform: string
  image: ImageDataLike | null
  isUsaOnly?: boolean
}

interface WalletProvider {
  usaExceptions: Array<string>
  wallets: {
    [key: string]: Wallet
  }
}

type WalletProviders = Record<WalletProviderName, WalletProvider>

interface FilteredData {
  title: string
  description: string | null
  link: string
  image: IGatsbyImageData
  alt: string
}

interface State {
  selectedCountry?: ExchangeByCountry
}

export const useEthExchanges = () => {
  const { language } = useI18next()
  const { t } = useTranslation()
  const [state, setState] = useState<State>()

  const placeholderString = t("page-get-eth-exchanges-search")
  const data = useStaticQuery(graphql`
    query EthExchanges {
      exchangesByCountry: allExchangesByCountryCsv {
        nodes {
          binance
          binanceus
          bitbuy
          bitfinex
          bitflyer
          bitkub
          bitso
          bittrex
          bitvavo
          bybit
          coinbase
          coinmama
          coinspot
          country
          cryptocom
          easycrypto
          gateio
          gemini
          huobiglobal
          itezcom
          kraken
          kucoin
          moonpay
          mtpelerin
          okx
          rain
          shakepay
          simplex
          wazirx
          wyre
        }
      }
      timestamp: exchangesByCountryCsv {
        parent {
          ... on File {
            id
            name
            fields {
              gitLogLatestDate
            }
          }
        }
      }
      argent: file(relativePath: { eq: "wallets/argent.png" }) {
        ...cardListImage
      }
      binance: file(relativePath: { eq: "exchanges/binance.png" }) {
        ...cardListImage
      }
      binanceus: file(relativePath: { eq: "exchanges/binance.png" }) {
        ...cardListImage
      }
      bitbuy: file(relativePath: { eq: "exchanges/bitbuy.png" }) {
        ...cardListImage
      }
      bitfinex: file(relativePath: { eq: "exchanges/bitfinex.png" }) {
        ...cardListImage
      }
      bitflyer: file(relativePath: { eq: "exchanges/bitflyer.png" }) {
        ...cardListImage
      }
      bitkub: file(relativePath: { eq: "exchanges/bitkub.png" }) {
        ...cardListImage
      }
      bitso: file(relativePath: { eq: "exchanges/bitso.png" }) {
        ...cardListImage
      }
      bittrex: file(relativePath: { eq: "exchanges/bittrex.png" }) {
        ...cardListImage
      }
      bitvavo: file(relativePath: { eq: "exchanges/bitvavo.png" }) {
        ...cardListImage
      }
      bybit: file(relativePath: { eq: "exchanges/bybit.png" }) {
        ...cardListImage
      }
      coinbase: file(relativePath: { eq: "exchanges/coinbase.png" }) {
        ...cardListImage
      }
      coinmama: file(relativePath: { eq: "exchanges/coinmama.png" }) {
        ...cardListImage
      }
      coinspot: file(relativePath: { eq: "exchanges/coinspot.png" }) {
        ...cardListImage
      }
      cryptocom: file(relativePath: { eq: "exchanges/crypto.com.png" }) {
        ...cardListImage
      }
      easycrypto: file(relativePath: { eq: "exchanges/easycrypto.png" }) {
        ...cardListImage
      }
      gateio: file(relativePath: { eq: "exchanges/gateio.png" }) {
        ...cardListImage
      }
      gemini: file(relativePath: { eq: "exchanges/gemini.png" }) {
        ...cardListImage
      }
      huobiglobal: file(relativePath: { eq: "exchanges/huobiglobal.png" }) {
        ...cardListImage
      }
      imtoken: file(relativePath: { eq: "wallets/imtoken.png" }) {
        ...cardListImage
      }
      itezcom: file(relativePath: { eq: "exchanges/itezcom.png" }) {
        ...cardListImage
      }
      kraken: file(relativePath: { eq: "exchanges/kraken.png" }) {
        ...cardListImage
      }
      kucoin: file(relativePath: { eq: "exchanges/kucoin.png" }) {
        ...cardListImage
      }
      moonpay: file(relativePath: { eq: "exchanges/moonpay.png" }) {
        ...cardListImage
      }
      mtpelerin: file(relativePath: { eq: "exchanges/mtpelerin.png" }) {
        ...cardListImage
      }
      myetherwallet: file(relativePath: { eq: "wallets/myetherwallet.png" }) {
        ...cardListImage
      }
      mycrypto: file(relativePath: { eq: "wallets/mycrypto.png" }) {
        ...cardListImage
      }
      okx: file(relativePath: { eq: "exchanges/okx.png" }) {
        ...cardListImage
      }
      rain: file(relativePath: { eq: "exchanges/rain.png" }) {
        ...cardListImage
      }
      shakepay: file(relativePath: { eq: "exchanges/shakepay.png" }) {
        ...cardListImage
      }
      squarelink: file(relativePath: { eq: "wallets/squarelink.png" }) {
        ...cardListImage
      }
      trust: file(relativePath: { eq: "wallets/trust.png" }) {
        ...cardListImage
      }
      wazirx: file(relativePath: { eq: "exchanges/wazirx.png" }) {
        ...cardListImage
      }
    }
  `)

  const exchanges: Exchanges = {
    binance: {
      name: "Binance",
      url: "https://www.binance.com/en",
      image: data.binance,
      usaExceptions: [],
    },
    binanceus: {
      name: "Binance US",
      url: "https://www.binance.us/en/home",
      image: data.binance,
      usaExceptions: ["HI", "ID", "NY", "TX", "VT"],
    },
    bitbuy: {
      name: "Bitbuy",
      url: "https://bitbuy.ca/",
      image: data.bitbuy,
      usaExceptions: [],
    },
    bitfinex: {
      name: "Bitfinex",
      url: "https://www.bitfinex.com/",
      image: data.bitfinex,
      usaExceptions: [],
    },
    bitflyer: {
      name: "bitFlyer",
      url: "https://bitflyer.com/",
      image: data.bitflyer,
      usaExceptions: ["NV", "WV"],
    },
    bitkub: {
      name: "Bitkub",
      url: "https://www.bitkub.com/",
      image: data.bitkub,
      usaExceptions: [],
    },
    bitso: {
      name: "Bitso",
      url: "https://bitso.com/",
      image: data.bitso,
      usaExceptions: [],
    },
    bittrex: {
      name: "Bittrex",
      url: "https://global.bittrex.com/",
      image: data.bittrex,
      usaExceptions: ["CT", "HI", "NY", "NH", "TX", "VT", "VA"],
    },
    bitvavo: {
      name: "Bitvavo",
      url: "https://bitvavo.com/en/ethereum",
      image: data.bitvavo,
      usaExceptions: [],
    },
    bybit: {
      name: "Bybit",
      url: "https://www.bybit.com/",
      image: data.bybit,
      usaExceptions: [],
    },
    coinbase: {
      name: "Coinbase",
      url: "https://www.coinbase.com/",
      image: data.coinbase,
      usaExceptions: ["HI"],
    },
    coinmama: {
      name: "Coinmama",
      url: "https://www.coinmama.com/",
      image: data.coinmama,
      usaExceptions: ["CT", "FL", "IA", "NY"],
    },
    coinspot: {
      name: "CoinSpot",
      url: "https://www.coinspot.com.au/",
      image: data.coinspot,
      usaExceptions: [],
    },
    cryptocom: {
      name: "Crypto.com",
      url: "https://crypto.com/exchange/",
      image: data.cryptocom,
      usaExceptions: ["NY"],
    },
    easycrypto: {
      name: "Easy Crypto",
      url: "https://easycrypto.com/",
      image: data.easycrypto,
      usaExceptions: [],
    },
    gateio: {
      name: "Gate.io",
      url: "https://www.gate.io/",
      image: data.gateio,
      usaExceptions: [],
    },
    huobiglobal: {
      name: "Huobi Global",
      url: "https://huobi.com/",
      image: data.huobiglobal,
      usaExceptions: [],
    },
    itezcom: {
      name: "Itez",
      url: "https://itez.com/",
      image: data.itezcom,
      usaExceptions: [],
    },
    kraken: {
      name: "Kraken",
      url: "https://www.kraken.com/",
      image: data.kraken,
      usaExceptions: ["NY, WA"],
    },
    kucoin: {
      name: "KuCoin",
      url: "https://www.kucoin.com/",
      image: data.kucoin,
      usaExceptions: [],
    },
    moonpay: {
      name: "MoonPay",
      url: "https://www.moonpay.com/",
      image: data.moonpay,
      usaExceptions: ["VI"],
    },
    mtpelerin: {
      name: "Mt Pelerin",
      url: "https://www.mtpelerin.com/",
      image: data.mtpelerin,
      usaExceptions: [],
    },
    okx: {
      name: "OKX",
      url: "https://www.okx.com/",
      image: data.okx,
      usaExceptions: [],
    },
    gemini: {
      name: "Gemini",
      url: "https://gemini.com/",
      image: data.gemini,
      usaExceptions: ["HI"],
    },
    rain: {
      name: "Rain",
      url: "https://rain.bh",
      image: data.rain,
      usaExceptions: [],
    },
    shakepay: {
      name: "Shakepay",
      url: "https://shakepay.com",
      image: data.shakepay,
      usaExceptions: [],
    },
    wazirx: {
      name: "WazirX",
      url: "https://wazirx.com/",
      image: data.wazirx,
      usaExceptions: [],
    },
  }

  const walletProviders: WalletProviders = {
    wyre: {
      usaExceptions: ["CT", "HI", "NY", "NH", "TX", "VT", "VA"],
      wallets: {
        Squarelink: {
          url: "https://squarelink.com/	",
          platform: "Web",
          image: data.squarelink,
        },
      },
    },
    moonpay: {
      usaExceptions: [
        "CT",
        "HI",
        "IA",
        "KS",
        "KY",
        "MS",
        "NE",
        "NM",
        "NY",
        "RI",
        "WV",
      ],
      wallets: {
        Argent: {
          url: "https://www.argent.xyz/	",
          platform: "Mobile",
          image: data.argent,
        },
        imToken: {
          url: "https://token.im/ ",
          platform: "Mobile",
          image: data.imtoken,
        },
        Trust: {
          url: "https://trustwallet.com/	",
          platform: "Mobile",
          image: data.trust,
        },
        MyCrypto: {
          url: "https://app.mycrypto.com",
          platform: "Web",
          image: data.mycrypto,
        },
      },
    },
    simplex: {
      usaExceptions: ["AL", "AK", "NM", "HI", "NV", "WA", "VT", "NY"],
      wallets: {
        MyEtherWallet: {
          url: "https://www.myetherwallet.com/",
          platform: "Mobile/Web",
          image: data.myetherwallet,
        },
      },
    },
  }

  const lastUpdated = getLocaleTimestamp(
    language as Lang,
    data.timestamp.parent.fields.gitLogLatestDate
  )

  const handleSelectChange = (selectedOption: ExchangeByCountry) => {
    trackCustomEvent({
      eventCategory: `Country input`,
      eventAction: `Selected`,
      eventName: selectedOption.value,
    })
    setState({ selectedCountry: selectedOption })
  }

  // Add `value` & `label` for Select component
  const exchangesByCountry: Array<ExchangeByCountry> =
    data.exchangesByCountry.nodes
      .map((node) => {
        return {
          value: node.country,
          label: node.country,
          exchanges: node,
        }
      })
      .sort((a, b) => a.value.localeCompare(b.value))

  const exchangesArray = Object.keys(exchanges) as Array<ExchangeName>
  const walletProvidersArray = Object.keys(
    walletProviders
  ) as Array<WalletProviderName>

  // Construct arrays for CardList
  let filteredExchanges: Array<FilteredData> = []
  let filteredWalletProviders: Array<WalletProviderName> = []
  let filteredWallets: Array<FilteredData> = []

  const hasSelectedCountry = !!state?.selectedCountry?.value
  if (hasSelectedCountry) {
    // Filter to exchanges that serve selected Country
    filteredExchanges = exchangesArray
      .filter(
        (exchange) => state?.selectedCountry?.exchanges[exchange] === "TRUE"
      )
      // Format array for <CardList/>
      .map((exchange) => {
        // Add state exceptions if Country is USA
        let description: string | null = null
        if (state?.selectedCountry?.value === t("page-get-eth-exchanges-usa")) {
          const exceptions = exchanges[exchange].usaExceptions
          if (exceptions.length > 0) {
            description = `${t(
              "page-get-eth-exchanges-except"
            )} ${exceptions.join(", ")}`
          }
        }
        return {
          title: exchanges[exchange].name,
          description,
          link: exchanges[exchange].url,
          image: getImage(exchanges[exchange].image)!,
          alt: "",
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))

    // Filter to wallet providers that serve selected Country
    filteredWalletProviders = walletProvidersArray.filter(
      (provider) => state?.selectedCountry?.exchanges[provider] === "TRUE"
    )
  }
  if (filteredWalletProviders.length) {
    // Construct wallets based on the provider
    filteredWallets = filteredWalletProviders
      .reduce<Array<FilteredData>>((res, currentProvider) => {
        const wallets = Object.keys(walletProviders[currentProvider].wallets)

        const flattenWallets = wallets.reduce<Array<FilteredData>>(
          (result, currentWallet) => {
            const walletObject =
              walletProviders[currentProvider].wallets[currentWallet]
            // Add state exceptions if Country is USA
            let description: string | null = null
            if (
              state?.selectedCountry?.value === t("page-get-eth-exchanges-usa")
            ) {
              const exceptions = walletProviders[currentProvider].usaExceptions
              if (exceptions.length > 0) {
                description = `${t(
                  "page-get-eth-exchanges-except"
                )} ${exceptions.join(", ")}`
              }
              // Filter out wallets that only service USA
            } else if (walletObject.isUsaOnly) {
              return result
            }
            return result.concat({
              title: currentWallet,
              description,
              link: walletObject.url,
              image: getImage(walletObject.image)!,
              alt: "",
            })
          },
          []
        )
        // Flatten data into single array for <CardList/>
        return res.concat(flattenWallets)
      }, [])
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  const hasExchangeResults = filteredExchanges.length > 0
  const hasWalletResults = filteredWallets.length > 0

  return {
    t,
    exchangesByCountry,
    handleSelectChange,
    placeholderString,
    hasSelectedCountry,
    hasExchangeResults,
    hasWalletResults,
    filteredExchanges,
    filteredWallets,
    lastUpdated,
  }
}
