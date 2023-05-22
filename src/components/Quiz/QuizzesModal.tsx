import React from "react"

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react"

export interface IPropsOverlay {
  isActive: boolean
}

export interface IProps {
  children?: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const QuizzesModal: React.FC<IProps> = ({
  children,
  isOpen,
  setIsOpen,
  ...props
}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      size="xl"
      scrollBehavior="inside"
      {...props}
    >
      <ModalOverlay bgColor="blackAlpha.700" />

      <ModalContent h={{ base: "100vh", md: "auto" }}>
        <ModalCloseButton
          size={{ base: "lg", md: "md" }}
          zIndex={1}
          // position="absolute"
          // top={-20}
          // right={2}
        />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

export default QuizzesModal
