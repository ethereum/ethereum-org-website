import React, { ReactNode } from "react"
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import Emoji from "../Emoji"
import Pill from "../Pill"
import Translation from "../Translation"
import { ChildOnlyType } from "."
import { accordionButtonContent, CategoryNameType } from "./utils"

export const LeftColumnPanel = (props: ChildOnlyType & Partial<BoxProps>) => (
  <Box flex="0 0 50%" maxW={{ lg: "75%" }} mr={{ lg: 16 }} {...props} />
)

export const RightColumnPanel = (props: ChildOnlyType) => (
  <LeftColumnPanel mr={0} flex="0 1 50%" mt={{ base: 12, lg: 0 }} {...props} />
)

const MoreOrLessLink = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box mr={6} color="primary.base">
      {isOpen ? (
        <Translation id="page-stablecoins-accordion-less" />
      ) : (
        <Translation id="page-stablecoins-accordion-more" />
      )}
    </Box>
  )
}

interface AccordionCustomItemProps {
  /**
   * The category name of each accordion section
   */
  category: CategoryNameType
  children: ReactNode
}

export const AccordionCustomItem = (props: AccordionCustomItemProps) => {
  const { category, children } = props

  const contentObj = accordionButtonContent[category]

  return (
    <AccordionItem border="1px" borderColor="border !important">
      {({ isExpanded }) => (
        <>
          <AccordionButton
            justifyContent="space-between"
            alignItems="center"
            p={0}
            _hover={{ background: "ednBackground" }}
          >
            <Flex
              alignItems={{ base: "flex-start", lg: "center" }}
              flexDirection={{ base: "column", md: "row" }}
              m={6}
              me={4}
              {...props}
            >
              <Emoji
                text={contentObj.emoji}
                me={6}
                mb={{ base: 2, md: 0 }}
                fontSize={{ base: "3rem", md: "4rem" }}
              />
              <Box>
                <Flex alignItems="center" mb={2}>
                  <Heading
                    as="h3"
                    fontSize={{ base: "1.25rem", md: "1.5rem" }}
                    lineHeight={1.4}
                    my={0}
                  >
                    <Translation id={contentObj.title} />
                  </Heading>
                  {!!contentObj.pill && (
                    <Pill ml={4} background={contentObj.pill.color}>
                      <Translation id={contentObj.pill.name} />
                    </Pill>
                  )}
                </Flex>
                <Text color="text200" mb={0} textAlign="start">
                  <Translation id={contentObj.textPreview} />
                </Text>
              </Box>
            </Flex>
            <MoreOrLessLink isOpen={isExpanded} />
          </AccordionButton>
          <AccordionPanel
            background="ednBackground"
            border="1px"
            borderColor="border"
            mb="-1px"
            mx="-1px"
            p={0}
          >
            <Flex
              p={8}
              justifyContent="space-between"
              flexDirection={{ base: "column", lg: "row" }}
            >
              {children}
            </Flex>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
