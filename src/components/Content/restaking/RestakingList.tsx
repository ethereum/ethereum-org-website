import ProductListComponent from "@/components/ProductList"
import { ButtonLink } from "@/components/ui/buttons/Button"

import eigenLayer from "@/public/images/use-cases/eigen-layer-logo.png"
import symbiotic from "@/public/images/use-cases/symbiotic-logo.png"

export const RestakingList = () => {
  const productListSets = [
    {
      title: "EigenLayer (Restaking Platform)",
      description: "",
      image: eigenLayer,
      alt: "eigen layer logo",
      contentItems: [
        <p key="eigenlayer-description">
          EigenLayer introduced the idea of restaking in 2023 and has grown to
          thousands of people restaking millions of ETH. Referred to as
          “Ethereum middleware”, it connects stakers, operators and AVSs.
        </p>,
        <div key="eigenlayer-button">
          <ButtonLink href="https://eigenlayer.xyz/" variant="outline">
            Visit EigenLayer
          </ButtonLink>
        </div>,
      ],
    },
    {
      title: "Symbiotic (Restaking platform)",
      description: "",
      image: symbiotic,
      alt: "Symbiotic logo",
      contentItems: [
        <p key="symbiotic-description">
          Symbiotic is a permissionless restaking protocol that helps secure
          different blockchain networks by letting users “restake” their assets.
        </p>,
        <div key="symbiotic-button">
          <ButtonLink href="https://symbiotic.fi/" variant="outline">
            Visit Symbiotic
          </ButtonLink>
        </div>,
      ],
    },
  ]

  return <ProductListComponent content={productListSets} actionLabel="Go" />
}
