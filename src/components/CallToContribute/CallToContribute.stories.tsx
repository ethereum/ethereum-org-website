import { Meta, StoryObj } from "@storybook/react"

import { ChildOnlyProp } from "@/lib/types"

import CallToContributeComponent from "."

const meta = {
  title: "Molecules / Navigation / CallToContribute",
  component: CallToContributeComponent,
  args: {
    editPath:
      "https://github.com/ethereum/ethereum-org-website/tree/dev/public/content/developers/docs/index.md",
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ContentContainer>
        <Content>
          <Story />
        </Content>
      </ContentContainer>
    ),
  ],
} satisfies Meta<typeof CallToContributeComponent>

export default meta

type Story = StoryObj<typeof meta>

const ContentContainer = (props: ChildOnlyProp) => {
  return (
    <div
      className="flex w-full justify-between bg-background-highlight py-0 ps-0 lg:pe-8"
      {...props}
    />
  )
}

const Content = (props: ChildOnlyProp) => {
  return (
    <div
      className="mx-auto w-full flex-1 px-8 pb-8 pt-8 md:px-16 md:pb-16 md:pt-12 lg:w-0"
      {...props}
    />
  )
}

export const CallToContribute: Story = {}
