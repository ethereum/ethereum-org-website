import type { Meta, StoryObj } from "@storybook/nextjs"

import Checkbox, { type CheckboxProps } from "../checkbox"
import { HStack, VStack } from "../flex"

const meta = {
  title: "UI / Primitives / Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "Single binary toggle built on Radix Checkbox. Supports `checked`, `disabled`, `aria-invalid` for error styling, and tri-state via `checked='indeterminate'`. Pair with a `<label>` so clicks on the label toggle the control.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

const LabeledCheckbox = ({
  label,
  ...props
}: CheckboxProps & { label: string }) => (
  <HStack asChild>
    <label>
      <Checkbox {...props} />
      {label}
    </label>
  </HStack>
)

export const Default: Story = {
  render: () => <LabeledCheckbox id="default" label="Subscribe to updates" />,
}

export const Checked: Story = {
  render: () => (
    <LabeledCheckbox id="checked" label="Already subscribed" defaultChecked />
  ),
}

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`checked='indeterminate'` represents a mixed state, typically used as a parent controlling a group where some (but not all) children are checked.",
      },
    },
  },
  render: () => (
    <LabeledCheckbox
      id="indeterminate"
      label="Some items selected"
      checked="indeterminate"
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <VStack className="items-start gap-3">
      <LabeledCheckbox id="disabled" label="Disabled" disabled />
      <LabeledCheckbox
        id="disabled-checked"
        label="Disabled and checked"
        disabled
        defaultChecked
      />
    </VStack>
  ),
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Apply `aria-invalid` to surface error styling defined by `commonControlClasses`.",
      },
    },
  },
  render: () => (
    <LabeledCheckbox id="invalid" label="Required field" aria-invalid="true" />
  ),
}

export const AsGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multiple checkboxes form an unordered group. For mutually exclusive options, use `RadioGroup` instead.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-3">
      <LabeledCheckbox id="group-eth" label="Ethereum" defaultChecked />
      <LabeledCheckbox id="group-arb" label="Arbitrum" />
      <LabeledCheckbox id="group-base" label="Base" defaultChecked />
      <LabeledCheckbox id="group-op" label="OP Mainnet" />
    </VStack>
  ),
}
