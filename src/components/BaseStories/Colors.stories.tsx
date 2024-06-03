import { type ReactNode } from "react"
import capitalize from "lodash/capitalize"
import { Box, Flex, HStack, Square, Stack, Text } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

import colors from "@/@chakra-ui/foundations/colors"
import semanticTokens from "@/@chakra-ui/semanticTokens"

import Heading from "../Heading"

const meta = {
  title: "Design System/Colors",
} satisfies Meta

export default meta

const primitiveColorKeys = ["gray", "blue", "orange"]
export const Primitives: StoryObj = {
  render: () => {
    const primitiveColorsMap = Object.entries(colors)
      .filter((obj) => primitiveColorKeys.includes(obj[0]))
      .reduce<{ [tokenKey: string]: [string, string][] }>(
        (acc, [key, value]) => {
          const tokenMap = Object.entries(value)
          return {
            ...acc,
            [key]: tokenMap,
          }
        },
        {}
      )

    return (
      <Stack direction="column" gap="16">
        {primitiveColorKeys.map((color) => (
          <ColorGroupWrapper key={color} color={color}>
            <HStack>
              {primitiveColorsMap[color].map(([tokenKey, value]) => (
                <Stack key={`${color}${tokenKey}`} direction="column">
                  <Box>
                    <Square size="20" bg={`${color}.${tokenKey}`}></Square>
                  </Box>
                  <Stack direction="column">
                    <Text size="sm">{value}</Text>
                    <Text size="sm">
                      {color}.{tokenKey}
                    </Text>
                  </Stack>
                </Stack>
              ))}
            </HStack>
          </ColorGroupWrapper>
        ))}
      </Stack>
    )
  },
}

const ColorGroupWrapper = ({
  color,
  children,
}: {
  color: string
  children: ReactNode
}) => {
  return (
    <Box
      key={color}
      color={color === "orange" ? "white" : undefined}
      px="8"
      py="8"
      bg={
        color === "gray"
          ? `linear-gradient(180deg, #1b1b1b 35%, #fff 35%)`
          : color === "orange"
          ? "gray.800"
          : undefined
      }
    >
      {children}
    </Box>
  )
}

export const SemanticScheme: StoryObj = {
  parameters: {
    chromatic: {
      modes: {
        darkMode: {
          colorMode: "dark",
        },
        lightMode: {
          colorMode: "light",
        },
      },
    },
  },
  render: () => {
    const tokenNames = ["primary", "body", "background"] as const
    const deprecatedTokens = {
      primary: ["light", "dark", "pressed"],
      body: ["inverted"],
      background: [],
    }
    return (
      <Flex direction="column" gap="16">
        {tokenNames.map((tokenName) => {
          const currentDeprecatedTokens = deprecatedTokens[
            tokenName
          ] as string[]

          return (
            <Flex key={tokenName} direction="column" gap="4">
              <Heading>{capitalize(tokenName)}</Heading>
              <HStack gap="8">
                {Object.keys(semanticTokens["colors"][tokenName])
                  .filter((key) => !currentDeprecatedTokens.includes(key))
                  .map((key) => (
                    <Flex key={key} direction="column" gap="2">
                      <Square
                        border={
                          tokenName === "background" && key === "base"
                            ? "1px solid"
                            : undefined
                        }
                        size="20"
                        bg={`${tokenName}.${key}`}
                      ></Square>
                      <Text>{key}</Text>
                    </Flex>
                  ))}
              </HStack>
            </Flex>
          )
        })}
      </Flex>
    )
  },
}
