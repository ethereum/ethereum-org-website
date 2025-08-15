import { AppData, CommunityPick } from "@/lib/types"

import Twitter from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import AppCard from "./AppCard"
import AppsSwiper from "./AppsSwiper"

const CommunityPicks = ({
  communityPicks,
  appsData,
}: {
  communityPicks: CommunityPick[]
  appsData: Record<string, AppData[]>
}) => {
  const apps = Object.values(appsData).flat()

  const getApp = (name: string) => {
    return apps.find((app) => app.name === name)
  }

  const getTwitterUsername = (twitterHandle: string) => {
    return twitterHandle.replace("@", "")
  }

  const cards = communityPicks.map((pick) => (
    <div key={pick.name} className="">
      <div className="flex flex-row gap-2">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={`https://unavatar.io/twitter/${getTwitterUsername(pick.twitterHandle)}`}
            alt={`${pick.name} profile`}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4>{pick.name}</h4>
          <ButtonLink
            href={pick.twitterURL}
            variant="ghost"
            hideArrow
            className="justify-start px-0"
          >
            <Twitter />
            {pick.twitterHandle}
          </ButtonLink>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {pick.app1Name && getApp(pick.app1Name) && (
          <AppCard
            app={getApp(pick.app1Name)!}
            imageSize={10}
            isVertical
            matomoCategory="community_picks"
            matomoAction="app_click"
          />
        )}
        {pick.app2Name && getApp(pick.app2Name) && (
          <AppCard
            app={getApp(pick.app2Name)!}
            imageSize={10}
            isVertical
            matomoCategory="community_picks"
            matomoAction="app_click"
          />
        )}
      </div>
    </div>
  ))

  return (
    <div className="flex flex-col gap-8">
      <div className="sm:hidden">
        <AppsSwiper cards={cards} />
      </div>

      <div className="hidden gap-6 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cards}
      </div>
    </div>
  )
}

export default CommunityPicks
