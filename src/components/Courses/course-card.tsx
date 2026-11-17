import { useLocale, useTranslations } from "next-intl"

import {
  Card,
  CardBanner,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import {
  type Course,
  courseHref,
  type CourseLevel,
  type UpcomingCourse,
} from "@/data/courses"

import CourseArt from "./art/course-art"
import {
  CourseCardAction,
  CourseCardDone,
  CourseCardNext,
} from "./course-card-status"
import CourseProgress from "./course-progress"
import { chunkyButton, courseThemeStyle } from "./theme"

/** Card grid for the hub and the profile; role keeps list semantics in Safari */
export const courseGrid =
  "ms-0 grid list-none gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

const cardPill =
  "grid h-8 place-items-center rounded-full bg-background text-sm font-bold text-(--course-strong) dark:text-(--course-bright)"

const banner = "relative bg-(--course-soft) px-8 pt-12 pb-3"

/** Place in the track (visual only, as lists are ordered), then level */
const CardPills = ({
  position,
  level,
}: {
  position: number
  level: CourseLevel
}) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  return (
    <div className="absolute start-3 top-3 flex items-center gap-1.5">
      <span aria-hidden className={cn(cardPill, "min-w-8 px-2 tabular-nums")}>
        {numberFormat(locale).format(position + 1)}
      </span>
      <span className={cn(cardPill, "px-3 tracking-wide uppercase")}>
        {t(`page-courses-level-${level}`)}
      </span>
    </div>
  )
}

/** A course as a hub card: art, progress and the next action */
export const CourseCard = ({
  course: { id, level, art, lessons, exam },
  position,
  track,
}: {
  course: Course
  /** Index in its track */
  position: number
  /** Its track's courses, to tag the next one */
  track: Course[]
}) => {
  const t = useTranslations("page-courses")
  const lessonIds = lessons.map((lesson) => lesson.id)
  return (
    <Card href={courseHref(id)} variant="nested" border className="h-full">
      <CardHeader>
        <CardBanner background="none" size="full" className={banner}>
          <CardPills position={position} level={level} />
          <CourseCardDone courseId={id} />
          <CourseCardNext
            courseId={id}
            track={track.map((course) => ({
              id: course.id,
              lessonIds: course.lessons.map((lesson) => lesson.id),
              hasExam: course.exam.length > 0,
            }))}
          />
          <CourseArt
            id={art}
            className="mx-auto max-w-40 transition-transform duration-300 motion-safe:group-hover/link:scale-105"
          />
        </CardBanner>
      </CardHeader>
      {/* Progress pinned to the bottom so bars line up across a row */}
      <CardContent className="flex flex-col">
        <CardTitle>{t(`${id}-title`)}</CardTitle>
        <CardParagraph>{t(`${id}-description`)}</CardParagraph>
        <div className="mt-auto">
          <CourseProgress
            courseId={id}
            lessonIds={lessonIds}
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
          <CourseCardAction courseId={id} lessonIds={lessonIds} />
        </span>
      </CardFooter>
    </Card>
  )
}

/** A teaser: not a course yet, so no link, progress or action */
export const UpcomingCourseCard = ({
  course: { id, level, art },
  position,
}: {
  course: UpcomingCourse
  position: number
}) => {
  const t = useTranslations("page-courses")
  return (
    <Card
      variant="nested"
      border
      className="h-full"
      style={courseThemeStyle("muted")}
    >
      <CardHeader>
        <CardBanner background="none" size="full" className={banner}>
          <CardPills position={position} level={level} />
          <span className="absolute end-3 bottom-3 rounded-full border-b-4 border-(--course-strong) bg-(--course) px-3 py-1 text-sm font-bold tracking-wide text-white uppercase">
            {t("page-courses-coming-soon")}
          </span>
          <CourseArt id={art} className="mx-auto max-w-40" />
        </CardBanner>
      </CardHeader>
      <CardContent>
        <CardTitle>{t(`${id}-title`)}</CardTitle>
        <CardParagraph>{t(`${id}-description`)}</CardParagraph>
      </CardContent>
    </Card>
  )
}
