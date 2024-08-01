import { Center, Text } from "@chakra-ui/react"

import DismissableBanner from "@/components/Banners/DismissableBanner"
import { ButtonLink } from "@/components/Buttons"

export const TranslatathonBanner = ({ pathname }) => {
  const todaysDate = new Date()
  const translatathonStartDate = new Date("August 9, 2024 12:00:00 UTC")

  const showBanner =
    pathname === "/contributing/translation-program/" || pathname === "/"

  return todaysDate < translatathonStartDate && showBanner ? (
    <DismissableBanner storageKey="translatathon-banner">
      <Center gap={4}>
        <Text>🚨 Applications for the 2024 Translathathon are open 🚨</Text>
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
