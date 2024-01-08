import { useTranslation } from "next-i18next"
import { Box } from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

import { MAIN_CONTENT_ID } from "@/lib/constants"

export const SkipLink = () => {
  const { t } = useTranslation()
  return (
    <Box bg="primary.base">
      <BaseLink
        href={"#" + MAIN_CONTENT_ID}
        lineHeight="taller"
        position="absolute"
        top="-12"
        ms="2"
        color="background.base"
        textDecorationLine="none"
        _hover={{ textDecoration: "none" }}
        _focus={{ position: "static" }}
      >
        {t("skip-to-main-content")}
      </BaseLink>
    </Box>
  )
}
