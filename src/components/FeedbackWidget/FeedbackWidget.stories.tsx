import * as React from "react"
import { Box, Stack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "@storybook/test"

import FeedbackWidget from "./"

const meta = {
  title: "FeedbackWidget",
  parameters: {
    layout: "fullscreen",
  },
  component: FeedbackWidget,
  decorators: [
    (Story) => (
      <Stack minH="100vh" position="relative">
        <Box flex="1" />
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof FeedbackWidget>

export default meta

type Story = StoryObj<typeof meta>

export const WidgetButton: Story = {
  render: () => <FeedbackWidget />,
}

export const WidgetModal: Story = {
  render: () => <FeedbackWidget />,
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
