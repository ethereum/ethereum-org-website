import type { Meta, StoryObj } from "@storybook/nextjs"

import CopyPageButton from "."

const meta = {
  title: "Molecules / Actions / CopyPageButton",
  component: CopyPageButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CopyPageButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slug: "staking/solo",
  },
}

export const NestedSlug: Story = {
  args: {
    slug: "developers/docs/intro-to-ethereum",
  },
}
