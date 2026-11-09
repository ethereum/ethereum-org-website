"use client"

import { DoorOpen, X } from "lucide-react"
import { useTranslations } from "next-intl"
import * as Dialog from "@radix-ui/react-dialog"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, lessonThemeStyle } from "./theme"

interface ExitLessonButtonProps {
  href: string
  /** Confirm first when leaving would throw away answers */
  confirm: boolean
}

const triggerClasses = "shrink-0 rounded-full px-2 text-body-medium"

const ExitLessonButton = ({ href, confirm }: ExitLessonButtonProps) => {
  const t = useTranslations("page-courses")
  const label = t("page-courses-exit-lesson")

  if (!confirm) {
    return (
      <ButtonLink
        href={href}
        variant="ghost"
        isSecondary
        hideArrow
        className={triggerClasses}
        aria-label={label}
      >
        <X />
      </ButtonLink>
    )
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          isSecondary
          className={triggerClasses}
          aria-label={label}
        >
          <X />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-overlay bg-overlay data-[state=open]:animate-fade-in" />
        <Dialog.Content
          style={lessonThemeStyle()}
          className="fixed inset-x-4 bottom-4 z-modal mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border-b-8 border-border bg-background p-6 text-center shadow-xl outline-hidden data-[state=open]:animate-fade-in sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 md:p-8"
        >
          <div className="grid size-20 place-items-center rounded-full bg-(--course-soft) text-(--course-strong) dark:text-(--course-bright)">
            <DoorOpen className="size-10" aria-hidden />
          </div>
          <Dialog.Title className="m-0 text-h3 font-black">
            {t("page-courses-exit-title")}
          </Dialog.Title>
          <Dialog.Description className="m-0 text-lg text-body-medium">
            {t("page-courses-exit-description")}
          </Dialog.Description>
          <div className="mt-2 flex w-full flex-col gap-3">
            <Dialog.Close asChild>
              <Button variant="ghost" className={cn(chunkyButton, "w-full")}>
                {t("page-courses-exit-stay")}
              </Button>
            </Dialog.Close>
            <ButtonLink
              href={href}
              variant="ghost"
              hideArrow
              className="min-h-12 w-full rounded-2xl font-bold tracking-wide text-error uppercase dark:text-red-400 hover-link:bg-error-light hover-link:!text-error dark:hover-link:bg-error-dark dark:hover-link:!text-red-400"
            >
              {t("page-courses-exit-leave")}
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ExitLessonButton
