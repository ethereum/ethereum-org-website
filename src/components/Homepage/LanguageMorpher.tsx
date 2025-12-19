"use client"

import Morpher from "@/components/Morpher"
import { Button } from "@/components/ui/buttons/Button"

import { screens } from "@/lib/utils/screen"

import {
  DESKTOP_LANGUAGE_BUTTON_NAME,
  HAMBURGER_BUTTON_ID,
  MOBILE_LANGUAGE_BUTTON_NAME,
} from "@/lib/constants"

import { useIsClient } from "@/hooks/useIsClient"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const LanguageMorpher = () => {
  const isClient = useIsClient()

  const handleMobileClick = () => {
    ;(document.getElementById(HAMBURGER_BUTTON_ID) as HTMLButtonElement).click()
    setTimeout(
      () =>
        (
          document.querySelector(
            `button[name="${MOBILE_LANGUAGE_BUTTON_NAME}"`
          ) as HTMLButtonElement
        ).click(),
      1
    )
  }
  const handleDesktopClick = () => {
    ;(
      document.querySelector(
        `button[name="${DESKTOP_LANGUAGE_BUTTON_NAME}"`
      ) as HTMLButtonElement
    ).click()
  }

  const [isLarge] = useMediaQuery([`(min-width: ${screens.md})`])

  // Use fallback value during SSR to prevent hydration mismatch
  // Default to false (mobile) during SSR, then use actual value on client
  const isLargeScreen = isClient && isLarge

  return (
    <Button
      className="mx-auto w-fit text-md text-primary no-underline"
      onClick={isLargeScreen ? handleDesktopClick : handleMobileClick}
      variant="ghost"
    >
      <Morpher
        words={[
          "OptiTech",
          "ಆಪ್ಟಿಟೆಕ್",
          "أوبتيتك",
          "Optitɛki",
          "Óptícnología",
          "آپٹی ٹیک",
          "ОптиТех",
          "ऑप्टीटेक",
          "Optithekenoloji",
          "ꯑꯣꯞꯇꯤꯇꯦꯛ",
          "ОптиТех",
          "اوڤتيچ",
          "ኦፕቲቴክ",
          "光泰科技",
          "옵티테크",
          "ཨོ་པི་ཊི་ཊེག",
          "ဢွပ်ႉတီႇတႅၵ်ႉ",
          "OptiTech",
        ]}
        charSet="abcdxyz01234567{}%$?!"
      />
    </Button>
  )
}

LanguageMorpher.displayName = "LanguageMorpher"

export default LanguageMorpher
