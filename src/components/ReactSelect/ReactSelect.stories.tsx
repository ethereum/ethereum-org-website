import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import ReactSelect from "."
import { Box, HStack } from "@chakra-ui/react"

type DropdownType = typeof ReactSelect

const meta = {
  title: "Atoms / Forms / Dropdown",
  component: ReactSelect,
  decorators: [
    (Story) => (
      <Box w="32rem">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<DropdownType>

export default meta

type Story = StoryObj<typeof meta>

export const Dropdown: Story = {
  args: {
    options: [
      {
        options: [
          { label: "Ethereum", value: "eth" },
          { label: "Bitcoin", value: "bit" },
          { label: "Dogecoin", value: "doge" },
        ],
      },
      {
        label: "Layer2 Options",
        options: [
          { label: "Mainnet", value: "mainnet" },
          { label: "Arbitrum", value: "arbitrum" },
          { label: "Optimism", value: "optimism" },
        ],
      },
    ],
    defaultValue: { label: "Ethereum", value: "eth" },
  },
  render: (args) => (
    <HStack spacing={4}>
      <ReactSelect {...args} />
      <ReactSelect {...args} variant="outline" />
    </HStack>
  ),
}
