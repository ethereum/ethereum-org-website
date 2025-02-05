import type { Meta, StoryObj } from "@storybook/react"
import { expect, fireEvent, waitFor, within } from "@storybook/test"

import { Slider as SliderComponent } from "../Slider"

const meta = {
  title:
    "Molecules / Display Content / Simulator / ConnectWeb3 Screen / Slider",
  component: SliderComponent,
  decorators: [
    (Story) => (
      <div className="relative h-[500px] w-[322px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
  args: {
    displayUrl: "https://metamask.io/",
    children:
      "Connecting to the website will not share any personal or secure information with the site owners.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const slider = canvas.getByTestId("slider-box")

    await fireEvent.animationEnd(slider)

    await waitFor(async () => {
      await expect(slider).toHaveStyle({ bottom: "0px" })
    })
  },
} satisfies Meta<typeof SliderComponent>

export default meta

export const NotConnected: StoryObj<typeof meta> = {
  args: {
    isConnected: false,
  },
}

export const Connected: StoryObj<typeof meta> = {
  args: {
    isConnected: true,
  },
}
