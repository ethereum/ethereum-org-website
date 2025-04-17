import { StaticImageData } from "next/image"

import CommunityHeroImage from "@/public/images/heroes/community-hero.png"
import DevelopersHubHeroImage from "@/public/images/heroes/developers-hub-hero.jpg"
import GardenHeroImage from "@/public/images/heroes/garden.jpg"
// import GuidesHubHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"
// import Layer2HubHeroImage from "@/public/images/heroes/layer2-hub-hero.jpg"
// import QuizzesHubHeroImage from "@/public/images/heroes/quizzes-hub-hero.jpg"
import PectraImage from "@/public/images/roadmap/roadmap-pectra.png"

interface Release {
  image: StaticImageData
  releaseName: string
  releaseDate: string
  content: React.ReactNode[]
  href: string
}

export const releasesData: Release[] = [
  {
    image: GardenHeroImage,
    releaseName: "Garden",
    releaseDate: "2024-03-13",
    content: [<div key="1">test</div>],
    href: "/roadmap/garden",
  },
  {
    image: DevelopersHubHeroImage,
    releaseName: "Dencun",
    releaseDate: "2024-03-13",
    content: [<div key="1">test</div>],
    href: "/roadmap/dencun",
  },
  {
    image: PectraImage,
    releaseName: "Pectra",
    releaseDate: "2025-05-07",
    content: [
      <div key="1">
        <p>EOA account code</p>
        <ul>
          <li>
            Users can set their address to be represented by a code of an
            existing smart contract
          </li>
        </ul>
      </div>,
    ],
    href: "/roadmap/pectra",
  },
  {
    image: CommunityHeroImage,
    releaseName: "Fusaka",
    releaseDate: "2026",
    content: [<div key="1">test</div>],
    href: "/roadmap/fusaka",
  },
]
