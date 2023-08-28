import * as React from "react"
import Accordion from "."
import { Meta, StoryObj } from "@storybook/react"
import { VStack } from "@chakra-ui/react"

type AccordionType = typeof Accordion

const meta: Meta<AccordionType> = {
  title: "Molecules / Disclosure Content / Accordions",
  component: Accordion,
}

export default meta

type Story = StoryObj<AccordionType>

export const Basic: Story = {
  render: (args) => (
    <VStack>
      <Accordion />
    </VStack>
  ),
}
