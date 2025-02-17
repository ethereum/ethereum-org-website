import { BiCircle } from "react-icons/bi"
import { Meta, StoryObj } from "@storybook/react"

import { ButtonTwoLines as ButtonTwoLinesComponent } from "../buttons/ButtonTwoLines"
import { Stack } from "../flex"

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
    className: "w-[300px]",
  },
  render: (args) => (
    <Stack className="gap-8">
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
