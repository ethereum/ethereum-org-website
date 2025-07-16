import { Meta, StoryObj } from "@storybook/react"

import TrilemmaComponent from "."

const meta = {
  title: "Organisms / Layouts",
  component: TrilemmaComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-accent-a/10 to-accent-c/10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TrilemmaComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Trilemma: Story = {
  render: () => <TrilemmaComponent />,
}
