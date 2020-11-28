import React, { useState, useEffect, useRef } from "react"
import ClipboardJS from "clipboard"

const CopyToClipboard = (props) => {
  const [isCopied, setIsCopied] = useState(false)
  const targetEl = useRef(null)
  const timer = useRef(0)

  useEffect(() => {
    const afterCopy = () => {
      setIsCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setIsCopied(false), 1500)
    }

    const clipboard = new ClipboardJS(targetEl.current, {
      text: () => props.text,
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
  }, [props.text])

  return <div ref={targetEl}>{props.children(isCopied)}</div>
}

export default CopyToClipboard
