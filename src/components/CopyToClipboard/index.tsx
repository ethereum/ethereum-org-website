"use client"

import { Copy, CopyCheck } from "lucide-react"

import type { MatomoEventOptions } from "@/lib/types"

import { Button, type ButtonProps } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useClipboard } from "@/hooks/useClipboard"

/**
 * The copy affordance's glyph, reflecting copied state. Colour is left to the
 * caller: inside `Button` the icon inherits `currentColor`, and so follows the
 * button's own hover / active / disabled / secondary states.
 */
export const CopyIcon = ({
  copied,
  className,
}: {
  copied: boolean
  className?: string
}) => {
  const Icon = copied ? CopyCheck : Copy
  return <Icon className={cn("size-5 shrink-0", className)} />
}

export type CopyToClipboardProps = {
  text: string
  inline?: boolean
  children: (isCopied: boolean) => React.ReactNode
  className?: string
  matomoEvent?: MatomoEventOptions
}

const CopyToClipboard = ({
  children,
  text,
  inline = false,
  className,
  matomoEvent,
}: CopyToClipboardProps) => {
  const { onCopy, hasCopied } = useClipboard({ timeout: 1500 })

  return (
    <button
      className={cn("cursor-pointer", inline ? "inline" : "block", className)}
      onClick={() => {
        onCopy(text)
        matomoEvent && trackCustomEvent(matomoEvent)
      }}
    >
      {children(hasCopied)}
    </button>
  )
}

type CopyButtonProps = ButtonProps & {
  message: string
}

export const CopyButton = ({ message, ...props }: CopyButtonProps) => {
  const { onCopy, hasCopied } = useClipboard({ timeout: 1500 })
  return (
    <Button variant="ghost" onClick={() => onCopy(message)} {...props}>
      <CopyIcon copied={hasCopied} />
    </Button>
  )
}

export default CopyToClipboard
