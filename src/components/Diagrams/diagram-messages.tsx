import { pickBy } from "lodash"
import { getLocale, getMessages } from "next-intl/server"
import type { ReactNode } from "react"

import I18nProvider from "@/components/I18nProvider"

const NAMESPACE = "component-diagrams"

/**
 * Server wrapper that hands a diagram's client code only its own strings
 * (keys starting with `prefix-`) plus the shared `diagram-*` ones. Pages
 * without a diagram ship none of them, and a page with two diagrams ships
 * only those two.
 */
export async function DiagramMessages({
  prefix,
  children,
}: {
  /** Key prefix of the diagram's strings, e.g. "gas-tx". */
  prefix: string
  children: ReactNode
}) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()])
  const strings = pickBy(
    (messages[NAMESPACE] ?? {}) as Record<string, string>,
    (_, key) => key.startsWith(`${prefix}-`) || key.startsWith("diagram-")
  )
  return (
    <I18nProvider locale={locale} messages={{ [NAMESPACE]: strings }}>
      {children}
    </I18nProvider>
  )
}
