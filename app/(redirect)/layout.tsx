import { ReactNode } from "react"
import type { Metadata } from "next"
import * as Sentry from "@sentry/nextjs"

type Props = {
  children: ReactNode
}

// A root layout for the locale-less `/` entry point
export default function RedirectLayout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

// Sentry trace data
export function generateMetadata(): Metadata {
  return {
    other: {
      ...Sentry.getTraceData(),
    },
  }
}
