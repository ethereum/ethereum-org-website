import {
  AvatarBase as Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ButtonLink } from "@/components/ui/buttons/Button"
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

import {
  formatAddress,
  getBlockieImage,
  type TorchHolderMetadata,
} from "@/lib/torch"

interface CurrentTorchHolderCardProps {
  currentHolder: TorchHolderMetadata
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
      <CardHeader className="bg-[#18193A]">
        <div className="relative">
          {/* Torch/flame video */}
          <div className="flex items-center justify-center pt-12">
            <video
              className="h-[170px] w-[170px] object-cover"
              src="/videos/torch.mp4"
              aria-label="Torch video"
              autoPlay
              loop
              muted
              poster="/images/10-year-anniversary/torch-cover.png"
            />
          </div>

          <CardTitle className="p-0">
            {/* Curved text */}
            <Curved10YearsText
              viewBox="0 0 356 186"
              className="absolute left-1/2 top-0 h-min w-full max-w-[600px] -translate-x-1/2"
              width="100%"
              height="auto"
            />
          </CardTitle>
        </div>
      </CardHeader>
      {/* Bottom section: torchbearer info */}
      <CardContent className="p-6">
        {currentHolder ? (
          <div className="flex items-start gap-4">
            <Avatar className="h-19 w-19 !shadow-none">
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
        <ButtonLink href="#torch-history" variant="outline">
          See all torchbearers
        </ButtonLink>
      </CardFooter>
    </Card>
  )
}

export default CurrentTorchHolderCard
