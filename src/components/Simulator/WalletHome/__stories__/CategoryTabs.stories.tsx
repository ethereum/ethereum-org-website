import { useState } from "react"
import { Meta, StoryObj } from "@storybook/react"

import { CategoryTabs } from "../CategoryTabs"

const meta = {
  title: "Molecules / Display Content / Simulator / WalletHome / CategoryTabs",
  component: CategoryTabs,
  args: {
    categories: ["My contacts", "Recent"],
  },
} satisfies Meta<typeof CategoryTabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

const ActiveTab: Story["render"] = (args) => {
  const [activeTabIndex, setActiveTabIndex] = useState(1)

  return (
    <CategoryTabs
      {...args}
      activeIndex={activeTabIndex}
      setActiveIndex={setActiveTabIndex}
    />
  )
}

export const SelectActiveTab: Story = {
  render: (args) => <ActiveTab {...args} />,
}
