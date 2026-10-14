import { Meta, StoryObj } from "@storybook/nextjs"

import { staticModes } from "../../../../.storybook/modes"

import AnonymityCrowd from "./anonymity-crowd-client"

// en + ar at lg, each in light and dark
const themedModes = Object.fromEntries(
  Object.entries(staticModes).flatMap(([key, mode]) => [
    [`${key} light`, { ...mode, theme: "light" }],
    [`${key} dark`, { ...mode, theme: "dark" }],
  ])
)

const meta = {
  title: "Components / Privacy / AnonymityCrowd",
  component: AnonymityCrowd,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: themedModes },
    docs: {
      description: {
        component:
          "How an anonymity set (a shielded pool's crowd) hides you, and how unusual amounts and quick withdrawals shrink it. The dot layout is seeded, so snapshots are stable.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnonymityCrowd>

export default meta

type Story = StoryObj<typeof meta>

export const Standalone: Story = {
  args: { variant: "standalone" },
}

export const Lesson: Story = {
  args: { variant: "lesson" },
}

export const SmallCrowd: Story = {
  args: { variant: "lesson", initialValue: 20 },
}
