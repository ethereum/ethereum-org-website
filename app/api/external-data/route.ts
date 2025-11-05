import { NextRequest, NextResponse } from "next/server"

import { ExternalDataReturnData } from "@/lib/types"

import { ExternalDataMap } from "@/lib/utils/data/refactor/fetchExternalData"
import { getRedisData } from "@/lib/utils/data/refactor/redisClient"
import { getSupabaseData } from "@/lib/utils/data/refactor/supabaseClient"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const keysParam = searchParams.get("keys")
  const revalidateParam = searchParams.get("revalidate")

  if (!keysParam) {
    return NextResponse.json(
      { error: "No keys provided. Use ?keys=key1,key2,..." },
      { status: 400 }
    )
  }

  const keys = keysParam.split(",").filter(Boolean)

  if (keys.length === 0) {
    return NextResponse.json(
      { error: "No valid keys provided" },
      { status: 400 }
    )
  }

  // Parse revalidation time (default to 3600 seconds / 1 hour)
  const revalidateSeconds = revalidateParam
    ? parseInt(revalidateParam, 10) || 3600
    : 3600

  try {
    // Fetch data from Redis (with Supabase fallback) for each key
    const results = await Promise.all(
      keys.map(async (key) => {
        try {
          // Try Redis first
          let data = await getRedisData(key)

          // Fallback to Supabase if Redis returns null
          if (data === null) {
            data = await getSupabaseData(key)
          }

          return { key, data }
        } catch (error) {
          console.error(`Error fetching data for key "${key}":`, error)
          return { key, data: null }
        }
      })
    )

    // Build the data map
    const dataMap = results.reduce((acc, { key, data }) => {
      if (data !== null && data !== undefined) {
        acc[key] = data as
          | ExternalDataReturnData
          | Record<string, ExternalDataReturnData>
      }
      return acc
    }, {} as ExternalDataMap)

    // Return the data with cache headers
    // s-maxage: CDN/shared cache expiration (matches revalidation time)
    // stale-while-revalidate: Allow serving stale content for up to 30 hours while revalidating
    return NextResponse.json(dataMap, {
      headers: {
        "Cache-Control": `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=${30 * 60 * 60}`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch external data" },
      { status: 500 }
    )
  }
}
