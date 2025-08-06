import { Address } from "viem"
import { useDisconnect, useSwitchChain } from "wagmi"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/buttons/Button"

import { useNetworkContract } from "@/hooks/useNetworkContract"
import {
  formatAddress,
  getAddressEtherscanUrl,
  getBlockieImage,
} from "@/lib/torch"

export default function Connected({
  address,
  ensName,
}: {
  address: Address
  ensName?: string | null
}) {
  const { disconnect } = useDisconnect()
  const { isSupportedNetwork, networkName, chainId } = useNetworkContract()
  const { switchChain, isPending } = useSwitchChain()

  const handleSwitchNetwork = () => {
    switchChain({ chainId })
  }

  return (
    <div className="flex flex-col items-center justify-between space-y-2">
      {/* Wallet Info */}
      <div className="flex items-center gap-4">
        <Avatar
          className="h-6 w-6 !shadow-none"
          src={getBlockieImage(address)}
          href={getAddressEtherscanUrl(address)}
          name={ensName || formatAddress(address)}
        />
        <div>{ensName || formatAddress(address)}</div>
      </div>

      {/* Network Status */}
      <div className="text-center">
        {isSupportedNetwork ? (
          <div className="flex items-center gap-2 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success"></div>
            <span>Connected to {networkName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-error">
              <div className="h-2 w-2 rounded-full bg-error"></div>
              <span>Unsupported Network</span>
            </div>
            <Button
              size="sm"
              onClick={handleSwitchNetwork}
              disabled={isPending}
            >
              {isPending ? "Switching..." : `Switch to ${networkName}`}
            </Button>
          </div>
        )}
      </div>

      {/* Disconnect Button */}
      <Button
        variant="link"
        size="sm"
        onClick={() => disconnect()}
        className="text-body-medium"
      >
        disconnect
      </Button>
    </div>
  )
}
