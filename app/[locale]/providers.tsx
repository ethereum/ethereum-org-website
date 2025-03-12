"use client"

import { type AbstractIntlMessages } from "next-intl"

import I18nProvider from "@/components/I18nProvider"
import ThemeProvider from "@/components/ThemeProvider"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: AbstractIntlMessages
}) {
  return (
    <I18nProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}
