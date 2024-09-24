import { cn } from "@/lib/utils/cn"

import { useClipboard } from "@/hooks/useClipboard"

export type CopyToClipboardProps = {
  text: string
  inline?: boolean
  children: (isCopied: boolean) => React.ReactNode
}

const CopyToClipboard = ({
  children,
  text,
  inline = false,
}: CopyToClipboardProps) => {
  const { onCopy, hasCopied } = useClipboard({ timeout: 1500 })

  return (
    <div
      className={cn("cursor-pointer", inline ? "inline" : "block")}
      onClick={() => onCopy(text)}
    >
      {children(hasCopied)}
    </div>
  )
}

export default CopyToClipboard
