import { StaticImageData } from "next/image"

import DevelopersHubHeroImage from "@/public/images/heroes/developers-hub-hero.png"
import GuidesHubHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"
import Layer2HubHeroImage from "@/public/images/heroes/layer-2-hub-hero.png"
import QuizzesHubHeroImage from "@/public/images/heroes/quizzes-hub-hero.png"
import FusakaImage from "@/public/images/roadmap/roadmap-fusaka.png"
import GlamsterdamImage from "@/public/images/roadmap/roadmap-glamsterdam.png"
import PectraImage from "@/public/images/roadmap/roadmap-pectra.png"

type TranslationFunction = (key: string) => string

type DateString =
  | `2${number}${number}${number}-${number}${number}-${number}${number}`
  | `${number}${number}${number}${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}:${number}${number}.${number}${number}${number}Z`
type YearString = `2${number}${number}${number}`

interface BaseRelease {
  image: StaticImageData
  releaseName: string
  content: React.ReactNode | ((t: TranslationFunction) => React.ReactNode)
  displayDate?: string
  href?: string
  forkcast_href?: string
}

interface ReleaseWithDate extends BaseRelease {
  releaseDate: DateString
  plannedReleaseYear?: never
}

interface ReleaseWithYear extends BaseRelease {
  releaseDate?: never
  plannedReleaseYear: YearString
}

interface ReleaseUnscheduled extends BaseRelease {
  releaseDate?: never
  plannedReleaseYear?: never
}

// Release may have either a releaseDate or a plannedReleaseYear, but not both.
export type Release = ReleaseWithDate | ReleaseWithYear | ReleaseUnscheduled

export const getReleasesData = (t: TranslationFunction): Release[] => [
  {
    image: DevelopersHubHeroImage,
    releaseName: "Paris (The Merge)",
    releaseDate: "2022-09-15T06:42:42.000Z",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-paris-pos-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-paris-pos-item-1")}</li>
          <li>{t("page-roadmap-paris-pos-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-paris-beacon-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-paris-beacon-item-1")}</li>
          <li>{t("page-roadmap-paris-beacon-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-paris-difficulty-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-paris-difficulty-item-1")}</li>
          <li>{t("page-roadmap-paris-difficulty-item-2")}</li>
        </ul>
      </>
    ),
    href: "/roadmap/merge/",
  },
  {
    image: QuizzesHubHeroImage,
    releaseName: "Shapella",
    releaseDate: "2023-04-12T22:27:35.000Z",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-shapella-withdrawals-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-shapella-withdrawals-item-1")}</li>
          <li>{t("page-roadmap-shapella-withdrawals-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-shapella-eip4895-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-shapella-eip4895-item-1")}</li>
          <li>{t("page-roadmap-shapella-eip4895-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-shapella-eip3651-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-shapella-eip3651-item-1")}</li>
          <li>{t("page-roadmap-shapella-eip3651-item-2")}</li>
        </ul>
      </>
    ),
    href: "/staking/withdrawals",
  },
  {
    image: Layer2HubHeroImage,
    releaseName: "Dencun",
    releaseDate: "2024-03-13T13:55:35.000Z",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-dencun-danksharding-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-dencun-danksharding-item-1")}</li>
          <li>{t("page-roadmap-dencun-danksharding-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-dencun-eip1153-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-dencun-eip1153-item-1")}</li>
          <li>{t("page-roadmap-dencun-eip1153-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-dencun-eip4788-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-dencun-eip4788-item-1")}</li>
          <li>{t("page-roadmap-dencun-eip4788-item-2")}</li>
        </ul>
      </>
    ),
    href: "/roadmap/dencun",
  },
  {
    image: PectraImage,
    releaseName: "Pectra",
    releaseDate: "2025-05-07T10:05:11.000Z",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-pectra-eoa-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-pectra-eoa-item-1")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-pectra-balance-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-pectra-balance-item-1")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-pectra-blob-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-pectra-blob-item-1")}</li>
        </ul>
      </>
    ),
    href: "/roadmap/pectra",
    forkcast_href: "https://forkcast.org/upgrade/pectra",
  },
  {
    image: FusakaImage,
    releaseName: "Fusaka",
    releaseDate: "2025-12-03T21:49:11.000Z",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-fusaka-peerdas-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-fusaka-peerdas-item-1")}</li>
          <li>{t("page-roadmap-fusaka-peerdas-item-2")}</li>
        </ul>
        <p>
          <strong>Blob Parameter Only (BPO) Forks</strong>
        </p>
        <ul>
          <li>Allows flexible blob count increases between major upgrades</li>
          <li>
            Enables faster adaptation to L2 scaling needs without waiting for
            coordinated hard forks
          </li>
        </ul>
        <p>
          <strong>Gas Limit & DoS Hardening</strong>
        </p>
        <ul>
          <li>Transaction gas limit cap of 16.7M gas per transaction</li>
          <li>Default gas limit increase to ~60M (from current 45M)</li>
        </ul>
      </>
    ),
    href: "/roadmap/fusaka",
    forkcast_href: "https://forkcast.org/upgrade/fusaka",
  },
  {
    image: GlamsterdamImage,
    releaseName: "Glamsterdam",
    plannedReleaseYear: "2026",
    displayDate: "H2 2026",
    href: "/roadmap/glamsterdam/",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-glamsterdam-epbs-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-glamsterdam-epbs-item-1")}</li>
          <li>{t("page-roadmap-glamsterdam-epbs-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-glamsterdam-bal-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-glamsterdam-bal-item-1")}</li>
          <li>{t("page-roadmap-glamsterdam-bal-item-2")}</li>
          <li>{t("page-roadmap-glamsterdam-bal-item-3")}</li>
        </ul>
      </>
    ),
    forkcast_href: "https://forkcast.org/upgrade/glamsterdam",
  },
  {
    image: GuidesHubHeroImage,
    releaseName: "Hegotá",
    plannedReleaseYear: "2026",
    displayDate: "H2 2026",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-hegota-discussed-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-hegota-discussed-item-1")}</li>
        </ul>
      </>
    ),
    forkcast_href: "https://forkcast.org/upgrade/hegota",
  },
]
