import React from "react"

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  type ModalProps,
  type ModalContentProps,
  UseDisclosureReturn,
} from "@chakra-ui/react"

export interface IPropsOverlay {
  isActive: boolean
}

export interface IProps extends ModalContentProps, Pick<ModalProps, "size"> {
  disclosure: UseDisclosureReturn
  children?: React.ReactNode
}

export const SimulatorModal: React.FC<IProps> = ({
  disclosure: { isOpen, onClose },
  children,
  size,
  ...restProps
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="full"
      scrollBehavior="inside"
    >
      <ModalOverlay bgColor="blackAlpha.700" />

      <ModalContent
        p={8}
        shadow="md"
        border="1px"
        borderColor="border"
        borderRadius="md"
        overflow="auto"
        minH="unset"
        maxH={{
          base: "calc(100vh - 1rem)",
          md: "min(calc(100vh - 2rem), 792px)",
        }}
        maxW={{
          base: "calc(100vw - 1rem)",
          md: "min(calc(100vw - 2rem), 1000px)",
        }}
        {...restProps}
      >
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}
