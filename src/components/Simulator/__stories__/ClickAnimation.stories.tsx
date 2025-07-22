import type { Meta, StoryObj } from "@storybook/react/*"
import { expect, waitFor, within } from "@storybook/test"

import { Button } from "@/components/ui/buttons/Button"

import { ClickAnimation } from "../ClickAnimation"

const meta = {
  title: "Molecules / Display Content / Simulator / ClickAnimation",
  component: ClickAnimation,
  decorators: [
    (Story) => (
      <div className="relative">
        <Story />
        <Button>Visit NFT Market</Button>
      </div>
    ),
  ],
  args: {
    children: "Click!",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      async () => {
        const animationEl = canvas.getByTestId("click-animation-el")

        await expect(animationEl).toBeVisible()
        await waitFor(
          async () => {
            await expect(animationEl).toHaveStyle({ transform: "none" })
          },
          { timeout: 1500 }
        )
      },
      { timeout: 6000 }
    )
  },
} satisfies Meta<typeof ClickAnimation>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Below: Story = {
  args: {
    below: true,
  },
}
