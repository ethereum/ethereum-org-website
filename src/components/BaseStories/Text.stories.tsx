import * as React from "react"
import {
  Box,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import components from "../../@chakra-ui/gatsby-plugin/components"
import Translation from "../Translation"

type TextType = typeof Text

const meta = {
  title: "Atoms / Typography / Text",
  component: Text,
  parameters: {
    layout: "none",
  },
  decorators: [
    (Story) => (
      <Flex align="center" minH="100vh">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<TextType>

export default meta

type Story = StoryObj<typeof meta>

const textSizes = components.Text.sizes

export const Normal: Story = {
  args: {
    children: <Translation id="page-index-title" />,
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below "md" to see the font size and line height
          change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="right">
                {key}
              </Text>
              <Text size={key} flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}

export const Bold: Story = {
  args: {
    children: <Translation id="page-index-title" />,
    fontWeight: "bold",
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below "md" to see the font size and line height
          change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="right">
                {key}
              </Text>
              <Text size={key} flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}
export const Italic: Story = {
  args: {
    children: <Translation id="page-index-title" />,
    fontStyle: "italic",
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below "md" to see the font size and line height
          change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="right">
                {key}
              </Text>
              <Text size={key} flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}

export const Link: StoryObj<typeof ChakraLink> = {
  args: {
    children: <Translation id="page-index-title" />,
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below "md" to see the font size and line height
          change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="right">
                {key}
              </Text>
              <ChakraLink size={key} href="#" flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}
