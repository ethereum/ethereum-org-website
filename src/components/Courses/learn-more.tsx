"use client"

import { useTranslations } from "next-intl"

import { Card, CardContent, CardLinkFake } from "@/components/ui/card"
import Eyebrow from "@/components/ui/eyebrow"
import InlineLink, { ExternalLinkIcon } from "@/components/ui/Link"

import type { PageLink } from "@/data/courses"

/*
 * Links out of a course open in a new tab: the completion and review
 * screens live only in memory, so leaving the tab would lose them, and Back
 * would restart the lesson.
 */
const NEW_TAB = { target: "_blank", rel: "noopener" } as const

const NewTabHint = () => {
  const t = useTranslations("common")
  return (
    <>
      <ExternalLinkIcon />
      <span className="sr-only">&nbsp;{t("link-external-assistive-text")}</span>
    </>
  )
}

/** Whole-card link under a finished lesson's nav: secondary, never in the way */
export const LearnMoreCard = ({ link }: { link: PageLink }) => {
  const t = useTranslations("page-courses")
  return (
    <Card
      href={link.href}
      variant="nested"
      size="md"
      border
      className="w-full max-w-sm text-start"
      {...NEW_TAB}
    >
      <CardContent>
        <Eyebrow className="m-0">{t("page-courses-learn-more")}</Eyebrow>
        <CardLinkFake hideArrow>
          {link.title}
          <NewTabHint />
        </CardLinkFake>
      </CardContent>
    </Card>
  )
}

/** Inline source link under a course-check explanation */
export const LearnMoreLink = ({ link }: { link: PageLink }) => (
  <InlineLink href={link.href} {...NEW_TAB}>
    {link.title}
    <NewTabHint />
  </InlineLink>
)
