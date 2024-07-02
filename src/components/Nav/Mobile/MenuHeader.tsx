import { DrawerClose, DrawerHeader } from "@/components/ui/drawer"
import { useTranslation } from "next-i18next"

const MenuHeader = () => {
  const { t } = useTranslation("common")

  return (
    <div className="flex p-6 items-center justify-between">
      <DrawerHeader>{t("site-title")}</DrawerHeader>
      <DrawerClose>{t("close")}</DrawerClose>
    </div>
  )
}

export default MenuHeader
