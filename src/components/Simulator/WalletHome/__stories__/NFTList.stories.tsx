import type { Meta, StoryObj } from "@storybook/react/*"

import { NFTList as Component } from "../NFTList"

import NFTImage from "@/public/images/deep-panic.png"

const meta = {
  title: "Molecules / Display Content / Simulator / WalletHome / NFTList",
  component: Component,
  decorators: [
    (Story) => (
      <div className="w-full max-w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Component>

export default meta

export const NFTList: StoryObj = {
  args: {
    nfts: Array.from({ length: 5 }, () => ({
      title: "Cool art",
      image: NFTImage,
    })),
  },
}
