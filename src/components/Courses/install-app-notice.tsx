"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { Smartphone } from "lucide-react"
import { useTranslations } from "next-intl"

import { Strong } from "@/components/IntlStringElements"
import {
  Alert,
  AlertCloseButton,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/buttons/Button"

import {
  dismissInstall,
  getInstallPrompt,
  getServerInstallPrompt,
  type InstallPlatform,
  installPlatform,
  isInstallDismissed,
  subscribeInstallPrompt,
  takeInstallPrompt,
} from "./install-prompt"

/**
 * Hub-only offer to add the courses app to the home screen. Mobile only, so it
 * renders nothing on the server and on desktop: no hydration mismatch and no
 * shift for desktop. Android shows once Chromium offers a prompt; iOS gets
 * Share > Add to Home Screen steps.
 */
const InstallAppNotice = () => {
  const t = useTranslations("page-courses")
  const [platform, setPlatform] = useState<InstallPlatform | null>(null)
  const prompt = useSyncExternalStore(
    subscribeInstallPrompt,
    getInstallPrompt,
    getServerInstallPrompt
  )

  useEffect(() => {
    if (!isInstallDismissed()) setPlatform(installPlatform())
  }, [])

  if (!platform || (platform === "android" && !prompt)) return null

  const dismiss = () => {
    dismissInstall()
    setPlatform(null)
  }

  const install = async () => {
    const event = takeInstallPrompt()
    if (!event) return
    await event.prompt()
    const { outcome } = await event.userChoice
    if (outcome === "dismissed") dismiss()
  }

  return (
    <Alert variant="update">
      <AlertIcon>
        <Smartphone />
      </AlertIcon>
      <AlertContent className="gap-1">
        <AlertTitle>{t("page-courses-install-title")}</AlertTitle>
        <AlertDescription>
          <p>{t("page-courses-install-description")}</p>
          {platform === "ios" && (
            <p>{t.rich("page-courses-install-ios", { strong: Strong })}</p>
          )}
        </AlertDescription>
        {platform === "android" && (
          <Button className="mt-2 self-start" onClick={install}>
            {t("page-courses-install-button")}
          </Button>
        )}
      </AlertContent>
      <AlertCloseButton
        aria-label={t("page-courses-install-dismiss")}
        onClick={dismiss}
      />
    </Alert>
  )
}

export default InstallAppNotice
