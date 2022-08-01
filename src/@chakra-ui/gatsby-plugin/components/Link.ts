import type { ComponentStyleConfig } from "@chakra-ui/theme"
import { mode, type StyleFunctionProps } from "@chakra-ui/theme-tools"

const Link: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("blue.500", "orange.500")(props),
    textDecoration: "underline",
  }),
}

export default Link
