import { fn } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs"

import ModalComponent from "../dialog-modal"

const meta = {
  title: "UI / Modal",
  component: ModalComponent,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    defaultOpen: true,
    title: "Modal title",
    children:
      "Base content for the modal. Replace this with the final copy and components for your screen.",
    actionButton: {
      label: "Save",
      onClick: fn(),
    },
  },
} satisfies Meta<typeof ModalComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SizeMd: Story = {
  args: { size: "md" },
}

export const SizeLg: Story = {
  args: { size: "lg" },
}

export const SizeXl: Story = {
  args: { size: "xl" },
}

export const VariantSimulator: Story = {
  args: { variant: "simulator" },
  parameters: {
    docs: {
      description: {
        story:
          "`simulator` variant moves the close button inline with the header content; used for embedded simulator-style modals.",
      },
    },
  },
}

export const VariantUnstyled: Story = {
  args: {
    variant: "unstyled",
    actionButton: undefined,
    children:
      "Unstyled content area. Use when the modal needs to render fully custom layout without the default padding, rounding, or background.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "`unstyled` variant strips the default content padding, rounding, and background so the consumer can render custom chrome.",
      },
    },
  },
}

export const WithoutActionButton: Story = {
  args: {
    actionButton: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Without `actionButton`, the footer is omitted and the modal becomes informational. Closes via the X button or escape.",
      },
    },
  },
}
