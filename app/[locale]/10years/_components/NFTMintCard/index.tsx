"use client"

import { Image } from "@/components/Image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import Mint from "./Mint"

import TorchCoverImage from "@/public/images/10-year-anniversary/torch-cover.png"

interface NFTMintCardProps {
  className?: string
}

const NFTMintCard = ({ className }: NFTMintCardProps) => {
  return (
    <>
      <Card
        className={cn(
          "w-full overflow-hidden rounded-3xl bg-background-highlight shadow-xl",
          className
        )}
      >
        <CardHeader className="bg-gradient-to-b from-blue-900 to-purple-900">
          <CardTitle className="text-center text-white">
            <div className="mb-2 text-2xl font-bold">
              Ethereum 10th Anniversary NFT
            </div>
          </CardTitle>
          <Center className="py-8">
            <Image
              src={TorchCoverImage}
              alt="Ethereum 10th Anniversary NFT"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </Center>
        </CardHeader>

        <CardContent className="p-6">
          <p className="mb-6 text-center text-body">
            Commemorate Ethereum&apos;s 10th anniversary with this exclusive
            NFT. Limited to one mint per wallet address.
          </p>

          <Mint />
        </CardContent>
      </Card>
    </>
  )
}

export default NFTMintCard
