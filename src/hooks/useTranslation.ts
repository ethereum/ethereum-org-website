import { useMemo } from "react"
import { useTranslations } from "next-intl"

/**
 * Cases to handle:
 *
 * - using t("key")
 *  - & useTranslation() => "common.key"
 *  - & useTranslation("namespace") => "namespace.key"
 *  - & useTranslation(["namespace1", "namespace2"]) => "namespace1.key"
 *
 * - using t("namespace:key")
 *  - & useTranslation("namespace") and t("namespace:key") => "namespace.key"
 *  - & useTranslation(["namespace1", "namespace2"]) and t("namespace1:key") => "namespace1.key"
 *  - & useTranslation(["namespace1", "namespace2"]) and t("namespace2:key") => "namespace2.key"
 */

const DEFAULT_NAMESPACE = "common"

export function useTranslation(namespaces?: string[] | string) {
  const t = useTranslations()
  const namespace = Array.isArray(namespaces)
    ? namespaces[0]
    : namespaces || DEFAULT_NAMESPACE

  const customT = useMemo(() => {
    const translate = (
      fullKey: string,
      values?: Record<string, string | number | Date>
    ) => {
      try {
        if (fullKey.includes(":")) {
          const [namespace, key] = fullKey.split(":")

          if (values) {
            return t(`${namespace}.${key}`, values)
          }

          return t.raw(`${namespace}.${key}`)
        }

        return t.raw(`${namespace}.${fullKey}`)
      } catch (error) {
        // Suppress errors by default, enable if needed to debug
        // console.error(error)
        return fullKey
      }
    }

    // keep the original methods
    translate.raw = t.raw
    translate.rich = t.rich
    translate.markup = t.markup
    translate.has = t.has

    return translate
  }, [namespace, t])

  return { t: customT }
}

export default useTranslation
