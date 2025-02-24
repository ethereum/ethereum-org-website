import type { Meta, StoryObj } from "@storybook/react/*"

import CheckboxComponent, { type CheckboxProps } from "../checkbox"
import { HStack, VStack } from "../flex"

const meta = {
  title: "Atoms / Form / Checkbox",
  component: CheckboxComponent,
} satisfies Meta<typeof CheckboxComponent>

export default meta

const checkboxDataSet: (CheckboxProps & { label: string })[] = [
  {
    id: "default",
    value: "default",
    label: "default",
  },
  {
    id: "checked",
    value: "checked",
    label: "checked",
    checked: true,
  },
  {
    id: "disabled",
    value: "disabled",
    label: "disabled",
    disabled: true,
  },
  {
    id: "disabled-checked",
    value: "disabled-checked",
    label: "disabled-checked",
    disabled: true,
    checked: true,
  },
  {
    id: "invalid",
    value: "invalid",
    label: "invalid",
    "aria-invalid": true,
  },
]

export const Checkbox: StoryObj<typeof meta> = {
  render: () => (
    <VStack className="items-start gap-4">
      {checkboxDataSet.map(({ label, ...props }) => (
        <HStack key={props.id} asChild>
          <label>
            <CheckboxComponent {...props} />
            {label}
          </label>
        </HStack>
      ))}
    </VStack>
  ),
}
