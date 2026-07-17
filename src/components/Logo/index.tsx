"use client"
import { useTranslations } from "next-intl"

import { Image } from "@/components/Image"

import useColorModeValue from "@/hooks/useColorModeValue"
import darkImage from "@/public/images/ef-logo.png"
import lightImage from "@/public/images/ef-logo-white.png"

const Logo = () => {
  const t = useTranslations("common")
  const image = useColorModeValue(darkImage, lightImage)

  return (
    <Image
      src={image}
      className="h-[100px] w-fit"
      alt={t("ethereum-foundation-logo")}
    />
  )
}

export default Logo
