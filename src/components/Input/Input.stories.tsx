import * as React from "react"
import { BsSlashSquare } from "react-icons/bs"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Input from "."

type InputType = typeof Input

const meta: Meta<InputType> = {
  title: "Atoms / Form / Input",
  component: Input,
}

export default meta

type Story = StoryObj<InputType>

export const Sizes: Story = {
  render: () => (
    <VStack width="154px">
      <Input rightIcon={<BsSlashSquare />} placeholder="Search" />
      <Input rightIcon={<BsSlashSquare />} placeholder="Search" size="sm" />
    </VStack>
  ),
}

export const ElementVariations: Story = {
  render: () => (
    <VStack width="258px" spacing={4}>
      <Input placeholder="input text" />
      <Input rightIcon={<BsSlashSquare />} placeholder="input text" />
      <Input
        rightIcon={<BsSlashSquare />}
        placeholder="input text"
        isDisabled
      />
    </VStack>
  ),
}
