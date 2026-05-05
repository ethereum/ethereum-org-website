import { ChevronRight, Circle, Download } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { ButtonTwoLines } from "../buttons/ButtonTwoLines"
import { HStack, Stack } from "../flex"

const meta = {
  title: "UI / ButtonTwoLines",
  component: ButtonTwoLines,
  args: {
    icon: Circle,
    mainText: "Main text",
    helperText: "Helper text",
    className: "w-[300px]",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Button with a primary line of text and a secondary helper line, plus an icon. `variant` is restricted to `solid | outline`; `size` to `md | sm`. `iconAlignment` accepts `start | end | left | right`. `reverseTextOrder` flips main and helper text vertically.",
      },
    },
  },
} satisfies Meta<typeof ButtonTwoLines>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <Stack className="gap-4">
      <ButtonTwoLines variant="solid" {...args} />
      <ButtonTwoLines variant="outline" {...args} />
    </Stack>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Stack className="gap-4">
      <ButtonTwoLines size="md" {...args} />
      <ButtonTwoLines size="sm" {...args} />
    </Stack>
  ),
}

export const VariantSizeMatrix: Story = {
  render: (args) => (
    <HStack className="items-start gap-4">
      <Stack className="gap-4">
        <ButtonTwoLines variant="solid" size="md" {...args} />
        <ButtonTwoLines variant="solid" size="sm" {...args} />
      </Stack>
      <Stack className="gap-4">
        <ButtonTwoLines variant="outline" size="md" {...args} />
        <ButtonTwoLines variant="outline" size="sm" {...args} />
      </Stack>
    </HStack>
  ),
}

export const IconAlignmentEnd: Story = {
  args: { iconAlignment: "end" },
}

export const ReverseTextOrder: Story = {
  parameters: {
    docs: {
      description: {
        story: "`reverseTextOrder` puts the helper text above the main text.",
      },
    },
  },
  args: { reverseTextOrder: true },
}

export const VariousIcons: Story = {
  render: (args) => (
    <Stack className="gap-4">
      <ButtonTwoLines
        {...args}
        icon={Download}
        mainText="Download"
        helperText="PDF, 2.4 MB"
      />
      <ButtonTwoLines
        {...args}
        icon={ChevronRight}
        mainText="Continue"
        helperText="Step 3 of 5"
        iconAlignment="end"
      />
    </Stack>
  ),
}
