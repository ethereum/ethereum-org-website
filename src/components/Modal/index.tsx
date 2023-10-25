import React from "react"

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react"

export interface IPropsOverlay {
  isActive: boolean
}

export interface IProps {
  children?: React.ReactNode
  title?: string
  description?: string
  ButtonLabel?: string
  actionButtonLabel?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Modal: React.FC<IProps> = ({
  children,
  title,
  description,
  actionButtonLabel,
  ButtonLabel,
  isOpen,
  setIsOpen,
  ...props
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay bgColor="blackAlpha.700" />

      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
