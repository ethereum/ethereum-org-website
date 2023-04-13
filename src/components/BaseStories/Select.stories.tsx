import * as React from "react"
import { Select as SelectComponent, VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

const selectData = [
  { label: "Ethereum", value: "eth" },
  { label: "Bitcoin", value: "bit" },
  { label: "Dogecoin", value: "doge" },
]

type SelectType = typeof SelectComponent

const meta: Meta<SelectType> = {
  title: "Atoms / Form / Select",
  component: SelectComponent,
}

export default meta

type Story = StoryObj<SelectType>

export const Select: Story = {
  args: {
    minW: "223px",
  },
  render: (args) => (
    <VStack spacing={8}>
      <SelectComponent {...args}>
        {selectData.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectComponent>
      <SelectComponent variant="flushed" {...args}>
        {selectData.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </SelectComponent>
    </VStack>
  ),
}
