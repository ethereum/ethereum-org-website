import { useState } from "react"

import { FilterInputState } from "@/lib/types"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { walletsData } from "@/data/wallets/wallet-data"

interface NetworksWalletSelectInputProps {
  filterIndex: number
  itemIndex: number
  inputState: FilterInputState
  updateFilterState: (
    filterIndex: number,
    itemIndex: number,
    newInputState: FilterInputState
  ) => void
}

const NetworksWalletSelectInput = ({
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: NetworksWalletSelectInputProps) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredWallets = walletsData
    .filter((wallet) =>
      wallet.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="flex flex-col gap-2">
      <Select
        value={inputState as string}
        onValueChange={(e) => {
          updateFilterState(filterIndex, itemIndex, e)
          setSearchQuery("") // Reset search when selection is made
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select wallet" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          collisionPadding={8}
          className="max-h-[40vh] overflow-y-auto"
          avoidCollisions={true}
        >
          <div
            className="sticky top-0 z-10 bg-background p-2"
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              type="search"
              placeholder="Search wallets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {filteredWallets.length > 0 ? (
            filteredWallets.map((wallet, idx) => (
              <SelectItem key={idx} value={wallet.name}>
                {wallet.name} ({wallet.supported_chains.length})
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-center text-body-medium">
              No wallets found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}

export default NetworksWalletSelectInput
