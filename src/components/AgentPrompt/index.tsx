"use client"

import { Check, Copy } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { useClipboard } from "@/hooks/useClipboard"

type AgentPromptProps = {
  prompt: string
  className?: string
}

const AgentPrompt = ({ prompt, className }: AgentPromptProps) => {
  const t = useTranslations("common")
  const { onCopy, hasCopied } = useClipboard({ timeout: 1500 })

  return (
    <div
      dir="ltr"
      className={cn(
        "my-8 flex flex-col gap-4 rounded-md border bg-background-highlight p-6",
        "sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <code className="font-mono text-sm text-body sm:text-base">{prompt}</code>
      <Button
        variant="outline"
        onClick={() => onCopy(prompt)}
        aria-label={hasCopied ? t("copied") : t("copy")}
        className="shrink-0 self-start sm:self-center"
      >
        {hasCopied ? <Check /> : <Copy />}
        {hasCopied ? t("copied") : t("copy")}
      </Button>
    </div>
  )
}

export default AgentPrompt
