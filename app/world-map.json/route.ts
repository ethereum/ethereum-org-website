import { WORLD_MAP } from "@/lib/world-map"

export const dynamic = "force-static"

export const GET = () => Response.json(WORLD_MAP)
