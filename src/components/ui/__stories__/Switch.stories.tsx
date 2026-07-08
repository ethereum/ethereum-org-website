import type { Meta, StoryObj } from "@storybook/nextjs"

import { HStack, VStack } from "../flex"
import Switch from "../switch"

const meta = {
  title: "UI / Primitives / Switch",
  component: Switch,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        component:
          "Binary on/off control built on Radix Switch. Shares styling tokens with `Checkbox` and `RadioGroup` via `commonControlClasses`, including `aria-invalid` error styling. For multi-state choices, use `Checkbox` (indeterminate) or `RadioGroup`.",
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Off: Story = {
  render: () => <Switch id="off" />,
}

export const On: Story = {
  render: () => <Switch id="on" defaultChecked />,
}

export const Disabled: Story = {
  render: () => (
    <HStack className="gap-6">
      <Switch id="disabled-off" disabled />
      <Switch id="disabled-on" disabled defaultChecked />
    </HStack>
  ),
}

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Apply `aria-invalid` for error styling shared with `Checkbox` and `RadioGroup`.",
      },
    },
  },
  render: () => <Switch id="invalid" aria-invalid="true" />,
}

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Wrap `Switch` in a `<label>` so clicks on the label text toggle the control. The `htmlFor` attribute is not needed when nesting the control inside the label.",
      },
    },
  },
  render: () => (
    <VStack className="items-start gap-3">
      <HStack asChild>
        <label>
          <Switch id="notif-email" />
          Email notifications
        </label>
      </HStack>
      <HStack asChild>
        <label>
          <Switch id="notif-push" defaultChecked />
          Push notifications
        </label>
      </HStack>
    </VStack>
  ),
}

export const SettingsList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Realistic settings panel grouping multiple labeled switches. Title and helper text are rendered as siblings.",
      },
    },
  },
  render: () => (
    <VStack className="w-[320px] items-stretch gap-4">
      <h3 className="font-semibold">Privacy</h3>
      <VStack className="gap-3">
        <HStack className="justify-between" asChild>
          <label>
            <span>
              <span className="block">Analytics</span>
              <span className="block text-xs text-body-medium">
                Anonymous usage data
              </span>
            </span>
            <Switch id="settings-analytics" defaultChecked />
          </label>
        </HStack>
        <HStack className="justify-between" asChild>
          <label>
            <span>
              <span className="block">Marketing</span>
              <span className="block text-xs text-body-medium">
                Product update emails
              </span>
            </span>
            <Switch id="settings-marketing" />
          </label>
        </HStack>
      </VStack>
    </VStack>
  ),
}
