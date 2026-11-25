import { getTranslations } from "next-intl/server"

import { COURSES } from "@/data/courses"

import { LOCALES_CODES } from "@/lib/constants"

import { coursePromptKeys } from "@/lib/courses/messages"

// Built once per language and course: the profile fetches the prompts of the
// questions a learner missed instead of every course's with the page
export const dynamic = "force-static"
export const dynamicParams = false

export const generateStaticParams = () =>
  LOCALES_CODES.flatMap((locale) =>
    COURSES.map(({ id }) => ({ locale, courseId: id }))
  )

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ locale: string; courseId: string }> }
) => {
  const { locale, courseId } = await params
  const t = await getTranslations({ locale, namespace: "page-courses" })
  return Response.json(
    Object.fromEntries(
      coursePromptKeys(courseId)
        .filter((key) => t.has(key))
        .map((key) => [key, t(key)])
    )
  )
}
