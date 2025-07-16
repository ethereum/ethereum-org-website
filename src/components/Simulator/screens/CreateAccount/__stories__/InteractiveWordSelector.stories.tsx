import type { Meta, StoryObj } from "@storybook/react/*"
import {
  expect,
  fireEvent,
  fn,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@storybook/test"

import { PhoneDecorator } from "@/components/Simulator/__stories__/PhoneDecorator"

import { InteractiveWordSelector as Component } from "../InteractiveWordSelector"

const meta = {
  title:
    "Molecules / Display Content / Simulator / CreateAccount Screen / InteractiveWordSelector",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [PhoneDecorator],
  args: {
    words: [
      "fake",
      "none",
      "nope",
      "back",
      "stop",
      "halt",
      "cease",
      "wish",
      "wolf",
      "twin",
      "slot",
      "attack",
    ],
    ctaLabel: "Next",
    nav: {
      openPath: fn(),
      progressStepper: fn(),
      regressStepper: fn(),
      step: 0,
      totalSteps: 2,
    },
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WordsSelected: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const firstWord = canvas.getByText("fake")
    const secondWord = canvas.getByText("none")

    await fireEvent.click(firstWord)
    await fireEvent.click(secondWord)

    await waitForElementToBeRemoved(
      canvas.getByTestId("word-selector-buttons"),
      { timeout: 1500 }
    )

    await waitFor(() => {
      expect(canvas.getByTestId("word-selector-cta")).toBeInTheDocument()
    })
  },
}
