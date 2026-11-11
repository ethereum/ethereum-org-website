"use client"

import { useEffect, useState } from "react"
import { UserRound } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"

import { NO_PROFILE_PARAM } from "@/data/courses"

/**
 * On the hub after the profile page sent back someone with no progress yet.
 * Uses search params, so render it inside a Suspense boundary.
 */
const NoProfileAlert = () => {
  const t = useTranslations("page-courses")
  const params = useSearchParams()
  const flagged = params.has(NO_PROFILE_PARAM)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!flagged) return
    setShown(true)
    // Strip the flag right away so the URL can't be copied or reloaded with it
    const url = new URL(window.location.href)
    url.searchParams.delete(NO_PROFILE_PARAM)
    window.history.replaceState(window.history.state, "", url)
  }, [flagged])

  if (!shown) return null

  return (
    <Alert variant="update" role="status">
      <AlertIcon>
        <UserRound />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>{t("page-courses-no-profile-title")}</AlertTitle>
        <AlertDescription>
          {t("page-courses-no-profile-description")}
        </AlertDescription>
      </AlertContent>
      <AlertCloseButton
        aria-label={t("page-courses-no-profile-dismiss")}
        onClick={() => setShown(false)}
      />
    </Alert>
  )
}

export default NoProfileAlert
