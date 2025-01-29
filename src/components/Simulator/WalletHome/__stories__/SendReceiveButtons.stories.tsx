import type { Meta, StoryObj } from "@storybook/react/*"
import { fn } from "@storybook/test"

import { SendReceiveButtons as Component } from "../SendReceiveButtons"

const meta = {
  title:
    "Molecules / Display Content / Simulator / WalletHome / SendReceiveButtons",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const SendReceiveButtons: StoryObj<typeof meta> = {
  args: {
    isEnabled: [false, true],
    nav: {
      progressStepper: fn(),
      openPath: fn(),
      step: 0,
      regressStepper: fn(),
      totalSteps: 1,
    },
  },
}
