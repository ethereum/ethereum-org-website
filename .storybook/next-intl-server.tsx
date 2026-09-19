// Storybook stand-in for `next-intl/server`, wired up by the webpack alias in
// `main.ts`.
//
// Storybook renders async server components in the browser (`experimentalRSC`),
// but the real `next-intl/server` helpers read from a request scope that only
// exists on the server, so they throw "not supported in Client Components" and
// the story shows an error boundary instead. Any async component reaching for
// `getTranslations`/`getLocale` is therefore invisible in Storybook -- which is
// how the Footer story sat broken behind `disableSnapshot`.
//
// The shim resolves against the exact same `messagesByLocale` the client
// provider uses, and against the locale currently selected in the toolbar, so a
// server component and a client component render the same strings in the same
// language. It is a transport swap, not a fake.

import { createFormatter, createTranslator } from "next-intl"

import nextIntl from "./next-intl"

/**
 * Async server helpers can't read React context, so the toolbar locale is
 * republished here by a decorator in `preview.tsx` before each render.
 */
let currentLocale: string = nextIntl.defaultLocale

export const setStorybookLocale = (locale: string) => {
  currentLocale = locale
}

type TranslationsArg = string | { locale?: string; namespace?: string }

const resolve = (arg?: TranslationsArg) => {
  if (typeof arg === "string") return { locale: currentLocale, namespace: arg }
  return {
    locale: arg?.locale ?? currentLocale,
    namespace: arg?.namespace,
  }
}

const messagesFor = (locale: string) =>
  nextIntl.messagesByLocale[locale] ??
  nextIntl.messagesByLocale[nextIntl.defaultLocale] ??
  {}

export async function getLocale() {
  return currentLocale
}

export async function getMessages(arg?: { locale?: string }) {
  return messagesFor(arg?.locale ?? currentLocale)
}

export async function getTranslations(arg?: TranslationsArg) {
  const { locale, namespace } = resolve(arg)
  return createTranslator({
    locale,
    namespace,
    messages: messagesFor(locale),
    getMessageFallback: nextIntl.getMessageFallback,
  })
}

export async function getFormatter(arg?: { locale?: string }) {
  return createFormatter({ locale: arg?.locale ?? currentLocale })
}

export async function getNow() {
  return new Date()
}

export async function getTimeZone() {
  return "UTC"
}
