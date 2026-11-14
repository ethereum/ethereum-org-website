import { withUser } from "@/lib/courses/server/api"
import { importProgress } from "@/lib/courses/server/progress"

export const POST = withUser(importProgress)
