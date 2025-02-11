import { Meta, StoryObj } from "@storybook/react"

import PlayerWidgetComponent from "."

const meta = {
  title: "Atoms / Media & Icons / ListenToPlayer / PlayerWidget",
  component: PlayerWidgetComponent,
  args: {
    showWidget: true,
  },
} satisfies Meta<typeof PlayerWidgetComponent>

export default meta

type Story = StoryObj<typeof meta>

export const PlayerWidget: Story = {}
