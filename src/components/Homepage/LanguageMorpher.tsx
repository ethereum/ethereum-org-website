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

// The two targets need different triggers: the mobile button is a Radix Tabs
// trigger, which activates on focus and ignores a synthetic click, while the
// desktop one is a popover trigger, which needs the click. Doing both covers
// each without branching.
const activate = (button: HTMLElement) => {
  button.focus()
  button.click()
}

// The mobile menu's content is lazy-loaded, so its language button mounts a few
// hundred ms after the hamburger click -- longer on a cold chunk fetch. Poll for
// it instead of betting on a fixed delay (ETHORG-1AK).
const MENU_MOUNT_TIMEOUT_MS = 3000

const activateWhenPresent = (selector: string) => {
  const deadline = performance.now() + MENU_MOUNT_TIMEOUT_MS
  const attempt = () => {
    const button = document.querySelector<HTMLElement>(selector)
    if (button) return activate(button)
    if (performance.now() < deadline) requestAnimationFrame(attempt)
  }
  requestAnimationFrame(attempt)
}

const LanguageMorpher = () => {
  const isClient = useIsClient()

  const handleMobileClick = () => {
    document.getElementById(HAMBURGER_BUTTON_ID)?.click()
    activateWhenPresent(`button[name="${MOBILE_LANGUAGE_BUTTON_NAME}"]`)
  }
  const handleDesktopClick = () => {
    const button = document.querySelector<HTMLElement>(
      `button[name="${DESKTOP_LANGUAGE_BUTTON_NAME}"]`
    )
    if (button) activate(button)
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
          "Ethereum",
          "以太坊",
          "イーサリアム",
          "Etérium",
          "이더리움",
          "اتریوم",
          "Αιθέριο",
          "Eterijum",
          "إثيريوم",
          "อีเธอเรียม",
          "Эфириум",
          "इथीरियम",
          "ಇಥೀರಿಯಮ್",
          "אתריום",
          "Ξ",
          "ইথেরিয়াম",
          "எதீரியம்",
          "ఇథిరియూమ్",
        ]}
        charSet="abcdxyz01234567{}%$?!"
      />
    </Button>
  )
}

LanguageMorpher.displayName = "LanguageMorpher"

export default LanguageMorpher
