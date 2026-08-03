import { Meta, StoryObj } from "@storybook/nextjs"

import AgentPrompt from "."

const meta = {
  title: "Components / Content / AgentPrompt",
  component: AgentPrompt,
  parameters: {
    docs: {
      description: {
        component:
          "A copy-paste prompt panel for AI coding agents, used on content pages (e.g. /contributing) to let a reader hand a ready-made instruction to their agent. Renders the prompt in a highlighted box with a prominent, always-visible copy button (reuses the `common:copy` / `common:copied` strings).",
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
} satisfies Meta<typeof AgentPrompt>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    prompt:
      "I want to contribute to ethereum.org. Read https://ethereum.org/contributing/ and the guide for what I want to add, then help me prepare a GitHub pull request step by step.",
  },
}

export const DevDocs: Story = {
  args: {
    prompt:
      "Read https://ethereum.org/developers/docs/llms.txt, then help me find and understand the Ethereum developer documentation I need.",
  },
}
