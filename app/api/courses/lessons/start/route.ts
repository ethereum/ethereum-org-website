import { withUser } from "@/lib/courses/server/api"
import { startLesson } from "@/lib/courses/server/lessons"

export const POST = withUser(startLesson)
