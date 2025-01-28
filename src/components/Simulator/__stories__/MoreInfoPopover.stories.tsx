import type { Meta, StoryObj } from "@storybook/react/*"
import { fireEvent, within } from "@storybook/test"

import { MoreInfoPopover as MoreInfoPopoverComponent } from "../MoreInfoPopover"

const meta = {
  title: "Molecules / Display Content / Simulator / MoreInfoPopover",
  component: MoreInfoPopoverComponent,
} satisfies Meta<typeof MoreInfoPopoverComponent>

export default meta

export const MoreInfoPopover: StoryObj<typeof meta> = {
  args: {
    isFirstStep: false,
  },
  render: (args) => (
    <MoreInfoPopoverComponent {...args}>I am info</MoreInfoPopoverComponent>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const popoverTrigger = canvas.getByTestId("more-info-popover-trigger")

    fireEvent.click(popoverTrigger)
  },
}
