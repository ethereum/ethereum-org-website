import { MouseEventHandler } from "react"

import { Button } from "../ui/buttons/Button"

import { useTranslation } from "@/hooks/useTranslation"

type MobileCloseBarProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export const MobileCloseBar = ({ handleClick }: MobileCloseBarProps) => {
  const { t } = useTranslation()

  return (
    <div className="sticky top-0 flex justify-end bg-background md:hidden">
      <Button
        className="self-end p-4"
        variant="ghost"
        onClick={handleClick}
        data-testid="mobile-language-picker-close"
      >
        {t("close")}
      </Button>
    </div>
  )
}
