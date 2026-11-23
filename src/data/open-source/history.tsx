import type { StaticImageData } from "next/image"
import type { ReactNode } from "react"

import type { MatomoEventOptions } from "@/lib/types"

import { numberFormat } from "@/lib/utils/numbers"

import courtyardOfOpenServerRacks from "@/public/images/open-source/courtyard-of-open-server-racks.jpg"
import mainframeRoomWithTapeReels from "@/public/images/open-source/mainframe-room-with-tape-reels.jpg"
import meteredGateBesideOpenArchway from "@/public/images/open-source/metered-gate-beside-open-archway.jpg"
import openColonnadeUnderGatedPenthouse from "@/public/images/open-source/open-colonnade-under-gated-penthouse.jpg"
import peopleTendingSharedRooftopGarden from "@/public/images/open-source/people-tending-shared-rooftop-garden.jpg"
import shrinkWrappedBoxesAndSharedFloppy from "@/public/images/open-source/shrink-wrapped-boxes-and-shared-floppy.jpg"

type Translator = {
  (key: string, values?: Record<string, string | number>): string
  rich(
    key: string,
    values: Record<string, string | ((chunks: ReactNode) => ReactNode)>
  ): ReactNode
}

// The chapter numeral is a CSS counter, so it follows the locale's list
// numbering (`--list-counter-style` in base.css) instead of the string.
const CHAPTER_NUMBER =
  "before:content-[counter(history-chapter,var(--list-counter-style,decimal))]"

export interface HistoryStat {
  label: string
  detail: string
}

export type HistoryBeat =
  | "setting"
  | "vendors"
  | "commons"
  | "pay"
  | "sold"
  | "handoff"
  | "pattern"
  | "catch"
  | "ask"

export interface HistoryStep {
  id: HistoryBeat
  eyebrow: string
  headline: string
  body: string
  stat?: HistoryStat
  /** "Step 2 of 6", for screen readers */
  positionLabel: string
  /** "Go to step 2" */
  goToLabel: string
  /** Footnotes under Further reading that back this step's claims. */
  sources: HistorySource[]
}

export interface HistorySource {
  number: number
  /** "Source 4" */
  label: string
  event: MatomoEventOptions
}

export interface HistoryChapter {
  slug: string
  /** Decorative era banner on the card. */
  image: StaticImageData
  /** "Chapter 2: 1980–1991" */
  chapterLabel: ReactNode
  years: string
  title: string
  hook: string
  /** "6 steps" */
  stepsCountLabel: string
  steps: HistoryStep[]
  events: {
    open: MatomoEventOptions
    resume: MatomoEventOptions
    complete: MatomoEventOptions
    continue: MatomoEventOptions
  }
}

export interface HistoryLabels {
  read: string
  openChapter: string
  resume: string
  readAgain: string
  back: string
  next: string
  nextChapter: string
  ledgerPay: string
  ledgerSold: string
  progress: string
}

const PREFIX = "page-open-source-history"

type SpineStep = { id: HistoryBeat; stat?: boolean }

// Chapters 1-5 share one six-beat spine; the closing chapter reuses the chrome
// for a three-beat argument. Pay and sold steps carry a pull-stat.
const ERA_SPINE: SpineStep[] = [
  { id: "setting" },
  { id: "vendors" },
  { id: "commons" },
  { id: "pay", stat: true },
  { id: "sold", stat: true },
  { id: "handoff" },
]

const CLOSING_SPINE: SpineStep[] = [
  { id: "pattern" },
  { id: "catch" },
  { id: "ask" },
]

