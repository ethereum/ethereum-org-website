import { Meta, StoryObj } from "@storybook/nextjs"

import TrilemmaComponent from "."

const meta = {
  title: "Organisms / Layouts",
  component: TrilemmaComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="from-accent-a/10 to-accent-c/10 my-8 w-full bg-linear-to-r p-8">
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
