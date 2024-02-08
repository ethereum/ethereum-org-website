import { NextRequest, NextResponse } from "next/server"

const PUBLIC_FILE = /\.(.*)$/

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === "default") {
    console.log(`/en${req.nextUrl.pathname}`)
    return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url))
  }
}
