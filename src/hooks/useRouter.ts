import { useRouter as useNextRouter } from "next/router"

import { Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { useHydrated } from "./useHydrated"

export const useRouter = () => {
  const router = useNextRouter()

  const hydrated = useHydrated()

  const getLocale = (): Lang => {
    if (!hydrated || !router.locale) return DEFAULT_LOCALE
    return router.locale as Lang
  }

  return { ...router, locale: getLocale() }
}
