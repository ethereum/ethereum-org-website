"use client"

import DismissableBanner from "@/components/Banners/DismissableBanner"

import { ButtonLink } from "../ui/buttons/Button"
import { Center } from "../ui/flex"

import { usePathname } from "@/i18n/routing"

export const TranslatathonBanner = () => {
  const pathname = usePathname()
  const todaysDate = new Date()
  const translatathonStartDate = new Date("August 9, 2024 12:00:00 UTC")

  const showBanner =
    pathname === "/contributing/translation-program/" || pathname === "/"

  return todaysDate < translatathonStartDate && showBanner ? (
    <DismissableBanner storageKey="translatathon-banner">
      <Center className="gap-4">
        <p>🚨 Applications for the 2024 Translathathon are open 🚨</p>
        <ButtonLink
          href="/contributing/translation-program/translatathon"
          variant="outline"
        >
          Learn more
        </ButtonLink>
      </Center>
    </DismissableBanner>
  ) : (
    <></>
  )
}
