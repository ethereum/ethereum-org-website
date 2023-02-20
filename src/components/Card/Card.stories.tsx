import { Box } from "@chakra-ui/react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import React from "react"
import Card, { IProps } from "."
import Button from "../Button"

const Component = Card

export default {
  component: Card,
  decorators: [
    (Story) => (
      <Box maxW="342px" margin="0 auto">
        <Story />
      </Box>
    ),
  ],
} as ComponentMeta<typeof Component>

const defaultProps: IProps = {
  emoji: ":woman_student:",
  title: "Learn Ethereum development",
  description: "Read up on core concepts and the Ethereum stack with our docs",
}

export const Default: ComponentStory<typeof Component> = (args) => (
  <Component {...defaultProps} {...args}>
    <Button>Read the docs</Button>
  </Component>
)
