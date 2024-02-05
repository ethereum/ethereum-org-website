import { useEffect, useRef, useState } from "react"
import ClipboardJS from "clipboard"
import { Box } from "@chakra-ui/react"

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

  return (
    <Box ref={targetEl} display={inline ? "inline" : "block"} cursor="pointer">
      {children(isCopied)}
    </Box>
  )
}

export default CopyToClipboard
