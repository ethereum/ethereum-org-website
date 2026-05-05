import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "../buttons/Button"
import { HStack } from "../flex"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../popover"

const meta = {
  title: "UI / Primitives / Popover",
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          "Anchored floating panel built on Radix Popover. The arrow is always rendered as part of `PopoverContent`. Use `align` to shift the panel relative to its trigger.",
      },
    },
  },
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">
          Popovers anchor to their trigger and surface secondary information or
          short forms.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

export const Alignments: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All three `align` options shown side-by-side. `start` left-aligns to the trigger, `end` right-aligns, `center` is the default.",
      },
    },
  },
  render: () => (
    <HStack className="gap-8 pt-32">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">align=start</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <p className="text-sm">Aligned to the start edge of the trigger.</p>
        </PopoverContent>
      </Popover>

      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">align=center</Button>
        </PopoverTrigger>
        <PopoverContent align="center">
          <p className="text-sm">Centered under the trigger (default).</p>
        </PopoverContent>
      </Popover>

      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">align=end</Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <p className="text-sm">Aligned to the end edge of the trigger.</p>
        </PopoverContent>
      </Popover>
    </HStack>
  ),
}

export const WithRichContent: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Show details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-3">
          <h4 className="font-semibold">Network details</h4>
          <p className="text-sm text-body-medium">
            Layer 2 networks scale Ethereum by handling transactions off the
            main chain while inheriting its security guarantees.
          </p>
          <Button size="sm" variant="outline">
            Learn more
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const WithCloseAction: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-3">
          <p className="text-sm">
            Use `PopoverClose` to dismiss the panel from inside the content.
          </p>
          <PopoverClose asChild>
            <Button size="sm">Got it</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
