import { SheetClose, SheetTitle } from "@/components/ui/sheet"

import { useTranslation } from "@/hooks/useTranslation"

const MenuHeader = () => {
  const { t } = useTranslation("common")

  return (
    <div className="flex items-center justify-between p-6">
      <SheetTitle className="text-md text-body-medium p-0 uppercase">
        {t("site-title")}
      </SheetTitle>
      <SheetClose className="text-md w-fit" data-testid="mobile-menu-close">
        {t("close")}
      </SheetClose>
    </div>
  )
}

export default MenuHeader
