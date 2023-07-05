import * as React from "react"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import Input from "."
import { MdSearch } from "react-icons/md"
import { BsSlashSquare } from "react-icons/bs"

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
      <Input
        leftElement={<MdSearch />}
        rightElement={<BsSlashSquare />}
        placeholder="Search"
      />
      <Input
        leftElement={<MdSearch />}
        rightElement={<BsSlashSquare />}
        placeholder="Search"
        size="sm"
      />
    </VStack>
  ),
}

export const ElementVariations: Story = {
  render: () => (
    <VStack width="258px" spacing={4}>
      <Input
        leftElement={<MdSearch />}
        rightElement={<BsSlashSquare />}
        placeholder="input text"
      />
      <Input leftElement={<MdSearch />} placeholder="input text" />
      <Input placeholder="input text" />
      <Input rightElement={<BsSlashSquare />} placeholder="input text" />
      <Input
        rightElement={<BsSlashSquare />}
        placeholder="input text"
        isDisabled
      />
    </VStack>
  ),
}
