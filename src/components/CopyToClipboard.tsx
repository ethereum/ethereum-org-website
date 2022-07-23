import React, { useState, useEffect, useRef } from "react"
import ClipboardJS from "clipboard"

export interface IProps {
  text: string
  children: (isCopied: boolean) => React.ReactNode
}

const CopyToClipboard: React.FC<IProps> = ({ children, text }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const targetEl = useRef<HTMLDivElement>(null)
  const timer = useRef(0)

  useEffect(() => {
    const afterCopy = () => {
      setIsCopied(true)
      clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setIsCopied(false), 1500)
    }

    const clipboard = new ClipboardJS(targetEl.current!, {
      text: () => text,
    })

    clipboard.on("success", (e) => {
      afterCopy()
    })

    clipboard.on("error", (e) => {
      console.log("error: failed to copy text")
    })

    return () => {
      clipboard.destroy()
      clearTimeout(timer.current)
    }
  }, [text])

  return <div ref={targetEl}>{children(isCopied)}</div>
}

export default CopyToClipboard
