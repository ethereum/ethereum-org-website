import {
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react"

type AccordionProps = {
  label: string
  children: React.ReactNode
}

const Accordion = ({ label, children }: AccordionProps) => (
  <ChakraAccordion allowToggle>
    <AccordionItem border="none">
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Box as="span" flex="1">
              {label}
            </Box>
            {isExpanded ? (
              <AccordionIcon transform="rotate(180deg)" />
            ) : (
              <AccordionIcon transform="rotate(270deg)" />
            )}
          </AccordionButton>
          <AccordionPanel>{children}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  </ChakraAccordion>
)
export default Accordion
