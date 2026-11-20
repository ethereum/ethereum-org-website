"use client"

import { useEffect } from "react"
import NextError from "next/error"

import { captureException } from "@/lib/sentry/client"

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
