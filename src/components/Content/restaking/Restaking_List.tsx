import ProductListComponent from "@/components/ProductList"
import { ButtonLink } from "@/components/ui/buttons/Button"

import eigen_layer from "@/public/images/EigenLayer-logo.png"
import Lido from "@/public/images/use-cases/Lido.png"
import Obol from "@/public/images/use-cases/Obol.png"
import Omni from "@/public/images/use-cases/Omni.png"
import Symbiotic from "@/public/images/use-cases/Symbiotic.png"





export const Restaking_List = () => {
    const productListSets = [
        {
            title: "Symbiotic (Restaking platform)",
            description: "",
            image: Symbiotic,
            alt: "Symbiotic logo",
            contentItems: [
                <p key="symbiotic-description">
                    Symbiotic is a permissionless restaking protocol that helps secure different blockchain networks by letting users “restake” their assets.
                </p>,
                <div key="symbiotic-button">
                    <ButtonLink
                        href="https://symbiotic.fi/"
                        target="_blank"
                        variant="outline"
                    >
                        Visit Symbiotic
                    </ButtonLink>
                </div>,
            ],
        },
        {
            title: "Omni Network (AVS)",
            description: "",
            image: Omni,
            alt: "Omni logo",
            contentItems: [
                <p key="omni-description">
                    Omni Network is an AVS that uses EigenLayer to secure messaging between Ethereum and other blockchains. Operators guarantee delivery of these messages in return for OMNI tokens.
                </p>,
                <div key="omni-button">
                    <ButtonLink
                        href="https://omni.network/"
                        target="_blank"
                        variant="outline"
                    >
                        Visit Omni
                    </ButtonLink>
                </div>,
            ],
        },
        {
            title: "Obol Network (Operator)",
            description: "",
            image: Obol,
            alt: "Obol logo",
            contentItems: [
                <p key="obol-description">
                    Obol Network is an EigenLayer operator. They use a unique set up that splits the work from an AVS across multiple operators, improving stability and reducing the chance of issues like downtime.
                </p>,
                <div key="omni-button">
                    <ButtonLink
                        href="https://obol.org/"
                        target="_blank"
                        variant="outline"
                    >
                        Visit Obol
                    </ButtonLink>
                </div>,
            ],
        },
        {
            title: "Lido (LSP)",
            description: "",
            image: Lido,
            alt: "Lido logo",
            contentItems: [
                <p key="lido-description">
                    Lido is a Liquid Staking Protocol (LSP) on Ethereum that lets people use their ETH while staking it on Ethereum. Users who stake ETH through Lido receive stETH tokens, that they can use for restaking and DeFi lending.
                </p>,
                <div key="lido-button">
                    <ButtonLink
                        href="https://lido.fi/"
                        target="_blank"
                        variant="outline"
                    >
                        Visit Lido
                    </ButtonLink>
                </div>,
            ],
        },
    ]

    return <ProductListComponent content={productListSets} actionLabel="Go" />
}

export const Eigen_Layer = () => {
    const productListSets = [
        {
            title: "EigenLayer (Restaking Platform)",
            description: "",
            image: eigen_layer,
            alt: "eigen_layer logo",
            contentItems: [
                <p key="symbiotic-description">
                    EigenLayer introduced the idea of restaking in 2023 and has grown to thousands of people restaking millions of ETH. Referred to as “Ethereum middleware”, it connects stakers, operators and AVSs.          </p>,
                <div key="symbiotic-button">
                    <ButtonLink
                        href="https://www.eigenlayer.xyz/"
                        target="_blank"
                        variant="outline"
                    >
                        Visit EigenLayer
                    </ButtonLink>
                </div>,
            ],
        },

    ]

    return <ProductListComponent content={productListSets} actionLabel="Go" />
}
