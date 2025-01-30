import pickBy from "lodash/pickBy"
import type { Meta, StoryObj } from "@storybook/react/*"

import { viewportModes } from "../../../../../.storybook/modes"
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
  parameters: {
    chromatic: {
      modes: pickBy(viewportModes, (args) =>
        ["base", "md"].includes(args.viewport)
      ),
    },
  },
} satisfies Meta<typeof Component>

export default meta

export const HasList: StoryObj = {
  args: {
    nfts: Array.from({ length: 5 }, () => ({
      title: "Cool art",
      image: NFTImage,
    })),
  },
}

export const NoNFTs: StoryObj = {
  args: {
    nfts: [],
  },
}
