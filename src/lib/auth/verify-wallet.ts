import type { SIWEPluginOptions } from "better-auth/plugins/siwe"
import {
  createPublicClient,
  getAddress,
  http,
  isAddress,
  verifyMessage,
} from "viem"
import { mainnet } from "viem/chains"
import type { SiweMessage } from "viem/siwe"

type VerifyArgs = Parameters<SIWEPluginOptions["verifyMessage"]>[0]

/** Wallets sign in on mainnet only, so an address is one row and one way in */
export const SIWE_CHAIN_ID = mainnet.id

const mainnetClient = createPublicClient({ chain: mainnet, transport: http() })

/** The checksummed address, or null when the value isn't one */
export const toWalletAddress = (value: string) =>
  isAddress(value, { strict: false }) ? getAddress(value) : null

/** Why a parsed SIWE message can't be used here, or null when it can */
export const siweMessageProblem = (
  message: Partial<SiweMessage>,
  domain: string,
  now = new Date()
) => {
  if (!message.address || !toWalletAddress(message.address)) return "address"
  if (!message.nonce || !/^[a-zA-Z0-9]{8,}$/.test(message.nonce)) return "nonce"
  if (message.chainId !== SIWE_CHAIN_ID) return "chain"
  if (message.domain?.toLowerCase() !== domain) return "domain"
  if (message.expirationTime && message.expirationTime <= now) return "expired"
  if (message.notBefore && message.notBefore > now) return "not-yet-valid"
  return null
}

/**
 * Mainnet messages only. Plain wallets (EOAs) are checked locally. Smart
 * accounts sign through their contract (ERC-1271), which needs an RPC call.
 */
export const verifyWalletSignature = async ({
  message,
  signature,
  address,
  chainId,
}: VerifyArgs) => {
  if (chainId !== SIWE_CHAIN_ID) return false
  const args = {
    address: address as `0x${string}`,
    message,
    signature: signature as `0x${string}`,
  }
  if (await verifyMessage(args).catch(() => false)) return true
  return mainnetClient.verifyMessage(args).catch(() => false)
}
