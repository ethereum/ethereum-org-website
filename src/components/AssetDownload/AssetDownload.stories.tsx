import type { Meta, StoryObj } from "@storybook/react"

import AssetDownload from "."

import ethDiamondBlack from "@/public/images/assets/eth-diamond-black.png"

const meta = {
  title: "Components/AssetDownload",
  component: AssetDownload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AssetDownload>

export default meta

type Story = StoryObj<typeof meta>

export const WithArtist: Story = {
  args: {
    title: "Ethereum hero",
    alt: "Ethereum hero",
    image: ethDiamondBlack,
    artistName: "Liam Cobb",
    artistUrl: "https://liamcobb.com/",
    svgUrl: "/images/assets/svgs/eth-diamond-black.svg",
  },
}

export const BrandAsset: Story = {
  args: {
    title: "ETH Diamond Glyph",
    alt: "ETH Diamond Glyph",
    image: ethDiamondBlack,
    svgUrl: "/images/assets/svgs/eth-diamond-glyph.svg",
  },
}
