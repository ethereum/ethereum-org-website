import { useState } from "react"
import { Meta, StoryObj } from "@storybook/react"

import ProductTable from "@/components/ProductTable"
import { columns } from "@/components/ProductTable/FindWallet/WalletColumns"

import walletsData from "@/data/wallets/wallet-data"

const meta = {
  title: "Pages / Special cases / Product Table",
  component: ProductTable,
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductTable>

export default meta

type Story = StoryObj<typeof meta>

export const WalletProductTableStory: Story = {
  args: {
    columns: columns,
    data: walletsData,
    getRowCanExpand: () => true,
  },
  render: (args) => {
    const [data, _] = useState(args.data)
    return <ProductTable {...args} data={data} />
  },
}
