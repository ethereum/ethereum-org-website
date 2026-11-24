import { useTranslations } from "next-intl"

import { ChevronPrev } from "@/components/Chevron"
import { Button } from "@/components/ui/buttons/Button"
import { SheetClose, SheetTitle } from "@/components/ui/sheet"

import { cn } from "@/lib/utils/cn"

import { SITE_TITLE } from "@/lib/constants"

const titleClasses = "p-0 text-md text-body-medium uppercase"

type MenuHeaderProps = {
  /** Open section's label; with `onBack`, replaces the site title */
  title?: string
  onBack?: () => void
}

/** Site title and Close, or Back, the open section's title and Close */
const MenuHeader = ({ title, onBack }: MenuHeaderProps) => {
  const t = useTranslations("common")

  return (
    // Equal side tracks keep the title centered; it truncates before they shrink
    <div className="grid h-19 shrink-0 grid-cols-[1fr_minmax(0,auto)_1fr] items-center gap-2 border-b border-body-light px-2">
      {onBack ? (
        <>
          <Button
            variant="ghost"
            isSecondary
            className="gap-1 justify-self-start px-3 text-md"
            onClick={onBack}
            data-testid="mobile-menu-back"
            autoFocus
          >
            <ChevronPrev className="size-5" aria-hidden />
            {t("nav-back")}
          </Button>
          <SheetTitle className={cn(titleClasses, "truncate font-bold")}>
            {title}
          </SheetTitle>
        </>
      ) : (
        <SheetTitle className={cn(titleClasses, "col-span-2 ps-4")}>
          {SITE_TITLE}
        </SheetTitle>
      )}
      <SheetClose
        className="justify-self-end text-md"
        data-testid="mobile-menu-close"
      >
        {t("close")}
      </SheetClose>
    </div>
  )
}

export default MenuHeader
