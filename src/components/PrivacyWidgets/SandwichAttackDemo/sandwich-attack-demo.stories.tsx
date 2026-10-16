import { fn } from "storybook/test"
import { Meta, StoryObj } from "@storybook/nextjs"

import {
  langViewportModes,
  staticModes,
  variantMode,
} from "../../../../.storybook/modes"

import SandwichAttackClient from "./sandwich-attack-client"

const meta = {
  title: "Components / Privacy / SandwichAttackDemo",
  component: SandwichAttackClient,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: variantMode },
    docs: {
      description: {
        component:
          "Interactive sandwich attack demo: the same swap sent through the public mempool and through a private channel. Background traffic is seeded, so snapshots are deterministic; the initial (idle) state is snapshotted.",
      },
    },
  },
  args: {
    onComplete: fn(),
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SandwichAttackClient>

export default meta

type Story = StoryObj<typeof meta>

export const Standalone: Story = {
  parameters: { chromatic: { modes: langViewportModes } },
  args: { variant: "standalone" },
}

export const Lesson: Story = {
  parameters: { chromatic: { modes: staticModes } },
  args: { variant: "lesson" },
}
