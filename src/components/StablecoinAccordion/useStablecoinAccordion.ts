import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"
import { useIntl } from "react-intl"
import { CardListItem } from "../CardList"
import { translateMessageId } from "../../utils/translations"

export const useStablecoinAccordion = () => {
  const intl = useIntl()
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
      alt: translateMessageId("uniswap-logo", intl),
    },
    {
      title: "Loopring",
      image: getImage(data.loopring)!,
      link: "https://loopring.org",
      alt: translateMessageId("loopring-logo", intl),
    },
    {
      title: "1inch",
      image: getImage(data.oneinch)!,
      link: "https://app.1inch.io",
      alt: translateMessageId("1inch-logo", intl),
    },
    {
      title: "Matcha",
      image: getImage(data.matcha)!,
      link: "https://matcha.xyz",
      alt: translateMessageId("matcha-logo", intl),
    },
  ]

  const borrow: Array<CardListItem> = [
    {
      title: "Compound",
      image: getImage(data.compound)!,
      link: "https://compound.finance",
      alt: translateMessageId("compound-logo", intl),
    },
    {
      title: "Aave",
      image: getImage(data.aave)!,
      link: "https://aave.com",
      alt: translateMessageId("aave-logo", intl),
    },
    {
      title: "Oasis",
      image: getImage(data.oasis)!,
      link: "https://oasis.app",
      alt: translateMessageId("oasis-logo", intl),
    },
  ]

  const earn: Array<CardListItem> = [
    {
      title: translateMessageId(
        "page-stablecoins-accordion-earn-project-bounties",
        intl
      ),
      image: getImage(data.gitcoin)!,
      link: "https://gitcoin.co/explorer",
      description: translateMessageId(
        "page-stablecoins-accordion-earn-project-1-description",
        intl
      ),
      alt: translateMessageId("gitcoin-logo", intl),
    },
    {
      title: translateMessageId(
        "page-stablecoins-accordion-earn-project-community",
        intl
      ),
      image: getImage(data.maker)!,
      link: "https://makerdao.world/en/resources/",
      description: translateMessageId(
        "page-stablecoins-accordion-earn-project-2-description",
        intl
      ),
      alt: translateMessageId("makerdao-logo", intl),
    },
    {
      title: translateMessageId(
        "page-stablecoins-accordion-earn-project-bug-bounties",
        intl
      ),
      image: getImage(data.eth)!,
      link: "/bug-bounty/",
      description: translateMessageId(
        "page-stablecoins-accordion-earn-project-3-description",
        intl
      ),
      alt: translateMessageId("ethereum-logo", intl),
    },
  ]

  const exchanges: Array<CardListItem> = [
    {
      title: "Coinbase",
      image: getImage(data.coinbase)!,
      link: "https://coinbase.com",
      alt: translateMessageId("coinbase-logo", intl),
    },
    {
      title: "Gemini",
      image: getImage(data.gemini)!,
      link: "https://gemini.com",
      alt: translateMessageId("gemini-logo", intl),
    },
    {
      title: "Kraken",
      image: getImage(data.kraken)!,
      link: "https://kraken.com",
      alt: translateMessageId("kraken-logo", intl),
    },
    {
      title: "Coinmama",
      image: getImage(data.coinmama)!,
      link: "https://coinmama.com",
      alt: translateMessageId("coinmama-logo", intl),
    },
    {
      title: "Bittrex",
      image: getImage(data.bittrex)!,
      link: "https://global.bittrex.com",
      alt: translateMessageId("bittrex-logo", intl),
    },
    {
      title: "Binance",
      image: getImage(data.binance)!,
      link: "https://binance.com",
      alt: translateMessageId("binance-logo", intl),
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
