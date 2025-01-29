import { Meta, StoryObj } from "@storybook/react"

import ListenToPlayerComponent from "."

const meta = {
  title: "Atoms / Media & Icons / ListenToPlayer",
  component: ListenToPlayerComponent,
} satisfies Meta<typeof ListenToPlayerComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ListenToPlayer: Story = {}
