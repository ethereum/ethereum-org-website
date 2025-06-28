import { Circle } from "lucide-react"
import type { Meta, StoryObj } from "@storybook/react"

import { ButtonLinkTwoLines as ButtonLinkTwoLinesComponent } from "../buttons/ButtonTwoLines"
import { Stack } from "../flex"

const meta = {
  title: "Atoms / Form / Buttons / ButtonTwoLines",
  component: ButtonLinkTwoLinesComponent,
} satisfies Meta<typeof ButtonLinkTwoLinesComponent>

export default meta

type Story = StoryObj<typeof meta>

export const ButtonLinkTwoLines: Story = {
  args: {
    icon: Circle,
    mainText: "Main Text",
    helperText: "Helper Text",
    className: "w-[300px]",
    href: "#",
  },
  render: (args) => (
    <Stack className="gap-8">
      <ButtonLinkTwoLinesComponent {...args} />
      <ButtonLinkTwoLinesComponent
        {...args}
        iconAlignment="end"
        size="sm"
        reverseTextOrder
      />
    </Stack>
  ),
}
