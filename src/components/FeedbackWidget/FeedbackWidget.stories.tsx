import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "@storybook/test"

import { Stack } from "../ui/flex"

import FeedbackWidget from "./"

const meta = {
  title: "FeedbackWidget",
  parameters: {
    layout: "fullscreen",
  },
  component: FeedbackWidget,
  decorators: [
    (Story) => (
      <Stack className="relative min-h-[100vh] gap-0">
        <div className="flex-1" />
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof FeedbackWidget>

export default meta

type Story = StoryObj<typeof meta>

export const WidgetButton: Story = {}

export const WidgetModal: Story = {
  play: async ({ canvasElement }) => {
    // Add delay for snapshot capture of the modal
    const canvas = within(canvasElement)
    const canvasParent = within(canvasElement.parentElement!)

    const feedbackButton = canvas.getByTestId("feedback-widget-button")

    fireEvent.click(feedbackButton)

    await waitFor(async () => {
      await expect(
        canvasParent.getByTestId("feedback-widget-modal")
      ).toBeVisible()
    })
  },
}
