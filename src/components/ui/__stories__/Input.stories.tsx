import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import Input from "../input"

const meta = {
  title: "UI / Primitives / Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          "Single-line text input. Variants: `size: md|sm` and `hasError: true|false`. Pair with a sibling helper text element when validation guidance is needed.",
      },
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: { placeholder: "Search" },
  render: (args) => (
    <div className="w-[258px]">
      <Input {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  args: { placeholder: "Search" },
  render: (args) => (
    <VStack className="w-[258px] gap-4">
      <Input {...args} size="md" />
      <Input {...args} size="sm" />
    </VStack>
  ),
}

export const HasError: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: { placeholder: "Required" },
  render: (args) => (
    <VStack className="w-[258px] gap-4">
      <Input {...args} hasError={false} />
      <Input {...args} hasError />
    </VStack>
  ),
}

export const Disabled: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: { placeholder: "Cannot edit" },
  render: (args) => (
    <VStack className="w-[258px] gap-4">
      <Input {...args} disabled />
      <Input {...args} disabled defaultValue="Pre-filled" />
    </VStack>
  ),
}

export const AutoFocus: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: { placeholder: "Focused on mount", autoFocus: true },
  render: (args) => (
    <div className="w-[258px]">
      <Input {...args} />
    </div>
  ),
}

export const WithHelperText: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "Helper text and error text are rendered as sibling elements. The error tone pairs with `hasError`.",
      },
    },
  },
  render: () => (
    <VStack className="w-[258px] gap-6">
      <div className="space-y-1">
        <Input placeholder="username" />
        <p className="text-xs text-body-medium">3 to 16 characters.</p>
      </div>
      <div className="space-y-1">
        <Input hasError placeholder="username" />
        <p className="text-xs text-error">Username is already taken.</p>
      </div>
    </VStack>
  ),
}
