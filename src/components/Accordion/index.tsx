import * as React from "react"
import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useToken
} from "@chakra-ui/react"

const Accordion = () => {
  const primary = useToken(
    "primary",
    "lowContrast"
  )
  return (
    <>
      <ChakraAccordion allowToggle>
        <AccordionItem border="none">
          {({ isExpanded }) => (
            <>
              <div>
                <AccordionButton
                  outline="none"
                  border="4px"
                  borderColor="transparent"
                  _hover={{ bg: primary }}
                  _expanded={{ bg: primary }}
                  _focus={{
                    border: "4px",
                    borderColor: primary,
                    borderRadius: "6px",
                  }}
                  padding={{ base: "8px", md: "8px 16px" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    Label text of the accordion
                  </Box>
                  {isExpanded ? (
                    <AccordionIcon transform="rotate(180deg)" />
                  ) : (
                    <AccordionIcon transform="rotate(270deg)" />
                  )}
                </AccordionButton>
              </div>
              <AccordionPanel padding={{ base: "8px", md: "16px" }}>
                Text body Small. Ethereum is open access to digital money and
                data-friendly services for everyone – no matter your background
                or location. It's a community-built technology behind the
                cryptocurrency ether (ETH) and thousands of applications you can
                use today.
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </ChakraAccordion>
    </>
  )
}
export default Accordion
