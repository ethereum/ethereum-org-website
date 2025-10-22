import { useAccount } from "wagmi"

import MintConnect from "./views/MintConnect"
import Prechecks from "./Prechecks"

export default function Connection() {
  const { address, isConnected } = useAccount()

  if (!isConnected || !address) {
    return <MintConnect />
  }

  return <Prechecks address={address} />
}
