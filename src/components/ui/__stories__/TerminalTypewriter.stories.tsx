import { Meta, StoryObj } from "@storybook/react"

import { TerminalTypewriter } from "../terminal-typewriter"

const meta = {
  title: "Atoms / Media & Icons / TerminalTypewriter",
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

export const Default: Story = {
  args: {
    messages: [
      "launch a coin for my community",
      "build a fan club that pays me when people join",
      "let my art earn royalties every time it resells",
      "create a DAO and let my fans vote on what I build",
      "set up a vault that grows my ETH while I sleep",
    ],
  },
}

export const ShortMessages: Story = {
  args: {
    messages: ["deploy contract", "verify on etherscan", "run tests"],
  },
}

export const RTL: Story = {
  decorators: [
    (Story) => (
      <div dir="rtl" className="w-[42rem]">
        <Story />
      </div>
    ),
  ],
  args: {
    messages: [
      "إطلاق عملة لمجتمعي",
      "بناء نادي معجبين يدفع لي عند انضمام الأعضاء",
      "جعل فني يكسب عوائد في كل مرة يعاد بيعه",
    ],
  },
}
