import { useTranslations } from "next-intl"
import { Meta, type StoryObj } from "@storybook/react"

import { Button } from "../ui/buttons/Button"

import CardComponent, { CardProps } from "."

const meta = {
  component: CardComponent,
  decorators: [
    (Story) => (
      <div className="max-w-[342px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardComponent>

export default meta

const DEVELOPS_INDEX_NS = "page-developers-index"

export const Card: StoryObj<typeof meta> = {
  render: (args) => {
    const t = useTranslations(DEVELOPS_INDEX_NS)

    const defaultProps: CardProps = {
      emoji: ":woman_student:",
      title: t("page-developers-learn"),
      description: t("page-developers-learn-desc"),
    }

    return (
      <CardComponent {...defaultProps} {...args}>
        <Button>{t("page-developers-read-docs")}</Button>
      </CardComponent>
    )
  },
}
