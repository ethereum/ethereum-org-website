import { Meta, StoryObj } from "@storybook/nextjs"

import ChartComponent from "."

const meta = {
  title: "Components / Data Viz / EnergyConsumptionChart",
  component: ChartComponent,
} satisfies Meta<typeof ChartComponent>

export default meta

const data = {}

export const Basic: StoryObj<typeof meta> = {
  args: {
    data,
  },
}
