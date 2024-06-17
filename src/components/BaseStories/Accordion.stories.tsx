import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Molecules / Disclosure Content / Accordions",
  component: Accordion,
  decorators: [
    (Story) => (
      <Box width="300px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Accordion allowToggle defaultIndex={0}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Label text of the accordion
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          Ethereum is open access to digital money and data-friendly services
          for everyone – no matter your background or location. It&apos;s a
          community-built technology behind the cryptocurrency ether (ETH) and
          thousands of applications you can use today.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Label text of the accordion
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          Ethereum is open access to digital money and data-friendly services
          for everyone – no matter your background or location. It&apos;s a
          community-built technology behind the cryptocurrency ether (ETH) and
          thousands of applications you can use today.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}
