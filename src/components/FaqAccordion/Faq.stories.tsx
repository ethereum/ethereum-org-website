import { Meta, StoryObj } from "@storybook/react"

import { Faq as FaqComponent, FaqContent, FaqItem, FaqTrigger } from "."

const meta = {
  title: "Molecules / Display Content / Faq",
  component: FaqComponent,
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FaqComponent>

export default meta

export const Faq: StoryObj = {
  render: () => (
    <FaqComponent type="single" collapsible>
      <FaqItem value="item-1">
        <FaqTrigger>
          <h2 className="text-start text-base md:text-xl">
            Why is there no &apos;official&apos; Ethereum L2?
          </h2>
        </FaqTrigger>

        <FaqContent>
          Just as there is no &apos;official&apos; Ethereum client, there is no
          &apos;official&apos; Ethereum layer 2. Ethereum is permissionless -
          technically anyone can create a layer 2! Multiple teams will implement
          their version of a layer 2, and the ecosystem as a whole will benefit
          from a diversity of design approaches that are optimized for different
          use cases. Much like we have multiple Ethereum clients developed by
          multiple teams in order to have diversity in the network, this too
          will be how layer 2s develop in the future.
        </FaqContent>
      </FaqItem>
      <FaqItem value="item-2">
        <FaqTrigger>
          <h2 className="text-start text-base md:text-xl">
            Why is there no &apos;official&apos; Ethereum L2?
          </h2>
        </FaqTrigger>
        <FaqContent>
          Just as there is no &apos;official&apos; Ethereum client, there is no
          &apos;official&apos; Ethereum layer 2. Ethereum is permissionless -
          technically anyone can create a layer 2! Multiple teams will implement
          their version of a layer 2, and the ecosystem as a whole will benefit
          from a diversity of design approaches that are optimized for different
          use cases. Much like we have multiple Ethereum clients developed by
          multiple teams in order to have diversity in the network, this too
          will be how layer 2s develop in the future.
        </FaqContent>
      </FaqItem>
    </FaqComponent>
  ),
}
