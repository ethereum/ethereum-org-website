import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "@/components/ui/flex"

import { ChevronNext, ChevronPrev } from "."

const meta = {
  title: "Components / Chevron",
  component: ChevronNext,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "RTL-aware chevrons -- Lucide `ChevronRight`/`ChevronLeft` with `rtl:-scale-x-100` baked in, so `ChevronNext` always points forward. The chevron counterpart to `ArrowNext`/`ArrowPrev` (`@/components/ui/arrow`): reach for a chevron on compact affordances (carousel controls, disclosure, breadcrumb separators) and an arrow for prominent forward links.",
      },
    },
  },
} satisfies Meta<typeof ChevronNext>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HStack className="gap-6">
      <VStack className="gap-1">
        <ChevronPrev />
        <span className="text-xs text-body-medium">ChevronPrev</span>
      </VStack>
      <VStack className="gap-1">
        <ChevronNext />
        <span className="text-xs text-body-medium">ChevronNext</span>
      </VStack>
    </HStack>
  ),
}

export const DirectionAware: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The glyphs mirror in an RTL container, so `ChevronNext` keeps pointing in the reading direction.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-6">
      {(["ltr", "rtl"] as const).map((dir) => (
        <VStack key={dir} dir={dir} className="items-start gap-1">
          <HStack className="gap-4">
            <ChevronPrev />
            <ChevronNext />
          </HStack>
          <span className="text-xs text-body-medium uppercase">{dir}</span>
        </VStack>
      ))}
    </VStack>
  ),
}
