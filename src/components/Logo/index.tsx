import { useTranslation } from "next-i18next"

import { TwImage } from "@/components/Image"

import useColorModeValue from "@/hooks/useColorModeValue"
import darkImage from "@/public/images/ef-logo.png"
import lightImage from "@/public/images/ef-logo-white.png"

const Logo = () => {
  const { t } = useTranslation("common")
  const image = useColorModeValue(darkImage, lightImage)

  return (
    <TwImage
      className="h-full w-auto"
      src={image}
      alt={t("ethereum-foundation-logo")}
    />
  )
}

export default Logo
