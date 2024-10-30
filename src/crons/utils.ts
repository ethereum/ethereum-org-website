import { logger } from "@trigger.dev/sdk/v3"

export const revalidatePaths = async (paths: string[]) => {
  for (const path of paths) {
    logger.log(`Revalidating ${path}`)

    const url = new URL("https://ethereum.org/api/revalidate/")
    url.searchParams.set("path", path)
    url.searchParams.set("secret", process.env.REVALIDATE_SECRET ?? "")

    const res = await fetch(url)

    if (!res.ok) {
      // 502 "Bad Gateway" error is returned when the on-demand builder (lambda function)
      // hits the timeout limit (30s)
      // https://docs.netlify.com/configure-builds/on-demand-builders/#limits
      if (res.status === 502) {
        logger.warn("On-demand builder timeout", {
          statusText: res.statusText,
          status: res.status,
        })

        continue
      }

      const message = await res.text()

      logger.error("Failed to revalidate", {
        statusText: res.statusText,
        status: res.status,
        message,
      })

      throw new Error("Failed to revalidate")
    }

    logger.log(`Finished revalidating ${path}`)
  }
}
