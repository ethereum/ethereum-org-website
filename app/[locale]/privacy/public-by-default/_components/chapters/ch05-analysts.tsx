import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"

import { numberFormat } from "@/lib/utils/numbers"

import ClusteringIsland from "./analysts/clustering-island"
import {
  FixNote,
  NextChapter,
  RecordCard,
  TechDetails,
} from "./analysts/lesson-blocks"
import PoolGame from "./analysts/pool-game"
import type { ChapterProps } from "./types"

const P = "page-privacy-public-by-default"

const SOURCES = {
  victor: "https://www.ifca.ai/fc20/preproceedings/31.pdf",
  arkham:
    "https://www.coindesk.com/business/2023/07/10/arkham-intelligence-rolls-out-crypto-data-marketplace-privacy-advocates-cry-foul",
  dapps: "https://arxiv.org/abs/2005.14051",
  eip8141: "https://eips.ethereum.org/EIPS/eip-8141",
}

// Chapter body for #analysts. The section, kicker, title and lede come from page.tsx.
const ChapterAnalysts = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(P)
  const k = (key: string) => `${P}-analysts-${key}`

  return (
    <>
      <p>{t(k("industry"))}</p>
      <p>{t(k("industry-why"))}</p>
      <p>{t(k("industry-public"))}</p>

      <p>{t(k("heuristics-intro"))}</p>
      <ClusteringIsland />

      <RecordCard
        label={t(k("record-label"))}
        sourcesLabel={t(k("source-label"))}
        sources={[{ text: t(k("record-victor-source")), href: SOURCES.victor }]}
      >
        <p className="m-0">{t(k("record-victor"))}</p>
      </RecordCard>

      <RecordCard
        label={t(k("record-label"))}
        sourcesLabel={t(k("source-label"))}
        sources={[{ text: t(k("record-arkham-source")), href: SOURCES.arkham }]}
      >
        <p className="m-0">{t(k("record-arkham"))}</p>
      </RecordCard>

      <h3>{t(k("fresh-wallet-title"))}</h3>
      <p>{t.rich(k("fresh-wallet-1"), richTags({ glossary: "gas" }))}</p>
      <p>{t.rich(k("fresh-wallet-2"), richTags({ link: SOURCES.eip8141 }))}</p>

      <h3>{t(k("pool-title"))}</h3>
      <p>{t.rich(k("pool-1"), richTags({ glossary: "shielded-pool" }))}</p>
      <p>{t(k("pool-compliance"))}</p>
      <p>{t(k("pool-2"))}</p>
      <PoolGame />
      <p className="text-sm text-body-medium">{t(k("pool-caption"))}</p>
      <p>{t(k("pool-crowd"))}</p>

      <h3>{t(k("worst-day-title"))}</h3>
      <p>{t(k("worst-day-1"))}</p>
      <blockquote className="border-s-4 border-s-leak ps-4 text-2xl font-bold">
        {t(k("worst-day-quote"))}
      </blockquote>
      <p>{t(k("worst-day-2"))}</p>

      <TechDetails summary={t(k("tech-summary"))}>
        <p>{t.rich(k("tech-approvals"), richTags())}</p>
        <p>{t.rich(k("tech-fees"), richTags({ link: SOURCES.dapps }))}</p>
        <p>{t.rich(k("tech-next"), richTags())}</p>
        <p>{t.rich(k("tech-chains"), richTags())}</p>
      </TechDetails>

      <FixNote label={t(k("fixnote-label"))}>{t(k("fixnote"))}</FixNote>

      <NextChapter
        href="#world"
        label={t(`${P}-nav-next`, {
          kicker: t(`${P}-world-kicker`, {
            number: numberFormat(locale, { minimumIntegerDigits: 2 }).format(6),
          }),
        })}
        blurb={t(`${P}-world-nav-blurb`)}
      />
    </>
  )
}

export default ChapterAnalysts
