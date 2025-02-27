"use client"

import Error from "next/error"

import { DEFAULT_LOCALE } from "@/lib/constants"

export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  )
}
