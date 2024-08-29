import { Meta, StoryObj } from "@storybook/react"

import { HStack } from "../flex"
import Select from "../Select"

const meta = {
  title: "Atoms / Form / ShadCN Dropdown",
  component: Select,
  parameters: {
    // TODO: Remove this when this story file becomes the primary one
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <div className="w-[32rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

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
    <HStack className="gap-4">
      <Select {...args} />
      <Select {...args} variant="outline" />
    </HStack>
  ),
}
