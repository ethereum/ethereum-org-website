import { CiLink } from "react-icons/ci"
import { Icon } from "@chakra-ui/react"

import Link from "@/components/Link"

const IdAnchor = ({ id }: { id?: string }) => {
  if (!id) return null
  return (
    <Link
      href={"#" + id}
      position="absolute"
      insetInlineEnd="100%"
      aria-label={id.replaceAll("-", " ") + " permalink"}
      opacity={0}
      _groupHover={{ opacity: 1 }}
      _focus={{ opacity: 1 }}
      transition="opacity 0.1s ease-in-out"
    >
      <Icon as={CiLink} fontSize="xl" me="1" />
    </Link>
  )
}

export default IdAnchor
