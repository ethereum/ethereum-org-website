"use client"

import { useState } from "react"
import { ImageOff, ScrollText, Server, ServerOff } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/** The NFT's picture: a sun over hills, drawn inline so it needs no host */
const Picture = () => (
  <svg viewBox="0 0 120 80" aria-hidden className="h-auto w-full">
    <rect width="120" height="80" fill="var(--course-soft)" />
    <circle cx="82" cy="28" r="12" fill="var(--course)" />
    <path d="M0,62 Q30,38 58,56 T120,50 V80 H0Z" fill="var(--course-strong)" />
  </svg>
)

/**
 * NFTs course: take the picture's host offline and see that the owner on
 * Ethereum's list doesn't change. A sandbox: going offline once completes it.
 */
const NftHostWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [online, setOnline] = useState(true)
  const [touched, setTouched] = useState(false)

  const toggle = () => {
    const next = !online
    setOnline(next)
    if (!next && !touched) {
      setTouched(true)
      onComplete()
    }
  }

  return (
    <WidgetShell>
      <div className="grid gap-3 sm:grid-cols-2">
        <section className="flex flex-col gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
          <h3 className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
            <ScrollText className={cn("size-4", courseText)} aria-hidden />
            {t("page-courses-widget-nft-host-list")}
          </h3>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <dt className="text-body-medium">
              {t("page-courses-widget-nft-host-id")}
            </dt>
            <dd className="m-0 font-bold">
              {t("page-courses-widget-nft-host-id-value")}
            </dd>
            <dt className="text-body-medium">
              {t("page-courses-widget-nft-host-owner")}
            </dt>
            <dd className="m-0 font-bold">
              {t("page-courses-widget-nft-host-you")}
            </dd>
            <dt className="text-body-medium">
              {t("page-courses-widget-nft-host-link")}
            </dt>
            <dd className="m-0 font-bold">
              {t("page-courses-widget-nft-host-link-value")}
            </dd>
          </dl>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
          <h3 className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
            {online ? (
              <Server className={cn("size-4", courseText)} aria-hidden />
            ) : (
              <ServerOff
                className="size-4 text-error dark:text-red-400"
                aria-hidden
              />
            )}
            {t("page-courses-widget-nft-host-host")}
          </h3>
          <div className="overflow-hidden rounded-xl">
            {online ? (
              <Picture />
            ) : (
              <div className="flex aspect-[3/2] flex-col items-center justify-center gap-2 bg-background-highlight p-3 text-center text-body-medium">
                <ImageOff className="size-8" aria-hidden />
                <span className="text-sm">
                  {t("page-courses-widget-nft-host-missing")}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>

      <Button
        variant="ghost"
        onClick={toggle}
        className={cn(online ? chunkyButton : chunkyButtonSecondary, "w-full")}
      >
        {online
          ? t("page-courses-widget-nft-host-off")
          : t("page-courses-widget-nft-host-on")}
      </Button>

      <p role="status" className="m-0">
        {t(
          online
            ? touched
              ? "page-courses-widget-nft-host-status-back"
              : "page-courses-widget-nft-host-status-start"
            : "page-courses-widget-nft-host-status-off"
        )}
      </p>
    </WidgetShell>
  )
}

export default NftHostWidget
