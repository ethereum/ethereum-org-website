"use client"

import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl"

import ThemeProvider from "@/components/ThemeProvider"
import { TooltipProvider } from "@/components/ui/tooltip"

import { FeedbackWidgetProvider } from "@/contexts/FeedbackWidgetContext"

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
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      onError={() => {}}
      getMessageFallback={({ key }) => {
        const keyOnly = key.split(".").pop()
        return keyOnly || key
      }}
    >
      <ThemeProvider>
        <FeedbackWidgetProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </FeedbackWidgetProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}
