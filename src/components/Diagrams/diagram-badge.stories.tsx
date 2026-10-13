import { Flame, Fuel, Undo2, User } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { DiagramBadge } from "./diagram-badge"

const meta = {
  title: "Components / Data Viz / Diagrams / Badge",
  component: DiagramBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'Round badge with an icon and a short label. Use `border="dashed"` for something reserved or pending (gas supply, refund) and `solid` for something consumed or final (gas burned). Keep labels to one or two words.\n\n`level` adds a fill gauge from the bottom: a number (0-1), or `"inherit"` to read `--diagram-level` from an ancestor so a client island can drive it without re-rendering the badge. `definition` makes it a focusable Tooltip trigger.',
      },
    },
  },
  args: { icon: <Fuel />, label: "Gas supply", border: "dashed" },
} satisfies Meta<typeof DiagramBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Dashed: Story = {}

export const Gauge: Story = {
  args: { icon: <Flame />, label: "Gas", border: "solid", level: 0.46 },
}

export const Variants: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <DiagramBadge border="dashed" icon={<Fuel />} label="Gas supply" />
      <DiagramBadge
        border="dashed"
        icon={<Undo2 className="rtl:-scale-x-100" />}
        label="Refund"
      />
      <DiagramBadge icon={<Flame />} label="Gas" level={0} />
      <DiagramBadge icon={<Flame />} label="Gas" level={0.46} />
      <DiagramBadge icon={<Flame />} label="Gas" level={1} />
      <DiagramBadge tone="entity" icon={<User />} label="You" />
    </div>
  ),
}
