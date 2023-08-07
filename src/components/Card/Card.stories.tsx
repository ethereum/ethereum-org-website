import React from "react"
import { Box } from "@chakra-ui/react"
import { Meta, StoryFn } from "@storybook/react"
import { useTranslation } from "react-i18next"
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
} as Meta<typeof Component>

export const Default: StoryFn<typeof Component> = (args) => {
  const { t } = useTranslation()

  const defaultProps: IProps = {
    emoji: ":woman_student:",
    title: t("page-developers-learn"),
    description: t("page-developers-learn-desc"),
  }

  return (
    <Component {...defaultProps} {...args}>
      <Button>{t("page-developers-read-docs")}</Button>
    </Component>
  )
}
