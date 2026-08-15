import { Meta, StoryObj } from "@storybook/nextjs"

import { staticModes, variantMode } from "../../../.storybook/modes"

import DeveloperDocsLinksComponent from "."

const meta = {
  title: "Components / Navigation / DeveloperDocsLinks",
  component: DeveloperDocsLinksComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: variantMode,
    },
  },
  decorators: [
    (Story) => (
      <article className="max-w-3xl scroll-mt-24">
        <Story />
      </article>
    ),
  ],
} satisfies Meta<typeof DeveloperDocsLinksComponent>

export default meta

type Story = StoryObj<typeof meta>

// No component in this file's subtree declares a responsive class, so width
// isn't a variable here -- one story still checks direction (RTL list
// markers/indent) rather than dropping it entirely.
export const FoundationalTopics: Story = {
  parameters: {
    chromatic: { modes: staticModes },
  },
  args: {
    headerId: "foundational-topics",
  },
}

export const EthereumStack: Story = {
  args: {
    headerId: "ethereum-stack",
  },
}

export const Advanced: Story = {
  args: {
    headerId: "advanced",
  },
}
