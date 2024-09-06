import { useRouter } from "next/router"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

type UseDirection = {
  /** @deprecated */
  flipForRtl: "scaleX(-1)" | undefined // transform (deprecated)
  twFlipForRtl: "-scale-x-100" | "" // className
  isRtl: boolean
  direction: "ltr" | "rtl"
}

/**
 * Custom hook that determines the direction and transformation for right-to-left (RTL) languages.
 * @example const { flipForRtl } = useRtlFlip(); transform={flipForRtl}
 * @returns An object containing the Tailwind className, RTL flag, and direction.
 */
export const useRtlFlip = (): UseDirection => {
  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale as Lang)
  return {
    flipForRtl: isRtl ? "scaleX(-1)" : undefined, // transform (deprecated)
    twFlipForRtl: isRtl ? "-scale-x-100" : "", // className (preferred)
    isRtl,
    direction: isRtl ? "rtl" : "ltr",
  }
}
