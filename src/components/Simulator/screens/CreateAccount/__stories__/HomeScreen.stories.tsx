import type { Meta, StoryObj } from "@storybook/react/*"
import { fn } from "@storybook/test"

import { HomeScreen as Component } from "../HomeScreen"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / HomeScreen",
  component: Component,
  args: {
    nav: {
      step: 0,
      totalSteps: 2,
      progressStepper: fn(),
      openPath: fn(),
      regressStepper: fn(),
    },
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const StepZero: Story = {}
export const StepOne: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 1,
    },
  },
}
