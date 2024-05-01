import * as React from "react"
import {
  Box,
  Flex,
  Heading as HeadingComponent,
  HeadingProps,
  Stack,
  VStack,
} from "@chakra-ui/react"
import { objectKeys } from "@chakra-ui/utils"
import { Meta, StoryObj } from "@storybook/react"

import Translation from "../Translation"

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
    size: "3xl",
  },
  {
    as: "h1",
    size: "2xl",
  },
  {
    // No props as the default is `h2` with size `xl
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
              size={obj.size}
            >
              {(obj.size as string) || "xl"}
            </HeadingComponent>
            <HeadingComponent flex="3" {...obj}>
              {`${obj.as} base component`}
            </HeadingComponent>
          </Flex>
        ))}
      </Stack>
    </VStack>
  ),
}
