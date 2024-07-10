import { Meta, StoryObj } from "@storybook/react"

import ChartComponent from "."

const meta = {
  title: "Molecules / Display Content / Charts / Energy Consumption",
  component: ChartComponent,
} satisfies Meta<typeof ChartComponent>

export default meta

const data = {}

export const Basic: StoryObj<typeof meta> = {
  args: {
    data,
  },
}
