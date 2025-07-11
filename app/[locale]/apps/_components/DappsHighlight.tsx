import { DappData } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { slugify } from "@/lib/utils/url"

import DappCard from "./DappCard"
import DappsHighlightSwiper from "./DappsHighlightSwiper"

interface DappsHighlightProps {
  dapps: DappData[]
}

const DappsHighlight = ({ dapps }: DappsHighlightProps) => {
  const cards = dapps.slice(0, 3).map((dapp, index) => (
    <LinkBox
      key={index}
      className="group w-full rounded-xl p-3 hover:bg-background-highlight"
    >
      <LinkOverlay
        href={`/apps/${slugify(dapp.name)}`}
        className="no-underline"
      >
        <div className="relative mb-2 aspect-[2/1] w-full">
          <Image
            src={dapp.bannerImage}
            alt={`${dapp.name} application banner showing the main interface`}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="mb-4 text-body">
          <p className="text-body">{dapp.description}</p>
        </div>
        <DappCard dapp={dapp} imageSize={16} disableLink />
      </LinkOverlay>
    </LinkBox>
  ))

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile - dynamic / lazy loaded */}
      <DappsHighlightSwiper cards={cards} />

      {/* Desktop - server-side rendered */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">{cards}</div>
    </div>
  )
}

export default DappsHighlight
