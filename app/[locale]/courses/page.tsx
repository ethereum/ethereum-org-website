import { Suspense } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import {
  CourseCard,
  courseGrid,
  UpcomingCourseCard,
} from "@/components/Courses/course-card"
import { HubNextUp } from "@/components/Courses/hub-hero-actions"
import InstallAppNotice from "@/components/Courses/install-app-notice"
import NoProfileAlert from "@/components/Courses/no-profile-alert"
import ProfileLink from "@/components/Courses/profile-link"
import {
  ProgressChips,
  ProgressNote,
} from "@/components/Courses/progress-stats"
import StickyBar from "@/components/Courses/sticky-bar"
import { courseThemeStyle } from "@/components/Courses/theme"
import TrackNav from "@/components/Courses/track-nav"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { COURSES_INDEXABLE, COURSES_OG_IMAGE, TRACKS } from "@/data/courses"

import CoursesPageJsonLD from "./page-jsonld"

const Page = async (props: { params: Promise<PageParams> }) => {
  const { locale } = await props.params
  setRequestLocale(locale)

  const t = await getTranslations("page-courses")

  const allMessages = await getMessages({ locale })
  const messages = pick(allMessages, getRequiredNamespacesForPage("/courses"))

  return (
    <>
      <CoursesPageJsonLD locale={locale} />

      {/* One provider: the banner, hero buttons and main all render client strings */}
      <I18nProvider locale={locale} messages={messages}>
        {/* Top-of-page banner, above the hero */}
        <InstallAppNotice />

        <PageHero
          heroComponent={<HubNextUp />}
          breadcrumbs={{ slug: "courses" }}
          title={t("page-courses-hero-title")}
          description={t("page-courses-hero-description")}
        />

        <main className="px-page pt-8 pb-page">
          <MainArticle className="flow">
            {/* Full bleed so cards pass out of sight beneath it; below md
                one end-aligned row */}
            <StickyBar className="-mx-page justify-end gap-2 px-page md:justify-between md:gap-8">
              <TrackNav className="md:flex-1" />
              <div className="flex shrink-0 items-center gap-2">
                <ProgressChips className="max-sm:*:data-[slot=xp]:hidden" />
                <ProfileLink />
              </div>
            </StickyBar>

            <p className="max-w-3xl text-lg">{t("page-courses-hub-intro")}</p>

            <Suspense fallback={null}>
              <NoProfileAlert />
            </Suspense>

            {TRACKS.filter(
              ({ courses, upcoming = [] }) => courses.length + upcoming.length
            ).map((track) => (
              <Section key={track.id} id={track.id} scrollMargin="tabNav">
                <h2>{t(`page-courses-track-${track.id}-title`)}</h2>
                <p>{t(`page-courses-track-${track.id}-description`)}</p>
                {/* Suggested order, not a lock */}
                <ol role="list" className={courseGrid}>
                  {track.courses.map((course) => (
                    <li
                      key={course.id}
                      id={course.id}
                      className="m-0"
                      style={courseThemeStyle(course.theme)}
                    >
                      <CourseCard course={course} track={track.courses} />
                    </li>
                  ))}
                  {track.upcoming?.map((course) => (
                    <li key={course.id} className="m-0">
                      <UpcomingCourseCard course={course} />
                    </li>
                  ))}
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
