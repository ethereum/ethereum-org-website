"use client"

import { useRef } from "react"

import Checkbox from "@/components/ui/checkbox"

import { trackCustomEvent } from "@/lib/utils/matomo"

import type { WalletNetworkOption } from "./types"
import {
  useWalletFilterActions,
  useWalletFilters,
} from "./WalletFilterProvider"

const Layer2Select = ({ networks }: { networks: WalletNetworkOption[] }) => {
  const { state } = useWalletFilters()
  const { setLayer2 } = useWalletFilterActions()
  const prevNetworkArray = useRef<string[]>([])

  const updateSelection = (selection: string[]) => {
    if (selection.length > prevNetworkArray.current.length) {
      trackCustomEvent({
        eventCategory: "WalletFilterSidebar",
        eventAction: "network",
        eventName: selection[selection.length - 1],
      })
    }
    prevNetworkArray.current = selection
    setLayer2(selection)
  }

  return (
    <div className="mt-3 flex flex-col gap-1">
      {networks.map((network) => (
        <label
          key={network.chainName}
          className="flex cursor-pointer flex-row items-center gap-2"
        >
          <Checkbox
            checked={state.layer2.includes(network.chainName)}
            onCheckedChange={(checked) => {
              updateSelection(
                checked
                  ? [...state.layer2, network.chainName]
                  : state.layer2.filter((name) => name !== network.chainName)
              )
            }}
          />
          <span className="select-none">{network.name}</span>
        </label>
      ))}
    </div>
  )
}

export default Layer2Select
