import React from "react"
import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  type ModalContentProps,
  ModalOverlay,
  type ModalProps,
  UseDisclosureReturn,
} from "@chakra-ui/react"

type SimulatorModalProps = ModalContentProps &
  Pick<ModalProps, "size"> & {
    isOpen: UseDisclosureReturn["isOpen"]
    onClose: UseDisclosureReturn["onClose"]
    children?: React.ReactNode
  }

export const SimulatorModal = ({
  isOpen,
  onClose,
  children,
  size,
  ...restProps
}: SimulatorModalProps) => {
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
        py={8}
        px={{ base: 4, sm: 8 }}
        shadow="md"
        border="1px"
        borderColor="border"
        borderRadius="md"
        overflowY="auto"
        overflowX="hidden"
        minH="unset"
        h="100%"
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
