import type { SIWEPluginOptions } from "better-auth/plugins/siwe"
import { createPublicClient, http, verifyMessage } from "viem"
import { mainnet } from "viem/chains"

type VerifyArgs = Parameters<SIWEPluginOptions["verifyMessage"]>[0]

const mainnetClient = createPublicClient({ chain: mainnet, transport: http() })

/**
 * Plain wallets (EOAs) are checked locally. Smart accounts sign through
 * their contract (ERC-1271), which needs an RPC call, so only mainnet ones
 * are supported for now.
 */
export const verifyWalletSignature = async ({
  message,
  signature,
  address,
  chainId,
}: VerifyArgs) => {
  const args = {
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  }
  if (await verifyMessage(args).catch(() => false)) return true
  if (chainId !== mainnet.id) return false
  return mainnetClient.verifyMessage(args).catch(() => false)
}
