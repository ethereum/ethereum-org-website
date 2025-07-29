"use client"

import { useMemo, useState } from "react"

import { Alert, AlertContent, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import CountDown from "../CountDown"

import Connection from "./Connection"
import GasFeeInformation from "./GasFeeInformation"
import GasPriceDisplay from "./GasPriceDisplay"

import Curved10YearsText from "@/public/images/10-year-anniversary/10y-curved-heading.svg"

interface NFTMintCardProps {
  className?: string
}

const endTimestamp = process.env.NEXT_PUBLIC_MINT_TIMESTAMP_END

if (!endTimestamp) {
  throw new Error("NEXT_PUBLIC_MINT_TIMESTAMP_END is not set")
}

const NFTMintCard = ({ className }: NFTMintCardProps) => {
  const endDateTime = useMemo(() => {
    return new Date(Number(endTimestamp) * 1000).toISOString()
  }, [])

  const [isExpired, setIsExpired] = useState(false)

  const handleExpired = () => {
    setIsExpired(true)
  }

  return (
    <>
      <Card
        className={cn(
          "w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#A66BFF20] to-[#EED9FE16] shadow-lg",
          className
        )}
      >
        <CardHeader className="gap-4 pb-0">
          <div className="relative">
            {/* Torch/flame video */}
            <div className="flex items-center justify-center pt-12">
              <div className="relative max-h-[200px] max-w-[200px] overflow-hidden rounded-full border-4 border-white bg-white">
                <video
                  className="pointer-events-none h-full w-full select-none rounded-full object-cover"
                  src="/videos/10y-video.mp4"
                  aria-label="10th anniversary video"
                  autoPlay
                  loop
                  muted
                  poster="/images/10-year-anniversary/10y-cover.png"
                  controlsList="nodownload"
                  disablePictureInPicture
                  playsInline
                />
              </div>
            </div>

            {/* Curved text */}
            <Curved10YearsText
              viewBox="0 0 313 186"
              className="absolute left-1/2 top-0 h-min w-full max-w-[300px] -translate-x-1/2 fill-primary"
              width="100%"
              height="auto"
            />
          </div>

          <CardTitle className="text-center">Mint the moment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-6 text-center">
          <p className="text-body-medium">
            Celebrate a decade of decentralization with a free, limited-time
            10th anniversary NFT. Mint yours before time runs out.
          </p>

          {isExpired ? (
            <Alert
              variant="update"
              className="w-full rounded-none border-none text-center"
            >
              <AlertContent>
                <AlertTitle className="!text-primary">
                  The claim period has ended
                </AlertTitle>
                <p className="text-primary">
                  Thank you all for joining the celebration
                </p>
              </AlertContent>
            </Alert>
          ) : (
            <>
              <div className="space-y-2">
                <CountDown
                  className="text-primary"
                  dateTime={endDateTime}
                  onExpired={handleExpired}
                  hideZeroUnits
                  timeLeftLabels={{
                    days: { singular: "day", plural: "days" },
                    hours: { singular: "hour", plural: "hours" },
                    minutes: { singular: "minute", plural: "minutes" },
                    seconds: { singular: "second", plural: "seconds" },
                  }}
                  expiredLabel="Minting has ended"
                />
                <p className="text-sm text-body-medium">
                  Time remaining to mint
                </p>
              </div>

              <GasFeeInformation />

              <GasPriceDisplay />

              <Connection />
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default NFTMintCard
