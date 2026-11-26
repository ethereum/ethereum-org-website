import { withUser } from "@/lib/courses/server/api"
import { startExam } from "@/lib/courses/server/exams"

export const POST = withUser(startExam)
