import { getTranslations } from "next-intl/server"

import ProductListComponent, {
  type ProductListContent,
} from "@/components/ProductList"

import limitless from "@/public/images/dapps/limitless.png"
import polymarket from "@/public/images/dapps/polymarket.png"

const PredictionMarketLists = async () => {
  const t = await getTranslations("component-prediction-market-products")

  const productListSets = [
    {
      title: t("limitless-title"),
      description: t("limitless-description"),
      image: limitless,
      href: "https://limitless.exchange/",
      ctaLabel: t("limitless-cta"),
    },
    {
      title: t("polymarket-title"),
      description: t("polymarket-description"),
      image: polymarket,
      href: "https://polymarket.com/",
      ctaLabel: t("polymarket-cta"),
    },
  ] satisfies ProductListContent[]

  return <ProductListComponent content={productListSets} />
}

export default PredictionMarketLists
