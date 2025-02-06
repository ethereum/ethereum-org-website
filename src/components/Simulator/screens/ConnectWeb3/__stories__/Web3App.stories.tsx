import type { Meta, StoryObj } from "@storybook/react/*"

import { Center } from "@/components/ui/flex"

import { EXAMPLE_APP_URL } from "../constants"
import { Web3App as Component } from "../Web3App"

const meta = {
  title:
    "Molecules / Display Content / Simulator / ConnectWeb3 Screen / Web3App",
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

export const Web3App: StoryObj<typeof meta> = {
  args: {
    appName: "NFT Marketplace",
    displayUrl: EXAMPLE_APP_URL,
    children: <Center>Slide content here</Center>,
  },
}
