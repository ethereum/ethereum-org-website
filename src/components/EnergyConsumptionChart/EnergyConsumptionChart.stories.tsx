import { Meta, StoryObj } from "@storybook/react"

import ChartComponent from "."

const meta = {
  title: "Charts / Energy Consumption Chart",
  component: ChartComponent,
} satisfies Meta<typeof ChartComponent>

export default meta

const data = {}

export const Basic: StoryObj<typeof meta> = {
  args: {
    data,
  },
}
