import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BsCheck } from "react-icons/bs"
import {
  Badge,
  Box,
  Flex,
  forwardRef,
  Icon,
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
    isBrowserDefault,
  } = displayInfo
  const { t } = useTranslation("common")
  const { asPath, locale } = useRouter()
  const isCurrent = localeOption === locale

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
      display="block"
      pt="2 !important"
      alignItems="start"
      borderRadius="base"
      bg={isCurrent ? "background.base" : "transparent"}
      color="body.base"
      textDecoration="none"
      onFocus={(e) => {
        e.target.scrollIntoView({ block: "nearest" })
      }}
      scrollMarginY="8"
      _hover={{
        bg: "primary.lowContrast",
        textDecoration: "none",
        "p.language-name": { color: "primary.base" },
      }}
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
      <Flex alignItems="center" w="full">
        <Box flex={1}>
          <Flex alignItems="center" gap={2}>
            <Text
              className="language-name"
              fontSize="lg"
              color={isCurrent ? "primary.highContrast" : "body.base"}
            >
              {targetName}
            </Text>
            {isBrowserDefault && (
              <Badge
                border="1px"
                borderColor="body.medium"
                color="body.medium"
                lineHeight="none"
                fontSize="2xs"
                p="1"
                h="fit-content"
                bg="none"
              >
                {t("page-languages-browser-default")}
              </Badge>
            )}
          </Flex>
          <Text textTransform="uppercase" fontSize="xs" color="body.base">
            {sourceName}
          </Text>
        </Box>
        {isCurrent && (
          <Icon as={BsCheck} fontSize="2xl" color="primary.highContrast" />
        )}
      </Flex>
      <Text
        textTransform="lowercase"
        fontSize="xs"
        color="body.medium"
        maxW="full"
      >
        {progress} {t("page-languages-translated")} • {words}{" "}
        {t("page-languages-words")}
      </Text>
      <ProgressBar value={approvalProgress} />
    </ChakraMenuItem>
  )
})

export default MenuItem
