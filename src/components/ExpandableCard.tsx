// Libraries
import React, { ComponentType, ReactNode, SVGProps, useState } from "react"

// Components
import Translation from "./Translation"

// Utils
import { trackCustomEvent } from "../utils/matomo"
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Fade,
  Heading,
  Text,
} from "@chakra-ui/react"

export interface IProps {
  children?: React.ReactNode
  contentPreview?: ReactNode
  title: ReactNode
  svg?: ComponentType<SVGProps<SVGElement>>
  eventCategory?: string
  eventName?: string
}

const ExpandableCard: React.FC<IProps> = ({
  children,
  contentPreview,
  title,
  svg: Svg,
  eventCategory = "",
  eventName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const matomo = {
    eventAction: `Clicked`,
    eventCategory: `ExpandableCard${eventCategory}`,
    eventName,
  }
  const onClick = () => {
    // Card will not collapse if clicking on a link or selecting text
    if (
      window.getSelection()?.toString().length === 0 &&
      !(window.event?.target as HTMLDivElement)?.className.includes(
        "ExternalLink"
      )
    ) {
      !isVisible && trackCustomEvent(matomo)
      setIsVisible(!isVisible)
    }
  }

  return (
    <Accordion
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
      index={isVisible ? [0] : []}
    >
      <AccordionItem borderTopWidth="0" flex="1">
        <Heading as="h3" m={0}>
          <AccordionButton
            width="100%"
            padding={`1.5rem 1.5rem ${isVisible ? "0" : "1.5rem"}`}
            flex="1"
            onClick={onClick}
            _hover={{
              backgroundColor: "ednBackground",
            }}
          >
            <Box
              display="flex"
              width="100%"
              alignItems="center"
              flexDir={{ base: "column", sm: "row" }}
            >
              <Box
                marginBottom={{ base: "0.5rem", sm: 0 }}
                marginRight={{ base: 0, sm: "1rem" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    svg: { marginRight: "1.5rem" },
                  }}
                  margin="1rem 0"
                >
                  {!!Svg && <Svg />}
                  <Text
                    fontSize="xl"
                    fontWeight="semibold"
                    flex="1"
                    marginTop="0rem"
                    marginBottom="0.5rem"
                  >
                    {title}
                  </Text>
                </Box>
                <Text
                  fontSize="sm"
                  color="text200"
                  marginBottom="0"
                  width="fit-content"
                >
                  {contentPreview}
                </Text>
              </Box>
              <Text
                fontSize="md"
                color="primary"
                ml={{ base: undefined, sm: "auto" }}
                mt="auto"
                mb="auto"
              >
                <Translation id={isVisible ? "less" : "more"} />
              </Text>
            </Box>
          </AccordionButton>
        </h3>
        <AccordionPanel
          paddingX="1.5rem"
          paddingBottom="1.5rem"
          paddingTop="0"
          onClick={onClick}
        >
          <Fade in={isVisible}>
            <Box
              fontSize="md"
              color="text"
              marginTop="2rem"
              paddingTop="1.5rem"
              borderTop="1px solid"
              borderColor="border"
            >
              {children}
            </Box>
          </Fade>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ExpandableCard
