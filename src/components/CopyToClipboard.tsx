import { useState, useEffect, useRef } from "react"
import ClipboardJS from "clipboard"
import { Box, Text } from "@chakra-ui/react"

import Emoji from "@/components/Emoji"
import Translation from "@/components/Translation"

export interface IProps {
  address: string
  inline?: boolean
}

const CopyToClipboard: React.FC<IProps> = ({
  address,
  inline = false,
}) => {
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
      text: () => address,
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
  }, [address])

  return (
    <Box ref={targetEl} display={inline ? "inline" : "block"} cursor="pointer">
        <Box
          color="primary.base"
          cursor="pointer"
          overflow="hidden"
          textOverflow="ellipsis"
          fontFamily="monospace"
          bg="ednBackground"
          px={1}
          fontSize="sm"
          _hover={{
            bg: "primary100",
          }}
        >
          <Text
            as={Translation}
            textTransform="uppercase"
            id="comp-tutorial-metadata-tip-author"
          />{" "}
          {address} {isCopied && <Translation id="copied" />}
          {isCopied && <Emoji
              fontSize="sm"
              ml={2}
              mr={2}
              text=":white_check_mark:"
            />}
        </Box>
    </Box>
  )
}

export default CopyToClipboard
