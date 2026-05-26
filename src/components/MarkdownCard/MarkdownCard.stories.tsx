import { useTranslations } from "next-intl"
import { Meta, type StoryObj } from "@storybook/nextjs"

import { Button } from "../ui/buttons/Button"

import CardComponent, { MarkdownCardProps } from "."

const meta = {
  title: "UI / Cards / MarkdownCard",
  component: CardComponent,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="grid w-full grid-cols-fill-3 gap-8 p-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Story key={idx} />
        ))}
      </div>
    ),
  ],
} satisfies Meta<typeof CardComponent>

export default meta

const DEVELOPS_INDEX_NS = "page-developers-index"

export const Card: StoryObj<MarkdownCardProps> = {
  render: (args) => {
    const t = useTranslations(DEVELOPS_INDEX_NS)

    const defaultProps: MarkdownCardProps = {
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
