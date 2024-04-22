import React from "react"
import {
  Button,
  HStack,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type ModalProps as ChakraModalProps,
} from "@chakra-ui/react"

export type ModalProps = ChakraModalProps & {
  children?: React.ReactNode
  title?: React.ReactNode
  actionButtonLabel?: string
  contentProps?: ModalContentProps
}

const Modal = ({
  children,
  title,
  actionButtonLabel,
  contentProps,
  ...restProps
}: ModalProps) => {
  return (
    <ChakraModal isCentered scrollBehavior="inside" {...restProps}>
      <ModalOverlay />

      <ModalContent {...contentProps}>
        <HStack>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
        </HStack>
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
