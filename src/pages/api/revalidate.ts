import type { NextApiRequest, NextApiResponse } from "next"

import i18nConfig from "../../../i18n.config.json"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid secret" })
  }

  const BUILD_LOCALES = process.env.BUILD_LOCALES
  // Supported locales defined in `i18n.config.json`
  const locales = BUILD_LOCALES
    ? BUILD_LOCALES.split(",")
    : i18nConfig.map(({ code }) => code)

  const path = req.query.path as string
  console.log("Revalidating", path)

  try {
    if (!path) {
      return res.status(400).json({ message: "No path provided" })
    }

    const hasLocaleInPath = locales.some((locale) =>
      path.startsWith(`/${locale}/`)
    )

    if (hasLocaleInPath) {
      await res.revalidate(path)
    } else {
      // First revalidate the default locale to cache the results
      await res.revalidate(`/en${path}`)

      // Then revalidate all other locales
      await Promise.all(
        locales.map(async (locale) => {
          const localePath = `/${locale}${path}`
          console.log(`Revalidating ${localePath}`)
          try {
            await res.revalidate(localePath)
          } catch (err) {
            console.error(`Error revalidating ${localePath}`, err)
            throw new Error(`Error revalidating ${localePath}`)
          }
        })
      )
    }

    return res.json({ revalidated: true })
  } catch (err) {
    console.error(err)
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }
}
