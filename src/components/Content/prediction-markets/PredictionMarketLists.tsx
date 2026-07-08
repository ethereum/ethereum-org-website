import ProductListComponent from "@/components/ProductList"
import { ButtonLink } from "@/components/ui/buttons/Button"

import auger from "@/public/images/dapps/auger.png"
import kalshi from "@/public/images/dapps/kalshi.png"
import polymarket from "@/public/images/dapps/polymarket.png"

const PredictionMarketLists = () => {
  const productListSets = [
    {
      title: "Polymarket",
      description: "",
      image: polymarket,
      alt: "Polymarket logo",
      contentItems: [
        <p key="polymarket-description">
          A popular forecasting market with real-time trading.
        </p>,
        <div key="polymarket-button">
          <ButtonLink
            href="https://polymarket.com/"
            target="_blank"
            variant="outline"
          >
            Explore Polymarket
          </ButtonLink>
        </div>,
      ],
    },
    {
      title: "Augur",
      description: "",
      image: auger,
      alt: "Augur logo",
      contentItems: [
        <p key="auger-description">
          A fully decentralized prediction market protocol used for predicting
          price trends. Disclaimer: you will need some technical expertise to
          start using Augur.
        </p>,
        <div key="auger-button">
          <ButtonLink
            href="https://github.com/AugurProject"
            target="_blank"
            variant="outline"
          >
            Dive into Augur
          </ButtonLink>
        </div>,
      ],
    },
    {
      title: "Kalshi",
      description: "",
      image: kalshi,
      alt: "Kalshi logo",
      contentItems: [
        <p key="kalshi-description">
          a CFTC-compliant platform using Ethereum for USDC deposits. (USA only)
        </p>,
        <div key="kalshi-button">
          <ButtonLink
            href="https://kalshi.com/"
            target="_blank"
            variant="outline"
          >
            Try Kalshi
          </ButtonLink>
        </div>,
      ],
    },
  ]

  return <ProductListComponent content={productListSets} actionLabel="Go" />
}

export default PredictionMarketLists
