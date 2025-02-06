import type { Meta, StoryObj } from "@storybook/react/*"

import { Browser as Component } from "../Browser"

const meta = {
  title:
    "Molecules / Display Content / Simulator / ConnectWeb3 Screen / Browser",
  component: Component,
  decorators: [
    (Story) => (
      <div className="relative h-[500px] w-[322px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Component>

export default meta

export const Browser: StoryObj<typeof meta> = {}
