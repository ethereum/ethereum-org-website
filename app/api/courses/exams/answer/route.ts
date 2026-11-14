import { withUser } from "@/lib/courses/server/api"
import { answerExam } from "@/lib/courses/server/exams"

export const POST = withUser(answerExam)
