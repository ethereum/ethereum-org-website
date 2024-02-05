import * as React from "react"
import { Flex, Radio as RadioComponent, RadioGroup } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

const meta = {
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
} satisfies Meta<typeof RadioComponent>

export default meta

type Story = StoryObj<typeof meta>

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
