import * as React from "react"
import { Box, Stack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import FeedbackWidgetComponent from "./"

const meta = {
  title: "FeedbackWidget",
  parameters: {
    layout: "fullscreen",
  },
  component: FeedbackWidgetComponent,
  decorators: [
    (Story) => (
      <Stack minH="100vh" position="relative">
        <Box flex="1" />
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof FeedbackWidgetComponent>

export default meta

export const FeedbackWidget: StoryObj<typeof meta> = {}
