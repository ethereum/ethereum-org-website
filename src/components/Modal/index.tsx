import React from "react"
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  type ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type ModalProps as ChakraModalProps,
} from "@chakra-ui/react"

export type ModalProps = ModalContentProps &
  Pick<ChakraModalProps, "size"> & {
    children?: React.ReactNode
    title?: string
    actionButtonLabel?: string
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
  }

const Modal = ({
  children,
  title,
  actionButtonLabel,
  isOpen,
  setIsOpen,
  ...restProps
}: ModalProps) => {
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
