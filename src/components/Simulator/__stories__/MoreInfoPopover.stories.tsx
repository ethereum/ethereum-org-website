import type { Meta, StoryObj } from "@storybook/react/*"
import { expect, fireEvent, waitFor, within } from "@storybook/test"

import { MoreInfoPopover as MoreInfoPopoverComponent } from "../MoreInfoPopover"

const meta = {
  title: "Molecules / Display Content / Simulator / MoreInfoPopover",
  component: MoreInfoPopoverComponent,
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

    await waitFor(async () => {
      await expect(
        canvas.getByTestId("more-info-popover-content")
      ).toBeVisible()
    })
  },
}
