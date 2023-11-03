import React from "react"

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  type ModalProps,
  type ModalContentProps,
} from "@chakra-ui/react"

export interface IPropsOverlay {
  isActive: boolean
}

export interface IProps extends ModalContentProps, Pick<ModalProps, "size"> {
  children?: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Modal: React.FC<IProps> = ({
  children,
  isOpen,
  setIsOpen,
  size,
  ...restProps
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      size={size ?? "xl"}
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
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
