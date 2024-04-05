import * as React from "react"
import {
  Box,
  Flex,
  Heading as HeadingComponent,
  HeadingProps,
  Stack,
  VStack,
} from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import Translation from "../Translation"

const meta = {
  title: "Atoms / Typography / Heading",
  component: HeadingComponent,
  parameters: {
    layout: null,
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
    size: "4xl",
  },
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
  args: {
    children: <Translation id="page-index:page-index-title" />,
  },
  render: (args) => (
    <VStack w="full">
      <Box>
        Adjust the viewport to below &quot;md&quot; to see the font size and
        line height change
      </Box>
      <Stack>
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
              {args.children}
            </HeadingComponent>
          </Flex>
        ))}
      </Stack>
    </VStack>
  ),
}
