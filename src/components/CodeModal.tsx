import { useTranslation } from "next-i18next"
import type { ReactNode } from "react"
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react"

import { Button } from "./ui/buttons/Button"

type CodeModalProps = {
  title: string
  children: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CodeModal = ({ children, isOpen, setIsOpen, title }: CodeModalProps) => {
  const { t } = useTranslation()

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
      </ModalContent>
    </Modal>
  )
}

export default CodeModal
