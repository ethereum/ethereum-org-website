import { Meta, StoryObj } from "@storybook/nextjs"

import type { List } from "@/components/ButtonDropdown"

import MobileButtonDropdown from "."

const meta = {
  title: "Components / Widgets / MobileButtonDropdown",
  component: MobileButtonDropdown,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Thin positioning wrapper around `ButtonDropdown`: sticks to the bottom of the viewport on `<lg` breakpoints with full-width sizing, and hides itself on `lg` and up. Visual surface is essentially the underlying dropdown plus its mobile placement -- documented here so future pages picking it up know to expect both behaviors.",
      },
    },
  },
} satisfies Meta<typeof MobileButtonDropdown>

export default meta

type Story = StoryObj<typeof meta>

const sampleList: List = {
  text: "Choose section",
  ariaLabel: "Page sections",
  items: [
    { text: "Overview", href: "#overview" },
    { text: "Security", href: "#security" },
    { text: "Languages", href: "#languages" },
    { text: "Networks", href: "#networks" },
  ],
}

export const Default: Story = {
  args: {
    list: sampleList,
  },
}

export const MobileViewport: Story = {
  args: {
    list: sampleList,
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
}
