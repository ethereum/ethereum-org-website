import type { MotionProps } from "framer-motion"
import { useLocale } from "next-intl"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { usePathname } from "@/i18n/routing"

export const useSubMenu = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const { isRtl } = useRtlFlip()

  const menuVariants: MotionProps["variants"] = {
    closed: { opacity: 0, scaleX: 0.9, originX: isRtl ? 1 : 0 },
    open: { opacity: 1, scaleX: 1, originX: isRtl ? 1 : 0 },
  }

  return {
    asPath: pathname,
    locale,
    menuVariants,
  }
}
