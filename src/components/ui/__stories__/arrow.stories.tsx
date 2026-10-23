import type { Meta, StoryObj } from "@storybook/nextjs"

import { ArrowNext, ArrowPrev } from "../arrow"
import { HStack, VStack } from "../flex"

const meta = {
  title: "UI / Arrow",
  component: ArrowNext,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "RTL-aware directional arrows -- Lucide `ArrowRight`/`ArrowLeft` with `rtl:-scale-x-100` baked in, so `ArrowNext` always points *forward* and `ArrowPrev` always points *back* regardless of writing direction. Use these for forward/back affordances rather than the raw Lucide icons. Chevron equivalents live in `@/components/Chevron`.",
      },
    },
  },
} satisfies Meta<typeof ArrowNext>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HStack className="gap-6">
      <VStack className="gap-1">
        <ArrowPrev />
        <span className="text-xs text-body-medium">ArrowPrev</span>
      </VStack>
      <VStack className="gap-1">
        <ArrowNext />
        <span className="text-xs text-body-medium">ArrowNext</span>
      </VStack>
    </HStack>
  ),
}

export const DirectionAware: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The same two components in an LTR and an RTL container. The glyphs mirror, so `ArrowNext` keeps pointing in the reading direction -- this is the whole reason to use these over `ArrowRight`/`ArrowLeft` directly.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-6">
      {(["ltr", "rtl"] as const).map((dir) => (
        <VStack key={dir} dir={dir} className="items-start gap-1">
          <HStack className="gap-4">
            <ArrowPrev />
            <ArrowNext />
          </HStack>
          <span className="text-xs text-body-medium uppercase">{dir}</span>
        </VStack>
      ))}
    </VStack>
  ),
}

export const Sized: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Sizing and color come from `className` -- these are plain SVG icons, so Tailwind `size-*` and `text-*` apply.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-4">
      <ArrowNext className="size-4" />
      <ArrowNext className="size-6" />
      <ArrowNext className="size-8 text-primary" />
      <ArrowNext className="size-10 text-accent-a" />
    </HStack>
  ),
}
