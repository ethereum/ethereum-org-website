import { StaticImageData } from "next/image"

import BerlinHubBanner from "@/public/images/community/hubs/berlin-hub-banner.png"
import DubaiHubBanner from "@/public/images/community/hubs/dubai-hub-banner.png"
import HongKongHubBanner from "@/public/images/community/hubs/hong-kong-hub-banner.png"
import LagosHubBanner from "@/public/images/community/hubs/lagos-hub-banner.png"
import LondonHubBanner from "@/public/images/community/hubs/london-hub-banner.png"
import RomeHubBanner from "@/public/images/community/hubs/rome-hub-banner.png"
import SFHubBanner from "@/public/images/community/hubs/sf-hub-banner.png"

export type CommunityHub = {
  id: string
  location: string
  descriptionKey: string
  ctaKey: string
  coworkingSignupUrl: string
  meetupUrl: string
  banner: StaticImageData
  brandColor: string
}

const communityHubs: CommunityHub[] = [
  {
    id: "hong-kong",
    location: "Hong Kong",
    descriptionKey: "page-events-hub-description-hong-kong",
    ctaKey: "page-events-hub-cta-hong-kong",
    coworkingSignupUrl: "https://forms.gle/bm78vRjZqvu45tsz5",
    meetupUrl: "https://luma.com/user/usr-ut3JGCXXuokkPdK",
    banner: HongKongHubBanner,
    // TODO: Update
    brandColor:
      "bg-gradient-to-b from-[#A4FCF5]/5 to-[#A4FCF5]/10 dark:from-[#A4FCF5]/20 dark:to-[#A4FCF5]/10 border-[#A4FCF5]/20",
  },
  {
    id: "rome",
    location: "Rome",
    descriptionKey: "page-events-hub-description-rome",
    ctaKey: "page-events-hub-cta-rome",
    coworkingSignupUrl: "https://forms.gle/wrjF85XYghXyFXH87",
    meetupUrl: "https://luma.com/user/UrbeHub",
    banner: RomeHubBanner,
    brandColor:
      "bg-gradient-to-b from-[#AF4796]/5 to-[#AF4796]/10 dark:from-[#AF4796]/20 dark:to-[#AF4796]/10 border-[#AF4796]/20",
  },
  {
    id: "london",
    location: "London",
    descriptionKey: "page-events-hub-description-london",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "https://hub.encode.club/ethereum",
    meetupUrl: "https://luma.com/user/ethldn",
    banner: LondonHubBanner,
    brandColor:
      "bg-gradient-to-b from-[#667BBC]/5 to-[#667BBC]/10 dark:from-[#667BBC]/20 dark:to-[#667BBC]/10 border-[#667BBC]/20",
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
    brandColor:
      "bg-gradient-to-b from-[#673076]/5 to-[#673076]/10 dark:from-[#673076]/20 dark:to-[#673076]/10 border-[#673076]/20",
  },
  {
    id: "dubai",
    location: "Dubai",
    descriptionKey: "page-events-hub-description-dubai",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "https://forms.gle/G4PthfvMMy476QmZ6",
    meetupUrl: "https://luma.com/HadronFC?k=c",
    banner: DubaiHubBanner,
    brandColor:
      "bg-gradient-to-b from-[#B47E18]/5 to-[#B47E18]/10 dark:from-[#B47E18]/20 dark:to-[#B47E18]/10 border-[#B47E18]/20",
  },
  {
    id: "lagos",
    location: "Lagos",
    descriptionKey: "page-events-hub-description-lagos",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "https://t.me/+LGAiPevzRNk1ZTM0",
    meetupUrl: "https://t.me/+LGAiPevzRNk1ZTM0",
    banner: LagosHubBanner,
    brandColor:
      "bg-gradient-to-b from-[#0C5681]/5 to-[#0C5681]/10 dark:from-[#0C5681]/20 dark:to-[#0C5681]/10 border-[#0C5681]/20",
  },
  {
    id: "sf",
    location: "San Francisco",
    descriptionKey: "page-events-hub-description-sf",
    ctaKey: "page-events-hub-cta-default",
    coworkingSignupUrl: "https://frontiertower.io/apply",
    meetupUrl: "https://luma.com/user/ethereumhouseSF",
    banner: SFHubBanner,
    brandColor:
      "bg-gradient-to-b from-[#673A32]/5 to-[#673A32]/10 dark:from-[#673A32]/20 dark:to-[#673A32]/10 border-[#673A32]/20",
  },
]

export default communityHubs
