import * as React from "react"
import {
  Checkbox as CheckboxComponent,
  CheckboxGroup,
  VStack,
} from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

type CheckboxType = typeof CheckboxComponent

const meta: Meta<CheckboxType> = {
  title: "Atoms / Form / Checkbox",
  component: CheckboxComponent,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      expanded: false,
    },
  },
}

export default meta

type Story = StoryObj<CheckboxType>

const DEFAULT_VAL = "checked"

export const Checkbox: Story = {
  render: () => (
    <CheckboxGroup defaultValue={[DEFAULT_VAL]}>
      <VStack spacing={4} align="flex-start">
        <CheckboxComponent value={DEFAULT_VAL}>defaultValue</CheckboxComponent>
        <CheckboxComponent value="disabled" isDisabled>
          isDisabled
        </CheckboxComponent>
        <CheckboxComponent value="focusable" isFocusable isDisabled>
          isFocusable
        </CheckboxComponent>
        <CheckboxComponent value="read-only" isReadOnly>
          isReadOnly
        </CheckboxComponent>
        <CheckboxComponent value="required" isRequired>
          isRequired
        </CheckboxComponent>
        <CheckboxComponent value="invalid" isInvalid>
          isInvalid
        </CheckboxComponent>
      </VStack>
    </CheckboxGroup>
  ),
}
