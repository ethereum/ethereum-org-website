import type { Meta, StoryObj } from "@storybook/nextjs"

import Checkbox from "../checkbox"
import { HStack, VStack } from "../flex"
import Input from "../input"
import { Label } from "../label"

const meta = {
  title: "UI / Forms / Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Radix Label. Associates text with a control via `htmlFor`, which also makes the label click-target activate the control. Carries `peer-disabled:` styling, so a label placed after a `peer`-marked disabled input dims automatically. `Field`/`FieldLabel` compose this -- prefer those when you need description and error slots too.",
      },
    },
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  render: () => (
    <VStack className="w-72 items-start gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </VStack>
  ),
}

export const WithCheckbox: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Matching `htmlFor`/`id` makes the label text itself toggle the checkbox.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-2">
      <Checkbox id="newsletter" />
      <Label htmlFor="newsletter">Send me the newsletter</Label>
    </HStack>
  ),
}

export const DisabledPeer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`peer-disabled:opacity-70` fires when the control is marked `peer` and disabled, so the label dims without extra wiring.",
      },
    },
  },
  render: () => (
    <HStack className="items-center gap-2">
      <Checkbox id="unavailable" className="peer" disabled />
      <Label htmlFor="unavailable">Currently unavailable</Label>
    </HStack>
  ),
}
