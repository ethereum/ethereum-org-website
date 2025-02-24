import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../.storybook/modes"

import MergeInfographicComponent from "."

const meta = {
  title: "Atoms / Media & Icons / MergeInfographic",
  component: MergeInfographicComponent,
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
