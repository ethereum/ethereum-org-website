import { useTranslations } from "next-intl"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { TerminalTypewriter } from "../terminal-typewriter"

const meta = {
  title: "UI / TerminalTypewriter",
  component: TerminalTypewriter,
  decorators: [
    (Story) => (
      <div className="w-[42rem]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Terminal-style typewriter that types each message, pauses, deletes it, and moves on. Loops through `messages` indefinitely. Always renders LTR (`dir='ltr'`) and uses a dark theme regardless of the active Storybook theme so it reads as a code prompt.",
      },
    },
  },
} satisfies Meta<typeof TerminalTypewriter>

export default meta

type Story = StoryObj<typeof meta>

const TranslatedMessages = () => {
  const t = useTranslations("page-developers-index")
  return (
    <TerminalTypewriter
      messages={[
        t("page-developers-ethskills-msg-1"),
        t("page-developers-ethskills-msg-2"),
        t("page-developers-ethskills-msg-3"),
        t("page-developers-ethskills-msg-4"),
        t("page-developers-ethskills-msg-5"),
      ]}
    />
  )
}

export const Default: Story = {
  args: { messages: [] },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage: messages pulled from the `page-developers-index` namespace. Toggle the locale in the Storybook toolbar to see translated copy cycle.",
      },
    },
  },
  render: () => <TranslatedMessages />,
}

export const StaticMessages: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    messages: [
      "Build dapps with Solidity",
      "Deploy to mainnet or layer 2",
      "Scale with rollups",
      "Inherit Ethereum's security",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Hard-coded English messages. Use when the typewriter content is fixed and not user-facing copy.",
      },
    },
  },
}

export const SingleMessage: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    messages: ["The only message keeps re-typing on loop."],
  },
  parameters: {
    docs: {
      description: {
        story:
          "With only one message in the array, the component types and deletes the same string indefinitely.",
      },
    },
  },
}

export const LongMessage: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: {
    messages: [
      "Smart contracts running on the Ethereum Virtual Machine settle to layer 1 with finality measured in slots.",
      "Layer 2 rollups bundle thousands of transactions into a single proof posted to mainnet.",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Long messages wrap within the terminal frame on small viewports.",
      },
    },
  },
}

export const Empty: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  args: { messages: [] },
  parameters: {
    docs: {
      description: {
        story:
          "When `messages` is empty, the component renders nothing. Useful as a safety check while data loads.",
      },
    },
  },
}
