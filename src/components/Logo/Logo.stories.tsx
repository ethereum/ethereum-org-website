import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"

import LogoComponent from "."

const meta = {
  title: "Atoms / Media & Icons / Logo",
  component: LogoComponent,
} satisfies Meta<typeof LogoComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Logo: Story = {
  render: () => <LogoComponent />,
}
