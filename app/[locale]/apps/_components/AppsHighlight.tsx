import { DappData } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { slugify } from "@/lib/utils/url"

import AppCard from "./AppCard"
import AppsHighlightSwiper from "./AppsHighlightSwiper"

interface AppsHighlightProps {
  apps: DappData[]
}

const AppsHighlight = ({ apps }: AppsHighlightProps) => {
  const cards = apps.slice(0, 3).map((app, index) => (
    <LinkBox
      key={index}
      className="group w-full rounded-xl p-3 hover:bg-background-highlight"
    >
      <LinkOverlay href={`/apps/${slugify(app.name)}`} className="no-underline">
        <div className="relative mb-2 aspect-[2/1] w-full">
          <Image
            src={app.bannerImage}
            alt={`${app.name} application banner showing the main interface`}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="mb-4 text-body">
          <p className="text-body">{app.description}</p>
        </div>
        <AppCard app={app} imageSize={16} disableLink />
      </LinkOverlay>
    </LinkBox>
  ))

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile - dynamic / lazy loaded */}
      <AppsHighlightSwiper cards={cards} />

      {/* Desktop - server-side rendered */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">{cards}</div>
    </div>
  )
}

export default AppsHighlight
