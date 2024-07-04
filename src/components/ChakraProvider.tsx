import { useLocaleDirection } from "@/hooks/useLocaleDirection"
import { ChakraProvider as OriginalChakraProvider } from "@chakra-ui/react"
import merge from "lodash/merge"

import customTheme from "@/@chakra-ui/theme"

function ChakraProvider(props) {
  const direction = useLocaleDirection()

  const theme = merge(customTheme, { direction })

  return <OriginalChakraProvider theme={theme} {...props} />
}

export default ChakraProvider
