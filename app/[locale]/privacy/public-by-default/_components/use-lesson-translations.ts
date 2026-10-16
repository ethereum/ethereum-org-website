"use client"

import { useMemo } from "react"
import { useTranslations } from "next-intl"

export const LESSON_NS = "page-privacy-public-by-default"

type Translator = ReturnType<typeof useTranslations>
type Values = Parameters<Translator>[1]
type RichValues = Parameters<Translator["rich"]>[1]

/**
 * Lesson keys repeat the namespace as a prefix (`page-privacy-public-by-default-
 * dossier-title`). Data files store them without it, so this takes the short
 * form: `t("dossier-title")`, `t.rich("hero-privacy-line", richTags(...))`.
 */
export const useLessonTranslations = () => {
  const t = useTranslations(LESSON_NS)
  return useMemo(() => {
    const translate = (key: string, values?: Values) =>
      t(`${LESSON_NS}-${key}`, values)
    translate.rich = (key: string, values?: RichValues) =>
      t.rich(`${LESSON_NS}-${key}`, values)
    return translate
  }, [t])
}
