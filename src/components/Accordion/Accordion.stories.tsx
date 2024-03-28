import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Accordion from "."

type AccordionType = typeof Accordion

const meta: Meta<AccordionType> = {
  title: "Molecules / Disclosure Content / Accordions",
  component: Accordion,
  args: {
    label: "Accordion label",
    children: "Accordion child content",
  },
} satisfies Meta<AccordionType>

export default meta

type Story = StoryObj<AccordionType>

export const Basic: Story = {
  render: (args) => (
    <VStack>
      <Accordion {...args} />
    </VStack>
  ),
}
