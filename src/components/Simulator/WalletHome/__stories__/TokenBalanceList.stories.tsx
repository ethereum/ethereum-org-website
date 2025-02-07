import type { Meta, StoryObj } from "@storybook/react"

import { defaultTokenBalances } from "../../constants"
import { TokenBalanceList as Component } from "../TokenBalanceList"

const meta = {
  title:
    "Molecules / Display Content / Simulator / WalletHome / TokenBalanceList",
  component: Component,
} satisfies Meta<typeof Component>

export default meta

export const TokenBalanceList: StoryObj<typeof meta> = {
  args: {
    tokenBalances: defaultTokenBalances,
  },
}
