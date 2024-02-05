import { BiCircle } from "react-icons/bi"
import { Stack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import ButtonTwoLinesComponent from "."

const meta = {
  title: "Atoms / Form / Buttons / ButtonTwoLines",
  component: ButtonTwoLinesComponent,
} satisfies Meta<typeof ButtonTwoLinesComponent>

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
        iconAlignment="end"
        size="sm"
        reverseTextOrder
      />
    </Stack>
  ),
}
