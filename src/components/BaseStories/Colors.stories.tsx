import type { ReactNode } from "react"
import { Box, HStack, Square, Stack, Text } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

import colors from "@/@chakra-ui/foundations/colors"

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
