import * as React from "react"
import { RadioGroup, Radio as RadioComponent, Flex } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

type RadioType = typeof RadioComponent

const meta: Meta<RadioType> = {
  title: "Atoms / Form / Radio",
  component: RadioComponent,
  argTypes: {
    flexDirection: {
      options: ["column", "row"],
      control: { type: "radio" },
    },
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      expanded: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Radio: Story = {
  args: {
    flexDirection: "column",
  },
  argTypes: {
    value: {
      options: ["checked", "disabled", "focusable", "read-only", "required"],
      control: {
        type: "radio",
      },
    },
  },
  render: ({ flexDirection, value }) => (
    <RadioGroup value={value}>
      <Flex flexDirection={flexDirection} gap={4} align="flex-start">
        <RadioComponent value="checked">defaultValue</RadioComponent>
        <RadioComponent value="disabled" isDisabled>
          isDisabled
        </RadioComponent>
        <RadioComponent value="focusable" isFocusable isDisabled>
          isFocusable and disabled
        </RadioComponent>
        <RadioComponent value="read-only" isReadOnly>
          isReadOnly
        </RadioComponent>
        <RadioComponent value="required" isRequired>
          isRequired
        </RadioComponent>
        <RadioComponent value="invalid" isInvalid>
          isInvalid
        </RadioComponent>
      </Flex>
    </RadioGroup>
  ),
}
