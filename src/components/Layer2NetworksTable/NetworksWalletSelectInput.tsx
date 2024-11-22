import { FilterInputState } from "@/lib/types"

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
  return (
    <div className="flex flex-col gap-2">
      <Select
        value={inputState as string}
        onValueChange={(e) => {
          updateFilterState(filterIndex, itemIndex, e)
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select wallet" />
        </SelectTrigger>
        <SelectContent>
          {walletsData.map((wallet, idx) => (
            <SelectItem key={idx} value={wallet.name}>
              {wallet.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default NetworksWalletSelectInput
