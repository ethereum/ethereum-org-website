import blockies from "ethereum-blockies-base64"
import type { Address } from "viem"
import { sepolia } from "viem/chains"
import { createConfig, getPublicClient, http } from "@wagmi/core"

import { Image } from "@/components/Image"
import {
  AvatarBase as Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/buttons/Button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BaseLink } from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import Curved10YearsText from "./10y.svg"
import Torch from "./Torch.json"

import type { TorchHolder } from "@/lib/api/fetchTorchHolders"
import TorchImage from "@/public/images/10-year-anniversary/torch.png"

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

interface CurrentTorchHolderCardProps {
  holderLookup?: Record<string, unknown>
  className?: string
}

const CurrentTorchHolderCard = async ({
  holderLookup,
  className,
}: CurrentTorchHolderCardProps) => {
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
    <Card
      className={cn("w-full overflow-hidden rounded-3xl shadow-xl", className)}
    >
      <CardHeader className="p-0">
        <CardTitle className="relative flex flex-col items-center justify-center bg-[#18193A] p-0 pb-6">
          {/* Torch/flame video */}
          <div className="mt-24 flex items-center justify-center">
            {/* <video
              src="/videos/torch.mp4"
              autoPlay
              loop
              muted
            /> */}

            <Image src={TorchImage} alt="Torch" width={170} height={170} />
          </div>
          {/* Curved text */}
          <Curved10YearsText className="absolute left-1/2 top-6 -translate-x-1/2" />
        </CardTitle>
      </CardHeader>
      {/* Bottom section: torchbearer info */}
      <CardContent className="p-6">
        {currentHolder ? (
          <div className="flex items-start gap-4">
            <Avatar className="h-19 w-19">
              <AvatarImage
                src={holderData?.imageUrl || getBlockieImage(currentHolder)}
                alt={`Avatar for ${holderData?.name || currentHolder}`}
              />
              <AvatarFallback>
                {holderData?.name || formatAddress(currentHolder)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              {/* Name */}
              <div className="text-lg font-bold leading-none">
                {holderData?.name || formatAddress(currentHolder)}
              </div>
              {/* Description */}
              <div>{holderData?.description || "Current torchbearer"}</div>
              {/* Verify onchain link */}
              <BaseLink
                className="mt-2 text-xs"
                href={`https://sepolia.etherscan.io/address/${currentHolder}`}
              >
                View on Etherscan
              </BaseLink>
            </div>
          </div>
        ) : (
          <div className="text-lg">No current holder</div>
        )}
      </CardContent>
      <CardFooter className="justify-center pt-4">
        <Button variant="outline">See all torchbearers</Button>
      </CardFooter>
    </Card>
  )
}

export default CurrentTorchHolderCard
