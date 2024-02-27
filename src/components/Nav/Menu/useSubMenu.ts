import type { MotionProps } from "framer-motion"
import { useRouter } from "next/router"

import { useNavMenuColors } from "@/hooks/useNavMenuColors"
import { useRtlFlip } from "@/hooks/useRtlFlip"

const PADDING = 4 // Chakra-UI space token

export const useSubMenu = () => {
  const { asPath, locale } = useRouter()
  const menuColors = useNavMenuColors()
  const { isRtl } = useRtlFlip()

  const menuVariants: MotionProps["variants"] = {
    closed: { opacity: 0, scaleX: 0.9, originX: isRtl ? 1 : 0 },
    open: { opacity: 1, scaleX: 1, originX: isRtl ? 1 : 0 },
  }

  return {
    asPath,
    locale,
    menuColors,
    menuVariants,
    PADDING,
  }
}
