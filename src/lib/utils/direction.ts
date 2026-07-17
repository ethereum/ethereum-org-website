import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

type DirectionData = {
  twFlipForRtl: "rtl:-scale-x-100" // className
  isRtl: boolean
  direction: "ltr" | "rtl"
}

/**
 * Determines the direction and transformation for right-to-left (RTL) languages.
 * @param locale The language locale
 * @returns An object containing the Tailwind className, RTL flag, and direction.
 * @example const { twFlipForRtl } = getDirection('ar');
 */
export const getDirection = (locale: Lang): DirectionData => {
  const isRtl = isLangRightToLeft(locale)
  return {
    twFlipForRtl: "rtl:-scale-x-100", // className (preferred)
    isRtl,
    direction: isRtl ? "rtl" : "ltr",
  }
}
