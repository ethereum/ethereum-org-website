import { Meta, StoryObj } from "@storybook/nextjs"

import TranslationChartImageComponent from "."

const meta = {
  title: "Components / TranslationChartImage",
  component: TranslationChartImageComponent,
  tags: ["autodocs"],
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
