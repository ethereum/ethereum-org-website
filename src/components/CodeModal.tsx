import { Children, type ReactElement } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

import { Button } from "./ui/buttons/Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"

import { useClipboard } from "@/hooks/useClipboard"
import { useTranslation } from "@/hooks/useTranslation"

type CodeModalProps = {
  title: string
  children?: ReactElement
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CodeModal = ({ children, isOpen, setIsOpen, title }: CodeModalProps) => {
  const { t } = useTranslation()
  const codeSnippet = (Children.toArray(children)[0] as ReactElement).props
    .children

  const { onCopy, hasCopied } = useClipboard()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="bottom"
        className="flex h-[50vh] flex-col rounded-t-2xl"
      >
        <SheetHeader className="flex-row items-center justify-between space-y-0 p-4 ps-8 pt-6">
          <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
          <SheetClose>{t("close")}</SheetClose>
          <Button
            variant="outline"
            onClick={() => onCopy(codeSnippet)}
            className="absolute right-8 top-28" // Force right, code always LTR
          >
            {hasCopied ? (
              <>
                {t("copied")}
                <ClipboardCheck className="ms-1" />
              </>
            ) : (
              <>
                {t("copy")}
                <Clipboard className="ms-1" />
              </>
            )}
          </Button>
        </SheetHeader>
        <SheetDescription className="flex-1 overflow-y-auto">
          {children}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default CodeModal
