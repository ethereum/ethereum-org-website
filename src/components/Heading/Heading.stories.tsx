import * as React from "react"
import { Box, Flex, HeadingProps, Stack, VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import HeadingComponent from "."

const meta = {
  title: "Atoms / Typography / Heading",
  component: HeadingComponent,
  parameters: {
    layout: null,
    chromatic: {
      modes: {
        md: {
          viewport: "md",
        },
        "2xl": {
          viewport: "2xl",
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <Flex align="center" minH="100vh">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof HeadingComponent>

export default meta

type Story = StoryObj<typeof meta>

const headingScale: Array<HeadingProps> = [
  {
    as: "h1",
    size: "2xl",
  },
  {
    // Note that `h2` is the default render
    as: "h2",
    size: "xl",
  },
  {
    as: "h3",
    size: "lg",
  },
  {
    as: "h4",
    size: "md",
  },
  {
    as: "h5",
    size: "sm",
  },
  {
    as: "h6",
    size: "xs",
  },
]

export const Heading: Story = {
  render: () => (
    <VStack w="full">
      <Box>
        Adjust the viewport to below &quot;md&quot; to see the font size and
        line height change
      </Box>
      <Stack width="full" maxW="4xl">
        {headingScale.map((obj, idx) => (
          <Flex key={idx} gap="6">
            <HeadingComponent
              as="span"
              flex="1"
              textAlign="end"
              // Explicit size value passed because the element rendered is not a heading
              size={obj.size}
            >
              {(obj.size as string) || "xl"}
            </HeadingComponent>
            <HeadingComponent flex="3" as={obj.as}>
              {`${obj.as} base component`}
            </HeadingComponent>
          </Flex>
        ))}
      </Stack>
    </VStack>
  ),
}
