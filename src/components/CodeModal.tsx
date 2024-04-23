import type { ReactNode } from "react"
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"

type CodeModalProps = {
  title: string
  children: ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CodeModal = ({ children, isOpen, setIsOpen, title }: CodeModalProps) => (
  <Modal
    isOpen={isOpen}
    scrollBehavior="inside"
    variant="code"
    onClose={() => setIsOpen(false)}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
)

export default CodeModal
