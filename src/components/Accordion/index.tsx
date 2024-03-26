import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
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
          <AccordionButton
            outline="none"
            border="4px"
            borderColor="transparent"
            _hover={{ bg: "primary.lowContrast" }}
            _expanded={{ bg: "primary.lowContrast" }}
            _focus={{
              border: "4px",
              borderColor: "primary.lowContrast",
              borderRadius: "md",
            }}
            py="2"
            px={{ base: 2, md: 4 }}
          >
            <Box as="span" flex="1">
              {label}
            </Box>
            {isExpanded ? (
              <AccordionIcon transform="rotate(180deg)" />
            ) : (
              <AccordionIcon transform="rotate(270deg)" />
            )}
          </AccordionButton>
          <AccordionPanel p={{ base: 2, md: 4 }}>{children}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  </ChakraAccordion>
)
export default Accordion
