"use client"

import { useCallback } from "react"
import { useTranslations } from "next-intl"

export const LESSON_NS = "page-privacy-public-by-default"

type Values = Parameters<ReturnType<typeof useTranslations>>[1]

/**
 * Lesson keys repeat the namespace as a prefix (`page-privacy-public-by-default-
 * dossier-title`). Data files store them without it, so this takes the short
 * form: `t("dossier-title")`.
 */
export const useLessonTranslations = () => {
  const t = useTranslations(LESSON_NS)
  return useCallback(
    (key: string, values?: Values) => t(`${LESSON_NS}-${key}`, values),
    [t]
  )
}
