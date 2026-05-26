"use client"

import { type ReactNode, useEffect, useState } from "react"
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  FileText,
  Loader2,
} from "lucide-react"
import { useLocale } from "next-intl"

import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils/cn"

import { DEFAULT_LOCALE, SITE_URL } from "@/lib/constants"

import { ChatGPTIcon, ClaudeIcon } from "./icons"

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
}

const CopyPageMenuItem = ({
  href,
  icon,
  title,
  description,
}: CopyPageMenuItemProps) => (
  <DropdownMenuItem asChild>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 px-3 py-2.5 no-underline hover:no-underline"
    >
      <span
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-body"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center justify-between gap-2 text-sm leading-tight font-semibold text-body">
          <span className="truncate">{title}</span>
          <ArrowUpRight
            className="size-3.5 shrink-0 text-body-medium transition group-hover:text-primary-hover"
            aria-hidden="true"
          />
        </span>
        <span className="text-xs leading-snug text-body-medium">
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
  // Static markdown lives at /content/<slug>/index.md (English) or
  // /content/translations/<locale>/<slug>/index.md (other locales). When a
  // locale has no translated file for this page, fall back to English to match
  // what the rendered page is showing.
  const useTranslatedPath = locale !== DEFAULT_LOCALE && isTranslated
  const mdPath = useTranslatedPath
    ? `/content/translations/${locale}/${cleanSlug}/index.md`
    : `/content/${cleanSlug}/index.md`
  const pagePath = `/${locale}/${cleanSlug}/`

  // Use the current origin at runtime so dev/preview/prod each share their own
  // links instead of leaking localhost URLs to ChatGPT/Claude or pointing the
  // markdown view at a route that may not exist on the configured SITE_URL.
  const [origin, setOrigin] = useState(SITE_URL)
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])
  const pageUrl = `${origin}${pagePath}`

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
      console.error("Failed to copy page markdown:", error)
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

  // Render every state stacked invisibly so the grid cell sizes to the widest
  // label and the button width stays stable as state changes.
  const allLabels = [t("copy-page"), t("loading"), t("copied")]

  const CopyIconSlot = isLoading ? Loader2 : hasCopied ? Check : Copy

  return (
    <ButtonGroup className={cn("shrink-0", className)}>
      <Button
        variant="ghost"
        size="sm"
        isSecondary
        onClick={handleCopy}
        disabled={isLoading}
        aria-label={t("copy-page-aria-label") as string}
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
          {allLabels.map((label, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="invisible col-start-1 row-start-1"
            >
              {label as string}
            </span>
          ))}
          <span className="col-start-1 row-start-1" aria-live="polite">
            {copyLabel as string}
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
            aria-label={t("copy-page-options") as string}
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
            title={t("copy-page-markdown-title") as string}
            description={t("copy-page-markdown-description") as string}
          />
          <CopyPageMenuItem
            href={buildChatGPTUrl(pageUrl)}
            icon={<ChatGPTIcon className="size-5" />}
            title={t("copy-page-chatgpt-title") as string}
            description={t("copy-page-chatgpt-description") as string}
          />
          <CopyPageMenuItem
            href={buildClaudeUrl(pageUrl)}
            icon={<ClaudeIcon className="size-5" />}
            title={t("copy-page-claude-title") as string}
            description={t("copy-page-claude-description") as string}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}

export default CopyPageButton
