import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import Link, { LinkWithArrow } from "@/components/ui/Link"

import { numberFormat } from "@/lib/utils/numbers"

import GossipNetworkLazy from "./network/gossip-network-lazy"
import SandwichLesson from "./network/sandwich-lesson"
import type { ChapterProps } from "./types"

const NS = "page-privacy-public-by-default"

const SOURCES = {
  validators: "https://arxiv.org/abs/2409.04366",
  quote: "https://arxiv.org/abs/2306.15024",
  sandwich: "https://www.theblock.co/post/230218/jaredfromsubway-mev-bot",
  dandelion: "https://www.getmonero.org/2020/04/18/dandelion-implemented.html",
}

const Record = ({
  label,
  children,
  source,
  href,
}: {
  label: string
  children: ReactNode
  source: string
  href: string
}) => (
  <aside className="space-y-2 rounded-base border-s-4 border-leak bg-background-highlight p-4 md:p-6">
    <p className="m-0 text-xs font-bold tracking-wide text-leak-high-contrast uppercase">
      {label}
    </p>
    <p className="m-0">{children}</p>
    <p className="m-0 text-sm">
      <Link href={href}>{source}</Link>
    </p>
  </aside>
)

// Chapter body for #network. The section, kicker, title and lede come from page.tsx.
const ChapterNetwork = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(NS)
  const k = (key: string) => `${NS}-network-${key}`

  return (
    <>
      <p>{t.rich(k("intro-1"), richTags({ glossary: "node" }))}</p>
      <p>{t.rich(k("intro-2"), richTags({ glossary: "mempool" }))}</p>
      <p>{t(k("intro-3"))}</p>

      <h3>{t(k("heard-first-heading"))}</h3>
      <p>{t(k("heard-first-body"))}</p>

      <GossipNetworkLazy />

      <p>{t.rich(k("own-node"), richTags())}</p>

      <Record
        label={t(k("record-label"))}
        source={t(k("record-validators-source"))}
        href={SOURCES.validators}
      >
        {t(k("record-validators-body"))}
      </Record>

      <figure className="m-0 space-y-2 border-s-4 border-primary ps-4 md:ps-6">
        <blockquote className="m-0 text-xl font-semibold">
          {t(k("quote"))}
        </blockquote>
        <figcaption className="text-sm text-body-medium">
          <Link href={SOURCES.quote}>{t(k("quote-source"))}</Link>
        </figcaption>
      </figure>

      <h3>{t(k("mempool-heading"))}</h3>
      <p>{t(k("mempool-body"))}</p>

      <Record
        label={t(k("record-label"))}
        source={t(k("record-sandwich-source"))}
        href={SOURCES.sandwich}
      >
        {t(k("record-sandwich-body"))}
      </Record>

      <SandwichLesson />

      <h3>{t(k("private-heading"))}</h3>
      <p>{t.rich(k("private-1"), richTags({ glossary: "block-builder" }))}</p>
      <p>{t(k("private-2"))}</p>
      <p>{t(k("private-3"))}</p>
      <p>{t.rich(k("private-4"), richTags({ glossary: "mev" }))}</p>
      <p>
        {t.rich(k("censorship-1"), richTags({ link: "/roadmap/privacy/" }))}
      </p>
      <p>{t(k("censorship-2"))}</p>
      <p>{t(k("censorship-3"))}</p>

      <h3>{t(k("fixnet-heading"))}</h3>
      <p>{t(k("fixnet-1"))}</p>
      <p>{t.rich(k("fixnet-2"), richTags({ link: SOURCES.dandelion }))}</p>

      <aside className="space-y-2 rounded-base border-s-4 border-primary bg-primary-low-contrast/40 p-4 md:p-6">
        <p className="m-0 text-xs font-bold tracking-wide text-primary-high-contrast uppercase">
          {t(k("fixnote-label"))}
        </p>
        <p className="m-0">{t(k("fixnote-body"))}</p>
      </aside>

      <div className="space-y-1">
        <LinkWithArrow href="#chain">
          {t(`${NS}-nav-next`, {
            kicker: t(`${NS}-chain-kicker`, {
              number: numberFormat(locale, { minimumIntegerDigits: 2 }).format(
                4
              ),
            }),
          })}
        </LinkWithArrow>
        <p className="m-0 text-sm text-body-medium">{t(k("next-blurb"))}</p>
      </div>
    </>
  )
}

export default ChapterNetwork
