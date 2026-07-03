import ProductListComponent, {
  type ProductListContent,
} from "@/components/ProductList"

import auger from "@/public/images/dapps/auger.png"
import kalshi from "@/public/images/dapps/kalshi.png"
import polymarket from "@/public/images/dapps/polymarket.png"

const PredictionMarketLists = () => {
  const productListSets = [
    {
      title: "Polymarket",
      description: "A popular forecasting market with real-time trading.",
      image: polymarket,
      href: "https://polymarket.com/",
      ctaLabel: "Explore Polymarket",
    },
    {
      title: "Augur",
      description:
        "A fully decentralized prediction market protocol used for predicting price trends. Disclaimer: you will need some technical expertise to start using Augur.",
      image: auger,
      href: "https://github.com/AugurProject",
      ctaLabel: "Dive into Augur",
    },
    {
      title: "Kalshi",
      description:
        "A CFTC-compliant platform using Ethereum for USDC deposits. (USA only)",
      image: kalshi,
      href: "https://kalshi.com/",
      ctaLabel: "Try Kalshi",
    },
  ] satisfies ProductListContent[]

  return <ProductListComponent content={productListSets} />
}

export default PredictionMarketLists
