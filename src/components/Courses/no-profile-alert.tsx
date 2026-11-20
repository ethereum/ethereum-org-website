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
import { Button } from "@/components/ui/buttons/Button"

import { NO_PROFILE_PARAM } from "@/data/courses"

import SignInDialog from "../Account/sign-in-dialog"
import { useAccount } from "../Account/use-account"

import { syncProgress } from "./account-sync"

/**
 * On the hub after the profile page sent back someone with no progress yet.
 * Uses search params, so render it inside a Suspense boundary.
 */
const NoProfileAlert = () => {
  const t = useTranslations("page-courses")
  const params = useSearchParams()
  const flagged = params.has(NO_PROFILE_PARAM)
  const [shown, setShown] = useState(false)
  const { status } = useAccount()

  useEffect(() => {
    if (!flagged) return
    setShown(true)
    // Strip the flag right away so the URL can't be copied or reloaded with it
    const url = new URL(window.location.href)
    url.searchParams.delete(NO_PROFILE_PARAM)
    window.history.replaceState(window.history.state, "", url)
  }, [flagged])

  // Signed in, there's a profile after all
  if (!shown || status === "signed-in") return null

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
        {status === "signed-out" && (
          <SignInDialog
            onSignedIn={() => void syncProgress(true)}
            trigger={
              <Button variant="link" className="self-start px-0">
                {t("page-courses-no-profile-sign-in")}
              </Button>
            }
          />
        )}
      </AlertContent>
      <AlertCloseButton
        aria-label={t("page-courses-no-profile-dismiss")}
        onClick={() => setShown(false)}
      />
    </Alert>
  )
}

export default NoProfileAlert
