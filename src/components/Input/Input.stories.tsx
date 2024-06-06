import * as React from "react"
import { BsSlashSquare } from "react-icons/bs"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Input from "."

const meta = {
  title: "Atoms / Form / Input",
  component: Input,
  args: {
    rightIcon: <BsSlashSquare />,
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  args: {
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
      <Input {...args} rightIcon={undefined} />
      <Input {...args} />
      <Input {...args} isDisabled />
    </VStack>
  ),
}
