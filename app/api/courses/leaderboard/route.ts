import { getLeaderboard } from "@/lib/courses/server/leaderboard"

export const dynamic = "force-dynamic"

export const GET = () => getLeaderboard()
