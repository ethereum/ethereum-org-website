"use client"

import type { MouseEvent } from "react"

import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { MAIN_CONTENT_ID } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"

const SkipLink = () => {
  const { t } = useTranslation("common")

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(MAIN_CONTENT_ID)
    if (!target) return

    // Treat the skip link as a focus action, not navigation:
    // - preventDefault keeps `#main-content` out of the URL (avoids hash stacking)
    // - focus({ preventScroll }) moves keyboard focus without the focus-induced
    //   scroll that ignores scroll-margin-top
    // - scrollIntoView then scrolls while respecting scroll-mt on the target,
    //   so the heading clears the fixed nav
    e.preventDefault()
    target.focus({ preventScroll: true })
    scrollIntoView("#" + MAIN_CONTENT_ID)
  }

  return (
    <div className="bg-primary-low-contrast focus-within:p-4">
      <a
        href={"#" + MAIN_CONTENT_ID}
        onClick={handleClick}
        className="absolute -top-14 rounded border bg-primary px-4 py-2 leading-8 text-background no-underline hover:no-underline focus:static"
      >
        {t("skip-to-main-content")}
      </a>
    </div>
  )
}

export default SkipLink
