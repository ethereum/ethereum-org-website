import { getTranslations } from "next-intl/server"

import ProductListComponent, {
  type ProductListContent,
} from "@/components/ProductList"

import eigenLayer from "@/public/images/use-cases/eigen-layer-logo.png"
import symbiotic from "@/public/images/use-cases/symbiotic-logo.png"

export const RestakingList = async () => {
  const t = await getTranslations("component-restaking-products")

  const productListSets = [
    {
      title: t("eigenlayer-title"),
      description: t("eigenlayer-description"),
      image: eigenLayer,
      href: "https://eigenlayer.xyz/",
      ctaLabel: t("visit-brand", { brand: t("eigenlayer-brand") }),
    },
    {
      title: t("symbiotic-title"),
      description: t("symbiotic-description"),
      image: symbiotic,
      href: "https://symbiotic.fi/",
      ctaLabel: t("visit-brand", { brand: t("symbiotic-brand") }),
    },
  ] satisfies ProductListContent[]

  return <ProductListComponent content={productListSets} />
}
