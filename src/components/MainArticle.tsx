import { Box, type BoxProps } from "@chakra-ui/react"

import { MAIN_CONTENT_ID } from "@/lib/constants"

const MainArticle = (props: BoxProps) => (
  <Box as="article" id={MAIN_CONTENT_ID} tabIndex={-1} {...props} />
)

export default MainArticle
