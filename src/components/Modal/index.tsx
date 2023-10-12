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
import Button from "../Buttons/Button"

export interface IPropsOverlay {
  isActive: boolean
}

export interface IProps {
  title?: string
  description?: string
  ButtonLabel?: string
  actionButtonLabel?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Modal: React.FC<IProps> = ({
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
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button variant="primary" children={ButtonLabel} />
          <Button children={actionButtonLabel} />
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
