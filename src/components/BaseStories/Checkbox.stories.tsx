import * as React from "react"
import {
  Checkbox as CheckboxComponent,
  CheckboxGroup,
  type CheckboxProps,
  VStack,
} from "@chakra-ui/react"
import { Meta, type StoryObj } from "@storybook/react"

const meta = {
  title: "Atoms / Form / Checkbox",
  component: CheckboxComponent,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      expanded: false,
    },
  },
} satisfies Meta<typeof CheckboxComponent>

export default meta

const DEFAULT_VAL = "checked"

const checkboxDataSet: CheckboxProps[] = [
  {
    value: DEFAULT_VAL,
    children: "defaultValue",
  },
  {
    value: "disabled",
    isDisabled: true,
    children: "isDisabled",
  },
  {
    value: "focusable",
    isFocusable: true,
    isDisabled: true,
    children: "isFocusable",
  },
  {
    value: "read-only",
    isReadOnly: true,
    children: "isReadOnly",
  },
  {
    value: "required",
    isRequired: true,
    children: "isRequired",
  },
  {
    value: "invalid",
    isInvalid: true,
    children: "isInvalid",
  },
]

export const Checkbox: StoryObj = {
  render: () => (
    <CheckboxGroup defaultValue={[DEFAULT_VAL]}>
      <VStack spacing={4} align="flex-start">
        {checkboxDataSet.map((props) => (
          <CheckboxComponent key={props.value} {...props} />
        ))}
      </VStack>
    </CheckboxGroup>
  ),
}
