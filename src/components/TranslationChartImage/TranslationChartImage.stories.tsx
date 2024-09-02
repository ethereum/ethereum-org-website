import { Meta, StoryObj } from "@storybook/react"

import TranslationChartImageComponent from "."

const meta = {
  title: "Atoms / Media & Icons / TranslationChartImage",
  component: TranslationChartImageComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TranslationChartImageComponent>

export default meta

type Story = StoryObj<typeof meta>

export const TranslationChartImage: Story = {}
