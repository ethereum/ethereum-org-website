import { Meta, StoryObj } from "@storybook/react"

import TopOfPagePlayerComponent from "."

const meta = {
  title: "Atoms / Media & Icons / ListenToPlayer / TopOfPagePlayer",
  component: TopOfPagePlayerComponent,
  args: {
    startedPlaying: false,
    isPlaying: false,
    handlePlayPause: () => {},
    timeRemaining: 0,
    duration: 0,
  },
} satisfies Meta<typeof TopOfPagePlayerComponent>

export default meta

type Story = StoryObj<typeof meta>

export const TopOfPagePlayer: Story = {}
