"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { init, push } from "@socialgouv/matomo-next"

export default function Matomo() {
  const pathname = usePathname()

  const [inited, setInited] = useState(false)
  const [previousPath, setPreviousPath] = useState("")

  useEffect(() => {
    if (!process.env.IS_PREVIEW_DEPLOY && !inited) {
      init({
        url: process.env.NEXT_PUBLIC_MATOMO_URL!,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
      })

      setInited(true)
    }
  }, [inited])

  /**
   * The @socialgouv/matomo-next does not work with next 13
   * Code from https://github.com/SocialGouv/matomo-next/issues/99
   */
  useEffect(() => {
    if (!pathname) {
      return
    }

    if (!previousPath) {
      return setPreviousPath(pathname)
    }

    push(["setReferrerUrl", `${previousPath}`])
    push(["setCustomUrl", pathname])
    push(["deleteCustomVariables", "page"])
    setPreviousPath(pathname)
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      push(["setDocumentTitle", document.title])
      push(["trackPageView"])
    })
    /**
     * This is because we don't want to track previousPath
     * could be a if (previousPath === pathname) return; instead
     * But be sure to not send the tracking twice
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return <></>
}
