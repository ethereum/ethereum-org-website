import { Meta, StoryObj } from "@storybook/react"

import ListenToPlayerComponent from "."

const meta = {
  title: "Atoms / Media & Icons / ListenToPlayer / ListenToPlayer",
  component: ListenToPlayerComponent,
  args: {
    slug: "/eth",
  },
} satisfies Meta<typeof ListenToPlayerComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ListenToPlayer: Story = {}
