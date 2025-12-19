"use client"

import OptiLogo from "./logo.svg"

import { useTranslation } from "@/hooks/useTranslation"

const Logo = () => {
  const { t } = useTranslation("common")

  return (
    <OptiLogo
      className="h-8 w-auto"
      role="img"
      aria-label={t("ethereum-foundation-logo")}
    />
  )
}

export default Logo
