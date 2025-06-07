"use client"

import { cn } from "@/lib/utils/cn"

import { useClipboard } from "@/hooks/useClipboard"

export type CopyToClipboardProps = {
  text: string
  inline?: boolean
  children: (isCopied: boolean) => React.ReactNode
  className?: string
}

const CopyToClipboard = ({
  children,
  text,
  inline = false,
  className,
}: CopyToClipboardProps) => {
  const { onCopy, hasCopied } = useClipboard({ timeout: 1500 })

  return (
    <button
      className={cn("cursor-pointer", inline ? "inline" : "block", className)}
      onClick={() => onCopy(text)}
    >
      {children(hasCopied)}
    </button>
  )
}

export default CopyToClipboard
