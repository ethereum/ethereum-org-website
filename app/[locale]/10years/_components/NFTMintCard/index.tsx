"use client"

import { useMemo } from "react"

import { Image } from "@/components/Image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import CountDown from "../CountDown"

import Mint from "./Mint"

import TorchCoverImage from "@/public/images/10-year-anniversary/10y-cover.png"
import Curved10YearsText from "@/public/images/10-year-anniversary/10y-curved-heading.svg"

interface NFTMintCardProps {
  className?: string
}

const NFTMintCard = ({ className }: NFTMintCardProps) => {
  const testDate = useMemo(() => {
    // for testing purposes, 12 hours from now
    return new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString()
  }, [])

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
              <Image
                src={TorchCoverImage}
                alt="Ethereum 10th Anniversary NFT"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>

            {/* Curved text */}
            <Curved10YearsText
              viewBox="0 0 313 186"
              className="absolute left-1/2 top-0 h-min w-full max-w-[300px] -translate-x-1/2"
              width="100%"
              height="auto"
            />
          </div>

          <CardTitle className="text-center">Mint the moment</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 p-6 text-center">
          <p className="text-body-medium">
            Celebrate a decade of decentralization with a free, limited-time
            10th anniversary NFT. Mmint yours before time runs out.
          </p>

          <div className="space-y-2">
            <CountDown
              className="text-primary"
              // TODO: change to final date!!!
              dateTime={testDate}
              hideZeroUnits
              timeLeftLabels={{
                days: { singular: "day", plural: "days" },
                hours: { singular: "hour", plural: "hours" },
                minutes: { singular: "minute", plural: "minutes" },
                seconds: { singular: "second", plural: "seconds" },
              }}
              expiredLabel="Minting has ended"
            />
            <p className="text-sm text-body-medium">Time remaining to mint</p>
          </div>

          <Mint />
        </CardContent>
      </Card>
    </>
  )
}

export default NFTMintCard
