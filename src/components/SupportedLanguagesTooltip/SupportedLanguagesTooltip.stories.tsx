import { Meta, StoryObj } from "@storybook/nextjs"

import { SupportedLanguagesTooltip } from "."

const meta = {
  title: "Components / Widgets / SupportedLanguagesTooltip",
  component: SupportedLanguagesTooltip,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Renders a `+ N` chip with a tooltip listing the languages beyond the first `NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN` (5 by default). Returns `null` if the supplied array fits within that threshold -- so the component is invisible until the overflow exists.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-2">
        <span>First 5 languages, then</span>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SupportedLanguagesTooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    supportedLanguages: [
      "English",
      "Spanish",
      "French",
      "German",
      "Japanese",
      "Korean",
      "Portuguese",
      "Russian",
    ],
  },
}

export const ManyExtraLanguages: Story = {
  args: {
    supportedLanguages: [
      "English",
      "Spanish",
      "French",
      "German",
      "Japanese",
      "Korean",
      "Portuguese",
      "Russian",
      "Italian",
      "Dutch",
      "Polish",
      "Turkish",
      "Arabic",
      "Hindi",
      "Vietnamese",
    ],
  },
}

export const BelowThreshold: Story = {
  args: {
    supportedLanguages: ["English", "Spanish", "French"],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Renders `null` -- the chip is suppressed because the supported list is at or below the threshold.",
      },
    },
  },
}
