import { NextRequest, NextResponse } from "next/server"

import { DEFAULT_LOCALE, FAKE_LOCALE } from "./lib/constants"

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === FAKE_LOCALE) {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${req.nextUrl.pathname}`, req.url)
    )
  }
}
