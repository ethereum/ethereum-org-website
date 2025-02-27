import { Image } from "@/components/Image"

import useColorModeValue from "@/hooks/useColorModeValue"
import { useTranslation } from "@/hooks/useTranslation"
import darkImage from "@/public/images/ef-logo.png"
import lightImage from "@/public/images/ef-logo-white.png"

const Logo = () => {
  const { t } = useTranslation("common")
  const image = useColorModeValue(darkImage, lightImage)

  return (
    <Image
      src={image}
      className="h-[100px] w-auto"
      alt={t("ethereum-foundation-logo")}
    />
  )
}

export default Logo
