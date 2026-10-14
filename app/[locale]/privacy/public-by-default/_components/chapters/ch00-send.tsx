import { getTranslations } from "next-intl/server"

import { richTags } from "@/components/PrivacyWidgets/shared/rich-tags"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"

import { numberFormat } from "@/lib/utils/numbers"

import { chapters } from "@/data/privacy-lesson/chapters"

import SendJourney from "./send/send-journey"
import SendLive from "./send/send-live"
import type { ChapterProps } from "./types"

const NS = "page-privacy-public-by-default"

// Chapter 0: press Send, follow the payment past six witnesses, then see what
// this page itself read from the browser.
const ChapterSend = async ({ locale }: ChapterProps) => {
  const t = await getTranslations(NS)
  const k = (key: string) => `${NS}-${key}` as const
  const formatChapter = numberFormat(locale, { minimumIntegerDigits: 2 })

  return (
    <>
      <SendJourney />

      <section aria-labelledby="send-live-title" className="flow">
        <h3 id="send-live-title">{t(k("send-live-title"))}</h3>
        <p>{t.rich(k("send-live-intro"), richTags())}</p>
        <SendLive />
        <p>{t(k("send-live-server"))}</p>
        <p>{t(k("send-live-wallet-link"))}</p>
      </section>

      <nav
        aria-labelledby="send-contents-title"
        className="rounded-base bg-background-highlight p-6"
      >
        <h3 id="send-contents-title" className="mt-0 text-h5">
          {t(k("send-contents-title"))}
        </h3>
        <ol
          aria-label={t(k("send-contents-aria"))}
          className="m-0 mt-4 list-none space-y-3"
        >
          {chapters
            .filter(({ id }) => id !== "send")
            .map(({ id, number }) => (
              <li key={id} className="flex gap-x-3">
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-body-medium"
                >
                  {formatChapter.format(number)}
                </span>
                <span className="min-w-0">
                  <Link href={`#${id}`}>{t(k(`${id}-title`))}</Link>
                  <span className="block text-sm text-body-medium">
                    {t(k(`${id}-nav-blurb`))}
                  </span>
                </span>
              </li>
            ))}
        </ol>
      </nav>

      <p className="text-sm text-body-medium">
        {t.rich(k("hero-privacy-line"), richTags({ link: "/privacy-policy/" }))}
      </p>

      <div className="space-y-2">
        <ButtonLink href="#wallet">
          {t(k("nav-next"), {
            kicker: t(k("wallet-kicker"), {
              number: formatChapter.format(1),
            }),
          })}
        </ButtonLink>
        <p className="text-sm text-body-medium">{t(k("send-next-blurb"))}</p>
      </div>
    </>
  )
}

export default ChapterSend
