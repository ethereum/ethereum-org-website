import { useRouter } from "next/router"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"
import { Icon, type IconProps } from "@chakra-ui/react"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

const NextChevron = (props: IconProps) => {
  const { locale } = useRouter()
  const isRtl = isLangRightToLeft(locale! as Lang)
  return <Icon as={isRtl ? MdChevronLeft : MdChevronRight} {...props} />
}

export default NextChevron
