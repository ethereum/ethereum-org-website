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
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Introduction to Ethereum</h1>
          <p className="text-gray-600 dark:text-gray-300">
            This shows how the DocsNav component appears at the bottom of a
            documentation page.
          </p>
        </div>
        <div className="prose mb-8 max-w-none">
          <p>
            Ethereum is an open-source, globally decentralized computing
            infrastructure that executes programs called smart contracts. It
            uses a blockchain to synchronize and store the system&apos;s state
            changes, along with a cryptocurrency called ether to meter and
            constrain execution resource costs.
          </p>
          <p>
            Ethereum is programmable, which means that developers can use it to
            build new kinds of applications. These decentralized applications
            gain the benefits of cryptocurrency and blockchain technology.
          </p>
        </div>
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
