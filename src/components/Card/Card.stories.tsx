import { useTranslation } from "next-i18next"
import { Box } from "@chakra-ui/react"
import { Meta, StoryFn } from "@storybook/react"

import { Button } from "@/components/Buttons"

import Card, { CardProps } from "."

export default {
  component: Card,
  decorators: [
    (Story) => (
      <Box maxW="342px" margin="0 auto">
        <Story />
      </Box>
    ),
  ],
} as Meta<typeof Card>

export const Default: StoryFn<typeof Card> = (args) => {
  const { t } = useTranslation("page-developers-index")

  const defaultProps: CardProps = {
    emoji: ":woman_student:",
    title: t("page-developers-learn"),
    description: t("page-developers-learn-desc"),
  }

  return (
    <Card {...defaultProps} {...args}>
      <Button>{t("page-developers-read-docs")}</Button>
    </Card>
  )
}
