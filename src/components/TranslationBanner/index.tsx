"use client"

import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { DEFAULT_LOCALE } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/navigation"
import { DO_NOT_TRANSLATE_PATHS } from "@/scripts/intl-pipeline/constants"

const TranslationBanner = () => {
  const locale = useLocale()
  const pathname = usePathname()

  const { t } = useTranslation()

  // Default to isOpen being false, and let the useEffect set this.
  const [isOpen, setIsOpen] = useState(false)

  const lsKey = useMemo(
    () => `dont-show-translation-banner-${pathname}`,
    [pathname]
  )

  useEffect(() => {
    if (localStorage.getItem(lsKey) === "true") {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [lsKey])

  const isDNTPath = DO_NOT_TRANSLATE_PATHS.reduce(
    (acc, curr) => acc || pathname.includes(curr),
    false
  )

  /**
   * If English page, not a Do Not Translate page, or closed: return early
   */
  if (!isOpen || locale === DEFAULT_LOCALE || !isDNTPath) return

  const handleDontShow = () => {
    localStorage.setItem(lsKey, "true")
    setIsOpen(false)
  }

  return (
    <aside
      className={cn(
        "fixed bottom-2 z-popover max-md:inset-x-2 md:inset-e-8 md:bottom-8 md:max-w-xl",
        "rounded-base bg-background-highlight p-8 shadow-md max-sm:pt-10"
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        className="absolute inset-e-0 top-0 m-2 hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        <X className="size-4" />
      </Button>

      <h3 className="mb-2">{t("translation-banner-no-bugs-title")}</h3>
      <p className="mb-6">{t("translation-banner-no-bugs-content")}</p>
      <Button onClick={handleDontShow} className="max-sm:w-full">
        {t("translation-banner-no-bugs-dont-show-again")}
      </Button>
    </aside>
  )
}

export default TranslationBanner
