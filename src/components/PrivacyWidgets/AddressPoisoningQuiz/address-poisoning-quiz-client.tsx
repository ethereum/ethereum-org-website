"use client"

import { useId, useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { dateTimeFormat } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import { richTags } from "../shared/rich-tags"
import { trackPrivacyLessonEvent } from "../shared/track"

import {
  POISON_ROWS,
  type PoisonRow,
  SAM_ADDRESS,
  shortAddress,
  SOURCE_DATES,
  SOURCE_LINKS,
} from "./data"

const NS = "component-address-poisoning"

export interface AddressPoisoningQuizProps {
  /**
   * "lesson": inside Public by Default, which supplies its own heading.
   * "standalone": on other pages, with the widget's own title.
   */
  variant?: "lesson" | "standalone"
  /** Preselect and submit an answer (stories, visual tests) */
  initialAnswer?: string
  /** Called with whether the reader picked a real row */
  onAnswer?: (correct: boolean) => void
  className?: string
}

/** Intl.RelativeTimeFormat with the same numbering rules as numberFormat */
const relativeTime = (locale: string, minutesAgo: number) => {
  const numbering = locale === "ur" ? "arabext" : "latn"
  const format = new Intl.RelativeTimeFormat(`${locale}-u-nu-${numbering}`, {
    numeric: "auto",
  })
  if (minutesAgo < 60) return format.format(-minutesAgo, "minute")
  if (minutesAgo < 60 * 24)
    return format.format(-Math.round(minutesAgo / 60), "hour")
  return format.format(-Math.round(minutesAgo / (60 * 24)), "day")
}

/** Full address with characters that differ from Sam's highlighted */
const AddressDiff = ({ address }: { address: string }) => (
  <span dir="ltr" className="font-mono text-xs break-all sm:text-sm">
    {address.split("").map((char, i) => {
      const same = char === SAM_ADDRESS[i]
      return (
        <span
          key={i}
          className={cn(
            same
              ? "text-body-medium"
              : "rounded-xs bg-leak-low-contrast font-bold text-leak-high-contrast"
          )}
        >
          {char}
        </span>
      )
    })}
  </span>
)

const AddressPoisoningQuiz = ({
  variant = "standalone",
  initialAnswer,
  onAnswer,
  className,
}: AddressPoisoningQuizProps) => {
  const t = useTranslations(NS)
  const locale = useLocale()
  const groupName = useId()
  const [selected, setSelected] = useState<string | null>(initialAnswer ?? null)
  const [answer, setAnswer] = useState<string | null>(initialAnswer ?? null)

  const amountFormat = useMemo(
    () => numberFormat(locale, { maximumFractionDigits: 4 }),
    [locale]
  )
  const sourceDate = (iso: string) =>
    dateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(
      new Date(`${iso}T00:00:00Z`)
    )

  const picked = POISON_ROWS.find((row) => row.id === answer)
  const answered = Boolean(picked)

  const submit = () => {
    const row = POISON_ROWS.find((r) => r.id === selected)
    if (!row) return
    setAnswer(row.id)
    onAnswer?.(!row.fake)
    trackPrivacyLessonEvent("widget-used", "address-poisoning")
  }

  const reset = () => {
    setAnswer(null)
    setSelected(null)
  }

  const kindLabel = (row: PoisonRow) =>
    t(row.kind === "sent" ? `${NS}-kind-sent` : `${NS}-kind-received`)

  return (
    <div className={cn("space-y-6", className)}>
      {variant === "standalone" && (
        <h3 className="text-h4">{t(`${NS}-title`)}</h3>
      )}
      <p>{t(`${NS}-intro-1`)}</p>
      <p>{t(`${NS}-intro-2`)}</p>

      <div className="space-y-4 rounded-base border bg-background p-4 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="font-bold">{t(`${NS}-demo-title`)}</p>
          <p className="text-sm text-body-medium">{t(`${NS}-demo-meta`)}</p>
        </div>
        <p>{t(`${NS}-task`)}</p>

        <fieldset disabled={answered} className="m-0 min-w-0 border-0 p-0">
          <legend className="sr-only">{t(`${NS}-demo-meta`)}</legend>
          <ul className="m-0 list-none space-y-2 p-0">
            {POISON_ROWS.map((row) => {
              const isPicked = picked?.id === row.id
              return (
                <li key={row.id}>
                  <label
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 rounded-base border p-3 sm:flex-row sm:items-center sm:gap-4",
                      "has-[:checked]:border-primary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary-hover",
                      answered && "cursor-default",
                      answered && row.fake && "border-leak",
                      isPicked && "bg-background-highlight"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={groupName}
                        value={row.id}
                        checked={selected === row.id}
                        onChange={() => setSelected(row.id)}
                        className="size-4 shrink-0 accent-primary"
                      />
                      <Tag
                        size="small"
                        variant="outline"
                        status={row.kind === "sent" ? "normal" : "primary"}
                      >
                        {kindLabel(row)}
                      </Tag>
                      <span dir="ltr" className="font-mono">
                        {amountFormat.format(row.amount)} {row.unit}
                      </span>
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1 sm:items-end">
                      {answered ? (
                        <AddressDiff address={row.address} />
                      ) : (
                        <span dir="ltr" className="font-mono">
                          {shortAddress(row.address)}
                        </span>
                      )}
                      <span className="text-xs text-body-medium">
                        {relativeTime(locale, row.minutesAgo)}
                      </span>
                    </span>
                    {answered && (
                      <Tag
                        size="small"
                        variant="solid"
                        status={row.fake ? "error" : "success"}
                        className="self-start sm:self-center"
                      >
                        {t(
                          row.fake ? `${NS}-verdict-fake` : `${NS}-verdict-real`
                        )}
                      </Tag>
                    )}
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>

        {answered && (
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block size-3 rounded-xs bg-body-light"
              />
              {t(`${NS}-legend-same`)}
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block size-3 rounded-xs bg-leak-low-contrast ring-1 ring-leak"
              />
              {t(`${NS}-legend-diff`)}
            </span>
          </p>
        )}

        <div role="status" aria-live="polite" className="space-y-2">
          {!picked && (
            <p className="text-sm text-body-medium">{t(`${NS}-idle`)}</p>
          )}
          {picked?.fake && (
            <div className="space-y-2 rounded-base border border-leak bg-leak-low-contrast p-4 text-leak-high-contrast">
              <p className="font-bold">
                {t(`${NS}-wrong-copied`, {
                  address: shortAddress(picked.address),
                })}
              </p>
              <p>
                {t(
                  picked.fake === "zero-value"
                    ? `${NS}-wrong-reason-zero-value`
                    : `${NS}-wrong-reason-dust`
                )}
              </p>
              <p>{t(`${NS}-wrong-consequence`)}</p>
              <p>{t(`${NS}-wrong-timing`)}</p>
            </div>
          )}
          {picked && !picked.fake && (
            <div className="space-y-2 rounded-base border border-success-border bg-success-light p-4 text-success-dark">
              <p className="font-bold">{t(`${NS}-right`)}</p>
              <p>{t(`${NS}-right-explain`)}</p>
              <p>{t(`${NS}-right-once`)}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {answered ? (
            <Button variant="outline" size="sm" onClick={reset}>
              {t(`${NS}-try-again`)}
            </Button>
          ) : (
            <Button size="sm" disabled={!selected} onClick={submit}>
              {t(`${NS}-copy-button`)}
            </Button>
          )}
        </div>
        <p className="text-sm text-body-medium">{t(`${NS}-caption`)}</p>
      </div>

      <div className="space-y-2">
        <h4 className="text-h5">{t(`${NS}-avoid-title`)}</h4>
        <ul className="space-y-1">
          <li>{t(`${NS}-avoid-item-1`)}</li>
          <li>{t.rich(`${NS}-avoid-item-2`, richTags({ glossary: "ens" }))}</li>
          <li>{t(`${NS}-avoid-item-3`)}</li>
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <figure className="m-0 space-y-2 rounded-base border-s-4 border-leak bg-background-highlight p-4">
          <p className="text-xs font-bold tracking-wide text-body-medium uppercase">
            {t(`${NS}-record-label`)}
          </p>
          <p>{t(`${NS}-record-wbtc`)}</p>
          <figcaption className="text-sm text-body-medium">
            {t(`${NS}-sources-label`)}{" "}
            <Link href={SOURCE_LINKS.coindesk}>
              {t(`${NS}-source-coindesk`, {
                date: sourceDate(SOURCE_DATES.coindesk),
              })}
            </Link>
            {" · "}
            <Link href={SOURCE_LINKS.cointelegraph}>
              {t(`${NS}-source-cointelegraph`, {
                date: sourceDate(SOURCE_DATES.cointelegraph),
              })}
            </Link>
          </figcaption>
        </figure>
        <figure className="m-0 space-y-2 rounded-base border-s-4 border-leak bg-background-highlight p-4">
          <p className="text-xs font-bold tracking-wide text-body-medium uppercase">
            {t(`${NS}-record-label`)}
          </p>
          <p>{t(`${NS}-record-study`)}</p>
          <figcaption className="text-sm text-body-medium">
            {t(`${NS}-source-label`)}{" "}
            <Link href={SOURCE_LINKS.study}>{t(`${NS}-source-study`)}</Link>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default AddressPoisoningQuiz
