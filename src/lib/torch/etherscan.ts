import { type Address } from "viem"

import Torch from "@/data/Torch.json"

const TORCH_CONTRACT_ADDRESS = Torch.address as Address
const TORCH_BLOCK_NUMBER = Torch.blockNumber

export type TransferEvent = {
  from: Address
  to: Address
  blockNumber: number
  transactionHash: string
  timestamp: number
}

// You'll need to get an API key from https://etherscan.io/apis
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

export const fetchTorchTransfersFromEtherscan = async (): Promise<
  TransferEvent[]
> => {
  if (!ETHERSCAN_API_KEY) {
    throw new Error("ETHERSCAN_API_KEY environment variable is required")
  }

  try {
    // Get contract events from Etherscan
    const response = await fetch(
      [
        "https://api.etherscan.io/api",
        "?module=logs",
        "&action=getLogs",
        `&address=${TORCH_CONTRACT_ADDRESS}`,
        `&fromBlock=${TORCH_BLOCK_NUMBER}`,
        "&toBlock=latest",
        // ERC721 Transfer event signature
        "&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        `&apikey=${ETHERSCAN_API_KEY}`,
      ].join("")
    )

    const data = await response.json()

    if (data.status !== "1") {
      throw new Error(`Etherscan API error: ${data.message}`)
    }

    return data.result.map(
      (log: {
        topics: string[]
        blockNumber: string
        transactionHash: string
        timeStamp: string
      }) => ({
        from: `0x${log.topics[1].slice(26)}` as Address, // Remove padding from topic1
        to: `0x${log.topics[2].slice(26)}` as Address, // Remove padding from topic2
        blockNumber: parseInt(log.blockNumber, 16),
        transactionHash: log.transactionHash,
        timestamp: parseInt(log.timeStamp, 16),
      })
    )
  } catch (error) {
    console.error("Failed to fetch torch transfers from Etherscan:", error)
    return []
  }
}
