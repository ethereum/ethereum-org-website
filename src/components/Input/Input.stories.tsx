import * as React from "react"
import { VStack } from "@chakra-ui/react"
import { Meta } from "@storybook/react"
import Input from "."
import { BsSlashSquare } from "react-icons/bs"

const meta = {
  title: "Atoms / Form / Input",
  component: Input,
} satisfies Meta<typeof Input>

export default meta

export const Sizes = {
  render: () => (
    <VStack width="154px">
      <Input rightIcon={<BsSlashSquare />} placeholder="Search" />
      <Input rightIcon={<BsSlashSquare />} placeholder="Search" size="sm" />
    </VStack>
  ),
}

export const ElementVariations = {
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
