import { useTranslations } from "next-intl"
import { Meta, StoryObj } from "@storybook/react"

import { TerminalTypewriter } from "../terminal-typewriter"

const meta = {
  title: "Molecules / Display Content / TerminalTypewriter",
  component: TerminalTypewriter,
  decorators: [
    (Story) => (
      <div className="w-[42rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TerminalTypewriter>

export default meta

type Story = StoryObj<typeof meta>

const EthSkillsTerminal = () => {
  const t = useTranslations("page-developers-index")
  return (
    <TerminalTypewriter
      messages={[
        t("page-developers-ethskills-msg-1"),
        t("page-developers-ethskills-msg-2"),
        t("page-developers-ethskills-msg-3"),
        t("page-developers-ethskills-msg-4"),
        t("page-developers-ethskills-msg-5"),
      ]}
    />
  )
}

export const Default: Story = {
  render: () => <EthSkillsTerminal />,
}
