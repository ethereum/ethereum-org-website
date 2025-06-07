import { Meta, StoryObj } from "@storybook/react"

import {
  FaqAccordion,
  FaqAccordionContent,
  FaqAccordionItem,
  FaqAccordionTrigger,
} from "."

const meta = {
  title: "FaqAccordion",
  component: FaqAccordion,
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FaqAccordion>

export default meta

export const FaqAccordionStory: StoryObj = {
  render: () => (
    <FaqAccordion type="single" collapsible>
      <FaqAccordionItem value="item-1">
        <FaqAccordionTrigger>
          <h2 className="text-start text-base md:text-xl">
            Why is there no &apos;official&apos; Ethereum L2?
          </h2>
        </FaqAccordionTrigger>

        <FaqAccordionContent>
          Just as there is no &apos;official&apos; Ethereum client, there is no
          &apos;official&apos; Ethereum layer 2. Ethereum is permissionless -
          technically anyone can create a layer 2! Multiple teams will implement
          their version of a layer 2, and the ecosystem as a whole will benefit
          from a diversity of design approaches that are optimized for different
          use cases. Much like we have multiple Ethereum clients developed by
          multiple teams in order to have diversity in the network, this too
          will be how layer 2s develop in the future.
        </FaqAccordionContent>
      </FaqAccordionItem>
      <FaqAccordionItem value="item-2">
        <FaqAccordionTrigger>
          <h2 className="text-start text-base md:text-xl">
            Why is there no &apos;official&apos; Ethereum L2?
          </h2>
        </FaqAccordionTrigger>
        <FaqAccordionContent>
          Just as there is no &apos;official&apos; Ethereum client, there is no
          &apos;official&apos; Ethereum layer 2. Ethereum is permissionless -
          technically anyone can create a layer 2! Multiple teams will implement
          their version of a layer 2, and the ecosystem as a whole will benefit
          from a diversity of design approaches that are optimized for different
          use cases. Much like we have multiple Ethereum clients developed by
          multiple teams in order to have diversity in the network, this too
          will be how layer 2s develop in the future.
        </FaqAccordionContent>
      </FaqAccordionItem>
    </FaqAccordion>
  ),
}
