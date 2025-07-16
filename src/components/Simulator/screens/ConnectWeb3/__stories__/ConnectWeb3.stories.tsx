import type { Meta, StoryObj } from "@storybook/react/*"
import { fn } from "@storybook/test"

import { Phone } from "@/components/Simulator/Phone"
import { Template } from "@/components/Simulator/Template"

import { ConnectWeb3 as Component } from "../"

const meta = {
  title: "Molecules / Display Content / Simulator / ConnectWeb3 Screen",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto mt-8">
        <Template>
          <Phone>
            <Story />
          </Phone>
        </Template>
      </div>
    ),
  ],
  args: {
    nav: {
      progressStepper: fn(),
      step: 0,
      openPath: fn(),
      regressStepper: fn(),
      totalSteps: 3,
    },
    ctaLabel: "Visit NFT market",
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Initial: Story = {}

export const SliderNotConnected: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 2,
    },
    ctaLabel: "Connect to app",
  },
}

export const SliderConnected: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 3,
    },
    ctaLabel: "Go to account",
  },
}
export const Account: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 4,
    },
    ctaLabel: "Finished",
  },
}
