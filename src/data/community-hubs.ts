import { StaticImageData } from "next/image"

import BerlinHubBanner from "@/public/images/community/hubs/berlin-hub-banner.png"
import DubaiHubBanner from "@/public/images/community/hubs/dubai-hub-banner.png"
import LondonHubBanner from "@/public/images/community/hubs/london-hub-banner.png"

export type CommunityHub = {
  id: string
  location: string
  description: string
  cta: string
  coworkingSignupUrl: string
  meetupUrl: string
  banner: StaticImageData
  bgColor: string
  logoBgColor: string
}

const communityHubs: CommunityHub[] = [
  {
    id: "london",
    location: "London",
    description:
      "A dedicated floor for Ethereum builders, researchers, creators, students, and explorers at Encode Club.",
    cta: "Join for everyday co-working and regular events.",
    coworkingSignupUrl: "https://hub.encode.club/ethereum",
    meetupUrl: "https://luma.com/user/ethldn",
    banner: LondonHubBanner,
    bgColor: "bg-[#E8E0F0]",
    logoBgColor: "bg-[#7B5AA6]",
  },
  {
    id: "berlin",
    location: "Berlin",
    description:
      "The Ethereum Foundation office opens its doors every Wednesday for builders, researchers, creators, students, and explorers to co-work, connect, and collaborate.",
    cta: "Join for Co-working Wednesdays and regular events.",
    coworkingSignupUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScRgO-0OMUXOu30F5s2DYpImMKb4qgTp5pn-4Y6wjiCeY7bYQ/viewform",
    meetupUrl: "https://www.meetup.com/berlin-ethereum-meetup/",
    banner: BerlinHubBanner,
    bgColor: "bg-[#E8DDD4]",
    logoBgColor: "bg-[#9B7B5A]",
  },
  {
    id: "dubai",
    location: "Dubai",
    description:
      "An inspiring space hosted at Hadron Founders Club for founders, builders, researchers, and explorers to co-work, connect, collaborate, and learn.",
    cta: "Join for everyday co-working and regular events.",
    coworkingSignupUrl: "https://forms.gle/G4PthfvMMy476QmZ6",
    meetupUrl: "https://luma.com/HadronFC?k=c",
    banner: DubaiHubBanner,
    bgColor: "bg-[#F5E6C8]",
    logoBgColor: "bg-[#D4A84B]",
  },
  {
    id: "lagos",
    location: "Lagos",
    description:
      "A vibrant community space at Web3Bridge in Lagos for builders, founders, researchers, and creatives to co-work, collaborate, and grow together.",
    cta: "Join for everyday co-working and regular events.",
    coworkingSignupUrl: "#",
    meetupUrl: "#",
    banner: DubaiHubBanner, // Placeholder - needs proper Lagos banner
    bgColor: "bg-[#E8DDD4]",
    logoBgColor: "bg-[#8B6914]",
  },
]

export default communityHubs
