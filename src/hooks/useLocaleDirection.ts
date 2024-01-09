import { useEffect } from "react"
import { useRouter } from "next/router"

import { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

/**
 * Custom hook that sets the DOM direction based on the locale,
 * responding to changes in the locale without requiring refresh.
 */
export const useLocaleDirection = (): void => {
  const { locale } = useRouter()

  useEffect(() => {
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"
    document.documentElement.setAttribute("dir", dir)
  }, [locale])
}
