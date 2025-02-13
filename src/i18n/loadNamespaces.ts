export default async function loadNamespaces(
  locale: string,
  namespaces: string[]
) {
  const byNamespace = await Promise.all(
    namespaces.map(async (namespace) => {
      return (await import(`../intl/${locale}/${namespace}.json`)).default
    })
  )

  return byNamespace.reduce((acc, namespace, index) => {
    acc[namespaces[index]] = namespace
    return acc
  }, {})
}
