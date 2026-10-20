import type { PrivacyLessonChapter } from "@/lib/types"

/** Lesson chapters in reading order. Each `id` is also the section anchor. */
export const chapters: PrivacyLessonChapter[] = [
  { id: "send", number: 0, part: "start" },
  { id: "wallet", number: 1, part: "part-1" },
  { id: "rpc", number: 2, part: "part-1" },
  { id: "network", number: 3, part: "part-1" },
  { id: "chain", number: 4, part: "part-1" },
  { id: "analysts", number: 5, part: "part-1" },
  { id: "world", number: 6, part: "part-1" },
  { id: "fixes", number: 7, part: "part-2" },
  { id: "today", number: 8, part: "part-2" },
  { id: "default", number: 9, part: "part-2" },
]
