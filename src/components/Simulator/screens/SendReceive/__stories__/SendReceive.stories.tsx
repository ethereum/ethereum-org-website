import type { Meta, StoryObj } from "@storybook/react"
import { expect, fn, waitFor, within } from "@storybook/test"

import { Phone } from "@/components/Simulator/Phone"
import { Template } from "@/components/Simulator/Template"

import { SendReceive } from ".."

const meta = {
  title: "Molecules / Display Content / Simulator / SendReceive Screen",
  component: SendReceive,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    nav: {
      progressStepper: fn(),
      step: 0,
      openPath: fn(),
      regressStepper: fn(),
      totalSteps: 6,
    },
    ctaLabel: "",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto mt-8">
        <Template>
          <Phone>
            <Story />
          </Phone>
        </Template>
      </div>
    ),
  ],
} satisfies Meta<typeof SendReceive>

export default meta

type Story = StoryObj<typeof meta>

export const ReceiveEther: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 1,
    },
    ctaLabel: "Share address",
  },
}

export const ReceivedEther: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 2,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      async () => {
        expect(canvas.getByTestId("received-ether-toast")).toBeInTheDocument()
      },
      { timeout: 1500 }
    )
  },
}

export const SendEther: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 3,
    },
    ctaLabel: "Select recipient",
  },
}

export const SendFromContacts: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 4,
    },
  },
}

export const SendSummary: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 5,
    },
    ctaLabel: "Send now",
  },
}

export const Success: Story = {
  args: {
    nav: {
      ...meta.args.nav,
      step: 6,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await waitFor(
      async () => {
        const successIcon = canvas.getByTestId("success-icon")
        console.log("🚀 ~ successIcon:", successIcon)
        await expect(successIcon).toBeInTheDocument()
        await expect(successIcon).toHaveStyle({
          transform: "none",
        })
      },
      {
        timeout: 10000,
      }
    )
  },
}
