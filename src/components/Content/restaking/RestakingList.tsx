import ProductListComponent, {
  type ProductListContent,
} from "@/components/ProductList"

import eigenLayer from "@/public/images/use-cases/eigen-layer-logo.png"
import symbiotic from "@/public/images/use-cases/symbiotic-logo.png"

export const RestakingList = () => {
  const productListSets = [
    {
      title: "EigenLayer (Restaking Platform)",
      description:
        "EigenLayer introduced the idea of restaking in 2023 and has grown to thousands of people restaking millions of ETH. Referred to as “Ethereum middleware”, it connects stakers, operators and AVSs.",
      image: eigenLayer,
      href: "https://eigenlayer.xyz/",
      ctaLabel: "Visit EigenLayer",
    },
    {
      title: "Symbiotic (Restaking platform)",
      description:
        "Symbiotic is a permissionless restaking protocol that helps secure different blockchain networks by letting users “restake” their assets.",
      image: symbiotic,
      href: "https://symbiotic.fi/",
      ctaLabel: "Visit Symbiotic",
    },
  ] satisfies ProductListContent[]

  return <ProductListComponent content={productListSets} />
}
