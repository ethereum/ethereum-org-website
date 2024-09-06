import { Meta, StoryObj } from "@storybook/react"

import FindWalletProductTable from "@/components/FindWalletProductTable"

import walletsData from "@/data/wallets/wallet-data"

const meta = {
  title: "Pages / Special cases / Find Wallet Product Table",
  component: FindWalletProductTable,
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-screen-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FindWalletProductTable>

export default meta

type Story = StoryObj<typeof meta>

export const WalletProductTableStory: Story = {
  args: {
    wallets: walletsData.map((wallet) => {
      return { ...wallet, supportedLanguages: wallet.languages_supported }
    }),
  },
  render: (args) => {
    return <FindWalletProductTable {...args} />
  },
}
