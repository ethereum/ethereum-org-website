import { withUser } from "@/lib/courses/server/api"
import { getProgress } from "@/lib/courses/server/progress"

export const dynamic = "force-dynamic"

export const GET = withUser(getProgress)
