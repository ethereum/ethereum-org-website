import { useTranslation } from "next-i18next"
import { Box } from "@chakra-ui/react"

import { MAIN_CONTENT_ID } from "@/lib/constants"

import { Button } from "./Buttons"

export const SkipLink = () => {
  const { t } = useTranslation("common")

  const handleNavigate = () => {
    document?.getElementById(MAIN_CONTENT_ID)?.focus()
  }
  return (
    <Box bg="primary.base">
      <Button
        h="8"
        onClick={handleNavigate}
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
      </Button>
    </Box>
  )
}
