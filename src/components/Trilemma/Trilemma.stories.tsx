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
      <div
        className="flex h-screen w-screen items-center justify-center"
        style={{
          background:
            "radial-gradient(46.28% 66.31% at 66.95% 58.35%, #e6e6f7 0%, #e7edfa 50%, #e9fbfa 100%)",
        }}
      >
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
