import { useEffect } from "react"
import { useLocale } from "next-intl"

import { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

/**
 * Custom hook that sets the DOM direction based on the locale,
 * responding to changes in the locale without requiring refresh.
 */
export const useLocaleDirection = () => {
  const locale = useLocale()

  useEffect(() => {
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"
    document.documentElement.setAttribute("dir", dir)
  }, [locale])
}
