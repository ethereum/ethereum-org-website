import { DEFAULT_LOCALE } from "@/lib/constants"

export default async function loadNamespaces(
  locale: string,
  namespaces: string[]
) {
  const byNamespace = await Promise.all(
    namespaces.map(async (namespace) => {
      try {
        const defaultNamespace = (
          await import(`../intl/${DEFAULT_LOCALE}/${namespace}.json`)
        ).default
        const localeNamespace = (
          await import(`../intl/${locale}/${namespace}.json`)
        ).default

        // Merge the namespaces to have default translations for keys that are not present in the locale
        return { ...defaultNamespace, ...localeNamespace }
      } catch (error) {
        // If the namespace is not found, return the default namespace
        return (await import(`../intl/${DEFAULT_LOCALE}/${namespace}.json`))
          .default
      }
    })
  )

  return byNamespace.reduce((acc, namespace, index) => {
    acc[namespaces[index]] = namespace
    return acc
  }, {})
}
