import { Meta, StoryObj } from "@storybook/nextjs"

import StablecoinsTable, { type StablecoinsTableRow } from "./StablecoinsTable"

const rows: StablecoinsTableRow[] = [
  ["Tether", "USDT", "FIAT", "$183,305,140,370"],
  ["USDC", "USDC", "FIAT", "$73,777,616,768"],
  ["USDS", "USDS", "CRYPTO", "$9,563,931,588"],
  ["Ethena USDe", "USDE", "CRYPTO", "$4,772,934,515"],
  ["Dai", "DAI", "CRYPTO", "$4,575,366,738"],
  ["PayPal USD", "PYUSD", "FIAT", "$2,774,115,912"],
  ["Paxos Gold", "PAXG", "ASSET", "$1,203,515,104"],
  ["Tether Gold", "XAUT", "ASSET", "$1,042,880,516"],
].map(([name, symbol, type, marketCap]) => ({
  name,
  symbol,
  type,
  marketCap,
  peg: "USD",
  url: "https://ethereum.org/stablecoins/",
}))

const meta = {
  title: "Components / StablecoinsTable",
  component: StablecoinsTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Market-cap table of Ethereum stablecoins, used on /stablecoins/ and /organizations/enterprise/tokenization/. Build `content` with `buildStablecoinRows` from `@/lib/utils/stablecoins` so both pages list the same coins. Client component: the caller must provide the `page-stablecoins` namespace through `I18nProvider`. `pageSize` sets the initial rows and the step for each "Show more".',
      },
    },
  },
} satisfies Meta<typeof StablecoinsTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { content: rows, hasError: false },
}

export const PageSize: Story = {
  args: { content: rows, hasError: false, pageSize: 4 },
}

export const LoadError: Story = {
  args: { content: [], hasError: true },
}
