import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { CardListItem } from "../CardList"

export const useStablecoinAccordion = () => {
  const { t } = useTranslation()
  const data = useStaticQuery(graphql`
    {
      uniswap: file(relativePath: { eq: "dapps/uni.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      compound: file(relativePath: { eq: "dapps/compound.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      aave: file(relativePath: { eq: "dapps/aave.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      oasis: file(relativePath: { eq: "dapps/stabledai.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      gitcoin: file(relativePath: { eq: "dapps/gitcoin.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      maker: file(relativePath: { eq: "stablecoins/maker.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      eth: file(relativePath: { eq: "favicon.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      oneinch: file(relativePath: { eq: "exchanges/1inch.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      loopring: file(relativePath: { eq: "dapps/loopring.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      matcha: file(relativePath: { eq: "dapps/matcha.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      coinbase: file(relativePath: { eq: "exchanges/coinbase.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      kraken: file(relativePath: { eq: "exchanges/kraken.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      coinmama: file(relativePath: { eq: "exchanges/coinmama.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      gemini: file(relativePath: { eq: "exchanges/gemini.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      binance: file(relativePath: { eq: "exchanges/binance.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
      bittrex: file(relativePath: { eq: "exchanges/bittrex.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 24
            layout: FIXED
            placeholder: BLURRED
            quality: 100
          )
        }
      }
    }
  `)

  const dapps: Array<CardListItem> = [
    {
      title: "Uniswap",
      image: getImage(data.uniswap)!,
      link: "https://uniswap.org",
      alt: t("uniswap-logo"),
    },
    {
      title: "Loopring",
      image: getImage(data.loopring)!,
      link: "https://loopring.org",
      alt: t("loopring-logo"),
    },
    {
      title: "1inch",
      image: getImage(data.oneinch)!,
      link: "https://app.1inch.io",
      alt: t("1inch-logo"),
    },
    {
      title: "Matcha",
      image: getImage(data.matcha)!,
      link: "https://matcha.xyz",
      alt: t("matcha-logo"),
    },
  ]

  const borrow: Array<CardListItem> = [
    {
      title: "Compound",
      image: getImage(data.compound)!,
      link: "https://compound.finance",
      alt: t("compound-logo"),
    },
    {
      title: "Aave",
      image: getImage(data.aave)!,
      link: "https://aave.com",
      alt: t("aave-logo"),
    },
    {
      title: "Oasis",
      image: getImage(data.oasis)!,
      link: "https://oasis.app",
      alt: t("oasis-logo"),
    },
  ]

  const earn: Array<CardListItem> = [
    {
      title: t("page-stablecoins-accordion-earn-project-bounties"),
      image: getImage(data.gitcoin)!,
      link: "https://gitcoin.co/explorer",
      description: t("page-stablecoins-accordion-earn-project-1-description"),
      alt: t("gitcoin-logo"),
    },
    {
      title: t("page-stablecoins-accordion-earn-project-community"),
      image: getImage(data.maker)!,
      link: "https://makerdao.world/en/resources/",
      description: t("page-stablecoins-accordion-earn-project-2-description"),
      alt: t("makerdao-logo"),
    },
    {
      title: t("page-stablecoins-accordion-earn-project-bug-bounties"),
      image: getImage(data.eth)!,
      link: "/bug-bounty/",
      description: t("page-stablecoins-accordion-earn-project-3-description"),
      alt: t("ethereum-logo"),
    },
  ]

  const exchanges: Array<CardListItem> = [
    {
      title: "Coinbase",
      image: getImage(data.coinbase)!,
      link: "https://coinbase.com",
      alt: t("coinbase-logo"),
    },
    {
      title: "Gemini",
      image: getImage(data.gemini)!,
      link: "https://gemini.com",
      alt: t("gemini-logo"),
    },
    {
      title: "Kraken",
      image: getImage(data.kraken)!,
      link: "https://kraken.com",
      alt: t("kraken-logo"),
    },
    {
      title: "Coinmama",
      image: getImage(data.coinmama)!,
      link: "https://coinmama.com",
      alt: t("coinmama-logo"),
    },
    {
      title: "Bittrex",
      image: getImage(data.bittrex)!,
      link: "https://global.bittrex.com",
      alt: t("bittrex-logo"),
    },
    {
      title: "Binance",
      image: getImage(data.binance)!,
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
