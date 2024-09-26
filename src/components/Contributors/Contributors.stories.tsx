import { Meta, StoryObj } from "@storybook/react"

import ContributorsComponent from "."

const meta = {
  title: "Molecules / Navigation / Contributors",
  component: ContributorsComponent,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <article className="max-w-3xl scroll-mt-24">
        <Story />
      </article>
    ),
  ],
} satisfies Meta<typeof ContributorsComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Contributors: Story = {}
