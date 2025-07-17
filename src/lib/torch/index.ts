import blockies from "ethereum-blockies-base64"
import type { Address } from "viem"
import { sepolia } from "viem/chains"
import { createConfig, getPublicClient, http } from "@wagmi/core"

import Torch from "@/data/Torch.json"

const TORCH_CONTRACT_ADDRESS = Torch.address as Address
const TORCH_ABI = Torch.abi

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    ),
  },
})

export type TorchHolder = {
  address: Address
  name: string
  role: string
  twitter: string
  twitterPost?: string
}

type TransferEvent = {
  from: Address
  to: Address
  blockNumber: bigint
  transactionHash: string
  timestamp: number
}

const mockLogs = [
  {
    eventName: "Transfer",
    args: {
      from: "0x0000000000000000000000000000000000000000",
      to: "0x0e972f52C49e353Dc88C9f7F8e200c1cFE0d27b7",
      tokenId: BigInt(1),
    },
    address: "0xbcb60ff26412d7a27dde9b61f0655a207eae80ed",
    blockHash:
      "0x204c90926c265abbe78d321cbfa2e97a2185aa3804a46cab3960fe15652a90de",
    blockNumber: BigInt(8605647),
    data: "0x",
    logIndex: 121,
    removed: false,
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x0000000000000000000000000e972f52c49e353dc88c9f7f8e200c1cfe0d27b7",
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    ],
    transactionHash:
      "0xb549dc9540ec1c1146a5b9b7c6f9d62a207db8d1ebeb049687a74c53239fe323",
    transactionIndex: 87,
  },
  {
    eventName: "Transfer",
    args: {
      from: "0x0e972f52C49e353Dc88C9f7F8e200c1cFE0d27b7",
      to: "0x7bc34Ec96a2da5FbC3c0cA0530d989821241516D",
      tokenId: BigInt(1),
    },
    address: "0xbcb60ff26412d7a27dde9b61f0655a207eae80ed",
    blockHash:
      "0xfc9c50c6a7180a425e92d1774a88ee58dacb92a2a4554a013ec72ef14acfbe98",
    blockNumber: BigInt(8610141),
    data: "0x",
    logIndex: 30,
    removed: false,
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x0000000000000000000000000e972f52c49e353dc88c9f7f8e200c1cfe0d27b7",
      "0x0000000000000000000000007bc34ec96a2da5fbc3c0ca0530d989821241516d",
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    ],
    transactionHash:
      "0xac1ff7552b6844dfcd46424d7ed6a5bd32316cccd88bc280721f0ece96501219",
    transactionIndex: 19,
  },
]

export const getTransferEvents = async () => {
  const publicClient = getPublicClient(config)

  // Get Transfer events from the contract
  // ERC721 Transfer event signature: Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
  //   const logs = await publicClient.getLogs({
  //     address: TORCH_CONTRACT_ADDRESS,
  //     event: {
  //       type: "event",
  //       name: "Transfer",
  //       inputs: [
  //         { name: "from", type: "address", indexed: true },
  //         { name: "to", type: "address", indexed: true },
  //         { name: "tokenId", type: "uint256", indexed: true },
  //       ],
  //     },
  //     args: {
  //       tokenId: BigInt(1), // Torch NFT token ID is always 1
  //     },
  //     fromBlock: "earliest",
  //     toBlock: "latest",
  //   })

  const logs = mockLogs

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
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        timestamp: Number(block.timestamp),
      })
    }
  }

  // Sort by block number (oldest first)
  transferEvents.sort((a, b) => Number(a.blockNumber - b.blockNumber))

  return transferEvents
}

export type HolderEvent = TorchHolder & {
  event: TransferEvent
}

export const getHolders = async (
  torchHolderMap: Record<string, TorchHolder>,
  transferEvents: TransferEvent[]
) => {
  return transferEvents.map<HolderEvent>((event) => {
    const holder = torchHolderMap[event.to.toLowerCase()]
    return {
      ...holder,
      event,
    }
  })
}

export const getCurrentHolderAddress = async () => {
  const publicClient = getPublicClient(config)

  const currentHolderAddress = (await publicClient.readContract({
    address: TORCH_CONTRACT_ADDRESS,
    abi: TORCH_ABI,
    functionName: "currentHolder",
  })) as Address

  return currentHolderAddress
}

export const getBlockieImage = (address: Address) => {
  return blockies(address)
}

export const formatAddress = (address: Address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const getEtherscanUrl = (txHash: string) => {
  return `https://etherscan.io/tx/${txHash}`
}
