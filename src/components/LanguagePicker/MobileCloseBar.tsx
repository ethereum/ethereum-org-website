import { MouseEventHandler } from "react"
import { useTranslation } from "next-i18next"
import { Button } from "../ui/button"

type MobileCloseBarProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export const MobileCloseBar = ({ handleClick }: MobileCloseBarProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-end md:hidden sticky z-[var(--zIndex-sticky)] top-0 bg-background-base">
      <Button className="p-4 variant-ghost self-end" onClick={handleClick}>
        {t("close")}
      </Button>
    </div>
  )
}
