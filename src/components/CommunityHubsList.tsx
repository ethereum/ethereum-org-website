import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"

import communityHubs from "@/data/community-hubs"

const CommunityHubsList = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
      {communityHubs.map((hub) => (
        <div key={hub.location} className="flex flex-col gap-4">
          <Image src={hub.banner} alt={hub.location} className="w-full" />
          <div className="p-2">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="text-xl font-bold md:text-2xl">Community Hub</h3>
              <span className="text-sm opacity-60">{hub.location}</span>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm">{hub.description}</p>
              <p className="text-sm font-bold">{hub.cta}</p>
            </div>
            <div className="mt-8 flex flex-col gap-4 md:flex-row">
              <ButtonLink
                href={hub.coworkingSignupUrl}
                variant="outline"
                hideArrow
                className="flex-1"
              >
                Co-work sign up
              </ButtonLink>
              <ButtonLink
                href={hub.meetupUrl}
                variant="outline"
                hideArrow
                className="flex-1"
              >
                Meetup
              </ButtonLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommunityHubsList
