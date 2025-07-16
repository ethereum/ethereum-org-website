import blockies from "ethereum-blockies-base64"
import { Address } from "viem"
import { getPublicClient } from "@wagmi/core"

import { Image } from "@/components/Image"

import Torch from "./Torch.json"
import { config } from "./CurrentTorchHolderCard"

import type { TorchHolder } from "@/lib/api/fetchTorchHolders"

// TODO: Replace with actual deployed contract address
const TORCH_CONTRACT_ADDRESS = Torch.address as Address

interface TransferEvent {
  from: Address
  to: Address
  blockNumber: bigint
  transactionHash: string
  timestamp: number
}

interface TorchHistoryProps {
  title: string
  noHistoryLabel: string
  fromLabel: string
  toLabel: string
  transactionLabel: string
  holderLookup?: Record<string, unknown>
}

const mockLogs = [
  {
    eventName: "Transfer",
    args: {
      from: "0x0000000000000000000000000000000000000000",
      to: "0x0e972f52C49e353Dc88C9f7F8e200c1cFE0d27b7",
      tokenId: 1n,
    },
    address: "0xbcb60ff26412d7a27dde9b61f0655a207eae80ed",
    blockHash:
      "0x204c90926c265abbe78d321cbfa2e97a2185aa3804a46cab3960fe15652a90de",
    blockNumber: 8605647n,
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
      tokenId: 1n,
    },
    address: "0xbcb60ff26412d7a27dde9b61f0655a207eae80ed",
    blockHash:
      "0xfc9c50c6a7180a425e92d1774a88ee58dacb92a2a4554a013ec72ef14acfbe98",
    blockNumber: 8610141n,
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

const TorchHistory = async ({
  title,
  noHistoryLabel,
  fromLabel,
  toLabel,
  transactionLabel,
  holderLookup,
}: TorchHistoryProps) => {
  const publicClient = getPublicClient(config)

  const fetchTransferHistory = async () => {
    // Get Transfer events from the contract
    // ERC721 Transfer event signature: Transfer(address indexed from, address indexed to, uint256 indexed tokenId)
    // const logs = await publicClient.getLogs({
    //   address: TORCH_CONTRACT_ADDRESS,
    //   event: {
    //     type: "event",
    //     name: "Transfer",
    //     inputs: [
    //       { name: "from", type: "address", indexed: true },
    //       { name: "to", type: "address", indexed: true },
    //       { name: "tokenId", type: "uint256", indexed: true },
    //     ],
    //   },
    //   args: {
    //     tokenId: BigInt(1), // Torch NFT token ID is always 1
    //   },
    //   fromBlock: "earliest",
    //   toBlock: "latest",
    // })

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

    // Sort by block number (newest first)
    transferEvents.sort((a, b) => Number(b.blockNumber - a.blockNumber))

    return transferEvents
  }

  const formatAddress = (address: Address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getBlockieImage = (address: Address) => {
    return blockies(address)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEtherscanUrl = (txHash: string) => {
    return `https://etherscan.io/tx/${txHash}`
  }

  const renderHolder = (address: Address, label: string) => {
    let holderData: TorchHolder | null = null
    if (holderLookup && address) {
      holderData = holderLookup[address.toLowerCase()] as TorchHolder
    }
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-primary">
          <Image
            src={holderData?.imageUrl || getBlockieImage(address)}
            alt={`Avatar for ${holderData?.name || address}`}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        {holderData?.name && (
          <div className="text-xs font-bold text-gray-800">
            {holderData.name}
          </div>
        )}
        {holderData?.twitter && (
          <a
            href={`https://twitter.com/${holderData.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline"
          >
            @{holderData.twitter}
          </a>
        )}
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    )
  }

  const transfers = await fetchTransferHistory()

  if (!transfers) {
    return (
      <div className="w-full px-4 py-8 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-4xl bg-background-highlight p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold">{title}</h3>
            <div className="text-red-500">No transfer history found</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-4xl bg-background-highlight p-8">
          <h3 className="mb-8 text-center text-2xl font-bold">{title}</h3>

          {transfers.length === 0 ? (
            <div className="text-center text-lg">{noHistoryLabel}</div>
          ) : (
            <div className="space-y-6">
              {transfers.map((transfer, index) => (
                <div
                  key={`${transfer.transactionHash}-${index}`}
                  className="flex items-center gap-4 rounded-2xl bg-background p-6 transition-all hover:shadow-md"
                >
                  {/* From Avatar (enriched) */}
                  {renderHolder(transfer.from, fromLabel)}

                  {/* Transfer Details */}
                  <div className="flex-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <code className="rounded bg-background-highlight px-2 py-1 text-xs">
                          {formatAddress(transfer.from)}
                        </code>
                        <span>→</span>
                        <code className="rounded bg-background-highlight px-2 py-1 text-xs">
                          {formatAddress(transfer.to)}
                        </code>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(transfer.timestamp)}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center justify-center">
                    <div className="text-2xl">🔥</div>
                  </div>

                  {/* To Avatar (enriched) */}
                  {renderHolder(transfer.to, toLabel)}

                  {/* Transaction Link */}
                  <div className="flex items-center">
                    <a
                      href={getEtherscanUrl(transfer.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-primary px-3 py-1 text-xs text-white hover:bg-primary/80"
                    >
                      {transactionLabel}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TorchHistory
