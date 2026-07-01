"use client"

import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { useLocale } from "next-intl"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { DEFAULT_LOCALE } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"
import { usePathname } from "@/i18n/navigation"
import { DO_NOT_TRANSLATE_PATHS } from "@/scripts/intl-pipeline/constants"

type TranslationBannerProps = {
  contentNotTranslated?: boolean
}

const TranslationBanner = ({ contentNotTranslated }: TranslationBannerProps) => {
  const locale = useLocale()
  const pathname = usePathname()

  const { t } = useTranslation()

  // Default to isOpen being false, and let the useEffect set this.
  const [isOpen, setIsOpen] = useState(false)

  const isContentBanner = contentNotTranslated === true
  const shouldCheckDoNotTranslatePaths = contentNotTranslated === undefined

  const isDNTPath =
    shouldCheckDoNotTranslatePaths &&
    DO_NOT_TRANSLATE_PATHS.some((path) => pathname.includes(path))

  const bannerType = isContentBanner
    ? "content-not-translated"
    : isDNTPath
      ? "do-not-translate"
      : null

  const lsKey = useMemo(
    () => `dont-show-translation-banner-${bannerType}-${pathname}`,
    [bannerType, pathname]
  )

  useEffect(() => {
    if (!bannerType || locale === DEFAULT_LOCALE) {
      setIsOpen(false)
      return
    }

    setIsOpen(localStorage.getItem(lsKey) !== "true")
  }, [bannerType, locale, lsKey])

  if (!isOpen || locale === DEFAULT_LOCALE || !bannerType) return null

  const handleDontShow = () => {
    localStorage.setItem(lsKey, "true")
    setIsOpen(false)
  }

  const isUntranslatedContentBanner = bannerType === "content-not-translated"

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

      <h3 className="mb-2">
        {isUntranslatedContentBanner
          ? t("translation-banner-title-new")
          : t("translation-banner-no-bugs-title")}
      </h3>
      <p className="mb-6">
        {isUntranslatedContentBanner
          ? t("translation-banner-body-new")
          : t("translation-banner-no-bugs-content")}
      </p>

      {isUntranslatedContentBanner ? (
        <div className="flex flex-wrap gap-3 max-sm:flex-col">
          <ButtonLink
            href={pathname}
            locale={DEFAULT_LOCALE}
            className="max-sm:w-full"
          >
            {t("translation-banner-button-see-english")}
          </ButtonLink>
          <ButtonLink
            href="/contributing/translation-program/"
            variant="outline"
            className="max-sm:w-full"
          >
            {t("translation-banner-button-translate-page")}
          </ButtonLink>
        </div>
      ) : (
        <Button onClick={handleDontShow} className="max-sm:w-full">
          {t("translation-banner-no-bugs-dont-show-again")}
        </Button>
      )}
    </aside>
  )
}

export default TranslationBanner
