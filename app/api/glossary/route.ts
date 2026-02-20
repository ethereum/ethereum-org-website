import { type NextRequest, NextResponse } from "next/server"

import { getTranslationGlossary } from "@/lib/data"

/**
 * GET /api/glossary
 *
 * Returns community-approved translation glossary entries.
 * Optional query param: ?lang=vi (filter by language code)
 */
export async function GET(request: NextRequest) {
  try {
    const entries = await getTranslationGlossary()

    if (!entries) {
      return NextResponse.json(
        { error: "Glossary data not available" },
        { status: 503 }
      )
    }

    const lang = request.nextUrl.searchParams.get("lang")

    const filtered = lang
      ? entries.filter((e) => e.language_code === lang)
      : entries

    return NextResponse.json(filtered, {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=172800",
      },
    })
  } catch (error) {
    console.error("[Glossary API] Failed to fetch glossary:", error)
    return NextResponse.json(
      { error: "Failed to fetch glossary" },
      { status: 500 }
    )
  }
}
