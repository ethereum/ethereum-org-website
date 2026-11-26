import type { Course, Track } from "@/data/courses"

/**
 * A course as client components get it, through props: ids and looks only,
 * so pages ship no lesson content or exam questions in their bundles.
 */
export interface CatalogCourse
  extends Pick<Course, "id" | "level" | "theme" | "art"> {
  /** `steps` only where asked for (the profile looks up missed questions) */
  lessons: { id: string; steps?: { id: string }[] }[]
  exam: { id: string }[]
}

export interface CatalogTrack {
  id: string
  courses: CatalogCourse[]
}

export const toCatalog = (
  tracks: Track[],
  { steps = false }: { steps?: boolean } = {}
): CatalogTrack[] =>
  tracks.map(({ id, courses }) => ({
    id,
    courses: courses.map(({ id, level, theme, art, lessons, exam }) => ({
      id,
      level,
      theme,
      art,
      lessons: lessons.map((lesson) =>
        steps
          ? { id: lesson.id, steps: lesson.steps.map(({ id }) => ({ id })) }
          : { id: lesson.id }
      ),
      exam: exam.map(({ id }) => ({ id })),
    })),
  }))
