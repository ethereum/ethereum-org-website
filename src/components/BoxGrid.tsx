import React, { useState } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"

import Emoji from "./Emoji"

export interface IBoxItem {
  emoji: string
  title: string
  description: string
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
  "gridOrange",
  "gridPink",
  "gridPurple",
]

const BoxGrid: React.FC<IProps> = ({ items }) => {
  const [indexOpen, setOpenIndex] = useState(0)

  return (
    <Box
      display={{ base: "flex", lg: "grid" }}
      gridTemplateColumns="repeat(4, 1fr)"
      flexDirection="column"
      my={16}
      borderRadius="2px"
    >
      {items.map((item, idx: number) => {
        let columnNumber = idx + 1
        if (columnNumber > 4) {
          columnNumber = columnNumber - 3
        }
        const colorIdx = hashCode(item.emoji) % colors.length
        const color = colors[colorIdx]
        const isOpen = idx === indexOpen

        return (
          <Flex
            gridRowStart={isOpen ? 1 : "auto"}
            gridRowEnd={isOpen ? "span 2" : "auto"}
            gridColumnStart={isOpen ? columnNumber : "auto"}
            color={isOpen ? "black300" : "text"}
            cursor="pointer"
            bg={isOpen ? color : "background"}
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
            onClick={() => setOpenIndex(idx)}
            key={idx}
          >
            {isOpen ? (
              <Emoji mb={8} text={item.emoji} fontSize="8xl" />
            ) : (
              <Emoji
                m={2}
                alignSelf="center"
                _hover={{
                  transition: "transform 50s",
                  transform: "rotate(10turn)",
                }}
                text={item.emoji}
                fontSize="8xl"
              />
            )}
            <Box>
              <Heading as="h3" fontSize="2.5rem" fontWeight="normal" mt={0}>
                {item.title}
              </Heading>
              {isOpen && (
                <Text fontSize="xl" lineHeight={1.4} color="black300">
                  {item.description}
                </Text>
              )}
            </Box>
          </Flex>
        )
      })}
    </Box>
  )
}

export default BoxGrid
