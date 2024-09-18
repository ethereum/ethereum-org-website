import { useState } from "react"
import { useCopyToClipboard } from "usehooks-ts"

export type UseClipboardOptions = {
  /**
   * timeout delay (in ms) to switch back to initial state once copied.
   */
  timeout?: number
}

export const useClipboard = ({ timeout = 1500 }: UseClipboardOptions = {}) => {
  const [hasCopied, setHasCopied] = useState(false)
  const [_, copy] = useCopyToClipboard()

  const onCopy = async (value: string) => {
    try {
      await copy(value)

      setHasCopied(true)
      setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    } catch (error) {
      console.error("Failed to copy!", error)
    }
  }

  return { onCopy, hasCopied }
}
