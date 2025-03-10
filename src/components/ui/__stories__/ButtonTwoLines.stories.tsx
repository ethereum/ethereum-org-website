import { BiCircle } from "react-icons/bi"
import { Meta, StoryObj } from "@storybook/react"

import { ButtonTwoLines as ButtonTwoLinesComponent } from "../buttons/ButtonTwoLines"
import { HStack, Stack } from "../flex"

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
    <HStack className="gap-2">
      <Stack className="gap-8">
        <ButtonTwoLinesComponent {...args} />
        <ButtonTwoLinesComponent
          {...args}
          iconAlignment="end"
          size="sm"
          reverseTextOrder
        />
      </Stack>
      <Stack className="gap-8">
        <ButtonTwoLinesComponent variant="outline" {...args} />
        <ButtonTwoLinesComponent
          variant="outline"
          {...args}
          iconAlignment="end"
          size="sm"
          reverseTextOrder
        />
      </Stack>
    </HStack>
  ),
}
