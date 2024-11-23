import { FilterInputState } from "@/lib/types"

import CheckboxFilterInput from "@/components/ProductTable/FilterInputs/CheckboxFilterInput"

import { layer2Data } from "@/data/layer-2/layer-2"

interface Layer2SelectInputProps {
  filterIndex: number
  itemIndex: number
  inputState: FilterInputState
  updateFilterState: (
    filterIndex: number,
    itemIndex: number,
    newInputState: FilterInputState
  ) => void
}

const Layer2SelectInput = ({
  filterIndex,
  itemIndex,
  inputState,
  updateFilterState,
}: Layer2SelectInputProps) => {
  return (
    <div className="mt-3 flex flex-col gap-1">
      {layer2Data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((network) => (
          <CheckboxFilterInput
            key={network.name}
            label={network.name}
            filterIndex={filterIndex}
            itemIndex={itemIndex}
            inputState={(inputState as string[])?.includes(network.chain_name)}
            updateFilterState={(filterIndex, itemIndex, newInputState) => {
              if (newInputState) {
                updateFilterState(filterIndex, itemIndex, [
                  ...(inputState as string[]),
                  network.chain_name,
                ])
              } else {
                updateFilterState(
                  filterIndex,
                  itemIndex,
                  (inputState as string[]).filter(
                    (name) => name !== network.chain_name
                  )
                )
              }
            }}
          />
        ))}
    </div>
  )
}

export default Layer2SelectInput
