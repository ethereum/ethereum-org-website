import { useRouter } from "next/router"
import {
  forwardRef,
  MenuItem as ChakraMenuItem,
  type MenuItemProps as ChakraMenuItemProps,
  Text,
} from "@chakra-ui/react"

import type { LocaleDisplayInfo } from "@/lib/types"

import { BaseLink } from "@/components/Link"

import ProgressBar from "./ProgressBar"

type ItemProps = ChakraMenuItemProps & {
  displayInfo: LocaleDisplayInfo
}

const MenuItem = forwardRef(({ displayInfo, ...props }: ItemProps, ref) => {
  const {
    localeOption,
    sourceName,
    targetName,
    approvalProgress,
    wordsApproved,
  } = displayInfo
  const { asPath, locale } = useRouter()

  const getProgressInfo = (approvalProgress: number, wordsApproved: number) => {
    const percentage = new Intl.NumberFormat(locale!, {
      style: "percent",
    }).format(approvalProgress / 100)
    const progress =
      approvalProgress === 0 ? "<" + percentage.replace("0", "1") : percentage
    const words = new Intl.NumberFormat(locale!).format(wordsApproved)
    return { progress, words }
  }

  const { progress, words } = getProgressInfo(approvalProgress, wordsApproved)

  return (
    <ChakraMenuItem
      as={BaseLink}
      ref={ref}
      flexDir="column"
      w="full"
      mb="1"
      alignItems="start"
      borderRadius="base"
      bg="transparent"
      color="body.base"
      textDecoration="none"
      data-group
      onFocus={(e) => {
        e.target.scrollIntoView({ block: "nearest" })
      }}
      scrollMarginY="16"
      _hover={{ bg: "primary.lowContrast", textDecoration: "none" }}
      _focus={{ bg: "primary.lowContrast" }}
      sx={{
        p: {
          textDecoration: "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
      href={asPath}
      locale={localeOption}
      {...props}
    >
      <Text fontSize="lg" color="primary.base">
        {targetName}
      </Text>
      <Text textTransform="uppercase" fontSize="xs" color="body.base">
        {sourceName}
      </Text>
      <Text
        textTransform="lowercase"
        fontSize="xs"
        color="body.medium"
        maxW="full"
      >
        {progress} translated • {words} words
      </Text>
      <ProgressBar value={approvalProgress} />
    </ChakraMenuItem>
  )
})

export default MenuItem
