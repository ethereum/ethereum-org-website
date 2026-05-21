import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import {
  Skeleton,
  SkeletonCard,
  SkeletonCardContent,
  SkeletonCardGrid,
  SkeletonLines,
} from "../skeleton"

const meta = {
  title: "UI / Skeleton",
  component: Skeleton,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Loading placeholders. Use `Skeleton` for arbitrary-shape blocks, `SkeletonLines` for paragraph-style stacks, and `SkeletonCard` / `SkeletonCardContent` / `SkeletonCardGrid` for card layouts.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Base `Skeleton` is a single block. Set width/height via Tailwind classes (`h-*`, `w-*`).",
      },
    },
  },
  render: () => (
    <VStack className="w-[320px] gap-3">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="size-12 rounded-full" />
    </VStack>
  ),
}

export const Lines: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`SkeletonLines` renders multiple `Skeleton` blocks at varying widths. Control with `noOfLines`.",
      },
    },
  },
  render: () => (
    <div className="w-[480px]">
      <SkeletonLines noOfLines={5} />
    </div>
  ),
}

export const CardContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`SkeletonCardContent` is the body half of a card placeholder, suitable when the consumer already provides the outer card frame.",
      },
    },
  },
  render: () => (
    <div className="w-[320px] rounded-lg border">
      <SkeletonCardContent />
    </div>
  ),
}

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`SkeletonCard` is a full-card placeholder including a banner area and content lines.",
      },
    },
  },
  render: () => (
    <div className="w-[320px]">
      <SkeletonCard />
    </div>
  ),
}

export const CardGrid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`SkeletonCardGrid` renders 1, 2, or 3 cards depending on viewport width (responsive).",
      },
    },
  },
  render: () => (
    <div className="w-full max-w-[960px]">
      <SkeletonCardGrid />
    </div>
  ),
}
