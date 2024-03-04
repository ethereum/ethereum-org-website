import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

/**
 * Custom hook that sets the DOM direction based on the locale,
 * responding to changes in the locale without requiring refresh.
 */
export const useLocaleDirection = (): string => {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")
  const { locale } = useRouter()

  useEffect(() => {
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"
    document.documentElement.setAttribute("dir", dir)
    setDirection(dir)
  }, [locale])

  return direction
}
