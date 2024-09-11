import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"

type UseClipboardOptions = {
  /**
   * timeout delay (in ms) to switch back to initial state once copied.
   */
  timeout?: number
}

type UseClipboardReturn = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  onCopy: () => void
  hasCopied: boolean
}

export const useClipboard = (
  value: string,
  { timeout }: UseClipboardOptions = {}
): UseClipboardReturn => {
  const [copyValue, setCopyValue] = useState(value)
  const [hasCopied, setHasCopied] = useState(false)
  const [_, copy] = useCopyToClipboard()

  const onCopy = () => {
    copy(value)
      .then(() => {
        setHasCopied(true)
        setTimeout(() => {
          setHasCopied(false)
        }, timeout || 1500)
      })
      .catch((error) => {
        console.error("Failed to copy!", error)
      })
  }

  return { onCopy, hasCopied, value: copyValue, setValue: setCopyValue }
}
