import { StaticImageData } from "next/image"

import BerlinHubBanner from "@/public/images/community/hubs/berlin-hub-banner.png"
import BuenosAiresHubBanner from "@/public/images/community/hubs/buenos-aires-hub-banner.png"
import HongKongHubBanner from "@/public/images/community/hubs/hong-kong-hub-banner.png"
import LagosHubBanner from "@/public/images/community/hubs/lagos-hub-banner.png"
import LondonHubBanner from "@/public/images/community/hubs/london-hub-banner.png"
import RomeHubBanner from "@/public/images/community/hubs/rome-hub-banner.png"

export type CommunityHub = {
  id: string
  location: string
  descriptionKey: string
  cadenceKey: string
  /**
   * Separate reservation form for co-working. Omit for hubs whose only entry
   * point is the community channel in `meetupUrl` — the card then renders a
   * single "Join the community" link instead of two links to the same place.
   */
  coworkingSignupUrl?: string
  meetupUrl: string
  banner: StaticImageData
  brandColor: string
}

const communityHubs: CommunityHub[] = [
  {
    id: "buenos-aires",
    location: "Buenos Aires",
    descriptionKey: "page-events-hub-description-buenos-aires",
    cadenceKey: "page-events-hub-cadence-everyday",
    coworkingSignupUrl:
      "https://airtable.com/appENuebGSKMB5sia/pagWfsW9hrLZUqBAf/form",
    meetupUrl: "https://luma.com/user/crecimientoar",
    banner: BuenosAiresHubBanner,
    brandColor:
      "bg-gradient-to-b from-[#74ACDF]/5 to-[#74ACDF]/10 dark:from-[#74ACDF]/20 dark:to-[#74ACDF]/10 border-[#74ACDF]/20",
  },
  {
    id: "hong-kong",
    location: "Hong Kong",
    descriptionKey: "page-events-hub-description-hong-kong",
    cadenceKey: "page-events-hub-cadence-everyday",
    coworkingSignupUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf8HrsYvKfs4eEI4dxSLAjquutu2jz5FiluePe4MsTwswQhHw/viewform",
    meetupUrl: "https://luma.com/user/usr-ut3JGCXXuokkPdK",
    banner: HongKongHubBanner,
    brandColor:
      "bg-linear-to-b from-[#83AAFA]/5 to-[#83AAFA]/10 dark:from-[#CFC4FA]/20 dark:to-[#CFC4FA]/10 border-[#83AAFA]/20 dark:border-[#CFC4FA]/10",
  },
  {
    id: "rome",
    location: "Rome",
    descriptionKey: "page-events-hub-description-rome",
    cadenceKey: "page-events-hub-cadence-everyday",
    coworkingSignupUrl: "https://forms.gle/wrjF85XYghXyFXH87",
    meetupUrl: "https://luma.com/user/UrbeHub",
    banner: RomeHubBanner,
    brandColor:
      "bg-linear-to-b from-[#AF4796]/5 to-[#AF4796]/10 dark:from-[#AF4796]/20 dark:to-[#AF4796]/10 border-[#AF4796]/20",
  },
  {
    id: "london",
    location: "London",
    descriptionKey: "page-events-hub-description-london",
    cadenceKey: "page-events-hub-cadence-everyday",
    coworkingSignupUrl: "https://hub.encode.club/ethereum",
    meetupUrl: "https://luma.com/ethldn",
    banner: LondonHubBanner,
    brandColor:
      "bg-linear-to-b from-[#667BBC]/5 to-[#667BBC]/10 dark:from-[#667BBC]/20 dark:to-[#667BBC]/10 border-[#667BBC]/20",
  },
  {
    id: "berlin",
    location: "Berlin",
    descriptionKey: "page-events-hub-description-berlin",
    cadenceKey: "page-events-hub-cadence-wednesdays",
    coworkingSignupUrl:
      "https://pad.ethereum.org/form/#/2/form/view/qM04vMsmxU1JRqdYC3I-uWpcYMQ+t4C7fiap-iismPQ/",
    meetupUrl: "https://www.meetup.com/berlin-ethereum-meetup/",
    banner: BerlinHubBanner,
    brandColor:
      "bg-linear-to-b from-[#673076]/5 to-[#673076]/10 dark:from-[#673076]/20 dark:to-[#673076]/10 border-[#673076]/20",
  },
  {
    id: "lagos",
    location: "Lagos",
    descriptionKey: "page-events-hub-description-lagos",
    cadenceKey: "page-events-hub-cadence-everyday",
    meetupUrl: "https://t.me/+LGAiPevzRNk1ZTM0",
    banner: LagosHubBanner,
    brandColor:
      "bg-linear-to-b from-[#0C5681]/5 to-[#0C5681]/10 dark:from-[#0C5681]/20 dark:to-[#0C5681]/10 border-[#0C5681]/20",
  },
]

export default communityHubs
