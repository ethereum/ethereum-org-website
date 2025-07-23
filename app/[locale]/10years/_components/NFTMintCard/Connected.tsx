import { Address } from "viem"
import { useDisconnect } from "wagmi"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/buttons/Button"

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

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar
          className="h-6 w-6 !shadow-none"
          src={getBlockieImage(address)}
          href={getAddressEtherscanUrl(address)}
          name={ensName || formatAddress(address)}
        />
        <div>{ensName || formatAddress(address)}</div>
      </div>
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
