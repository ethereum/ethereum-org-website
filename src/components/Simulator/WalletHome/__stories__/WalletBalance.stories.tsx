import pickBy from "lodash/pickBy"
import type { Meta, StoryObj } from "@storybook/react"

import { viewportModes } from "../../../../../.storybook/modes"
import { WalletBalance as Component } from "../WalletBalance"

const meta = {
  title: "Molecules / Display Content / Simulator / WalletHome / WalletBalance",
  component: Component,
  parameters: {
    chromatic: {
      modes: pickBy(viewportModes, ({ viewport }) =>
        ["base", "md"].includes(viewport)
      ),
    },
  },
} satisfies Meta<typeof Component>

export default meta

export const WalletBalance: StoryObj<typeof meta> = {}
