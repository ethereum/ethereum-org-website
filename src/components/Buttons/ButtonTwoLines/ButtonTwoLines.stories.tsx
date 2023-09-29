import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { BiCircle } from "react-icons/bi"
import { Stack } from "@chakra-ui/react"
import ButtonTwoLinesComponent from "."

type ComponentType = typeof ButtonTwoLinesComponent

const meta = {
  title: "Atoms / Form / Buttons / ButtonTwoLines",
  component: ButtonTwoLinesComponent,
} satisfies Meta<ComponentType>

export default meta

type Story = StoryObj<typeof meta>

export const ButtonTwoLines: Story = {
  args: {
    icon: BiCircle,
    mainText: "Main Text",
    helperText: "Helper Text",
    w: "300px",
  },
  render: (args) => (
    <Stack spacing="8">
      <ButtonTwoLinesComponent {...args} />
      <ButtonTwoLinesComponent
        {...args}
        iconAlignment="right"
        size="sm"
        reverseTextOrder
      />
    </Stack>
  ),
}
