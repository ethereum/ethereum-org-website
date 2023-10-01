import * as React from "react"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import SelectComponent from "./"

const selectData = [
  { label: "Ethereum", value: "eth" },
  { label: "Bitcoin", value: "bit" },
  { label: "Dogecoin", value: "doge" },
]

const meta = {
  title: "Atoms / Form / Select",
  component: SelectComponent,
} satisfies Meta<typeof SelectComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Select: Story = {
  args: {
    minW: "223px",
    options: selectData,
    onChange(selectedOption) {
      console.log(selectedOption)
    },
  },
  render: (args) => (
    <VStack spacing={8}>
      <SelectComponent {...args} />
      <SelectComponent variant="flushed" {...args} />
    </VStack>
  ),
}
