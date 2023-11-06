import React from "react"
import { Box } from "@chakra-ui/react"
import { Meta, StoryFn } from "@storybook/react"

import { Button } from "@/components/Buttons"

// TODO: Re-enable after i18n implemented
// import { useTranslation } from "react-i18next"
import Card, { IProps } from "."

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
  // TODO
  // const { t } = useTranslation()

  const defaultProps: IProps = {
    emoji: ":woman_student:",
    title: "page-developers-learn", // t("page-developers-learn"),
    description: "page-developers-learn-desc", // t("page-developers-learn-desc"),
  }

  return (
    <Component {...defaultProps} {...args}>
      {/* <Button>{t("page-developers-read-docs")}</Button> */}
      <Button>page-developers-read-docs</Button>
    </Component>
  )
}
