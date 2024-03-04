import { useTranslation } from "next-i18next"

import { CardListItem } from "../CardList"

import aaveImg from "@/public/dapps/aave.png"
// -- borrow
import compoundImg from "@/public/dapps/compound.png"
// -- earn
import gitcoinImg from "@/public/dapps/gitcoin.png"
import loopringImg from "@/public/dapps/loopring.png"
import matchaImg from "@/public/dapps/matcha.png"
import oasisImg from "@/public/dapps/stabledai.png"
// Static assets
// -- dapps
import uniImg from "@/public/dapps/uni.png"
import oneInchImg from "@/public/exchanges/1inch.png"
import binanceImg from "@/public/exchanges/binance.png"
import bittrexImg from "@/public/exchanges/bittrex.png"
// -- exchanges
import coinbaseImg from "@/public/exchanges/coinbase.png"
import coinmamaImg from "@/public/exchanges/coinmama.png"
import geminiImg from "@/public/exchanges/gemini.png"
import krakenImg from "@/public/exchanges/kraken.png"
import ethImg from "@/public/favicon.png"
import makerImg from "@/public/stablecoins/maker.png"

export const useStablecoinAccordion = () => {
  const { t } = useTranslation("page-stablecoins")

  const dapps: Array<CardListItem> = [
    {
      title: "Uniswap",
      image: uniImg,
      link: "https://uniswap.org",
      alt: t("uniswap-logo"),
    },
    {
      title: "Loopring",
      image: loopringImg,
      link: "https://loopring.org",
      alt: t("loopring-logo"),
    },
    {
      title: "1inch",
      image: oneInchImg,
      link: "https://app.1inch.io",
      alt: t("1inch-logo"),
    },
    {
      title: "Matcha",
      image: matchaImg,
      link: "https://matcha.xyz",
      alt: t("matcha-logo"),
    },
  ]

  const borrow: Array<CardListItem> = [
    {
      title: "Compound",
      image: compoundImg,
      link: "https://compound.finance",
      alt: t("compound-logo"),
    },
    {
      title: "Aave",
      image: aaveImg,
      link: "https://aave.com",
      alt: t("aave-logo"),
    },
    {
      title: "Oasis",
      image: oasisImg,
      link: "https://oasis.app",
      alt: t("oasis-logo"),
    },
  ]

  const earn: Array<CardListItem> = [
    {
      title: t("page-stablecoins-accordion-earn-project-bounties"),
      image: gitcoinImg,
      link: "https://gitcoin.co/explorer",
      description: t("page-stablecoins-accordion-earn-project-1-description"),
      alt: t("gitcoin-logo"),
    },
    {
      title: t("page-stablecoins-accordion-earn-project-community"),
      image: makerImg,
      link: "https://makerdao.world/en/resources/",
      description: t("page-stablecoins-accordion-earn-project-2-description"),
      alt: t("makerdao-logo"),
    },
    {
      title: t("page-stablecoins-accordion-earn-project-bug-bounties"),
      image: ethImg,
      link: "/bug-bounty/",
      description: t("page-stablecoins-accordion-earn-project-3-description"),
      alt: t("ethereum-logo"),
    },
  ]

  const exchanges: Array<CardListItem> = [
    {
      title: "Coinbase",
      image: coinbaseImg,
      link: "https://coinbase.com",
      alt: t("coinbase-logo"),
    },
    {
      title: "Gemini",
      image: geminiImg,
      link: "https://gemini.com",
      alt: t("gemini-logo"),
    },
    {
      title: "Kraken",
      image: krakenImg,
      link: "https://kraken.com",
      alt: t("kraken-logo"),
    },
    {
      title: "Coinmama",
      image: coinmamaImg,
      link: "https://coinmama.com",
      alt: t("coinmama-logo"),
    },
    {
      title: "Bittrex",
      image: bittrexImg,
      link: "https://global.bittrex.com",
      alt: t("bittrex-logo"),
    },
    {
      title: "Binance",
      image: binanceImg,
      link: "https://binance.com",
      alt: t("binance-logo"),
    },
  ]

  return {
    cardListGroups: {
      dapps,
      borrow,
      earn,
      exchanges,
    },
  }
}
