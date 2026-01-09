import { StaticImageData } from "next/image"

import BerlinHubBanner from "@/public/images/community/hubs/berlin-hub-banner.png"
import DubaiHubBanner from "@/public/images/community/hubs/dubai-hub-banner.png"
import LagosHubBanner from "@/public/images/community/hubs/lagos-hub-banner.png"
import LondonHubBanner from "@/public/images/community/hubs/london-hub-banner.png"

export type CommunityHub = {
  id: string
  location: string
  descriptionKey: string
  ctaKey: string
  coworkingSignupUrl: string
  meetupUrl: string
  banner: StaticImageData
  logoBgColor: string
}

const communityHubs: CommunityHub[] = [
  {
    id: "london",
    location: "London",
    descriptionKey: "page-events-hub-description-london",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "https://hub.encode.club/ethereum",
    meetupUrl: "https://luma.com/user/ethldn",
    banner: LondonHubBanner,
    logoBgColor: "bg-[#667BBC]/10 dark:bg-[#667BBC]/20",
  },
  {
    id: "berlin",
    location: "Berlin",
    descriptionKey: "page-events-hub-description-berlin",
    ctaKey: "page-events-hub-cta-berlin",
    coworkingSignupUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScRgO-0OMUXOu30F5s2DYpImMKb4qgTp5pn-4Y6wjiCeY7bYQ/viewform",
    meetupUrl: "https://www.meetup.com/berlin-ethereum-meetup/",
    banner: BerlinHubBanner,
    logoBgColor: "bg-[#673076]/10 dark:bg-[#673076]/20",
  },
  {
    id: "dubai",
    location: "Dubai",
    descriptionKey: "page-events-hub-description-dubai",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "https://forms.gle/G4PthfvMMy476QmZ6",
    meetupUrl: "https://luma.com/HadronFC?k=c",
    banner: DubaiHubBanner,
    logoBgColor: "bg-[#B47E18]/10 dark:bg-[#B47E18]/20",
  },
  {
    id: "lagos",
    location: "Lagos",
    descriptionKey: "page-events-hub-description-lagos",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "#",
    meetupUrl: "#",
    banner: LagosHubBanner,
    logoBgColor: "bg-[#0C5681]/10 dark:bg-[#0C5681]/20",
  },
]

export default communityHubs
