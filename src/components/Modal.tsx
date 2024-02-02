import React from "react"
import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  type ModalContentProps,
  ModalOverlay,
  type ModalProps as ChakraModalProps,
} from "@chakra-ui/react"

export type ModalProps = ModalContentProps &
  Pick<ChakraModalProps, "size"> & {
    children?: React.ReactNode
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
  }

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  size,
  ...restProps
}: ModalProps) => {
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
