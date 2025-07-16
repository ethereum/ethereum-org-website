import type { Meta, StoryObj } from "@storybook/react/*"
import {
  expect,
  fn,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test"

import { PhoneDecorator } from "@/components/Simulator/__stories__/PhoneDecorator"

import { BUTTON_DELAY_DURATION } from "../constants"
import { GeneratingKeys } from "../GeneratingKeys"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / GeneratingKeys",
  component: GeneratingKeys,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    ctaLabel: "Next",
    nav: {
      openPath: fn(),
      progressStepper: fn(),
      regressStepper: fn(),
      step: 0,
      totalSteps: 2,
    },
    generateNewWords: fn(),
  },
  decorators: [PhoneDecorator],
} satisfies Meta<typeof GeneratingKeys>

export default meta

type Story = StoryObj<typeof meta>

export const Loading: Story = {}

export const LoadingDoneCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitForElementToBeRemoved(canvas.getByTestId("loading-spinner"), {
      timeout: BUTTON_DELAY_DURATION + 1000,
    })

    await waitFor(
      () => {
        expect(canvas.getByTestId("generating-keys-cta")).toBeInTheDocument()
      },
      {
        timeout: 1500,
      }
    )
  },
}
