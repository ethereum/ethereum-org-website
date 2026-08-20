import { ReactNode } from "react"
import type { Metadata } from "next"
import * as Sentry from "@sentry/nextjs"

type Props = {
  children: ReactNode
}

// A root layout for the locale-less `/` entry point. It has no layout above
// it, which is what keeps `app/[locale]/layout.tsx` a root layout too — that
// is the condition for `next/root-params` to expose the `[locale]` segment.
// The page below it only redirects, so this never paints any UI.
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
