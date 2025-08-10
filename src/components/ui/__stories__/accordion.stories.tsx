import { Meta, StoryObj } from "@storybook/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion"

const meta = {
  title: "Molecules / Disclosure Content / Accordions",
  component: Accordion,
  decorators: [
    (Story) => (
      <div className="h-64 w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta

export const Basic: StoryObj = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Label text of the accordion</AccordionTrigger>
        <AccordionContent>
          Ethereum is open access to digital money and data-friendly services
          for everyone – no matter your background or location. It&apos;s a
          community-built technology behind the cryptocurrency ether (ETH) and
          thousands of applications you can use today.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Label text of the accordion</AccordionTrigger>
        <AccordionContent>
          Ethereum is open access to digital money and data-friendly services
          for everyone – no matter your background or location. It&apos;s a
          community-built technology behind the cryptocurrency ether (ETH) and
          thousands of applications you can use today.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
