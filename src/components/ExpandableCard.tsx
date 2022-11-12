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
  Text as ChakraText,
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
      borderRadius="2px"
      display="flex"
      flex-direction="column"
      marginBottom="1rem"
      cursor="pointer"
      _hover={{
        backgroundColor: "ednBackground",
      }}
      borderBottomWidth="0"
    >
      <AccordionItem borderTopWidth="0" flex="1">
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
                <Heading
                  as="h3"
                  size="md"
                  fontWeight="semibold"
                  flex="1"
                  marginTop="0rem"
                  marginBottom="0.5rem"
                >
                  {title}
                </Heading>
              </Box>
              <ChakraText
                fontSize="sm"
                color="text200"
                marginBottom="0"
                width="fit-content"
              >
                {contentPreview}
              </ChakraText>
            </Box>
            <Button
              as="div" // we do not want to nest a button in a button
              ml={{ base: undefined, sm: "auto" }}
              onClick={onClick}
              variant="link"
              color="primary"
              _hover={{
                boxShadow: "none",
                textDecoration: "none",
              }}
            >
              <Translation id={isVisible ? "less" : "more"} />
            </Button>
          </Box>
        </AccordionButton>
        {isVisible ? (
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
        ) : null}
      </AccordionItem>
    </Accordion>
  )
}

export default ExpandableCard
