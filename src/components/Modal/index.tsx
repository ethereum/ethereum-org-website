import React from "react"

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  type ModalProps,
  type ModalContentProps,
  Button,
  ModalFooter,
} from "@chakra-ui/react"

export interface IPropsOverlay {
  isActive: boolean
}

export interface IProps extends ModalContentProps, Pick<ModalProps, "size"> {
  children?: React.ReactNode
  title?: string
  description?: string
  actionButtonLabel?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Modal: React.FC<IProps> = ({
  children,
  title,
  description,
  actionButtonLabel,
  isOpen,
  setIsOpen,
  ...restProps
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      /* size={size ?? "xl"} */
      scrollBehavior="inside"
    >
      <ModalOverlay bgColor="blackAlpha.700" />

      <ModalContent
        p={8}
        shadow="md"
        border="1px"
        borderColor="border"
        borderRadius="md"
        {...restProps}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        {actionButtonLabel && (
          <ModalFooter>
            <Button variant="outline">Cancel</Button>
            <Button>{actionButtonLabel}</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
