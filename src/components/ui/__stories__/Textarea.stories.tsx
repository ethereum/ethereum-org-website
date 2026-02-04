import type { Meta, StoryObj } from "@storybook/react"

import { VStack } from "@/components/atoms/flex"

import { Textarea } from "../textarea"

const meta = {
  title: "Atoms / Form / Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Sizes: Story = {
  args: {
    placeholder: "Enter your message...",
  },
  render: (args) => (
    <VStack className="w-[320px] gap-4">
      <Textarea {...args} />
      <Textarea {...args} size="sm" />
    </VStack>
  ),
}

export const States: Story = {
  args: {
    placeholder: "Enter your message...",
  },
  render: (args) => (
    <VStack className="w-[320px] gap-4">
      <Textarea {...args} />
      <Textarea {...args} disabled />
    </VStack>
  ),
}

export const ErrorState: Story = {
  args: {
    placeholder: "Enter your message...",
  },
  render: (args) => (
    <VStack className="w-[320px] gap-4">
      <Textarea {...args} hasError />
      <Textarea {...args} hasError size="sm" />
    </VStack>
  ),
}
