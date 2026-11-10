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

import { COURSES, EXAM_ID, getCourse } from "@/data/courses"

export const revalidate = false

type ExamPageParams = PageParams & { course: string }

const examCourse = (courseId: string) => {
  const course = getCourse(courseId)
  return course?.exam.length ? course : undefined
}

const Page = async (props: { params: Promise<ExamPageParams> }) => {
  const { locale, course: courseId } = await props.params
  setRequestLocale(locale)

  const course = examCourse(courseId)
  if (!course) notFound()

  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage(`/courses/${courseId}/${EXAM_ID}`)
  )
  const nextCourseId = COURSES[COURSES.indexOf(course) + 1]?.id

  return (
    <I18nProvider locale={locale} messages={messages}>
      <main>
        <LessonPlayer
          key={courseId}
          exam
          courseId={courseId}
          lesson={{ id: EXAM_ID, icon: "badge", steps: course.exam }}
          nextCourseId={nextCourseId}
        />
      </main>
    </I18nProvider>
  )
}

export function generateStaticParams() {
  return COURSES.filter(({ exam }) => exam.length).map(({ id }) => ({
    course: id,
  }))
}

export async function generateMetadata(props: {
  params: Promise<ExamPageParams>
}) {
  const { locale, course: courseId } = await props.params
  setRequestLocale(locale)

  if (!examCourse(courseId)) return {}

  const t = await getTranslations("page-courses")

  return await getMetadata({
    locale,
    slug: ["courses", courseId, EXAM_ID],
    title: `${t(`${courseId}-title`)}: ${t("page-courses-exam-title")} | ethereum.org`,
    description: t(`${courseId}-description`),
    image: "/images/courses/learning-path-garden-with-trophy.png",
    noIndex: true,
  })
}

export default Page
