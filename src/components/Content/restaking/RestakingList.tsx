import ProductListComponent from "@/components/ProductList"
import { ButtonLink } from "@/components/ui/buttons/Button"

import eigenLayer from "@/public/images/use-cases/eigen-layer-logo.png"
import lido from "@/public/images/use-cases/lido-logo.png"
import obol from "@/public/images/use-cases/obol-logo.png"
import omni from "@/public/images/use-cases/omni-logo.png"
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
    {
      title: "Omni Network (AVS)",
      description: "",
      image: omni,
      alt: "Omni logo",
      contentItems: [
        <p key="omni-description">
          Omni Network is an AVS that uses EigenLayer to secure messaging
          between Ethereum and other blockchains. Operators guarantee delivery
          of these messages in return for OMNI tokens.
        </p>,
        <div key="omni-button">
          <ButtonLink href="https://omni.network/" variant="outline">
            Visit Omni
          </ButtonLink>
        </div>,
      ],
    },
    {
      title: "Obol Network (Operator)",
      description: "",
      image: obol,
      alt: "Obol logo",
      contentItems: [
        <p key="obol-description">
          Obol Network is an EigenLayer operator. They use a unique set up that
          splits the work from an AVS across multiple operators, improving
          stability and reducing the chance of issues like downtime.
        </p>,
        <div key="omni-button">
          <ButtonLink href="https://obol.org/" variant="outline">
            Visit Obol
          </ButtonLink>
        </div>,
      ],
    },
    {
      title: "Lido (LSP)",
      description: "",
      image: lido,
      alt: "Lido logo",
      contentItems: [
        <p key="lido-description">
          Lido is a Liquid Staking Protocol (LSP) on Ethereum that lets people
          use their ETH while staking it on Ethereum. Users who stake ETH
          through Lido receive stETH tokens, that they can use for restaking and
          DeFi lending.
        </p>,
        <div key="lido-button">
          <ButtonLink href="https://lido.fi/" variant="outline">
            Visit Lido
          </ButtonLink>
        </div>,
      ],
    },
  ]

  return <ProductListComponent content={productListSets} actionLabel="Go" />
}
