"use client"

import { CheckCircle, Copy } from "lucide-react"

import { cn } from "@/lib/utils/cn"

import { Button, type ButtonProps } from "./ui/buttons/Button"

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

type CopyButtonProps = ButtonProps & {
  message: string
}

export const CopyButton = ({ message, ...props }: CopyButtonProps) => {
  const { onCopy, hasCopied } = useClipboard({ timeout: 1500 })
  return (
    <Button variant="ghost" onClick={() => onCopy(message)} {...props}>
      {hasCopied ? (
        <CheckCircle className="size-5" />
      ) : (
        <Copy className="size-5" />
      )}
    </Button>
  )
}

export default CopyToClipboard
