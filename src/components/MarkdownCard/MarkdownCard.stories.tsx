import { useTranslations } from "next-intl"
import { Meta, type StoryObj } from "@storybook/nextjs"

import { Button } from "../ui/buttons/Button"
import { Grid } from "../ui/grid"

import CardComponent, { MarkdownCardProps } from "."

const meta = {
  title: "UI / Cards / MarkdownCard",
  component: CardComponent,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <Grid className="w-full p-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Story key={idx} />
        ))}
      </Grid>
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
