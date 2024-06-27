import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../.storybook/modes"

import MergeInfographicComponent from "."

const meta = {
  title: "Atoms / Media & Icons / MergeInfographic",
  component: MergeInfographicComponent,
  parameters: {
    layout: "none",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
    },
  },
} satisfies Meta<typeof MergeInfographicComponent>

export default meta

type Story = StoryObj<typeof meta>;

export const MergeInfographic: Story = {}