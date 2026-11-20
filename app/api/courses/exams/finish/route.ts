import { withUser } from "@/lib/courses/server/api"
import { finishExam } from "@/lib/courses/server/exams"

export const POST = withUser(finishExam)
