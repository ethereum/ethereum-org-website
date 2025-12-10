import { StaticImageData } from "next/image"

import BerlinHubBanner from "@/public/images/community/hubs/berlin-hub-banner.png"
import DubaiHubBanner from "@/public/images/community/hubs/dubai-hub-banner.png"
import LondonHubBanner from "@/public/images/community/hubs/london-hub-banner.png"

export type CommunityHub = {
  location: string
  description: string
  cta: string
  coworkingSignupUrl: string
  meetupUrl: string
  banner: StaticImageData
}

const communityHubs: CommunityHub[] = [
  {
    location: "London, England",
    description:
      "Whether you're a builder, researcher, creator, or simply exploring what's possible on Ethereum, this is your space to work, connect, and collaborate.",
    cta: "Join us every day for co-working.",
    coworkingSignupUrl: "https://hub.encode.club/ethereum",
    meetupUrl: "https://luma.com/user/ethldn",
    banner: LondonHubBanner,
  },
  {
    location: "Berlin, Germany",
    description:
      "The Ethereum Foundation office opens its doors for builders, curious minds and web3 explorers to co-work, collaborate and bring ideas to life.",
    cta: "Join us every Wednesday for co-working.",
    coworkingSignupUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScRgO-0OMUXOu30F5s2DYpImMKb4qgTp5pn-4Y6wjiCeY7bYQ/viewform",
    meetupUrl: "https://www.meetup.com/berlin-ethereum-meetup/",
    banner: BerlinHubBanner,
  },
  {
    location: "Dubai",
    description:
      "The Dubai Ethereum Community Hub is hosted at Hadron Founders Club - an inspiring space for builders, founders, researchers, and curious explorers to co-work, connect, collaborate and learn.",
    cta: "Join us for everyday co-working and events.",
    coworkingSignupUrl: "https://forms.gle/G4PthfvMMy476QmZ6",
    meetupUrl: "https://luma.com/HadronFC?k=c",
    banner: DubaiHubBanner,
  },
]

export default communityHubs
