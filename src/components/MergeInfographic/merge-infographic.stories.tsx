import { Meta, StoryObj } from "@storybook/nextjs"

import { langViewportModes } from "@/storybook/modes"

import MergeInfographicComponent from "."

const meta = {
  title: "Components / MergeInfographic",
  component: MergeInfographicComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[1008px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MergeInfographicComponent>

export default meta

type Story = StoryObj<typeof meta>

export const MergeInfographic: Story = {}
