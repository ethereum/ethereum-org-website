import type { Meta, StoryObj } from "@storybook/react/*"
import { fireEvent, within } from "@storybook/test"

import { Flex } from "@/components/ui/flex"

import { MoreInfoPopover as MoreInfoPopoverComponent } from "../MoreInfoPopover"

const meta = {
  title: "Molecules / Display Content / Simulator / MoreInfoPopover",
  component: MoreInfoPopoverComponent,
  decorators: [
    (Story) => (
      <Flex className="h-80 w-96 items-center justify-center">
        <Story />
      </Flex>
    ),
  ],
} satisfies Meta<typeof MoreInfoPopoverComponent>

export default meta

export const MoreInfoPopover: StoryObj<typeof meta> = {
  args: {
    isFirstStep: false,
    children: "I am info",
  },
  render: (args) => <MoreInfoPopoverComponent {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const popoverTrigger = canvas.getByTestId("more-info-popover-trigger")

    fireEvent.click(popoverTrigger)
  },
}
