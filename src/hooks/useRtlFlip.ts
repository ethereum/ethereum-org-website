import { useRouter } from "next/router"
import { isLangRightToLeft } from "@/lib/utils/translations"
import type { Lang } from "@/lib/types"

/**
 * Checks locale text direction and conditionally applies a scaleX(-1) for RTL locales
 * Applied to elements that should be visually flipped for RTL languages, ie: directional arrows
 * Usage: const { flipForRtl } = useRtlFlip(); transform={flipForRtl}
 * @returns { flipForRtl: "scaleX(-1)" | undefined }
 */
export const useRtlFlip = (): { flipForRtl: string | undefined } => {
  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale as Lang)
  return { flipForRtl: isRtl ? "scaleX(-1)" : undefined }
}