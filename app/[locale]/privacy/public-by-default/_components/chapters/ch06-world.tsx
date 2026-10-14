import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"

import { numberFormat } from "@/lib/utils/numbers"

import { persona } from "@/data/privacy-lesson/persona"

import {
  isolate,
  NextChapter,
  RecordCard,
  TechDetails,
} from "./analysts/lesson-blocks"
import ConnectDots from "./world/connect-dots"
import type { ChapterProps } from "./types"

const P = "page-privacy-public-by-default"

const SOURCES = {
  coinbaseBlog:
    "https://www.coinbase.com/blog/protecting-our-customers-standing-up-to-extortionists",
  coinbaseFiling:
    "https://www.sec.gov/Archives/edgar/data/1679788/000167978825000094/coin-20250514.htm",
  loppList: "https://github.com/jlopp/physical-bitcoin-attacks",
  loppArticle:
    "https://www.theblock.co/post/384018/record-year-wrench-attacks-how-crypto-holders-maintain-physical-security-rising-risks",
}

/** Standard ENS text record keys, shown as-is */
const ENS_FIELDS = "avatar, url, email, com.twitter, com.github"
const FRIEND_NAME = "Sam"

// Chapter body for #world. The section, kicker, title and lede come from page.tsx.
const ChapterWorld = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(P)
  const k = (key: string) => `${P}-world-${key}`

  return (
    <>
      <p>{t(k("intro-1"))}</p>
      <p>{t(k("intro-2"))}</p>

      <h3>{t(k("exchange-title"))}</h3>
      <p>{t(k("exchange-1"))}</p>
      <p>{t(k("exchange-2"))}</p>
      <RecordCard
        label={t(k("record-label"))}
        sourcesLabel={t(k("sources-label"))}
        sources={[
          {
            text: t(k("record-coinbase-source-blog")),
            href: SOURCES.coinbaseBlog,
          },
          {
            text: t(k("record-coinbase-source-filing")),
            href: SOURCES.coinbaseFiling,
          },
        ]}
      >
        <p className="m-0">{t(k("record-coinbase-1"))}</p>
        <p className="m-0">{t(k("record-coinbase-2"))}</p>
      </RecordCard>

      <h3>{t(k("ens-title"))}</h3>
      <p>
        {t.rich(k("ens"), {
          ...richTags({ glossary: "ens" }),
          ensName: persona.ens,
        })}
      </p>

      <h3>{t(k("badges-title"))}</h3>
      <p>{t.rich(k("badges"), richTags({ glossary: "poap" }))}</p>

      <h3>{t(k("payments-title"))}</h3>
      <p>{t(k("payments"), { friendName: FRIEND_NAME })}</p>

      <TechDetails summary={t(k("tech-summary"))}>
        <p>{t(k("tech-ens"), { fieldList: isolate(ENS_FIELDS) })}</p>
        <p>{t(k("tech-transfers"))}</p>
      </TechDetails>

      <h3>{t(k("uses-title"))}</h3>
      <p>{t(k("uses-1"))}</p>
      <p>{t(k("uses-2"))}</p>
      <RecordCard
        label={t(k("record-label"))}
        sourcesLabel={t(k("sources-label"))}
        sources={[
          { text: t(k("record-lopp-source-list")), href: SOURCES.loppList },
          {
            text: t(k("record-lopp-source-article")),
            href: SOURCES.loppArticle,
          },
        ]}
      >
        <p className="m-0">{t(k("record-lopp"))}</p>
      </RecordCard>

      <h3>{t(k("connect-title"))}</h3>
      <p>{t(k("connect-intro"))}</p>
      <ConnectDots />
      <p className="text-sm text-body-medium">{t(k("caption"))}</p>

      <blockquote className="border-s-4 border-s-leak ps-4 text-xl">
        {t.rich(k("pull-quote"), richTags())}
      </blockquote>
      <p>{t(k("outro"))}</p>

      <NextChapter
        href="#fixes"
        title={t(k("take-back-title"))}
        label={t(`${P}-nav-next`, {
          kicker: t(`${P}-fixes-kicker`, {
            number: numberFormat(locale, { minimumIntegerDigits: 2 }).format(7),
          }),
        })}
        blurb={t(`${P}-fixes-nav-blurb`)}
      />
    </>
  )
}

export default ChapterWorld
