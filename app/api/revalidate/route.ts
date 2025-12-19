import { NextRequest, NextResponse } from "next/server"

import i18nConfig from "../../../i18n.config.json"

const isBuildTime =
  process.env.NETLIFY &&
  process.env.CONTEXT === "production" &&
  !process.env.DEPLOY_URL

export async function GET(req: NextRequest) {
  // ⛔ Byggtid: absolut ingen revalidering
  if (isBuildTime) {
    return NextResponse.json(
      { message: "Revalidation unavailable during build" },
      { status: 503 }
    )
  }

  const searchParams = req.nextUrl.searchParams
  const secret = searchParams.get("secret")

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const BUILD_LOCALES = process.env.NEXT_PUBLIC_BUILD_LOCALES
  const locales = BUILD_LOCALES
    ? BUILD_LOCALES.split(",")
    : i18nConfig.map(({ code }) => code)

  const path = searchParams.get("path")
  if (!path) {
    return NextResponse.json({ message: "No path provided" }, { status: 400 })
  }

  // ⚠️ Dynamisk import – laddas ALDRIG under build
  const { revalidatePath } = await import("next/cache")

  try {
    const hasLocaleInPath = locales.some((locale) =>
      path.startsWith(`/${locale}/`)
    )

    if (hasLocaleInPath) {
      revalidatePath(path)
    } else {
      revalidatePath(`/en${path}`)

      for (const locale of locales) {
        const localePath = `/${locale}${path}`
        revalidatePath(localePath)
      }
    }

    return NextResponse.json({ revalidated: true })
  } catch (err) {
    console.error("Revalidation error:", err)
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
