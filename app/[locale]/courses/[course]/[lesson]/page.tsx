import { pick } from "lodash"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import LessonPlayer from "@/components/Courses/lesson-player"
import I18nProvider from "@/components/I18nProvider"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { COURSES, getLesson } from "@/data/courses"

export const revalidate = false

type LessonPageParams = PageParams & { course: string; lesson: string }

const Page = async (props: { params: Promise<LessonPageParams> }) => {
  const { locale, course: courseId, lesson: lessonId } = await props.params
  setRequestLocale(locale)

  const found = getLesson(courseId, lessonId)
  if (!found) notFound()

  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage(`/courses/${courseId}/${lessonId}`)
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <main>
        {/* Keyed so moving to the next lesson starts from a fresh state */}
        <LessonPlayer
          key={`${courseId}/${lessonId}`}
          courseId={courseId}
          lesson={found.lesson}
          nextLessonId={found.next?.id}
        />
      </main>
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
    title: `${t(`${courseId}-${lessonId}-title`)} | ethereum.org`,
    description: t(`${courseId}-${lessonId}-summary`),
    image: "/images/courses/learning-path-garden-with-trophy.png",
    noIndex: true,
  })
}

export default Page
