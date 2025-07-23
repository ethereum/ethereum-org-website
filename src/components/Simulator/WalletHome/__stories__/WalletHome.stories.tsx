import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"

import { defaultTokenBalances } from "../../constants"
import { Phone } from "../../Phone"
import { Template } from "../../Template"
import { WalletHome as Component } from ".."

import NFTImage from "@/public/images/deep-panic.png"

const meta = {
  title: "Molecules / Display Content / Simulator / WalletHome",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mt-8">
        <Template>
          <Phone>
            <Story />
          </Phone>
        </Template>
      </div>
    ),
  ],
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ActiveButton: Story = {
  args: {
    isEnabled: [false, true],
    nav: {
      openPath: fn(),
      progressStepper: fn(),
      regressStepper: fn(),
      step: 0,
      totalSteps: 2,
    },
  },
}

export const NFTTab: Story = {
  args: {
    tokenBalances: defaultTokenBalances,
    activeTabIndex: 1,
    setActiveTabIndex: fn(),
    nfts: [
      {
        title: "Cool art",
        image: NFTImage,
      },
    ],
  },
}
export const NFTTabEmpty: Story = {
  args: {
    ...NFTTab.args,
    nfts: [],
  },
}
