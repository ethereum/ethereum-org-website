import * as React from "react"
import { BsSlashSquare } from "react-icons/bs"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Input from "."

type InputType = typeof Input

const meta = {
  title: "Atoms / Form / Input",
  component: Input,
} satisfies Meta<InputType>

export default meta

type Story = StoryObj<InputType>

export const Sizes: Story = {
  args: {
    rightIcon: <BsSlashSquare />,
    placeholder: "Search",
  },
  render: (args) => (
    <VStack width="154px">
      <Input {...args} />
      <Input {...args} size="sm" />
    </VStack>
  ),
}

export const ElementVariations: Story = {
  args: {
    placeholder: "input text",
  },
  render: (args) => (
    <VStack width="258px" spacing={4}>
      <Input {...args} />
      <Input {...args} rightIcon={<BsSlashSquare />} />
      <Input {...args} rightIcon={<BsSlashSquare />} isDisabled />
    </VStack>
  ),
}
