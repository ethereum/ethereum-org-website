import { useTranslations } from "next-intl"

import { Image } from "@/components/Image"
import { Flex, type FlexProps } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { NFT } from "./interfaces"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

type NFTListProps = FlexProps & {
  nfts: Array<NFT>
}
export const NFTList = ({ nfts, ...flexProps }: NFTListProps) => {
  const t = useTranslations("component-wallet-simulator")
  const size = useBreakpointValue({
    base: "max-w-20 max-h-20",
    md: "max-w-24 max-h-24",
  })
  return (
    <Flex className="size-full flex-wrap gap-4" {...flexProps}>
      {nfts.length ? (
        nfts.map(({ title, image }) => (
          <div key={title} className="w-fit">
            <Image src={image} alt="" className={cn("object-contain", size)} />
            <p className="text-xs">{title}</p>
          </div>
        ))
      ) : (
        <p>{t("sim-no-nfts")}</p>
      )}
    </Flex>
  )
}
