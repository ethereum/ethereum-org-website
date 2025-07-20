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
  getAddressEtherscanUrl,
  getAvatarImage,
  type TorchHolderMetadata,
} from "@/lib/torch"

interface CurrentTorchHolderCardProps {
  currentHolder: TorchHolderMetadata | null
  isBurned?: boolean
  className?: string
}

const CurrentTorchHolderCard = ({
  currentHolder,
  isBurned = false,
  className,
}: CurrentTorchHolderCardProps) => {
  return (
    <Card
      className={cn(
        "w-full overflow-hidden rounded-3xl bg-background-highlight shadow-xl",
        className
      )}
    >
      <CardHeader className="bg-[#161A36]">
        <div className="relative">
          {/* Torch/flame video */}
          <div className="flex items-center justify-center pt-12">
            <div className="relative max-h-[170px] max-w-[170px]">
              <video
                className="pointer-events-none select-none"
                src="/videos/torch.mp4"
                aria-label="Torch video"
                autoPlay
                loop
                muted
                poster="/images/10-year-anniversary/torch-cover.png"
                controlsList="nodownload"
                disablePictureInPicture
                playsInline
              />
              <div className="pointer-events-none absolute top-0 h-full w-full select-none bg-[url('/images/10-year-anniversary/torch-overlay.png')] bg-contain bg-center bg-no-repeat" />
            </div>
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
                src={getAvatarImage(currentHolder)}
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
                href={getAddressEtherscanUrl(currentHolder.address)}
              >
                View on Etherscan
              </BaseLink>
            </div>
          </div>
        ) : isBurned ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-xl font-bold text-red-500">
              🔥 Torch Burned 🔥
            </div>
            <div>
              The Ethereum Torch has been burned to celebrate the 10-year
              anniversary!
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-xl font-bold">🤐 Unknown Bearer</div>
            <div>
              The current torch bearer&apos;s identity is not publicly
              available.
            </div>
          </div>
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
