import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"

import { persona } from "@/data/privacy-lesson/persona"

import HomeNodeDiagram from "./rpc/home-node-diagram"
import RpcProviderView from "./rpc/rpc-provider-view"
import { FixNote, NextChapterLink } from "./wallet/chapter-extras"
import type { ChapterProps } from "./types"

const P = "page-privacy-public-by-default"

const PRIVATE_READS = [
  { id: "origin", status: "rpc-private-read-origin-status", tone: "leak" },
  { id: "content", status: "rpc-private-read-content-status", tone: "muted" },
  {
    id: "correctness",
    status: "rpc-private-read-correctness-status",
    tone: "primary",
  },
] as const

const statusTone = {
  leak: "bg-leak-low-contrast text-leak-high-contrast",
  muted: "bg-background-medium text-body",
  primary: "bg-primary-low-contrast text-primary-high-contrast",
}

// Chapter body for #rpc. The section, kicker, title and lede come from page.tsx.
const ChapterRpc = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(P)
  const k = (key: string) => `${P}-${key}`

  return (
    <>
      <p>{t.rich(k("rpc-intro-1"), richTags({ glossary: "node" }))}</p>
      <p>{t.rich(k("rpc-intro-2"), richTags({ glossary: "rpc" }))}</p>

      <figure className="m-0 rounded-base border-s-4 border-primary bg-background-highlight p-6">
        <blockquote className="m-0 text-lg">{t(k("rpc-quote"))}</blockquote>
        <figcaption className="mt-2 text-sm text-body-medium">
          {t.rich(
            k("rpc-quote-source"),
            richTags({ link: "/roadmap/privacy/" })
          )}
        </figcaption>
      </figure>

      <h3>{t(k("rpc-view-title"))}</h3>
      <p>{t(k("rpc-view-intro"))}</p>
      <figure className="m-0 space-y-2">
        <RpcProviderView />
        <figcaption className="text-sm text-body-medium">
          {t(k("rpc-view-caption"))}
        </figcaption>
      </figure>
      <p>
        {t.rich(k("rpc-view-after"), {
          ...richTags({ glossary: "ens" }),
          friend: persona.friend,
        })}
      </p>

      <h3>{t(k("rpc-logs-title"))}</h3>
      <p>{t(k("rpc-logs-1"))}</p>
      <p>{t(k("rpc-logs-2"))}</p>

      <aside className="rounded-base border p-6">
        <p className="mb-2 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t(k("rpc-record-label"))}
        </p>
        <p>{t(k("rpc-record-timing"))}</p>
        <p className="mb-0 text-sm text-body-medium">
          {t.rich(
            k("rpc-record-timing-source"),
            richTags({ link: "https://arxiv.org/abs/2508.21440" })
          )}
        </p>
      </aside>

      <h3>{t(k("rpc-home-node-title"))}</h3>
      <p>{t(k("rpc-home-node-1"))}</p>
      <p>{t(k("rpc-home-node-2"))}</p>
      <HomeNodeDiagram />
      <p className="text-sm text-body-medium">
        {t.rich(k("rpc-home-node-caption"), richTags({ link: "/run-a-node/" }))}
      </p>

      <h3>{t(k("rpc-private-read-title"))}</h3>
      <p>{t(k("rpc-private-read-intro"))}</p>
      <ul className="m-0 grid list-none gap-4 md:grid-cols-3">
        {PRIVATE_READS.map(({ id, status, tone }) => (
          <li
            key={id}
            className="flex flex-col gap-2 rounded-base border bg-background-highlight p-5"
          >
            <span className="text-xs font-bold tracking-wide text-body-medium uppercase">
              {t(k(`rpc-private-read-${id}-label`))}
            </span>
            <span className="text-lg font-bold">
              {t(k(`rpc-private-read-${id}-title`))}
            </span>
            <span className="flex-1">
              {t.rich(
                k(`rpc-private-read-${id}-body`),
                richTags({ glossary: "light-client" })
              )}
            </span>
            {id === "origin" && (
              <span className="text-sm">
                {t.rich(
                  k("rpc-private-read-origin-link"),
                  richTags({ link: "/privacy/online/" })
                )}
              </span>
            )}
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${statusTone[tone]}`}
            >
              {t(k(status))}
            </span>
          </li>
        ))}
      </ul>
      <p>{t.rich(k("rpc-private-read-after"), richTags())}</p>

      <details className="rounded-base border p-4 [&[open]>summary]:mb-3">
        <summary className="cursor-pointer font-semibold">
          {t(k("rpc-pir-summary"))}
        </summary>
        <p>{t(k("rpc-pir-1"))}</p>
        <p className="mb-0">{t(k("rpc-pir-2"))}</p>
      </details>

      <FixNote label={t(k("rpc-fixnote-label"))}>
        {t.rich(k("rpc-fixnote"), richTags({ link: "/run-a-node/" }))}
      </FixNote>

      <NextChapterLink locale={locale} current="rpc" />
    </>
  )
}

export default ChapterRpc
