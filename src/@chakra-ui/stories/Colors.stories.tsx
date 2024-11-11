import { type ReactNode } from "react"
import capitalize from "lodash/capitalize"
import { Box, Flex, HStack, Square, Stack, Text } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

import colors from "@/@chakra-ui/foundations/colors"
import semanticTokens from "@/@chakra-ui/semanticTokens"

const semanticTokenColors = semanticTokens["colors"]

import Heading from "@/components/Heading"

const meta = {
  title: "Design System/Colors",
  parameters: {
    // Do not create snapshots for any stories in the file.
    chromatic: { disableSnapshot: true },
  },
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
    const tokenNames = [
      "primary",
      "body",
      "background",
      "disabled",
      "success",
      "attention",
      "error",
    ] as const
    const deprecatedTokens: Record<(typeof tokenNames)[number], string[]> = {
      primary: ["light", "dark", "pressed"],
      body: [],
      background: [],
      disabled: [],
      success: ["neutral", "outline"],
      attention: ["neutral", "outline"],
      error: ["neutral", "outline"],
    }

    return (
      <Flex direction="column" gap="16">
        {tokenNames.map((tokenName) => {
          const currentDeprecatedTokens = deprecatedTokens[
            tokenName
          ] as string[]

          const tokenObj = semanticTokenColors[tokenName]

          const filteredTokenObj =
            "base" in tokenObj
              ? Object.keys(semanticTokens["colors"][tokenName]).filter(
                  (key) => !currentDeprecatedTokens.includes(key)
                )
              : undefined

          return (
            <Flex key={tokenName} direction="column" gap="4">
              <Heading>{capitalize(tokenName)}</Heading>
              <HStack gap="8">
                {!filteredTokenObj ? (
                  <SemanticColorBlock
                    nestedKey={tokenName}
                    tokenName={tokenName}
                  />
                ) : (
                  <>
                    {filteredTokenObj.map((nestedKey) => (
                      <SemanticColorBlock
                        key={nestedKey}
                        nestedKey={nestedKey}
                        tokenName={tokenName}
                      />
                    ))}
                  </>
                )}
              </HStack>
            </Flex>
          )
        })}
      </Flex>
    )
  },
}

const SemanticColorBlock = ({
  nestedKey,
  tokenName,
}: Record<"nestedKey" | "tokenName", string>) => (
  <Flex key={nestedKey} direction="column" gap="2">
    <Square
      border={
        tokenName === "background" && nestedKey === "base"
          ? "1px solid"
          : undefined
      }
      size="20"
      bg={tokenName === nestedKey ? tokenName : `${tokenName}.${nestedKey}`}
    />
    <Text>
      {tokenName}.{nestedKey}
    </Text>
  </Flex>
)
