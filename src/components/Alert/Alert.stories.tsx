import * as React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Alert from "."

const meta = {
  title: "Molecules / Action Feedback / Alerts",
  component: Alert,
  decorators: [
    (Story) => (
      <Flex flexDir="column" gap={4} width="3xl">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

const DEMO_DESC = "This is an alert to be used in the top of the content"

const STATUSES = ["error", "success", "warning", "info"] as const

export const StatusVariants: Story = {
  args: {
    description: DEMO_DESC,
    onClose: () => {},
  },
  render: (args) => (
    <>
      {STATUSES.map((status) => (
        <Alert key={status} status={status} {...args} />
      ))}
    </>
  ),
}

export const ContentVariants: Story = {
  args: {
    description: DEMO_DESC,
  },
  render: (args) => (
    <>
      <Alert {...args} />
      <Alert hasIcon={false} {...args} />
      <Alert maxW="sm" onClose={() => {}} {...args} />
    </>
  ),
}

export const StyleVariants: Story = {
  args: {
    description: DEMO_DESC,
    onClose: () => {},
  },
  argTypes: {
    status: {
      options: STATUSES,
      control: {
        type: "radio",
      },
    },
  },
  render: (args) => (
    <>
      <Box>
        <Text>Solid</Text>
        <Alert {...args} />
      </Box>
      <Box>
        <Text>Subtle</Text>
        <Alert variant="subtle" {...args} />
      </Box>
    </>
  ),
}
