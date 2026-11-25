import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "../flex"
import { Label } from "../label"
import { RadioGroup, RadioGroupItem, RadioGroupSegment } from "../radio-group"

const meta = {
  title: "UI / Forms / RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          'Single choice from a short list, on Radix RadioGroup: one tab stop, arrow keys move the selection, real `radiogroup`/`radio` roles. Use it instead of a row of `Button`s with `aria-pressed` whenever exactly one option is selected. `variant="segmented"` joins the options into one bordered control with dividers (no per-option shadow, so hover never spills onto neighbours); set the direction with `divide-x` (default, a row) or `flex-col divide-x-0 divide-y` (a column). Give the group an accessible name (`aria-labelledby` or `aria-label`).',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="light" aria-label="Choose scenario">
      {[
        ["light", "Light call"],
        ["heavy", "Heavy call"],
        ["out-of-gas", "Out of gas"],
      ].map(([value, label]) => (
        <HStack key={value} className="gap-2">
          <RadioGroupItem id={`default-${value}`} value={value} />
          <Label htmlFor={`default-${value}`}>{label}</Label>
        </HStack>
      ))}
    </RadioGroup>
  ),
}

const SEGMENTS = [
  ["light", "Light call"],
  ["heavy", "Heavy call"],
  ["out-of-gas", "Out of gas"],
]

export const Segmented: Story = {
  render: () => (
    <VStack className="max-w-md items-stretch gap-6">
      <RadioGroup
        variant="segmented"
        defaultValue="light"
        aria-label="Choose scenario, row"
      >
        {SEGMENTS.map(([value, label]) => (
          <RadioGroupSegment key={value} value={value}>
            {label}
          </RadioGroupSegment>
        ))}
      </RadioGroup>
      <RadioGroup
        variant="segmented"
        defaultValue="heavy"
        aria-label="Choose scenario, column"
        className="w-60 flex-col divide-x-0 divide-y"
      >
        {SEGMENTS.map(([value, label]) => (
          <RadioGroupSegment key={value} value={value}>
            {label}
          </RadioGroupSegment>
        ))}
      </RadioGroup>
    </VStack>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup variant="segmented" defaultValue="light" aria-label="Disabled">
      {SEGMENTS.map(([value, label]) => (
        <RadioGroupSegment
          key={value}
          value={value}
          disabled={value === "heavy"}
        >
          {label}
        </RadioGroupSegment>
      ))}
    </RadioGroup>
  ),
}
