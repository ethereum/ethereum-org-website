import { Box } from "@chakra-ui/react"
import { Meta, type StoryObj } from "@storybook/react"

import { Button } from "@/components/Buttons"

import { getTranslation } from "@/storybook-utils"

import CardComponent, { CardProps } from "."

const meta = {
  component: CardComponent,
  decorators: [
    (Story) => (
      <Box maxW="342px" margin="0 auto">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof CardComponent>

export default meta

const DEVELOPS_INDEX_NS = "page-developers-index"

export const Card: StoryObj<typeof meta> = {
  render: (args) => {
    const defaultProps: CardProps = {
      emoji: ":woman_student:",
      title: getTranslation("page-developers-learn", DEVELOPS_INDEX_NS),
      description: getTranslation(
        "page-developers-learn-desc",
        DEVELOPS_INDEX_NS
      ),
    }

    return (
      <CardComponent {...defaultProps} {...args}>
        <Button>
          {getTranslation("page-developers-read-docs", DEVELOPS_INDEX_NS)}
        </Button>
      </CardComponent>
    )
  },
}
