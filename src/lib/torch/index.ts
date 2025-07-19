import blockies from "ethereum-blockies-base64"
import { unstable_cache as cache } from "next/cache"
import type { Address } from "viem"
import { getPublicClient } from "@wagmi/core"

import Torch from "@/data/Torch.json"

import { config } from "./config"

const TORCH_CONTRACT_ADDRESS = Torch.address as Address
const TORCH_ABI = Torch.abi
const TORCH_BLOCK_NUMBER = Torch.blockNumber

// Addresses to filter from the UI (show as "Unknown Holder")
const FILTERED_ADDRESSES: string[] = [
  // Add addresses here that should be hidden from the UI
  // These addresses will show as "Unknown Holder" instead of their real metadata
  // Example: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".toLowerCase(),
  "0x8D3e2E0e562634244E5D229C3B97A38efbEc65Ab".toLowerCase(), // eth.org safe address
]

// Helper function to check if an address should be filtered
export const isAddressFiltered = (address: string): boolean => {
  return FILTERED_ADDRESSES.includes(address.toLowerCase())
}

type TransferEvent = {
  from: Address
  to: Address
  blockNumber: number
  transactionHash: string
  timestamp: number
}

export type TorchHolderMetadata = {
  address: Address
  name: string
  role: string
  twitter: string
  twitterPost?: string
}

export type TorchHolder = TorchHolderMetadata & {
  ens?: string
}

export type TorchHolderEvent = TorchHolder & {
  event: TransferEvent
}

export const getTransferEvents = cache(
  async () => {
    const publicClient = getPublicClient(config)

    // Get the current block number to ensure consistent results
    const currentBlock = await publicClient.getBlockNumber()

    // Get Transfer events from the contract
    // ERC721 Transfer event signature: Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
    const logs = await publicClient.getLogs({
      address: TORCH_CONTRACT_ADDRESS,
      event: {
        type: "event",
        name: "Transfer",
        inputs: [
          { name: "from", type: "address", indexed: true },
          { name: "to", type: "address", indexed: true },
          { name: "tokenId", type: "uint256", indexed: true },
        ],
      },
      args: {
        tokenId: BigInt(1), // Torch NFT token ID is always 1
      },
      fromBlock: BigInt(TORCH_BLOCK_NUMBER) || "earliest",
      toBlock: currentBlock,
    })

    // Process logs and get timestamps
    const transferEvents: TransferEvent[] = []

    for (const log of logs) {
      if (log.args?.from && log.args?.to) {
        // Get block details to get timestamp
        const block = await publicClient.getBlock({
          blockNumber: log.blockNumber,
        })

        transferEvents.push({
          from: log.args.from as Address,
          to: log.args.to as Address,
          blockNumber: Number(log.blockNumber),
          transactionHash: log.transactionHash,
          timestamp: Number(block.timestamp),
        })
      }
    }

    // Sort by block number (oldest first)
    transferEvents.sort((a, b) => a.blockNumber - b.blockNumber)

    return transferEvents
  },
  ["torch-transfer-events"],
  { revalidate: 86400 }
)

export const getHolderEvents = async (
  torchHolderMap: Record<string, TorchHolderMetadata>,
  transferEvents: TransferEvent[]
) => {
  return transferEvents.map<TorchHolderEvent>((event) => {
    const holderMetadata = torchHolderMap[event.to.toLowerCase()]

    // If the torch was transferred to the zero address (burned), create a special holder entry
    if (event.to === "0x0000000000000000000000000000000000000000") {
      return {
        address: event.to,
        name: "Burned",
        role: "Torch has been burned",
        twitter: "",
        event,
      }
    }

    // If we have metadata for this holder, use it
    if (holderMetadata) {
      return {
        ...holderMetadata,
        event,
      }
    }

    // If no metadata found, create a fallback entry
    return {
      address: event.to,
      name: `Unknown Bearer (${formatAddress(event.to)})`,
      role: "",
      twitter: "",
      event,
    }
  })
}

export const getCurrentHolderAddress = cache(
  async () => {
    const publicClient = getPublicClient(config)

    // If not burned, get the current holder
    const currentHolderAddress = (await publicClient.readContract({
      address: TORCH_CONTRACT_ADDRESS,
      abi: TORCH_ABI,
      functionName: "currentHolder",
    })) as Address

    return currentHolderAddress
  },
  ["torch-current-holder"],
  { revalidate: 86400 }
)

export const isTorchBurned = cache(
  async () => {
    const publicClient = getPublicClient(config)

    const isBurned = (await publicClient.readContract({
      address: TORCH_CONTRACT_ADDRESS,
      abi: TORCH_ABI,
      functionName: "isBurned",
    })) as boolean

    return isBurned
  },
  ["torch-burned-status"],
  { revalidate: 86400 }
)

export const getBlockieImage = (address: Address) => {
  return blockies(address)
}

export const getAvatarImage = (holder: TorchHolderMetadata | null) => {
  if (!holder) {
    return ""
  }

  // If there's a Twitter handle, use Twitter profile image
  if (holder.twitter && holder.twitter.trim() !== "") {
    const twitterHandle = extractTwitterHandle(holder.twitter)
    if (twitterHandle) {
      return `https://unavatar.io/twitter/${twitterHandle}`
    }
  }

  // Otherwise, fall back to blockie
  return getBlockieImage(holder.address)
}

const extractTwitterHandle = (twitterUrl: string): string | null => {
  // Handle various Twitter URL formats
  const patterns = [
    /twitter\.com\/([^/?]+)/, // twitter.com/username
    /x\.com\/([^/?]+)/, // x.com/username
    /^@?([a-zA-Z0-9_]{1,15})$/, // @username or username
  ]

  for (const pattern of patterns) {
    const match = twitterUrl.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

export const formatAddress = (address: Address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const month = date.toLocaleDateString("en-US", { month: "long" })
  const day = date.getDate().toString().padStart(2, "0")
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return `${month} ${day}, ${time}`
}

export const getTxEtherscanUrl = (txHash: string) => {
  return `https://etherscan.io/tx/${txHash}`
}

export const getAddressEtherscanUrl = (address: string) => {
  return `https://etherscan.io/address/${address}`
}
