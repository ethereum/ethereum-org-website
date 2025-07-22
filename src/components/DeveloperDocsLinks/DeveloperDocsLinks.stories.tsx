import { Meta, StoryObj } from "@storybook/react"

import { langViewportModes } from "../../../.storybook/modes"

import DeveloperDocsLinksComponent from "."

const meta = {
  title: "Molecules / Navigation / DeveloperDocsLinks",
  component: DeveloperDocsLinksComponent,
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        ...langViewportModes,
      },
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

export const FoundationalTopics: Story = {
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
