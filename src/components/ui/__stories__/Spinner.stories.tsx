import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "../flex"
import { Spinner } from "../spinner"

const meta = {
  title: "UI / Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component:
          "Indeterminate loading indicator. Renders a rotating `Loader2` icon sized at `1em`, so spinner size scales with the parent's `font-size`. Apply Tailwind `text-*` classes to size it. Pair with sibling text for a label.",
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Spinner className="text-2xl" />,
}

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Size scales with `font-size`. Use Tailwind text-size utilities on the spinner element.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-6">
      <Spinner className="text-sm" />
      <Spinner className="text-base" />
      <Spinner className="text-xl" />
      <Spinner className="text-2xl" />
      <Spinner className="text-4xl" />
    </HStack>
  ),
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Spinner has no built-in label. Pair with sibling text and announce via aria-live for accessibility.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-4">
      <HStack className="items-center gap-2">
        <Spinner className="text-base" />
        <span className="text-sm">Loading...</span>
      </HStack>
      <HStack className="items-center gap-2" aria-live="polite">
        <Spinner className="text-base" />
        <span className="text-sm">Fetching layer 2 networks</span>
      </HStack>
    </VStack>
  ),
}

export const InsideButton: Story = {
  parameters: {
    docs: {
      description: {
        story: "Place inline with button text to indicate a pending action.",
      },
    },
  },
  render: () => (
    <button
      type="button"
      disabled
      className="inline-flex items-center gap-2 rounded border bg-background-highlight px-4 py-2 text-sm"
    >
      <Spinner className="text-sm" />
      Saving
    </button>
  ),
}
