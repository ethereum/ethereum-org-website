"use client"

import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { DEFAULT_LOCALE } from "@/lib/constants"

import Emoji from "./Emoji"

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
    <aside className="fixed end-0 bottom-0 z-popover rounded bg-background-highlight md:end-8 md:bottom-8">
      <div
        className={cn(
          "relative flex justify-between",
          "w-full md:max-w-[600px]",
          "rounded-xs p-4",
          "shadow-md"
        )}
      >
        <div className="m-4 mt-10 flex flex-col gap-4 sm:mt-4">
          <div className="flex flex-col-reverse items-start sm:flex-row sm:items-center">
            <h3 className="leading-none md:text-2xl">
              {t("translation-banner-no-bugs-title")}
              <Emoji text=":bug:" className="ms-2 text-3xl sm:mb-auto" />
            </h3>
          </div>
          <p>{t("translation-banner-no-bugs-content")}</p>
          <div className="flex flex-col items-start sm:flex-row sm:items-center">
            <Button onClick={handleDontShow}>
              {t("translation-banner-no-bugs-dont-show-again")}
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute end-0 top-0 m-2 hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          <X className="size-4" />
        </Button>
      </div>
    </aside>
  )
}

export default TranslationBanner
