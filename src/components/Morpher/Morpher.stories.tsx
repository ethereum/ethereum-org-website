import { Meta, StoryObj } from "@storybook/nextjs"

import Morpher from "."

const meta = {
  title: "Components / Widgets / Morpher",
  component: Morpher,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Animated text effect that morphs between a list of `words`, cycling roughly every 3 seconds. Respects `prefers-reduced-motion`: when reduced motion is requested, the component cross-fades between words instead of doing the per-character scramble. Pass `charSet` to control the alphabet used during the morph.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="text-4xl font-bold">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Morpher>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    words: ["finance", "art", "gaming", "governance"],
  },
}

export const CustomCharSet: Story = {
  args: {
    words: ["alpha", "beta", "gamma", "delta"],
    charSet: "abcdefghijklmnopqrstuvwxyz0123456789",
  },
}

export const SingleWord: Story = {
  args: {
    words: ["ethereum"],
  },
}
