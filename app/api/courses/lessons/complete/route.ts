import { withUser } from "@/lib/courses/server/api"
import { completeLesson } from "@/lib/courses/server/lessons"

export const POST = withUser(completeLesson)
