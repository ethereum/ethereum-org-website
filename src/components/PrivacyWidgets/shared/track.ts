import { trackCustomEvent } from "@/lib/utils/matomo"

/**
 * The only analytics the privacy lesson and its widgets send. Event names are
 * fixed strings: never pass answers, live browser values, wallet info or
 * anything the reader typed or chose. Call only from user actions (clicks),
 * per the trackCustomEvent contract.
 */
export type PrivacyLessonEvent =
  | "chapter-viewed"
  | "fix-toggled"
  | "private-mode-toggled"
  | "lesson-reset"
  | "widget-used"

export const trackPrivacyLessonEvent = (
  action: PrivacyLessonEvent,
  /** A fixed identifier such as a chapter or widget id, never user data */
  name: string = action
) =>
  trackCustomEvent({
    eventCategory: "privacy-lesson",
    eventAction: action,
    eventName: name,
  })
