import type { Meta, StoryObj } from "@storybook/nextjs"

import { VStack } from "../flex"
import { Progress } from "../progress"

const meta = {
  title: "UI / Primitives / Progress",
  component: Progress,
  parameters: {
    docs: {
      description: {
        component:
          "Determinate progress bar built on Radix Progress. `value` is 0-100. `color: disabled` (default) renders a muted bar; `color: primary` switches the indicator and track to the brand pair.",
      },
    },
  },
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <Progress value={50} />
    </div>
  ),
}

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`color` prop variants. `disabled` is the default (muted), `primary` uses the brand color.",
      },
    },
  },
  render: () => (
    <VStack className="w-[320px] gap-4">
      <Progress value={66} color="disabled" />
      <Progress value={66} color="primary" />
    </VStack>
  ),
}

export const Values: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`value` is 0-100. The indicator translates with a CSS transition.",
      },
    },
  },
  render: () => (
    <VStack className="w-[320px] gap-4">
      <Progress value={0} color="primary" />
      <Progress value={25} color="primary" />
      <Progress value={50} color="primary" />
      <Progress value={75} color="primary" />
      <Progress value={100} color="primary" />
    </VStack>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <VStack className="w-[320px] gap-1">
      <div className="flex justify-between text-sm">
        <span>Uploading</span>
        <span>42%</span>
      </div>
      <Progress value={42} color="primary" />
    </VStack>
  ),
}
