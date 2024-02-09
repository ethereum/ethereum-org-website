import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  DrawerBody,
  Heading,
} from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { SECTION_LABELS } from "@/lib/constants"

import type { Level, NavSections } from "../types"

import ExpandIcon from "./ExpandIcon"
import LvlAccordion from "./LvlAccordion"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"

type MenuBodyProps = {
  onToggle: () => void
  linkSections: NavSections
}

const MenuBody = ({ linkSections, onToggle }: MenuBodyProps) => {
  const menuColors = useNavMenuColors()

  return (
    <DrawerBody as="nav" p="0">
      <Accordion allowToggle>
        {SECTION_LABELS.map((key) => linkSections[key]).map(
          ({ label, items }) => (
            <AccordionItem key={label}>
              {({ isExpanded }) => (
                <>
                  <Heading
                    as="h2"
                    color={menuColors.body}
                    py="0"
                    bg={
                      isExpanded
                        ? menuColors.lvl[1].background
                        : "background.base"
                    }
                    borderBottom={isExpanded ? "1px" : "none"}
                    borderColor="disabled"
                    onClick={() => {
                      trackCustomEvent({
                        eventCategory: "Mobile navigation menu",
                        eventAction: "Section changed",
                        eventName: `${
                          isExpanded ? "Close" : "Open"
                        } section: ${label}`,
                      })
                    }}
                  >
                    <AccordionButton
                      justifyContent="start"
                      gap="2"
                      _hover={{ bg: "none" }}
                      py="4"
                    >
                      <ExpandIcon isOpen={isExpanded} />
                      <Box
                        as="span"
                        flex="1"
                        textAlign="start"
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        {label}
                      </Box>
                    </AccordionButton>
                  </Heading>

                  <AccordionPanel p="0" bg={menuColors.lvl[2].background}>
                    <LvlAccordion
                      lvl={2 as Level}
                      items={items}
                      onToggle={onToggle}
                    />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )
        )}
      </Accordion>
    </DrawerBody>
  )
}

export default MenuBody
