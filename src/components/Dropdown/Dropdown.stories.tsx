import * as React from "react"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import DropdownComponent from "."

type DropdownType = typeof DropdownComponent

const meta: Meta<DropdownType> = {
  title: "Atoms / Form / Dropdown",
  component: DropdownComponent,
}

export default meta

type Story = StoryObj<DropdownType>

export const Dropdown: Story = {
  render: () => (
    <VStack spacing={4}>
      <DropdownComponent />
      <DropdownComponent variant="flushed" />
    </VStack>
  ),
}
