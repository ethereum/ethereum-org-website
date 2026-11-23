import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { PreloadCourseArt } from "@/components/Courses/art/lazy-course-art"
import LessonPlayer from "@/components/Courses/lesson-player"
import ProgressOutdated from "@/components/Courses/progress-outdated"
import { PreloadWidgets } from "@/components/Courses/steps/interactive-step"
import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import {
  type CourseArtId,
  COURSES,
  COURSES_OG_IMAGE,
  getLesson,
} from "@/data/courses"

import { pickCourseMessages } from "@/lib/courses/messages"
import { getPageLink } from "@/lib/courses/page-links"

export const revalidate = false
// Unknown params 404: getPageLink reads public/content, which isn't traced
export const dynamicParams = false

type LessonPageParams = PageParams & { course: string; lesson: string }

const Page = async (props: { params: Promise<LessonPageParams> }) => {
  const { locale, course: courseId, lesson: lessonId } = await props.params
  setRequestLocale(locale)

  const found = getLesson(courseId, lessonId)
  if (!found) notFound()

  const allMessages = await getMessages({ locale })
  const messages = pickCourseMessages(
    pick(
      allMessages,
      getRequiredNamespacesForPage(`/courses/${courseId}/${lessonId}`)
    ),
    { page: "lesson", courseId, lessonId }
  )
  const { steps } = found.lesson
  const widgets = steps.flatMap((step) =>
    step.type === "interactive" ? [step.widget] : []
  )
  // Plus the completion screen's diamond
  const art: CourseArtId[] = [
    ...steps.flatMap((step) =>
      step.type === "concept" && step.art ? [step.art] : []
    ),
    "diamond",
  ]

  return (
    <I18nProvider locale={locale} messages={messages}>
      <main>
        {/* Keyed so moving to the next lesson starts from a fresh state */}
        <LessonPlayer
          key={`${courseId}/${lessonId}`}
          courseId={courseId}
          lesson={found.lesson}
          nextLessonId={found.next?.id}
          examAfter={found.course.exam.length > 0}
          learnMore={await getPageLink(locale, found.lesson.learnMore)}
        />
      </main>
      {/* Later steps' chunks, fetched while the first one is read */}
      <PreloadWidgets ids={widgets} />
      <PreloadCourseArt ids={art} />
      <ProgressOutdated />
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return COURSES.flatMap(({ id, lessons }) =>
    lessons.map((lesson) => ({ course: id, lesson: lesson.id }))
  )
}

export async function generateMetadata(props: {
  params: Promise<LessonPageParams>
}) {
  const { locale, course: courseId, lesson: lessonId } = await props.params
  setRequestLocale(locale)

  if (!getLesson(courseId, lessonId)) return {}

  const t = await getTranslations("page-courses")

  return await getMetadata({
    locale,
    slug: ["courses", courseId, lessonId],
    title: t("page-courses-meta-lesson-title", {
      lesson: t(`${courseId}-${lessonId}-title`),
      course: t(`${courseId}-title`),
    }),
    description: t("page-courses-meta-lesson-description", {
      summary: t(`${courseId}-${lessonId}-summary`),
      course: t(`${courseId}-title`),
    }),
    image: COURSES_OG_IMAGE,
    // Played, not read: kept from search and crawlers (see robots.txt)
    noIndex: true,
  })
}

export default Page
