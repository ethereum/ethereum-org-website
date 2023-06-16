import React, { useState } from "react"
import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"

import Emoji from "./Emoji"

import { MatomoEventOptions, trackCustomEvent } from "../utils/matomo"

export interface IBoxItem {
  emoji: string
  title: string
  description: string
  matomo: MatomoEventOptions
}

export interface IProps {
  items: Array<IBoxItem>
}

// Represent string as 32-bit integer
const hashCode = (stringPhrase: string): number => {
  let hash = 0
  for (const char of stringPhrase) {
    const code = char.charCodeAt(0)
    hash = (hash << 5) - hash + code
    hash |= 0
  }
  return Math.abs(hash)
}

// Theme variables from Theme.js
const colors = [
  "gridYellow",
  "gridRed",
  "gridBlue",
  "gridGreen",
  "warning",
  "gridPink",
  "gridPurple",
]

const BoxGrid: React.FC<IProps> = ({ items }) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <SimpleGrid columns={{ base: 1, lg: 4 }} my={16} borderRadius="sm">
      {items.map((item, idx: number) => {
        let columnNumber = idx + 1
        if (columnNumber > 4) {
          columnNumber = columnNumber - 3
        }
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        const isOpen = idx === indexOpen

        return (
          <GridItem
            as={Flex}
            rowStart={{ ...(isOpen && { lg: 1 }) }}
            rowEnd={{ ...(isOpen && { lg: 3 }) }}
            colStart={{ ...(isOpen && { lg: columnNumber }) }}
            color={isOpen ? "black300" : "text"}
            cursor="pointer"
            bg={isOpen ? color : "background.base"}
            direction={{
              base: isOpen ? "column" : "column-reverse",
              sm: isOpen ? "column" : "row-reverse",
              lg: isOpen ? "column" : "column-reverse",
            }}
            align={{ base: "center", lg: "stretch" }}
            justify="space-between"
            border="1px solid"
            borderColor="text"
            p={6}
            _hover={{
              bg: isOpen ? color : "ednBackground",
              transition: "transform 0.5s",
              transform: "skewX(-5deg)",
              boxShadow: "tableBoxShadow",
            }}
            onClick={() => {
              setOpenIndex(idx)
              trackCustomEvent({
                eventCategory: item.matomo.eventCategory,
                eventAction: item.matomo.eventAction,
                eventName: item.matomo.eventName,
              })
            }}
            key={idx}
          >
            <Emoji
              m={2}
              text={item.emoji}
              fontSize="8xl"
              {...(isOpen
                ? { mb: 8 }
                : {
                    alignSelf: "center",
                    _hover: {
                      transition: "transform 50s",
                      transform: "rotate(10turn)",
                    },
                  })}
            />
            <Box>
              <Heading
                as="h3"
                fontSize="2.5rem"
                fontWeight="normal"
                mt={0}
                lineHeight={1.4}
              >
                {item.title}
              </Heading>
              {isOpen && (
                <Text fontSize="xl" lineHeight={1.4} color="black300">
                  {item.description}
                </Text>
              )}
            </Box>
          </GridItem>
        )
      })}
    </SimpleGrid>
  )
}

export default BoxGrid
