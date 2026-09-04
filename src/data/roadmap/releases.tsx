import { StaticImageData } from "next/image"

import DevelopersHubHeroImage from "@/public/images/heroes/developers-hub-hero.png"
import GuidesHubHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"
import Layer2HubHeroImage from "@/public/images/heroes/layer-2-hub-hero.png"
import QuizzesHubHeroImage from "@/public/images/heroes/quizzes-hub-hero.png"
import FusakaImage from "@/public/images/roadmap/roadmap-fusaka.png"
import GlamsterdamImage from "@/public/images/roadmap/roadmap-glamsterdam.png"
import PectraImage from "@/public/images/roadmap/roadmap-pectra.png"

type TranslationFunction = (key: string) => string

/**
 * The editorial half of a release: which image, which name, which features to
 * call out. Every volatile fact — the mainnet target, the stage it has reached,
 * the milestones ahead, the Forkcast link — comes from `src/data/upgrades`,
 * keyed by {@link Release.upgradeSlug}, so nothing here can drift from what
 * Forkcast says.
 */
export interface Release {
  image: StaticImageData
  /**
   * Key into `src/data/upgrades`. Not derived from `href`: the store uses
   * Forkcast's slugs and our content directories predate them, so `the-merge`
   * lives at `/roadmap/merge/`. Asserted by
   * `tests/unit/roadmap/release-carousel.spec.ts`.
   */
  upgradeSlug: string
  /**
   * Kept out of the store on purpose. The store knows "The Merge"; the
   * carousel says "Paris (The Merge)" so the execution-layer name is
   * discoverable. That is an editorial choice, not a fact that can go stale.
   */
  releaseName: string
  content: React.ReactNode | ((t: TranslationFunction) => React.ReactNode)
  href?: string
}

export const getReleasesData = (t: TranslationFunction): Release[] => [
  {
    image: DevelopersHubHeroImage,
    upgradeSlug: "the-merge",
    releaseName: "Paris (The Merge)",
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
    upgradeSlug: "shapella",
    releaseName: "Shapella",
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
    upgradeSlug: "dencun",
    releaseName: "Dencun",
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
    upgradeSlug: "pectra",
    releaseName: "Pectra",
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
  },
  {
    image: FusakaImage,
    upgradeSlug: "fusaka",
    releaseName: "Fusaka",
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
          <strong>{t("page-roadmap-fusaka-bpo-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-fusaka-bpo-item-1")}</li>
          <li>{t("page-roadmap-fusaka-bpo-item-2")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-fusaka-gas-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-fusaka-gas-item-1")}</li>
          <li>{t("page-roadmap-fusaka-gas-item-2")}</li>
        </ul>
      </>
    ),
    href: "/roadmap/fusaka",
  },
  {
    image: GlamsterdamImage,
    upgradeSlug: "glamsterdam",
    releaseName: "Glamsterdam",
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
  },
  {
    image: GuidesHubHeroImage,
    upgradeSlug: "hegota",
    releaseName: "Hegotá",
    href: "/roadmap/hegota/",
    content: (
      <>
        <p>
          <strong>{t("page-roadmap-hegota-focil-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-hegota-focil-item-1")}</li>
          <li>{t("page-roadmap-hegota-focil-item-2")}</li>
          <li>{t("page-roadmap-hegota-focil-item-3")}</li>
        </ul>
        <p>
          <strong>{t("page-roadmap-hegota-frame-title")}</strong>
        </p>
        <ul>
          <li>{t("page-roadmap-hegota-frame-item-1")}</li>
          <li>{t("page-roadmap-hegota-frame-item-2")}</li>
          <li>{t("page-roadmap-hegota-frame-item-3")}</li>
        </ul>
        {/* Hegotá is still `planning` upstream, so the slide must not read as a
            settled feature list the way a scheduled fork's does. */}
        <p>{t("page-roadmap-hegota-scope-note")}</p>
      </>
    ),
  },
]
