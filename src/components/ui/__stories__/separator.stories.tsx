import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "../flex"
import { Separator } from "../separator"

const meta = {
  title: "UI / Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Radix Separator -- a hairline `bg-border` rule for dividing content *within* a component (menus, button groups, inline metadata). For a page- or section-level rule with vertical rhythm, use `HR` instead. Defaults to `decorative` (aria-hidden); pass `decorative={false}` when the divide carries real meaning for assistive tech.",
      },
    },
  },
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <VStack className="w-72 items-stretch gap-4">
      <span>Above</span>
      <Separator />
      <span>Below</span>
    </VStack>
  ),
}

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`orientation="vertical"` renders a `w-px` full-height rule. The parent must establish a height -- here `h-5` on the row.',
      },
    },
  },
  render: () => (
    <HStack className="h-5 items-center gap-4 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Tutorials</span>
      <Separator orientation="vertical" />
      <span>Glossary</span>
    </HStack>
  ),
}
