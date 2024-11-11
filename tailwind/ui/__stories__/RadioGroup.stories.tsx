import type { Meta, StoryObj } from "@storybook/react/*"

import { HStack } from "../../../src/components/ui/flex"
import {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupItemProps,
} from "../RadioGroup"

const meta = {
  title: "Atoms / Form / ShadCN Radio",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta

const DEFAULT_CHECKED = "checked"

const radioSet: Array<RadioGroupItemProps & { label: string }> = [
  {
    id: "default",
    value: "default",
    label: "default",
  },
  {
    id: DEFAULT_CHECKED,
    value: DEFAULT_CHECKED,
    label: DEFAULT_CHECKED,
  },
  {
    id: "disabled",
    value: "disabled",
    disabled: true,
    label: "disabled",
  },
  {
    id: "disabled-checked",
    value: "disabled-checked",
    disabled: true,
    checked: true,
    label: "disabled-checked",
  },
  {
    id: "invalid",
    value: "invalid",
    "aria-invalid": true,
    label: "invalid",
  },
]

export const Radio: StoryObj<typeof meta> = {
  args: {
    defaultValue: DEFAULT_CHECKED,
    className: "gap-4",
  },
  render: (args) => (
    <RadioGroup {...args}>
      {radioSet.map((radio) => (
        <HStack key={radio.id} asChild>
          <label>
            <RadioGroupItem {...radio} />
            {radio.label}
          </label>
        </HStack>
      ))}
    </RadioGroup>
  ),
}
