import { getTranslations } from "next-intl/server"

import ProductListComponent, {
  type ProductListContent,
} from "@/components/ProductList"

import auger from "@/public/images/dapps/auger.png"
import kalshi from "@/public/images/dapps/kalshi.png"
import polymarket from "@/public/images/dapps/polymarket.png"

const PredictionMarketLists = async () => {
  const t = await getTranslations("component-prediction-market-products")

  const productListSets = [
    {
      title: t("polymarket-title"),
      description: t("polymarket-description"),
      image: polymarket,
      href: "https://polymarket.com/",
      ctaLabel: t("polymarket-cta"),
    },
    {
      title: t("augur-title"),
      description: t("augur-description"),
      image: auger,
      href: "https://github.com/AugurProject",
      ctaLabel: t("augur-cta"),
    },
    {
      title: t("kalshi-title"),
      description: t("kalshi-description"),
      image: kalshi,
      href: "https://kalshi.com/",
      ctaLabel: t("kalshi-cta"),
    },
  ] satisfies ProductListContent[]

  return <ProductListComponent content={productListSets} />
}

export default PredictionMarketLists
