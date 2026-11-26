import { trackCustomEvent } from "@/lib/utils/matomo"

/**
 * Funnel events, all user-initiated (a Check, Continue or link click), per
 * the `trackCustomEvent` rule. Course views and lesson starts are pageviews,
 * so they need no event. Names never carry anything about the learner.
 */
type CourseEventAction =
  /** First try at a graded step; value 1 right, 0 wrong (Matomo's average = first-try rate) */
  | "Step answer"
  /** Name `course/lesson`; value first-try accuracy, 0-100 */
  | "Lesson complete"
  /** Name `course`; value score, 0-100 */
  | "Course check complete"
  /** Left mid-lesson; name `course/lesson/step` where they quit */
  | "Lesson exit"
  /** Took a finished lesson or course check again from its results screen */
  | "Lesson restart"
  /** Opened an ethereum.org page from a lesson; name is the link */
  | "Learn more"

export const trackCourseEvent = (
  action: CourseEventAction,
  name: string,
  value?: number,
  // For a click that navigates this tab, so the event isn't lost
  { immediate = false }: { immediate?: boolean } = {}
) =>
  trackCustomEvent(
    {
      eventCategory: "Courses",
      eventAction: action,
      eventName: name,
      eventValue: value === undefined ? undefined : String(value),
    },
    { immediate }
  )

/** 0-1 ratio as a whole percentage */
export const toPercent = (ratio: number) => Math.round(ratio * 100)
