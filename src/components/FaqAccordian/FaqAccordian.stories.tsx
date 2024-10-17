import { Meta, StoryObj } from "@storybook/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "."

const meta = {
  title: "FaqAccordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <div className="">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta

export const FaqAccordion: StoryObj = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h2 className="text-start text-base md:text-xl">
            Why is there no &apos;official&apos; Ethereum L2?
          </h2>
        </AccordionTrigger>

        <AccordionContent>
          Just as there is no &apos;official&apos; Ethereum client, there is no
          &apos;official&apos; Ethereum layer 2. Ethereum is permissionless -
          technically anyone can create a layer 2! Multiple teams will implement
          their version of a layer 2, and the ecosystem as a whole will benefit
          from a diversity of design approaches that are optimized for different
          use cases. Much like we have multiple Ethereum clients developed by
          multiple teams in order to have diversity in the network, this too
          will be how layer 2s develop in the future.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          <h2 className="text-start text-base md:text-xl">
            Why is there no &apos;official&apos; Ethereum L2?
          </h2>
        </AccordionTrigger>
        <AccordionContent>
          Just as there is no &apos;official&apos; Ethereum client, there is no
          &apos;official&apos; Ethereum layer 2. Ethereum is permissionless -
          technically anyone can create a layer 2! Multiple teams will implement
          their version of a layer 2, and the ecosystem as a whole will benefit
          from a diversity of design approaches that are optimized for different
          use cases. Much like we have multiple Ethereum clients developed by
          multiple teams in order to have diversity in the network, this too
          will be how layer 2s develop in the future.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
