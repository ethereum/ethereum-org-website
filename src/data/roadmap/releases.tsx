import { StaticImageData } from "next/image"

import DevelopersHubHeroImage from "@/public/images/heroes/developers-hub-hero.png"
import GuidesHubHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"
import Layer2HubHeroImage from "@/public/images/heroes/layer-2-hub-hero.png"
import QuizzesHubHeroImage from "@/public/images/heroes/quizzes-hub-hero.png"
import FusakaImage from "@/public/images/roadmap/roadmap-fusaka.png"
import PectraImage from "@/public/images/roadmap/roadmap-pectra.png"

type TranslationFunction = (key: string) => string

type DateString =
  `2${number}${number}${number}-${number}${number}-${number}${number}`
type YearString = `2${number}${number}${number}`

interface BaseRelease {
  image: StaticImageData
  releaseName: string
  content: React.ReactNode | ((t: TranslationFunction) => React.ReactNode)
  href: string
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
    releaseDate: "2022-09-15",
    content: (
      <div>
        <p className="font-bold">{t("page-roadmap-paris-pos-title")}</p>
        <ul>
          <li>{t("page-roadmap-paris-pos-item-1")}</li>
          <li>{t("page-roadmap-paris-pos-item-2")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-paris-beacon-title")}</p>
        <ul>
          <li>{t("page-roadmap-paris-beacon-item-1")}</li>
          <li>{t("page-roadmap-paris-beacon-item-2")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-paris-difficulty-title")}</p>
        <ul>
          <li>{t("page-roadmap-paris-difficulty-item-1")}</li>
          <li>{t("page-roadmap-paris-difficulty-item-2")}</li>
        </ul>
      </div>
    ),
    href: "/upgrades/merge",
  },
  {
    image: QuizzesHubHeroImage,
    releaseName: "Shapella",
    releaseDate: "2023-04-12",
    content: (
      <div>
        <p className="font-bold">
          {t("page-roadmap-shapella-withdrawals-title")}
        </p>
        <ul>
          <li>{t("page-roadmap-shapella-withdrawals-item-1")}</li>
          <li>{t("page-roadmap-shapella-withdrawals-item-2")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-shapella-eip4895-title")}</p>
        <ul>
          <li>{t("page-roadmap-shapella-eip4895-item-1")}</li>
          <li>{t("page-roadmap-shapella-eip4895-item-2")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-shapella-eip3651-title")}</p>
        <ul>
          <li>{t("page-roadmap-shapella-eip3651-item-1")}</li>
          <li>{t("page-roadmap-shapella-eip3651-item-2")}</li>
        </ul>
      </div>
    ),
    href: "/staking/withdrawals",
  },
  {
    image: Layer2HubHeroImage,
    releaseName: "Dencun",
    releaseDate: "2024-03-13",
    content: (
      <div>
        <p className="font-bold">
          {t("page-roadmap-dencun-danksharding-title")}
        </p>
        <ul>
          <li>{t("page-roadmap-dencun-danksharding-item-1")}</li>
          <li>{t("page-roadmap-dencun-danksharding-item-2")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-dencun-eip1153-title")}</p>
        <ul>
          <li>{t("page-roadmap-dencun-eip1153-item-1")}</li>
          <li>{t("page-roadmap-dencun-eip1153-item-2")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-dencun-eip4788-title")}</p>
        <ul>
          <li>{t("page-roadmap-dencun-eip4788-item-1")}</li>
          <li>{t("page-roadmap-dencun-eip4788-item-2")}</li>
        </ul>
      </div>
    ),
    href: "/roadmap/dencun",
  },
  {
    image: PectraImage,
    releaseName: "Pectra",
    releaseDate: "2025-05-07",
    content: (
      <div>
        <p className="font-bold">{t("page-roadmap-pectra-eoa-title")}</p>
        <ul>
          <li>{t("page-roadmap-pectra-eoa-item-1")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-pectra-balance-title")}</p>
        <ul>
          <li>{t("page-roadmap-pectra-balance-item-1")}</li>
        </ul>
        <p className="font-bold">{t("page-roadmap-pectra-blob-title")}</p>
        <ul>
          <li>{t("page-roadmap-pectra-blob-item-1")}</li>
        </ul>
      </div>
    ),
    href: "/roadmap/pectra",
  },
  {
    image: FusakaImage,
    releaseName: "Fusaka",
    plannedReleaseYear: "2025",
    content: (
      <div>
        <p className="font-bold">{t("page-roadmap-fusaka-peerdas-title")}</p>
        <ul>
          <li>{t("page-roadmap-fusaka-peerdas-item-1")}</li>
          <li>{t("page-roadmap-fusaka-peerdas-item-2")}</li>
        </ul>
        <p className="font-bold">Blob Parameter Only (BPO) Forks</p>
        <ul>
          <li>Allows flexible blob count increases between major upgrades</li>
          <li>
            Enables faster adaptation to L2 scaling needs without waiting for
            coordinated hard forks
          </li>
        </ul>
        <p className="font-bold">Gas Limit & DoS Hardening</p>
        <ul>
          <li>Transaction gas limit cap of 16.7M gas per transaction</li>
          <li>Default gas limit increase to ~60M (from current 45M)</li>
        </ul>
      </div>
    ),
    href: "/roadmap/fusaka",
  },
  {
    image: GuidesHubHeroImage,
    releaseName: "Glamsterdam",
    plannedReleaseYear: "2026",
    content: (
      <div>
        <p className="font-bold">
          {t("page-roadmap-glamsterdam-discussed-title")}
        </p>
        <ul>
          <li>{t("page-roadmap-glamsterdam-discussed-item-1")}</li>
          <li>{t("page-roadmap-glamsterdam-discussed-item-2")}</li>
        </ul>
      </div>
    ),
    href: "https://forkcast.org/upgrade/glamsterdam/#scheduled-for-inclusion",
  },
]

// Legacy export for backward compatibility - uses hardcoded English strings
export const releasesData: Release[] = getReleasesData((key: string) => {
  // This is a fallback that returns the key itself if translations aren't available
  // In practice, this should not be used in the actual app
  console.warn(`Translation key ${key} used without translation function`)
  return key
})
