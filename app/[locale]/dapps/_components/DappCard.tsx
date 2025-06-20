import { DappData } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { DAPP_TAG_VARIANTS } from "@/data/dapps"

interface DappCardProps {
  dapp: DappData
  imageSize: number
  showDescription?: boolean
}

const DappCard = ({
  dapp,
  imageSize,
  showDescription = false,
}: DappCardProps) => {
  return (
    <LinkBox className="flex flex-row gap-3 rounded-xl p-2 hover:bg-background-highlight">
      <div
        className={cn(
          "flex overflow-hidden rounded-xl border p-2",
          `w-${imageSize} h-${imageSize}`
        )}
      >
        <Image src={dapp.image} alt={dapp.name} className="rounded-xl" />
      </div>
      <div className="flex flex-1 flex-col">
        <Tag
          size="small"
          className="w-fit py-0"
          status={DAPP_TAG_VARIANTS[dapp.category]}
        >
          {dapp.category}
        </Tag>
        <LinkOverlay
          className="text-lg font-bold text-body no-underline hover:text-primary"
          href={`/dapps/${dapp.name}`}
        >
          {dapp.name}
        </LinkOverlay>
        {showDescription && <div className="">{dapp.description}</div>}
        <div className="text-sm text-body-medium">
          {dapp.subCategory.map((subCategory) => subCategory).join(" ·  ")}
        </div>
      </div>
    </LinkBox>
  )
}

export default DappCard
