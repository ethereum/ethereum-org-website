"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { Smartphone } from "lucide-react"
import { useTranslations } from "next-intl"

import { Alert, AlertCloseButton } from "@/components/ui/alert"
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
 * Hub-only offer to add the courses app to the home screen, as the ui/alert
 * banner at the top of the page. Mobile only, so it renders nothing on the server
 * and on desktop: no hydration mismatch and no shift for desktop. An Install
 * button where the browser offers a prompt, written steps everywhere else.
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

  if (!platform) return null

  const dismiss = () => {
    dismissInstall()
    setPlatform(null)
  }

  const install = async () => {
    const event = takeInstallPrompt()
    if (!event) return
    await event.prompt()
    // Installed or declined, the offer has been made: don't show it again
    await event.userChoice
    dismiss()
  }

  return (
    <Alert
      variant="banner"
      aria-label={t("page-courses-install-title")}
      className="relative gap-2 py-2 pe-12 text-sm"
    >
      <Smartphone aria-hidden className="size-5 shrink-0 text-white" />
      <p className="m-0">
        <span className="font-bold">{t("page-courses-install-title")}</span>{" "}
        {/* Steps where there's no install prompt: iOS, and Android browsers
            that don't offer one (e.g. Firefox) */}
        {!prompt &&
          t.rich(`page-courses-install-steps-${platform}`, {
            // Not <strong>: the alert base styles force body colour on it
            strong: (chunks) => <span className="font-bold">{chunks}</span>,
          })}
      </p>
      {prompt && (
        <Button
          size="sm"
          variant="outline"
          onClick={install}
          className="border-white text-white hover-link:!text-white/80"
        >
          {t("page-courses-install-button")}
        </Button>
      )}
      <AlertCloseButton
        aria-label={t("page-courses-install-dismiss")}
        onClick={dismiss}
        className="absolute end-2 top-1/2 me-0 -translate-y-1/2 text-white hover-link:!text-white/80"
      />
    </Alert>
  )
}

export default InstallAppNotice
