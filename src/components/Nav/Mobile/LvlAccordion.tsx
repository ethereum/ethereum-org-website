import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  chakra,
  Heading,
  Text,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

import { trackCustomEvent } from "@/lib/utils/matomo"

import type { Level, NavItem } from "../types"

import ExpandIcon from "./ExpandIcon"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"

type LvlAccordionProps = {
  lvl: Level
  items: NavItem[]
  onToggle: () => void
}

const LvlAccordion = ({ lvl, items, onToggle }: LvlAccordionProps) => {
  const menuColors = useNavMenuColors()

  return (
    <Accordion allowToggle boxShadow="menu.accordion">
      {items.map(({ label, description, ...actions }) => {
        if ("href" in actions)
          return (
            <AccordionItem key={label}>
              <Button
                as={BaseLink}
                w="full"
                href={actions.href}
                variant="ghost"
                borderRadius="none"
                borderColor={menuColors.stroke}
                justifyContent="start"
                gap="2"
                ps={(lvl + 2) * 4}
                py="4"
                _hover={{
                  color: menuColors.highlight,
                }}
                onClick={() => {
                  trackCustomEvent({
                    eventCategory: "Mobile navigation menu",
                    eventAction: `Follow level ${lvl - 1} link`,
                    eventName: actions.href!,
                  })
                  onToggle()
                }}
              >
                <Box flex="1" textAlign="start">
                  <Text fontWeight="bold" fontSize="md" color={menuColors.body}>
                    {label}
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="sm"
                    color={menuColors.lvl[lvl].subtext}
                  >
                    {description}
                  </Text>
                </Box>
              </Button>
            </AccordionItem>
          )
        return (
          <AccordionItem key={label}>
            {({ isExpanded }) => (
              <>
                <Heading
                  as={chakra[`h${lvl + 1}`]}
                  color={menuColors.body}
                  py="0"
                  borderColor={menuColors.stroke}
                  onClick={() => {
                    trackCustomEvent({
                      eventCategory: "Mobile navigation menu",
                      eventAction: `Level ${lvl - 1} section changed`,
                      eventName: `${
                        isExpanded ? "Close" : "Open"
                      } section: ${label} - ${description.slice(0, 16)}...`,
                    })
                  }}
                >
                  <AccordionButton
                    justifyContent="start"
                    gap="2"
                    ps={lvl * 4}
                    pe="4"
                    py="4"
                  >
                    <ExpandIcon isOpen={isExpanded} />
                    <Box flex="1" textAlign="start">
                      <Text
                        fontWeight="bold"
                        fontSize="md"
                        color={menuColors.body}
                      >
                        {label}
                      </Text>
                      <Text
                        fontWeight="regular"
                        fontSize="sm"
                        color={menuColors.lvl[lvl].subtext}
                      >
                        {description}
                      </Text>
                    </Box>
                  </AccordionButton>
                </Heading>

                <AccordionPanel p="0" bg={menuColors.lvl[lvl + 1].background}>
                  <LvlAccordion
                    lvl={(lvl + 1) as Level}
                    items={actions.items}
                    onToggle={onToggle}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default LvlAccordion
