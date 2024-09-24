import { MouseEventHandler } from "react"
import { useTranslation } from "next-i18next"

import { Button } from "../ui/buttons/Button"

type MobileCloseBarProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>
}

export const MobileCloseBar = ({ handleClick }: MobileCloseBarProps) => {
  const { t } = useTranslation()

  return (
    <div className="sticky top-0 flex justify-end bg-background md:hidden">
      <Button className="self-end p-4" variant="ghost" onClick={handleClick}>
        {t("close")}
      </Button>
    </div>
  )
}
