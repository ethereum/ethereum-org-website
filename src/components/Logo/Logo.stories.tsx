import * as React from "react"
import { Meta, StoryObj } from "@storybook/nextjs"

import LogoComponent from "."

const meta = {
  title: "Components / Logo",
  component: LogoComponent,
} satisfies Meta<typeof LogoComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Logo: Story = {
  render: () => <LogoComponent />,
}
