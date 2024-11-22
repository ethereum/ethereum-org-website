import { FilterOption } from "@/lib/types"

import {
  DevelopingIcon,
  EmergingIcon,
  MaturingIcon,
  RobustIcon,
} from "@/components/icons/layer-2"
import NetworksWalletSelectInput from "@/components/Layer2NetworksTable/NetworksWalletSelectInput"
import SwitchFilterInput from "@/components/ProductTable/FilterInputs/SwitchFilterInput"

export const useNetworkFilters = (): FilterOption[] => {
  return [
    {
      title: "Wallet support",
      showFilterOption: true,
      items: [
        {
          filterKey: "wallets_supported",
          filterLabel: "",
          description: "",
          inputState: "",
          ignoreFilterReset: false,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <NetworksWalletSelectInput
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={updateFilterState}
              />
            )
          },
          options: [],
        },
      ],
    },
    {
      title: "Network maturity",
      showFilterOption: true,
      items: [
        {
          filterKey: "robust",
          filterLabel: "Robust",
          description:
            "Fully decentralized and secure network that cannot be tampered with or stopped by any individual or group.",
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={RobustIcon}
                label="Robust"
                description="Fully decentralized and secure network that cannot be tampered with or stopped by any individual or group."
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "maturing",
          filterLabel: "Maturing",
          description:
            "A network transitions to being decentralized. A group of actors still may be able to halt the network in extreme situations.",
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={MaturingIcon}
                label="Maturing"
                description="A network transitions to being decentralized. A group of actors still may be able to halt the network in extreme situations."
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "developing",
          filterLabel: "Developing",
          description:
            "Single operator is running the network with public data visibility for transparency. ",
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={DevelopingIcon}
                label="Developing"
                description="Single operator is running the network with public data visibility for transparency."
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
        {
          filterKey: "emerging",
          filterLabel: "Emerging",
          description:
            "Single operator is running the network in private and works towards transparency.",
          inputState: true,
          input: (filterIndex, itemIndex, inputState, updateFilterState) => {
            return (
              <SwitchFilterInput
                Icon={EmergingIcon}
                label="Emerging"
                description="Single operator is running the network in private and works towards transparency."
                filterIndex={filterIndex}
                itemIndex={itemIndex}
                inputState={inputState}
                updateFilterState={(filterIndex, itemIndex, newInputState) => {
                  updateFilterState(filterIndex, itemIndex, newInputState)
                }}
              />
            )
          },
          options: [],
        },
      ],
    },
  ]
}
