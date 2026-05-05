import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "../flex"
import { RadioGroup, RadioGroupItem } from "../radio-group"

const meta = {
  title: "UI / Primitives / RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          "Set of mutually exclusive options built on Radix RadioGroup. Items share styling tokens with `Checkbox` and `Switch` via `commonControlClasses`, including `aria-invalid` error styling.",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

const LabeledRadio = ({
  label,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupItem> & {
  label: string
  value: string
}) => (
  <HStack asChild>
    <label>
      <RadioGroupItem value={value} {...props} />
      {label}
    </label>
  </HStack>
)

export const Default: Story = {
  args: { defaultValue: "eth", className: "gap-3" },
  render: (args) => (
    <RadioGroup {...args}>
      <LabeledRadio value="eth" label="Ethereum" />
      <LabeledRadio value="arb" label="Arbitrum" />
      <LabeledRadio value="base" label="Base" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Disable the entire group via `disabled` on `RadioGroup`, or disable individual items.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-6">
      <RadioGroup defaultValue="eth" disabled className="gap-3">
        <LabeledRadio value="eth" label="Whole group disabled (selected)" />
        <LabeledRadio value="arb" label="Whole group disabled" />
      </RadioGroup>
      <RadioGroup defaultValue="eth" className="gap-3">
        <LabeledRadio value="eth" label="Selectable" />
        <LabeledRadio value="arb" label="Disabled item" disabled />
        <LabeledRadio value="base" label="Selectable" />
      </RadioGroup>
    </VStack>
  ),
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story: "Apply `aria-invalid` on items to surface error styling.",
      },
    },
  },
  render: () => (
    <RadioGroup className="gap-3">
      <LabeledRadio value="yes" label="Yes" aria-invalid="true" />
      <LabeledRadio value="no" label="No" aria-invalid="true" />
    </RadioGroup>
  ),
}

export const TwoItems: Story = {
  args: { defaultValue: "yes", className: "gap-3" },
  render: (args) => (
    <RadioGroup {...args}>
      <LabeledRadio value="yes" label="Yes" />
      <LabeledRadio value="no" label="No" />
    </RadioGroup>
  ),
}

export const FiveItems: Story = {
  args: { defaultValue: "good", className: "gap-3" },
  render: (args) => (
    <RadioGroup {...args}>
      <LabeledRadio value="terrible" label="Terrible" />
      <LabeledRadio value="bad" label="Bad" />
      <LabeledRadio value="okay" label="Okay" />
      <LabeledRadio value="good" label="Good" />
      <LabeledRadio value="great" label="Great" />
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Wrap label text and helper copy in the `<label>` so the entire block is the click target.",
      },
    },
  },
  render: () => (
    <RadioGroup defaultValue="standard" className="gap-4">
      <HStack className="items-start gap-2" asChild>
        <label>
          <RadioGroupItem value="standard" className="mt-1" />
          <span>
            <span className="block font-medium">Standard</span>
            <span className="block text-sm text-body-medium">
              Best for everyday use. 1-3 day delivery.
            </span>
          </span>
        </label>
      </HStack>
      <HStack className="items-start gap-2" asChild>
        <label>
          <RadioGroupItem value="express" className="mt-1" />
          <span>
            <span className="block font-medium">Express</span>
            <span className="block text-sm text-body-medium">
              Next-day delivery in supported regions.
            </span>
          </span>
        </label>
      </HStack>
    </RadioGroup>
  ),
}
