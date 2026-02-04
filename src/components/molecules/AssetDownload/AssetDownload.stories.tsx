import type { Meta, StoryObj } from "@storybook/react"

import AssetDownload from "."

import ethDiamondBlack from "@/public/images/assets/eth-diamond-black.png"
import hero from "@/public/images/home/hero.png"

const meta = {
  title: "Molecules / Display Content / AssetDownload",
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
    image: hero,
    artistName: "Liam Cobb",
    artistUrl: "https://liamcobb.com/",
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
