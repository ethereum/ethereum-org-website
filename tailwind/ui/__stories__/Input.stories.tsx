import type { Meta, StoryObj } from "@storybook/react/*"

import { VStack } from "../../../src/components/ui/flex"
import Input from "../Input"

const meta = {
  title: "Atoms / Form / ShadCN Input",
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  args: {
    placeholder: "Search",
  },
  render: (args) => (
    <VStack className="w-[154px]">
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
    <VStack className="w-[258px] gap-4">
      <Input {...args} autoFocus />
      <Input {...args} disabled />
    </VStack>
  ),
}
