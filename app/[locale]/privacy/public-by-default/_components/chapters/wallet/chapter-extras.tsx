import { getTranslations } from "next-intl/server"
import type { ReactNode } from "react"

import type { Lang, PrivacyLessonChapterId } from "@/lib/types"

import { ArrowNext } from "@/components/ui/arrow"
import Link from "@/components/ui/Link"

import { numberFormat } from "@/lib/utils/numbers"

import { chapters } from "@/data/privacy-lesson/chapters"

const P = "page-privacy-public-by-default"

/** "How to fix this (Part II)" box at the end of a Part I chapter */
export const FixNote = ({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) => (
  <aside className="rounded-base border border-primary/30 bg-primary-low-contrast/40 p-6">
    <p className="mb-2 text-sm font-bold tracking-wide text-primary-high-contrast uppercase">
      {label}
    </p>
    <p className="m-0">{children}</p>
  </aside>
)

/** Link to the next chapter, with its kicker and one-line blurb */
export const NextChapterLink = async ({
  locale,
  current,
}: {
  locale: Lang
  current: PrivacyLessonChapterId
}) => {
  const index = chapters.findIndex(({ id }) => id === current)
  const next = chapters[index + 1]
  if (!next) return null

  const t = await getTranslations(P)
  const number = numberFormat(locale, { minimumIntegerDigits: 2 }).format(
    next.number
  )

  return (
    <Link
      href={`#${next.id}`}
      className="group flex items-center justify-between gap-4 rounded-base border p-6 text-body no-underline hover:border-primary-hover"
    >
      <span className="space-y-1">
        <span className="block text-sm font-bold tracking-wide text-primary uppercase">
          {t(`${P}-nav-next`, {
            kicker: t(`${P}-${next.id}-kicker`, { number }),
          })}
        </span>
        <span className="block text-body-medium">
          {t(`${P}-${next.id}-nav-blurb`)}
        </span>
      </span>
      <ArrowNext className="size-6 shrink-0 text-primary" />
    </Link>
  )
}
