import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import FeedbackWidgetComponent from "."
import { Box, Stack } from "@chakra-ui/react"

type FeedbackWidgetType = typeof FeedbackWidgetComponent

const meta = {
  title: "FeedbackWidget",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Stack minH="100vh" position="relative">
        <Box flex="1" />
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<FeedbackWidgetType>

export default meta

export const FeedbackWidget: StoryObj<FeedbackWidgetType> = {
  render: () => <FeedbackWidgetComponent location="" />,
}
