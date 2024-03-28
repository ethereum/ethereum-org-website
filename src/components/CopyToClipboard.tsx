import { Box, useClipboard } from "@chakra-ui/react"

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
  const { onCopy, hasCopied } = useClipboard(text, { timeout: 1500 })

  return (
    <Box
      cursor="pointer"
      onClick={onCopy}
      display={inline ? "inline" : "block"}
    >
      {children(hasCopied)}
    </Box>
  )
}

export default CopyToClipboard
