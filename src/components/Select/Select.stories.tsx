import { Box, HStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Select from "."

type SelectType = typeof Select

const meta = {
  title: "Atoms / Form / Dropdown",
  component: Select,
  decorators: [
    (Story) => (
      <Box w="lg">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<SelectType>

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
  },
  render: (args) => (
    <HStack spacing={4}>
      <Select {...args} />
      <Select {...args} variant="outline" />
    </HStack>
  ),
}
