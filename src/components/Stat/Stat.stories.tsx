import { Meta, StoryObj } from "@storybook/react"

import StatComponent from "."

const meta = {
  title: "Molecules / Display Content / Stat",
  component: StatComponent,
} satisfies Meta<typeof StatComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Stat: Story = {
  args: {
    tooltipProps: {
      content: "Tooltip content",
    },
    isError: false,
    label: "Label",
    value: "000",
  },
  argTypes: {
    isError: {
      table: {
        disable: true,
      },
    },
  },
}

export const StatError: Story = {
  args: {
    ...Stat.args,
    isError: true,
    value: undefined,
  },
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
  },
}
