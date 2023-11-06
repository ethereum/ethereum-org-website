import colors from "./colors"
import shadows from "./shadows"
import sizes from "./sizes"
import spacing from "./spacing"
import typography from "./typography"

// Check the following link to see all the possible options:
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/foundations/index.ts
const foundations = {
  colors,
  shadows,
  space: spacing,
  sizes: {
    ...spacing,
    ...sizes,
  },
  ...typography,
}

export default foundations
