import { useTranslation } from "next-i18next"
import { useColorModeValue } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import darkImage from "@/public/ef-logo.png"
import lightImage from "@/public/ef-logo-white.png"

const Logo = () => {
  const { t } = useTranslation("common")
  const image = useColorModeValue(darkImage, lightImage)

  return (
    <Image src={image} h={100} w="auto" alt={t("ethereum-foundation-logo")} />
  )
}

export default Logo
