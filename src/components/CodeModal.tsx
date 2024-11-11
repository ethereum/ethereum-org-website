import { Children, type ReactElement } from "react"
import { useTranslation } from "next-i18next"
import { IoMdCopy } from "react-icons/io"
import { MdCheck } from "react-icons/md"
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"

import { Button } from "./ui/buttons/Button"

import { useClipboard } from "@/hooks/useClipboard"

type CodeModalProps = {
  title: string
  children?: ReactElement
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CodeModal = ({ children, isOpen, setIsOpen, title }: CodeModalProps) => {
  const { t } = useTranslation()
  const codeSnippet = (Children.toArray(children)[0] as ReactElement).props
    .children.props.children

  const { onCopy, hasCopied } = useClipboard()

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay hideBelow="md" />
      <ModalContent
        hideBelow="md"
        maxW="100vw"
        marginTop="auto"
        marginBottom="0"
        maxHeight="50%"
        borderRadius="0"
        p={{ base: "0", md: "0" }}
        gap="0"
      >
        <div className="flex items-center border-y bg-background px-6 py-3 font-monospace uppercase">
          <h2 className="text-md font-normal">{title}</h2>
          <Button
            variant="ghost"
            className="ms-auto text-sm"
            size="sm"
            isSecondary
            onClick={() => setIsOpen(false)}
          >
            {t("close")}
          </Button>
        </div>
        <ModalBody p="0">{children}</ModalBody>
        <Button
          variant="outline"
          onClick={() => onCopy(codeSnippet)}
          className="absolute right-4 top-20" // Force right, code always LTR
        >
          {hasCopied ? (
            <>
              <MdCheck /> {t("copied")}
            </>
          ) : (
            <>
              <IoMdCopy /> {t("copy")}
            </>
          )}
        </Button>
      </ModalContent>
    </Modal>
  )
}

export default CodeModal
