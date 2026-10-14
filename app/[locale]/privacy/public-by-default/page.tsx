import { Fragment } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PrivacyLessonChapterId } from "@/lib/types"

import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Emphasis } from "@/components/IntlStringElements"
import MainArticle from "@/components/MainArticle"
import Eyebrow from "@/components/ui/eyebrow"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import { Tag } from "@/components/ui/tag"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { chapters } from "@/data/privacy-lesson/chapters"
import { persona } from "@/data/privacy-lesson/persona"

import ChapterNav from "./_components/chapter-nav"
import { chapterBodies } from "./_components/chapters"
import { DossierAside } from "./_components/dossier-rail"
import { LessonProvider } from "./_components/lesson-provider"
import PageJsonLD from "./page-jsonld"

const NS = "page-privacy-public-by-default"
const PATH = "/privacy/public-by-default/"
const LESSON_ID = "lesson-chapters"

// Chapter 0 opens straight from the hero, so it has no lede of its own
const CHAPTERS_WITHOUT_LEDE: PrivacyLessonChapterId[] = ["send"]

const Page = async (props: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations(NS)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("privacy/public-by-default", locale)

  // Client islands (rail, chapter nav) need the lesson strings; a nested
  // provider replaces the root one, so `common` comes along via the page map.
  const messages = pick(
    await getMessages({ locale }),
    getRequiredNamespacesForPage(PATH)
  )

  const formatChapterNumber = numberFormat(locale, { minimumIntegerDigits: 2 })
  const headingVars = {
    blockNumber: numberFormat(locale).format(persona.block),
  }

  return (
    <>
      <PageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{
          slug: "privacy/public-by-default",
          parentSlug: "values",
        }}
        eyebrow={
          <Eyebrow>{t("page-privacy-public-by-default-hero-kicker")}</Eyebrow>
        }
        title={t.rich("page-privacy-public-by-default-hero-title", {
          em: Emphasis,
        })}
        description={
          <>
            <p>{t("page-privacy-public-by-default-hero-lede")}</p>
            <ul className="m-0 flex list-none flex-wrap gap-2">
              {(["duration", "runs-locally", "privacy"] as const).map(
                (chip) => (
                  <li key={chip}>
                    <Tag status="normal" variant="outline" size="medium">
                      {t(`page-privacy-public-by-default-hero-chip-${chip}`)}
                    </Tag>
                  </li>
                )
              )}
            </ul>
            <p className="text-base text-body-medium">
              {t.rich("page-privacy-public-by-default-hero-privacy-line", {
                link: (chunks) => <Link href="/privacy-policy/">{chunks}</Link>,
              })}
            </p>
          </>
        }
      />

      <I18nProvider locale={locale} messages={messages}>
        <LessonProvider>
          <main className="px-page pb-page">
            <ChapterNav lessonId={LESSON_ID} />

            <div className="flex justify-between gap-x-space-3x pt-space-2x">
              <MainArticle className="flow max-w-3xl min-w-0 flex-1">
                <FileContributors
                  contributors={contributors}
                  lastEditLocaleTimestamp={lastEditLocaleTimestamp}
                  variant="compact"
                />

                <div id={LESSON_ID} className="flow">
                  {chapters.map(({ id, number, part }, index) => {
                    const startsPart = chapters[index - 1]?.part !== part
                    const ChapterBody = chapterBodies[id]
                    const vars = {
                      ...headingVars,
                      number: formatChapterNumber.format(number),
                    }

                    return (
                      <Fragment key={id}>
                        {startsPart && part !== "start" && (
                          <div className="flex items-center gap-4 pt-space-2x">
                            <p className="shrink-0 text-sm font-bold tracking-wide text-body-medium uppercase">
                              {t(
                                part === "part-1"
                                  ? "page-privacy-public-by-default-nav-part-1"
                                  : "page-privacy-public-by-default-nav-part-2"
                              )}
                            </p>
                            <hr className="m-0 flex-1" />
                          </div>
                        )}

                        <Section
                          id={id}
                          scrollMargin="tabNav"
                          aria-labelledby={`${id}-title`}
                          className="flow"
                        >
                          <hgroup className="space-y-2">
                            <p className="text-sm font-bold tracking-wide text-leak-high-contrast uppercase">
                              {t(
                                `page-privacy-public-by-default-${id}-kicker`,
                                vars
                              )}
                            </p>
                            <h2 id={`${id}-title`} className="mt-0">
                              {t(`page-privacy-public-by-default-${id}-title`)}
                            </h2>
                          </hgroup>
                          {!CHAPTERS_WITHOUT_LEDE.includes(id) && (
                            <p className="text-lg">
                              {t(
                                `page-privacy-public-by-default-${id}-lede`,
                                vars
                              )}
                            </p>
                          )}
                          <ChapterBody locale={locale} />
                        </Section>
                      </Fragment>
                    )
                  })}
                </div>
              </MainArticle>

              <DossierAside />
            </div>
          </main>
        </LessonProvider>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations(NS)

  return await getMetadata({
    locale,
    slug: ["privacy", "public-by-default"],
    title: t("page-privacy-public-by-default-meta-title"),
    description: t("page-privacy-public-by-default-meta-description"),
    // TODO: needs its own OG image. Until then this resolves to the same
    // default image /privacy/ uses (it passes no image either).
  })
}

export default Page
