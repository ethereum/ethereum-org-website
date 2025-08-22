import { AppData } from "@/lib/types"

import { Image } from "@/components/Image"
import { BaseLink } from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import TruncatedText from "@/components/ui/TruncatedText"

import { slugify } from "@/lib/utils/url"

import AppCard from "./AppCard"
import AppsSwiper from "./AppsSwiper"

interface AppsHighlightProps {
  apps: AppData[]
  matomoCategory: string
}

const AppsHighlight = ({ apps, matomoCategory }: AppsHighlightProps) => {
  const cards = apps.slice(0, 3).map((app, index) => (
    <LinkBox
      key={index}
      className="group w-full rounded-xl p-3 hover:bg-background-highlight"
    >
      <LinkOverlay asChild>
        <BaseLink
          href={`/apps/${slugify(app.name)}`}
          className="no-underline"
          customEventOptions={{
            eventCategory: matomoCategory,
            eventAction: "highlights",
            eventName: `app name ${app.name}`,
          }}
        >
          <div className="relative mb-2 aspect-[2/1] w-full">
            <Image
              src={app.bannerImage}
              alt={`${app.name} application banner showing the main interface`}
              fill
              className="rounded-xl object-cover"
            />
          </div>
          <div className="mb-4">
            <TruncatedText
              text={app.description}
              maxLines={2}
              matomoEvent={{
                eventCategory: matomoCategory,
                eventAction: "highlights_show_more",
                eventName: `app description ${app.name}`,
              }}
            />
          </div>
          <AppCard
            app={app}
            imageSize={16}
            disableLink
            matomoCategory={matomoCategory}
            matomoAction="highlights"
          />
        </BaseLink>
      </LinkOverlay>
    </LinkBox>
  ))

  return (
    <div className="flex flex-col gap-8">
      {/* Mobile - dynamic / lazy loaded */}
      <AppsSwiper cards={cards} />

      {/* Desktop - server-side rendered */}
      <div className="hidden gap-6 md:grid md:grid-cols-3">{cards}</div>
    </div>
  )
}

export default AppsHighlight
