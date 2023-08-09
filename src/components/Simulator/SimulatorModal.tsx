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
        maxW={{ base: "100%", md: "1000px" }}
        mx={{ base: 4, md: "auto" }}
        {...restProps}
      >
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}
