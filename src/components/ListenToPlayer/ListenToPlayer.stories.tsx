import type { Meta, StoryObj } from "@storybook/react"
import { expect } from "@storybook/test"
import { waitFor } from "@storybook/test"
import { fireEvent } from "@storybook/test"
import { within } from "@storybook/test"

import Component from "."

const meta = {
  title: "Atoms / Media & Icons / ListenToPlayer",
  component: Component,
  args: {
    slug: "/eth/",
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const PlayerButton: Story = {}

export const PlayerWidget: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const canvasParent = within(canvasElement.parentElement!)

    const playerButton = canvas.getByRole("button")
    await waitFor(() => {
      // TODO: hacky way to wait for the sound to be loaded
      expect(playerButton.textContent).not.toContain("0 min")
    })

    fireEvent.click(playerButton)

    await waitFor(async () => {
      await expect(
        canvasParent.getByTestId("player-widget-modal")
      ).toBeVisible()
    })
  },
}
