import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import CourseArt from "@/components/Courses/art/course-art"
import { sceneryFor } from "@/components/Courses/art/scenery"
import CourseProgress from "@/components/Courses/course-progress"
import LessonPath from "@/components/Courses/lesson-path"
import ProfileLink from "@/components/Courses/profile-link"
import { ProgressChips } from "@/components/Courses/progress-stats"
import { courseThemeStyle } from "@/components/Courses/theme"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { ArrowPrev } from "@/components/ui/arrow"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import {
  COURSES,
  COURSES_HUB,
  COURSES_INDEXABLE,
  COURSES_OG_IMAGE,
  getCourse,
} from "@/data/courses"

import CoursePageJsonLD from "./page-jsonld"

export const revalidate = false

type CoursePageParams = PageParams & { course: string }

const Page = async (props: { params: Promise<CoursePageParams> }) => {
  const { locale, course: courseId } = await props.params
  setRequestLocale(locale)

  const course = getCourse(courseId)
  if (!course) notFound()

  const t = await getTranslations("page-courses")

  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage(`/courses/${courseId}`)
  )

  const lessonIds = course.lessons.map(({ id }) => id)
  const courseIndex = COURSES.indexOf(course)
  const nextCourseId = COURSES[courseIndex + 1]?.id

  return (
    <I18nProvider locale={locale} messages={messages}>
      <CoursePageJsonLD locale={locale} course={course} />
      <MainArticle style={courseThemeStyle(course.theme)}>
        {/* Sticks 16px below the site nav (h-19) all the way down, like the
            hub's; from lg, zero height so it shares the breadcrumbs' row */}
        <div className="pointer-events-none sticky top-23 z-docked mt-6 flex justify-end px-page lg:h-0">
          <div className="pointer-events-auto flex h-fit items-center gap-2">
            <ProgressChips />
            <ProfileLink />
          </div>
        </div>
        <div className="flex items-center px-page pt-4 lg:min-h-10 lg:pt-0">
          <Breadcrumbs
            slug={`/courses/${courseId}`}
            label={t(`${courseId}-title`)}
          />
        </div>

        <section className="px-page pt-6">
          <div className="relative mx-auto grid max-w-4xl items-center gap-6 overflow-hidden rounded-3xl border-b-8 border-(--course-strong) bg-(--course) p-6 text-white md:grid-cols-[1fr_200px] md:p-10">
            <div className="flex flex-col gap-4">
              <span className="w-fit rounded-full bg-black/20 px-3 py-1 text-sm font-bold tracking-wide uppercase">
                {t(`page-courses-level-${course.level}`)}
              </span>
              <h1 className="m-0 text-white">{t(`${courseId}-title`)}</h1>
              <p className="m-0 text-lg text-white">
                {t(`${courseId}-description`)}
              </p>
              <CourseProgress
                courseId={courseId}
                lessonIds={lessonIds}
                hasExam={course.exam.length > 0}
                onColor
              />
            </div>
            <div className="max-md:hidden">
              <CourseArt id={course.art} tone="light" />
            </div>
          </div>
        </section>

        <section id="lessons" className="overflow-x-clip px-page py-16">
          <h2 className="sr-only">{t("page-courses-path-title")}</h2>
          <LessonPath
            courseId={courseId}
            theme={course.theme}
            scenery={sceneryFor(courseIndex * 2, course.lessons.length)}
            nextCourseId={nextCourseId}
            examQuestions={course.exam.length}
            lessons={course.lessons.map(({ id, icon, steps }) => ({
              id,
              icon,
              steps: steps.length,
            }))}
          />
        </section>

        <div className="flex justify-center px-page pb-16">
          <ButtonLink href={COURSES_HUB} variant="outline" size="lg">
            <ArrowPrev aria-hidden />
            {t("page-courses-back-to-courses")}
          </ButtonLink>
        </div>
      </MainArticle>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return COURSES.map(({ id }) => ({ course: id }))
}

export async function generateMetadata(props: {
  params: Promise<CoursePageParams>
}) {
  const { locale, course: courseId } = await props.params
  setRequestLocale(locale)

  if (!getCourse(courseId)) return {}

  const t = await getTranslations("page-courses")

  return await getMetadata({
    locale,
    slug: ["courses", courseId],
    title: t("page-courses-meta-course-title", {
      course: t(`${courseId}-title`),
    }),
    description: t(`${courseId}-description`),
    image: COURSES_OG_IMAGE,
    noIndex: !COURSES_INDEXABLE,
  })
}

export default Page
