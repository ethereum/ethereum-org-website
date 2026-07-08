import { Meta, StoryObj } from "@storybook/nextjs"

import CallToContributeComponent from "."

const meta = {
  title: "Molecules / Navigation / CallToContribute",
  component: CallToContributeComponent,
  args: {
    editPath:
      "https://github.com/ethereum/ethereum-org-website/tree/dev/public/content/developers/docs/index.md",
  },
  parameters: {
    layout: "",
  },
  decorators: [
    (Story) => (
      <div className="flex w-full justify-between bg-background-highlight py-0 ps-0 lg:pe-8">
        <div className="mx-auto w-full flex-1 px-8 pt-8 pb-8 md:px-16 md:pt-12 md:pb-16 lg:w-0">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CallToContributeComponent>

export default meta

type Story = StoryObj<typeof meta>

export const CallToContribute: Story = {}
