// Libraries
import React, { ReactNode } from "react"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Icon,
  Text,
  useAccordionItemState,
} from "@chakra-ui/react"

// Components
import Translation from "./Translation"

// Utils
import { trackCustomEvent } from "../utils/matomo"

export interface IProps {
  children?: React.ReactNode
  eventAction?: string
  eventCategory?: string
  eventName?: string
}

const ExpandableCard: React.FC<IProps> = ({
  children,
  eventAction = "Clicked",
  eventCategory = "",
  eventName = "",
}) => {
  const matomo = {
    eventAction,
    eventCategory: `ExpandableCard${eventCategory}`,
    eventName,
  }

  const onChange = (expandedIndex: number) => {
    const isExpanded = expandedIndex === 0
    // Card will not collapse if clicking on a link or selecting text
    if (
      window.getSelection()?.toString().length === 0 &&
      !(window.event?.target as HTMLDivElement)?.className.includes(
        "ExternalLink"
      )
    ) {
      isExpanded && trackCustomEvent(matomo)
    }
  }

  return (
    <Accordion
      allowToggle
      onChange={onChange}
      border="1px solid"
      borderColor="border"
      borderRadius="sm"
      display="flex"
      flex-direction="column"
      marginBottom="4"
      cursor="pointer"
      _hover={{
        backgroundColor: "ednBackground",
      }}
      borderBottomWidth="0"
    >
      <AccordionItem borderTopWidth="0" flex="1">
        {children}
      </AccordionItem>
    </Accordion>
  )
}

export interface IPreviewProps {
  children?: React.ReactNode
  title: ReactNode
  svg?: typeof Icon
}

export const ExpandableCardPreview = ({
  children,
  title,
  svg: Svg,
}: IPreviewProps) => {
  const { isOpen } = useAccordionItemState()

  return (
    <Heading as="h3" m={0}>
      <AccordionButton
        width="100%"
        p={6}
        flex="1"
        _hover={{
          backgroundColor: "ednBackground",
        }}
      >
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          flexDir={{ base: "column", sm: "row" }}
          textAlign="start"
        >
          <Box
            marginBottom={{ base: 2, sm: 0 }}
            marginRight={{ base: 0, sm: 4 }}
          >
            <Box
              display="flex"
              alignItems="center"
              sx={{
                svg: { marginRight: "1.5rem" },
              }}
              my="4"
            >
              {!!Svg && <Svg />}
              <Text fontSize="xl" fontWeight="semibold" flex="1" m="0">
                {title}
              </Text>
            </Box>
            <Text
              fontSize="sm"
              color="text200"
              marginBottom="0"
              width="fit-content"
            >
              {children}
            </Text>
          </Box>
          <Text
            fontSize="md"
            color="primary"
            ml={{ base: undefined, sm: "auto" }}
            mt="auto"
            mb="auto"
          >
            <Translation id={isOpen ? "less" : "more"} />
          </Text>
        </Box>
      </AccordionButton>
    </Heading>
  )
}

export interface IContentProps {
  children?: React.ReactNode
}

export const ExpandableCardContent = ({ children }: IContentProps) => (
  <AccordionPanel px={6} pb={6} pt={0}>
    <Box
      fontSize="md"
      color="text"
      pt={6}
      borderTop="1px solid"
      borderColor="border"
    >
      {children}
    </Box>
  </AccordionPanel>
)

export default ExpandableCard
