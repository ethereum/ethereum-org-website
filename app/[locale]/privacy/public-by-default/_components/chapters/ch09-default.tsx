import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

import AnonymityCrowdLazy from "@/components/PrivacyWidgets/AnonymityCrowd/lazy"
import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import Blockquote from "@/components/ui/blockquote"
import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { formatDate } from "@/lib/utils/date"

import NowSummary from "./default/now-summary"
import RoadmapFile from "./default/roadmap-file"
import {
  HUGHES_HREF,
  keepGoingLinks,
  KOHAKU_HREF,
  ROADMAP_REVIEWED,
  roadmapGroups,
} from "./default/roadmap-map"
import StartOver from "./default/start-over"
import type { ChapterProps } from "./types"

const NS = "page-privacy-public-by-default"
const key = (name: string) => `${NS}-${name}`

// Chapter body for #default. The section, kicker, title and lede come from page.tsx.
const ChapterDefault = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(NS)

  const reviewed = formatDate(ROADMAP_REVIEWED, locale, { timeZone: "UTC" })

  return (
    <>
      {/* Where Ethereum stands */}
      <div className="flow">
        <h3>{t(key("default-stands-title"))}</h3>
        <p>{t(key("default-stands-monero"))}</p>
        <p>
          {t.rich(
            key("default-stands-opt-in"),
            richTags({ glossary: "shielded-pool" })
          )}
        </p>
      </div>

      {/* The crowd */}
      <div className="flow">
        <h3>{t(key("default-crowd-title"))}</h3>
        <p>{t(key("default-crowd-intro"))}</p>
        <AnonymityCrowdLazy variant="lesson" />
      </div>

      {/* What's being built */}
      <div className="flow">
        <h3>{t(key("default-roadmap-title"))}</h3>
        <p>{t(key("default-roadmap-intro"))}</p>
        <p>{t(key("default-roadmap-caveat"))}</p>
        <p>{t(key("default-roadmap-hegota"))}</p>
        <p className="text-sm text-body-medium">
          {t(key("default-roadmap-reviewed"), { date: reviewed })}
        </p>

        <div className="grid items-start gap-4 md:grid-cols-2">
          {roadmapGroups.map((group) => (
            <Card key={group.id}>
              <CardContent>
                <p className="text-sm font-semibold tracking-wide text-body-medium uppercase">
                  {t(key(`default-roadmap-${group.id}-witnesses`))}
                </p>
                <CardTitle asChild>
                  <h4>{t(key(`default-roadmap-${group.id}-title`))}</h4>
                </CardTitle>
                <CardParagraph>
                  {t(key(`default-roadmap-${group.id}-description`))}
                </CardParagraph>
                <ul className="m-0 list-none space-y-5 border-t pt-4">
                  {group.items.map((item) => {
                    const titleId = `default-roadmap-${item.id}`
                    const tags = richTags({
                      glossary: item.glossary,
                      link: item.link,
                    })
                    return (
                      <li key={item.id} className="space-y-2">
                        <Tag size="small" variant="subtle" status={item.tone}>
                          {t(key(`default-roadmap-${item.id}-status`))}
                        </Tag>
                        <h5 id={titleId} className="m-0 text-body">
                          {t.rich(
                            key(`default-roadmap-${item.id}-title`),
                            tags
                          )}
                        </h5>
                        <p className="m-0">
                          {t.rich(key(`default-roadmap-${item.id}-body`), tags)}
                        </p>
                        {item.extras?.map((extra) => (
                          <p key={extra.key} className="m-0">
                            {t.rich(
                              key(extra.key),
                              richTags({ link: extra.link })
                            )}
                          </p>
                        ))}
                        {item.eip && (
                          <p className="m-0">
                            <Link
                              href={`https://eips.ethereum.org/EIPS/eip-${item.eip}`}
                              aria-describedby={titleId}
                            >
                              {t(key("default-roadmap-eip-link"))}
                            </Link>
                          </p>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardContent>
              <p className="text-sm font-semibold tracking-wide text-body-medium uppercase">
                {t(key("default-roadmap-kohaku-label"))}
              </p>
              <CardTitle asChild>
                <h4>{t(key("default-roadmap-kohaku-title"))}</h4>
              </CardTitle>
              <CardParagraph>
                {t(key("default-roadmap-kohaku-description"))}
              </CardParagraph>
              <div className="space-y-2 border-t pt-4">
                <Tag size="small" variant="subtle" status="accent-a">
                  {t(key("default-roadmap-kohaku-status"))}
                </Tag>
                <h5 className="m-0 text-body">
                  {t(key("default-roadmap-kohaku-item-title"))}
                </h5>
                <p className="m-0">{t(key("default-roadmap-kohaku-body"))}</p>
                <p className="m-0">{t(key("default-roadmap-kohaku-notice"))}</p>
                <p className="m-0">
                  {t.rich(
                    key("default-roadmap-kohaku-link"),
                    richTags({ link: KOHAKU_HREF })
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What they'd know if the roadmap lands */}
      <div className="flow">
        <h3>{t(key("default-file-title"))}</h3>
        <p>{t(key("default-file-intro"))}</p>
        <RoadmapFile />
      </div>

      {/* Closing */}
      <div className="flow">
        <figure className="space-y-3">
          <Blockquote className="text-xl font-semibold">
            <p>{t(key("default-quote-hughes"))}</p>
          </Blockquote>
          <figcaption className="text-sm text-body-medium">
            {t.rich(
              key("default-quote-hughes-attribution"),
              richTags({ link: HUGHES_HREF })
            )}
          </figcaption>
        </figure>
        <figure className="space-y-3">
          <Blockquote>
            <p>{t(key("default-quote-mandate"))}</p>
          </Blockquote>
          <figcaption className="text-sm text-body-medium">
            {t.rich(
              key("default-quote-mandate-attribution"),
              richTags({ link: "/privacy/ethereum/" })
            )}
          </figcaption>
        </figure>
        <p className="text-lg">{t(key("default-closing"))}</p>
        <NowSummary />
      </div>

      {/* Keep going */}
      <nav aria-labelledby="default-more-title" className="flow">
        <h3 id="default-more-title">{t(key("default-more-title"))}</h3>
        <ul className="m-0 grid list-none gap-2 sm:grid-cols-2">
          {keepGoingLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex h-full items-center justify-between gap-3 rounded-base border p-4 no-underline hover:border-primary-hover"
              >
                <span>{t(key(link.key))}</span>
                <ArrowRight
                  aria-hidden
                  className="size-5 shrink-0 rtl:-scale-x-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <StartOver />
    </>
  )
}

export default ChapterDefault
