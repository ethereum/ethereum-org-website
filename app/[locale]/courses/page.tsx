import { Suspense } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import CourseArt from "@/components/Courses/art/course-art"
import {
  CourseCardAction,
  CourseCardNext,
  CourseCardTrophy,
} from "@/components/Courses/course-card-status"
import CourseProgress from "@/components/Courses/course-progress"
import InstallAppNotice from "@/components/Courses/install-app-notice"
import NoProfileAlert from "@/components/Courses/no-profile-alert"
import ProfileLink from "@/components/Courses/profile-link"
import {
  ProgressChips,
  ProgressNote,
} from "@/components/Courses/progress-stats"
import { chunkyButton, courseThemeStyle } from "@/components/Courses/theme"
import HubHero from "@/components/Hero/HubHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"
import { numberFormat } from "@/lib/utils/numbers"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import {
  type Course,
  courseHref,
  COURSES_INDEXABLE,
  COURSES_OG_IMAGE,
  TRACKS,
} from "@/data/courses"

import CoursesPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/courses/learning-path-garden-with-trophy.jpg"

/** What the client needs to work out a track's mastered and next courses */
const toTrackCourses = (courses: Course[]) =>
  courses.map(({ id, lessons, exam }) => ({
    id,
    lessonIds: lessons.map((lesson) => lesson.id),
    hasExam: exam.length > 0,
  }))

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)
  const int = numberFormat(locale)

  const t = await getTranslations("page-courses")

  const allMessages = await getMessages({ locale })
  const messages = pick(allMessages, getRequiredNamespacesForPage("/courses"))

  return (
    <>
      <CoursesPageJsonLD locale={locale} />

      {/* Top-of-page banner, above the hero */}
      <I18nProvider locale={locale} messages={messages}>
        <InstallAppNotice />
      </I18nProvider>

      <HubHero
        heroImg={heroImg}
        breadcrumbs={{ slug: "courses" }}
        header={t("page-courses-hero-title")}
        description={t("page-courses-hero-description")}
      />

      <I18nProvider locale={locale} messages={messages}>
        <main className="px-page pt-8 pb-page">
          <MainArticle className="flow">
            {/* Sticks 16px below the site nav (h-19); the chips are opaque, the strip isn't */}
            <div className="pointer-events-none sticky top-23 z-docked flex justify-end">
              <div className="pointer-events-auto flex items-center gap-2">
                <ProgressChips />
                <ProfileLink />
              </div>
            </div>

            <Suspense fallback={null}>
              <NoProfileAlert />
            </Suspense>

            {TRACKS.map((track, index) => (
              <Section
                key={track.id}
                id={track.id}
                className={cn(index === 0 && "mt-4")}
              >
                <h2>{t(`page-courses-track-${track.id}-title`)}</h2>
                <p>{t(`page-courses-track-${track.id}-description`)}</p>
                {/* Suggested order, not a lock; role keeps list semantics in Safari despite list-none */}
                <ol
                  role="list"
                  className="ms-0 grid list-none gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                  {track.courses.map(
                    ({ id, level, theme, art, lessons, exam }, position) => (
                      <li
                        key={id}
                        className="m-0"
                        style={courseThemeStyle(theme)}
                      >
                        <Card
                          href={courseHref(id)}
                          variant="nested"
                          border
                          className="h-full"
                        >
                          <CardHeader>
                            <CardBanner
                              background="none"
                              size="full"
                              className="relative bg-(--course-soft) px-10 pt-12 pb-4"
                            >
                              <span className="absolute start-3 top-3 rounded-full bg-background px-3 py-1 text-sm font-bold tracking-wide text-(--course-strong) uppercase dark:text-(--course-bright)">
                                {t(`page-courses-level-${level}`)}
                              </span>
                              {/* Place in the track, matching the track map; visual only, as the list is ordered */}
                              <span
                                aria-hidden
                                className="absolute end-3 bottom-3 grid size-8 place-items-center rounded-full bg-background text-sm font-bold text-(--course-strong) tabular-nums dark:text-(--course-bright)"
                              >
                                {int.format(position + 1)}
                              </span>
                              <CourseCardTrophy courseId={id} />
                              <CourseCardNext
                                courseId={id}
                                track={toTrackCourses(track.courses)}
                              />
                              <CourseArt
                                id={art}
                                className="mx-auto max-w-48 transition-transform duration-300 motion-safe:group-hover/link:scale-105"
                              />
                            </CardBanner>
                          </CardHeader>
                          {/* Progress pinned to the bottom so bars line up across a row */}
                          <CardContent className="flex flex-col">
                            <CardTitle>{t(`${id}-title`)}</CardTitle>
                            <CardParagraph>
                              {t(`${id}-description`)}
                            </CardParagraph>
                            <div className="mt-auto">
                              <CourseProgress
                                courseId={id}
                                lessonIds={lessons.map((lesson) => lesson.id)}
                                hasExam={exam.length > 0}
                              />
                            </div>
                          </CardContent>
                          <CardFooter buttons="full">
                            <span
                              className={cn(
                                chunkyButton,
                                "inline-flex items-center justify-center"
                              )}
                            >
                              <CourseCardAction
                                courseId={id}
                                lessonIds={lessons.map((lesson) => lesson.id)}
                              />
                            </span>
                          </CardFooter>
                        </Card>
                      </li>
                    )
                  )}
                </ol>
              </Section>
            ))}

            <ProgressNote />
          </MainArticle>
        </main>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-courses")

  return await getMetadata({
    locale,
    slug: ["courses"],
    title: t("page-courses-meta-title"),
    description: t("page-courses-meta-description"),
    image: COURSES_OG_IMAGE,
    noIndex: !COURSES_INDEXABLE,
  })
}

export default Page
