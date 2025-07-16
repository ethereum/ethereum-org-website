import blockies from "ethereum-blockies-base64"
import type { Address } from "viem"
import { sepolia } from "viem/chains"
import { createConfig, getPublicClient, http } from "@wagmi/core"

import { Image } from "@/components/Image"

import Torch from "./Torch.json"

import type { TorchHolder } from "@/lib/api/fetchTorchHolders"

const TORCH_CONTRACT_ADDRESS = Torch.address as Address
const TORCH_ABI = Torch.abi

const providerApiKey = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF"

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`
    ),
  },
})

interface TorchNFTProps {
  title: string
  description: string
  currentHolderLabel: string
  noHolderLabel: string
  holderLookup?: Record<string, unknown>
}

const TorchNFT = async ({
  title,
  description,
  currentHolderLabel,
  noHolderLabel,
  holderLookup,
}: TorchNFTProps) => {
  const publicClient = getPublicClient(config)

  // Read current holder from contract
  const currentHolder = (await publicClient.readContract({
    address: TORCH_CONTRACT_ADDRESS,
    abi: TORCH_ABI,
    functionName: "currentHolder",
  })) as Address

  const formatAddress = (address: Address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getBlockieImage = (address: Address) => {
    return blockies(address)
  }

  let holderData: TorchHolder | null = null
  if (currentHolder && holderLookup) {
    holderData = holderLookup[currentHolder.toLowerCase()] as TorchHolder
  }

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8 rounded-4xl bg-gradient-to-br from-accent-a/10 to-accent-b/10 p-8 text-center">
          {/* Title and Description */}
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-black">{title}</h2>
            <p className="text-lg">{description}</p>
          </div>

          {/* Current Holder Display */}
          <div className="flex flex-col items-center gap-6">
            <h3 className="text-2xl font-bold">{currentHolderLabel}</h3>

            {currentHolder ? (
              <div className="flex flex-col items-center gap-4">
                {/* Enriched display if available */}
                {holderData ? (
                  <>
                    {/* Image or blockie */}
                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary">
                      <Image
                        src={
                          holderData.imageUrl || getBlockieImage(currentHolder)
                        }
                        alt={`Avatar for ${holderData.name || currentHolder}`}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Name */}
                    <div className="text-xl font-bold">{holderData.name}</div>
                    {/* Twitter */}
                    {holderData.twitter && (
                      <a
                        href={`https://twitter.com/${holderData.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        @{holderData.twitter}
                      </a>
                    )}
                    {/* Description */}
                    {holderData.description && (
                      <div className="max-w-xs text-md text-gray-600">
                        {holderData.description}
                      </div>
                    )}
                    {/* Address (small) */}
                    <div className="flex flex-col items-center gap-2">
                      <code className="rounded-lg bg-background-highlight px-4 py-2 font-mono text-lg">
                        {formatAddress(currentHolder)}
                      </code>
                      {/* <button
                        onClick={() =>
                          navigator.clipboard.writeText(currentHolder)
                        }
                        className="text-sm text-primary hover:underline"
                      >
                        Copy full address
                      </button> */}
                    </div>
                  </>
                ) : (
                  // Fallback to default display
                  <>
                    {/* Blockie Avatar */}
                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-primary">
                      <Image
                        src={getBlockieImage(currentHolder)}
                        alt={`Avatar for ${currentHolder}`}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Address */}
                    <div className="flex flex-col items-center gap-2">
                      <code className="rounded-lg bg-background-highlight px-4 py-2 font-mono text-lg">
                        {formatAddress(currentHolder)}
                      </code>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(currentHolder)
                        }
                        className="text-sm text-primary hover:underline"
                      >
                        Copy full address
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-lg">{noHolderLabel}</div>
            )}
          </div>

          {/* Torch Visual Element */}
          <div className="flex items-center justify-center">
            <div className="text-8xl">🔥</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TorchNFT
