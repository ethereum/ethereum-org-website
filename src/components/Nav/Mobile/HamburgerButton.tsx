import { useTranslation } from "next-i18next"

import { HAMBURGER_BUTTON_ID } from "@/lib/constants"

import { Button } from "@/components/ui/button"

const hamburgerSvg =
  "M 2 13 l 10 0 l 0 0 l 10 0 M 4 19 l 8 0 M 12 19 l 8 0 M 2 25 l 10 0 l 0 0 l 10 0"
const glyphSvg =
  "M 2 19 l 10 -14 l 0 0 l 10 14 M 2 19 l 10 7 M 12 26 l 10 -7 M 2 22 l 10 15 l 0 0 l 10 -15"

const hamburgerVariants = {
  closed: { d: hamburgerSvg, transition: { duration: 0.25 } },
  open: { d: glyphSvg, transition: { duration: 0.25 } },
}

type HamburgerProps = {
  isMenuOpen: boolean
  onToggle: () => void
}

const HamburgerButton = ({
  isMenuOpen,
  onToggle,
  ...props
}: HamburgerProps) => {
  const { t } = useTranslation("common")

  return (
    <Button
      variant="ghost"
      size="icon"
      id={HAMBURGER_BUTTON_ID}
      onClick={onToggle}
      aria-label={t("aria-toggle-search-button")}
      {...props}
    >
      <svg
        viewBox="0 0 24 40"
        pointerEvents={isMenuOpen ? "none" : "auto"}
        className="stroke-2 w-10 h-10 stroke-current"
      >
        <path d={hamburgerSvg} />
      </svg>
    </Button>
  )
}

export default HamburgerButton
