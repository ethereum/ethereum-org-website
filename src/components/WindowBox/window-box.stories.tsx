import { Wallet } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import WindowBox from "."

const meta = {
  title: "Components / WindowBox",
  component: WindowBox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Framed panel with a titled header bar -- an icon in a rounded plate, a bold title, and an arbitrary body below. The header carries a subtle top-down primary wash that deepens in dark mode. Capped at `max-w-screen-md` and clips its children, so a full-bleed body image sits flush inside the rounded corners.",
      },
    },
  },
} satisfies Meta<typeof WindowBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Choose a wallet",
    svg: <Wallet className="size-5 text-primary" />,
    children: (
      <div className="p-4 text-body-medium">
        Body content sits below the header bar and is clipped to the rounded
        corners.
      </div>
    ),
  },
}

export const HeaderOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "`children` is optional -- the header alone is a valid shape.",
      },
    },
  },
  args: {
    title: "Choose a wallet",
    svg: <Wallet className="size-5 text-primary" />,
  },
}
