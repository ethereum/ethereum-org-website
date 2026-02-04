import { Meta, StoryObj } from "@storybook/react"

import DocsNavComponent from "."

const meta = {
  title: "Molecules / Navigation / DocsNav",
  component: DocsNavComponent,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/developers/docs/intro-to-ethereum/",
      },
    },

    layout: "fullscreen",
  },

  decorators: [
    (Story) => (
      <div className="mx-auto max-w-4xl p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DocsNavComponent>

export default meta

type Story = StoryObj<typeof meta>

export const DocsNav: Story = {
  args: {
    contentNotTranslated: false,
  },
}
