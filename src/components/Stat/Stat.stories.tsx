import { Meta, StoryObj } from "@storybook/react"

import StatComponent from "."

const meta = {
  title: "Molecules / Display Content / Stat",
  component: StatComponent,
} satisfies Meta<typeof StatComponent>

export default meta

export const Stat: StoryObj<typeof meta> = {
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

export const StatError: StoryObj<typeof meta> = {
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
