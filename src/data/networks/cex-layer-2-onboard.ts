export interface CexOnboard {
  name: string
  url: string
  cex_support: string[]
  network_support: string[]
}

export const cexOnboardData: CexOnboard[] = [
  {
    name: "Layerswap",
    url: "https://layerswap.io/",
    cex_support: [
      "Binance",
      "Bitfinex",
      "Bittrex Global",
      "Coinbase",
      "Crypto.com",
      "Huobi",
      "Kraken",
      "Kucoin",
      "OKX",
    ],
    network_support: ["Arbitrum", "Loopring", "Optimism", "zkSpace", "ZKsync"],
  },
]
