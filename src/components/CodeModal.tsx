import { Children, type ReactElement } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

import { Button } from "./ui/buttons/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog-modal"

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="absolute inset-0 mb-0 mt-auto max-h-[50%] max-w-[100vw]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="overflow-y-auto">{children}</div>
        </DialogDescription>
        <Button
          variant="outline"
          onClick={() => onCopy(codeSnippet)}
          className="absolute right-19 top-24" // Force right, code always LTR
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
      </DialogContent>
    </Dialog>
  )
}

export default CodeModal
