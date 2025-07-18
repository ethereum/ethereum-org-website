import { type CardProps } from "@/components/CardList"

import { useTranslation } from "@/hooks/useTranslation"
import aaveImg from "@/public/images/dapps/aave.png"
import buidlboxImg from "@/public/images/dapps/buidlbox.png"
import compoundImg from "@/public/images/dapps/compound.png"
import matchaImg from "@/public/images/dapps/matcha.png"
import summerfiImg from "@/public/images/dapps/summerfi.png"
import uniImg from "@/public/images/dapps/uni.png"
import ethImg from "@/public/images/eth-org-logo.png"
import oneInchImg from "@/public/images/exchanges/1inch.png"
import binanceImg from "@/public/images/exchanges/binance.png"
import coinbaseImg from "@/public/images/exchanges/coinbase.png"
import coinmamaImg from "@/public/images/exchanges/coinmama.png"
import geminiImg from "@/public/images/exchanges/gemini.png"
import krakenImg from "@/public/images/exchanges/kraken.png"

export const useStablecoinAccordion = () => {
  const { t } = useTranslation("page-stablecoins")

  const dapps: Array<CardProps> = [
    {
      title: "Uniswap",
      image: uniImg,
      link: "https://uniswap.org",
      alt: t("uniswap-logo"),
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

  const borrow: Array<CardProps> = [
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
      title: "Summer.fi",
      image: summerfiImg,
      link: "https://summer.fi/",
      alt: t("summerfi-logo"),
    },
  ]

  const earn: Array<CardProps> = [
    {
      title: "buidlbox",
      image: buidlboxImg,
      link: "https://app.buidlbox.io/",
      description: t("page-stablecoins-accordion-earn-project-1-description"),
      alt: t("buidlbox-logo"),
    },
    {
      title: t("page-stablecoins-accordion-earn-project-bug-bounties"),
      image: ethImg,
      link: "/bug-bounty/",
      description: t("page-stablecoins-accordion-earn-project-3-description"),
      alt: t("ethereum-logo"),
    },
  ]

  const exchanges: Array<CardProps> = [
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
