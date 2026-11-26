"use client"

import { useState, useSyncExternalStore } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

import { isProgressOutdated, subscribeStoredProgress } from "./progress-storage"

/**
 * Asks for a reload once progress saved by a later release of the site turns
 * up (another tab, or the account): until then this page saves nothing, so
 * it can't overwrite the newer copy
 */
const ProgressOutdated = () => {
  const t = useTranslations("page-courses")
  const outdated = useSyncExternalStore(
    subscribeStoredProgress,
    isProgressOutdated,
    () => false
  )
  const [dismissed, setDismissed] = useState(false)

  return (
    <Dialog
      variant="stacked"
      open={outdated && !dismissed}
      onOpenChange={(open) => !open && setDismissed(true)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("page-courses-outdated-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("page-courses-outdated-description")}
        </DialogDescription>
        <DialogFooter className="flex flex-wrap justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" isSecondary>
              {t("page-courses-outdated-later")}
            </Button>
          </DialogClose>
          <Button onClick={() => window.location.reload()}>
            {t("page-courses-outdated-reload")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProgressOutdated
