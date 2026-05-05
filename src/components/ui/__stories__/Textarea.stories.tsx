import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import { Textarea } from "../textarea"

const meta = {
  title: "UI / Primitives / Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component:
          "Multi-line text input. Mirrors `Input` variants: `size: md|sm` and `hasError: true|false`. Pair with a sibling helper text element to communicate validation or guidance.",
      },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Tell us what you think",
  },
  render: (args) => (
    <div className="w-[320px]">
      <Textarea {...args} />
    </div>
  ),
}

export const Sizes: Story = {
  args: {
    placeholder: "Type here",
  },
  render: (args) => (
    <VStack className="w-[320px] gap-4">
      <Textarea {...args} size="md" />
      <Textarea {...args} size="sm" />
    </VStack>
  ),
}

export const HasError: Story = {
  args: {
    placeholder: "Type here",
  },
  render: (args) => (
    <VStack className="w-[320px] gap-4">
      <Textarea {...args} hasError={false} />
      <Textarea {...args} hasError />
    </VStack>
  ),
}

export const WithoutPlaceholder: Story = {
  render: () => (
    <div className="w-[320px]">
      <Textarea defaultValue="Pre-filled content. No placeholder needed when a default value is provided." />
    </div>
  ),
}

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Textarea` does not bundle helper text; pair it with a sibling element. Use a neutral tone for guidance and the error tone when paired with `hasError`.",
      },
    },
  },
  render: () => (
    <VStack className="w-[320px] gap-6">
      <div className="space-y-1">
        <Textarea placeholder="Describe the issue" />
        <p className="text-xs text-body-medium">
          Include steps to reproduce. Markdown is supported.
        </p>
      </div>
      <div className="space-y-1">
        <Textarea hasError placeholder="Required" />
        <p className="text-xs text-error">This field is required.</p>
      </div>
    </VStack>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[320px]">
      <Textarea
        disabled
        defaultValue="Disabled textarea content cannot be edited."
      />
    </div>
  ),
}
