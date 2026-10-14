import { fn } from "storybook/test"
import { Meta, StoryObj } from "@storybook/nextjs"

import { staticModes } from "../../../../.storybook/modes"

import AddressPoisoningQuiz from "./address-poisoning-quiz-client"

const meta = {
  title: "Components / Privacy / AddressPoisoningQuiz",
  component: AddressPoisoningQuiz,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    chromatic: { modes: staticModes },
    docs: {
      description: {
        component:
          '"Which one is really Sam?" The reader picks the history row to copy an address from; two rows are lookalike fakes that share the first 4 and last 6 characters. Sample data is fixed, so snapshots are deterministic.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
  args: { onAnswer: fn() },
} satisfies Meta<typeof AddressPoisoningQuiz>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InLesson: Story = {
  args: { variant: "lesson" },
}

export const AnsweredFake: Story = {
  args: { initialAnswer: "fake-zero-value" },
}

export const AnsweredReal: Story = {
  args: { initialAnswer: "real-sent" },
}
