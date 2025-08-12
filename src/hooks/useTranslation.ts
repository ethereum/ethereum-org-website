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

  const customT: typeof t = (fullKey, values) => {
    try {
      if (fullKey.includes(":")) {
        const [namespace, key] = fullKey.split(":")

        if (values) {
          return t(`${namespace}.${key}`, values)
        }

        return t.raw(`${namespace}.${key}`)
      }

      const namespace = Array.isArray(namespaces)
        ? namespaces[0]
        : namespaces || DEFAULT_NAMESPACE

      if (values) {
        return t(`${namespace}.${fullKey}`, values)
      }

      return t.raw(`${namespace}.${fullKey}`)
    } catch (error) {
      // Suppress errors by default, enable if needed to debug
      // console.error(error)
      return fullKey
    }
  }

  // keep the original methods with namespace handling
  customT.raw = t.raw

  customT.rich = (fullKey: string, values?: unknown) => {
    try {
      if (fullKey.includes(":")) {
        const [namespace, key] = fullKey.split(":")
        return t.rich(`${namespace}.${key}`, values)
      }

      const namespace = Array.isArray(namespaces)
        ? namespaces[0]
        : namespaces || DEFAULT_NAMESPACE

      return t.rich(`${namespace}.${fullKey}`, values)
    } catch (error) {
      return fullKey
    }
  }

  customT.markup = (fullKey: string, values?: unknown) => {
    try {
      if (fullKey.includes(":")) {
        const [namespace, key] = fullKey.split(":")
        return t.markup(`${namespace}.${key}`, values)
      }

      const namespace = Array.isArray(namespaces)
        ? namespaces[0]
        : namespaces || DEFAULT_NAMESPACE

      return t.markup(`${namespace}.${fullKey}`, values)
    } catch (error) {
      return fullKey
    }
  }

  customT.has = t.has

  return { t: customT }
}

export default useTranslation
