import { Text } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

const FooterItemText = (props: ChildOnlyProp) => (
  <Text
    fontSize="sm"
    lineHeight="base"
    fontWeight="normal"
    letterSpacing="wider"
    mt="2"
    textTransform="uppercase"
    textAlign="center"
    opacity={0.7}
    _hover={{ opacity: 1 }}
    {...props}
  />
)

export default FooterItemText
