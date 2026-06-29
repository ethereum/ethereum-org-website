"use client"

import { type ReactNode, useState } from "react"
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Loader2,
} from "lucide-react"
import { useLocale } from "next-intl"

import type { MatomoEventOptions } from "@/lib/types"

import ChatGPTIcon from "@/components/icons/chatgpt.svg"
import ClaudeIcon from "@/components/icons/claude.svg"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils/cn"
import { logger } from "@/lib/utils/logger"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { DEFAULT_LOCALE, SITE_URL } from "@/lib/constants"

import { useClipboard } from "@/hooks/useClipboard"
import { useTranslation } from "@/hooks/useTranslation"

type CopyPageButtonProps = {
  slug: string
  /** Whether a translated markdown file exists for this slug at the current locale. */
  isTranslated?: boolean
  className?: string
}

const buildAskPrompt = (pageUrl: string) =>
  `Read ${pageUrl} so I can ask follow-up questions about it.`

const buildChatGPTUrl = (pageUrl: string) =>
  `https://chatgpt.com/?hints=search&q=${encodeURIComponent(buildAskPrompt(pageUrl))}`

const buildClaudeUrl = (pageUrl: string) =>
  `https://claude.ai/new?q=${encodeURIComponent(buildAskPrompt(pageUrl))}`

type CopyPageMenuItemProps = {
  href: string
  icon: ReactNode
  title: string
  description: string
  eventOptions: MatomoEventOptions
}

const CopyPageMenuItem = ({
  href,
  icon,
  title,
  description,
  eventOptions,
}: CopyPageMenuItemProps) => (
  <DropdownMenuItem asChild>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCustomEvent(eventOptions)}
      className="group flex items-start gap-3 px-3 py-2.5 no-underline hover:no-underline"
    >
      <span
        className="text-body mt-0.5 flex size-5 shrink-0 items-center justify-center"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-body flex items-center justify-between gap-2 text-sm font-semibold leading-tight">
          <span className="truncate">{title}</span>
          <ArrowUpRight
            className="text-body-medium group-hover:text-primary-hover size-3.5 shrink-0 transition"
            aria-hidden="true"
          />
        </span>
        <span className="text-body-medium text-xs leading-snug">
          {description}
        </span>
      </span>
    </a>
  </DropdownMenuItem>
)

const CopyPageButton = ({
  slug,
  isTranslated = true,
  className,
}: CopyPageButtonProps) => {
  const { t } = useTranslation("common")
  const locale = useLocale()
  const { onCopy, hasCopied } = useClipboard({ timeout: 2000 })
  const [isLoading, setIsLoading] = useState(false)

  const cleanSlug = slug.replace(/^\/+|\/+$/g, "")
  const useTranslatedPath = locale !== DEFAULT_LOCALE && isTranslated
  const mdPath = useTranslatedPath
    ? `/content/translations/${locale}/${cleanSlug}/index.md`
    : `/content/${cleanSlug}/index.md`
  // `localePrefix: "as-needed"` -> English canonical URL has no locale prefix.
  // Feeding the canonical URL avoids redirects that some LLM fetchers don't follow.
  const pagePath =
    locale === DEFAULT_LOCALE ? `/${cleanSlug}/` : `/${locale}/${cleanSlug}/`
  const pageUrl = `${SITE_URL}${pagePath}`

  const handleCopy = async () => {
    if (isLoading || hasCopied) return

    // Skip the loading flash on fast (cached) responses by waiting before we
    // show it, and once shown, hold it long enough to be readable.
    const LOADING_DELAY_MS = 200
    const MIN_LOADING_MS = 300
    let loadingShownAt: number | null = null
    const showLoadingTimer = setTimeout(() => {
      loadingShownAt = Date.now()
      setIsLoading(true)
    }, LOADING_DELAY_MS)

    try {
      const res = await fetch(mdPath)
      if (!res.ok) throw new Error(`Failed to fetch markdown: ${res.status}`)
      const text = await res.text()
      await onCopy(text)
    } catch (error) {
      logger.error("Failed to copy page markdown", error, { mdPath })
    } finally {
      clearTimeout(showLoadingTimer)
      if (loadingShownAt !== null) {
        const remaining = MIN_LOADING_MS - (Date.now() - loadingShownAt)
        if (remaining > 0) await new Promise((r) => setTimeout(r, remaining))
      }
      setIsLoading(false)
    }
  }

  const copyLabel = isLoading
    ? t("loading")
    : hasCopied
      ? t("copied")
      : t("copy-page")

  const CopyIconSlot = isLoading ? Loader2 : hasCopied ? Check : Copy

  return (
    <ButtonGroup className={cn("shrink-0", className)}>
      <Button
        variant="ghost"
        size="sm"
        isSecondary
        onClick={handleCopy}
        disabled={isLoading}
        aria-label={t("copy-page-aria-label")}
        customEventOptions={{
          eventCategory: "CopyPage",
          eventAction: "click",
          eventName: cleanSlug,
        }}
      >
        <CopyIconSlot
          className={cn(isLoading && "animate-spin")}
          aria-hidden="true"
        />
        <span className="grid text-start">
          <span
            aria-hidden="true"
            className="invisible col-start-1 row-start-1"
          >
            {t("copy-page")}
          </span>
          <span className="col-start-1 row-start-1" aria-live="polite">
            {copyLabel}
          </span>
        </span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            isSecondary
            className="px-1!"
            aria-label={t("copy-page-options")}
          >
            <ChevronDown
              className="transition-transform data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className="w-72 p-1 shadow-md"
        >
          <CopyPageMenuItem
            href={mdPath}
            icon={<FileText className="size-5" />}
            title={t("copy-page-markdown-title")}
            description={t("copy-page-markdown-description")}
            eventOptions={{
              eventCategory: "CopyPage",
              eventAction: "view-markdown",
              eventName: cleanSlug,
            }}
          />
          <CopyPageMenuItem
            href={buildChatGPTUrl(pageUrl)}
            icon={<ChatGPTIcon className="size-5" />}
            title={t("copy-page-chatgpt-title")}
            description={t("copy-page-chatgpt-description")}
            eventOptions={{
              eventCategory: "CopyPage",
              eventAction: "open-chatgpt",
              eventName: cleanSlug,
            }}
          />
          <CopyPageMenuItem
            href={buildClaudeUrl(pageUrl)}
            icon={<ClaudeIcon className="size-5" />}
            title={t("copy-page-claude-title")}
            description={t("copy-page-claude-description")}
            eventOptions={{
              eventCategory: "CopyPage",
              eventAction: "open-claude",
              eventName: cleanSlug,
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export default CopyPageButton