// Footnote numbers, keyed by 1-based step, continue the page's existing
// [1]-[3] under Further reading.
const CHAPTERS: {
  key: string
  image: StaticImageData
  slug: string
  spine: SpineStep[]
  sources: Record<number, number[]>
}[] = [
  {
    key: "c1",
    image: mainframeRoomWithTapeReels,
    slug: "1955-1979",
    spine: ERA_SPINE,
    sources: { 2: [4] },
  },
  {
    key: "c2",
    image: shrinkWrappedBoxesAndSharedFloppy,
    slug: "1980-1991",
    spine: ERA_SPINE,
    sources: { 2: [5], 3: [6] },
  },
  {
    key: "c3",
    image: courtyardOfOpenServerRacks,
    slug: "1991-2004",
    spine: ERA_SPINE,
    sources: { 2: [8], 3: [7] },
  },
  {
    key: "c4",
    image: openColonnadeUnderGatedPenthouse,
    slug: "2005-2015",
    spine: ERA_SPINE,
    sources: { 3: [9, 10] },
  },
  {
    key: "c5",
    image: meteredGateBesideOpenArchway,
    slug: "2016-present",
    spine: ERA_SPINE,
    sources: { 2: [15], 3: [11, 12, 13, 14], 5: [16] },
  },
  {
    key: "c6",
    image: peopleTendingSharedRooftopGarden,
    slug: "your-move",
    spine: CLOSING_SPINE,
    sources: { 2: [17, 18, 19] },
  },
]

/**
 * Resolves every string server-side so the client island carries no i18n of
 * its own. `track` is pre-bound to the section id by the page.
 */
export const getHistoryChapters = (
  t: Translator,
  track: (name: string) => MatomoEventOptions,
  locale: string
): HistoryChapter[] => {
  const formatNumber = numberFormat(locale).format
  return CHAPTERS.map(({ key, image, slug, spine, sources }, index) => {
    const p = `${PREFIX}-${key}`
    const total = spine.length
    const steps: HistoryStep[] = spine.map(({ id, stat }, stepIndex) => {
      const s = `${p}-s${stepIndex + 1}`
      return {
        id,
        eyebrow: t(`${PREFIX}-step-${id}`),
        headline: t(`${s}-headline`),
        body: t(`${s}-body`),
        stat: stat
          ? { label: t(`${s}-stat-label`), detail: t(`${s}-stat-detail`) }
          : undefined,
        positionLabel: t(`${PREFIX}-step-position`, {
          current: formatNumber(stepIndex + 1),
          total: formatNumber(total),
        }),
        goToLabel: t(`${PREFIX}-go-to-step`, {
          number: formatNumber(stepIndex + 1),
        }),
        sources: (sources[stepIndex + 1] ?? []).map((number) => ({
          number,
          label: t(`${PREFIX}-source`, { number: formatNumber(number) }),
          event: track(`Source ${number}`),
        })),
      }
    })
    return {
      slug,
      image,
      chapterLabel: (
        <span style={{ counterReset: `history-chapter ${index + 1}` }}>
          {t.rich(`${PREFIX}-chapter-label`, {
            years: t(`${p}-years`),
            strong: (chunks) => <strong>{chunks}</strong>,
            number: () => <span className={CHAPTER_NUMBER} />,
          })}
        </span>
      ),
      years: t(`${p}-years`),
      title: t(`${p}-title`),
      hook: t(`${p}-hook`),
      stepsCountLabel: t(`${PREFIX}-steps-count`, { count: total }),
      steps,
      events: {
        open: track(`Open ${slug}`),
        resume: track(`Resume ${slug}`),
        complete: track(`Complete ${slug}`),
        continue: track(`Continue ${slug}`),
      },
    }
  })
}

export const getHistoryLabels = (t: Translator): HistoryLabels => ({
  read: t(`${PREFIX}-read`),
  openChapter: t(`${PREFIX}-open-chapter`),
  resume: t(`${PREFIX}-resume`),
  readAgain: t(`${PREFIX}-read-again`),
  back: t(`${PREFIX}-back`),
  next: t(`${PREFIX}-next`),
  nextChapter: t(`${PREFIX}-next-chapter`),
  ledgerPay: t(`${PREFIX}-ledger-pay`),
  ledgerSold: t(`${PREFIX}-ledger-sold`),
  progress: t(`${PREFIX}-progress-label`),
})
