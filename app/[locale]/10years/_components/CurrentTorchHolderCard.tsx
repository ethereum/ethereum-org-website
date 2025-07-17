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

import { formatAddress, getBlockieImage, type TorchHolder } from "@/lib/torch"
import TorchImage from "@/public/images/10-year-anniversary/torch.png"

interface CurrentTorchHolderCardProps {
  currentHolder: TorchHolder
  className?: string
}

const CurrentTorchHolderCard = ({
  currentHolder,
  className,
}: CurrentTorchHolderCardProps) => {
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
                src={getBlockieImage(currentHolder.address)}
                alt={`Avatar for ${currentHolder.name || currentHolder.address}`}
              />
              <AvatarFallback>
                {currentHolder.name || formatAddress(currentHolder.address)}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              {/* Name */}
              <div className="text-lg font-bold leading-none">
                {currentHolder.name || formatAddress(currentHolder.address)}
              </div>
              {/* Description */}
              <div>{currentHolder.role || "Current torchbearer"}</div>
              {/* Verify onchain link */}
              <BaseLink
                className="mt-2 text-xs"
                href={`https://sepolia.etherscan.io/address/${currentHolder.address}`}
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
