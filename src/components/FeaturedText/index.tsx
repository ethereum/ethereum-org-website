import { Box } from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

function FeaturedText({ children }: ChildOnlyProp) {
  return (
    <Box
      ps={4}
      ms={-4}
      borderInlineStart="1px dotted"
      borderColor="primary.base"
    >
      {children}
    </Box>
  )
}

export default FeaturedText
